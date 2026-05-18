import { createServer } from 'node:http';

const port = Number(process.env.PORT || 4100);
const startedAt = new Date().toISOString();

const currentUser = {
  id: 'u_preview_001',
  nickname: 'Mina',
  status: 'approved',
  diamonds: 120
};

const profile = {
  id: 'p_preview_me',
  userId: currentUser.id,
  nickname: 'Mina',
  age: 31,
  city: 'Seoul',
  occupation: 'Product designer',
  tags: ['weekend hiking', 'long-term', 'coffee'],
  reviewStatus: 'approved'
};

const candidates = [
  {
    profileId: 'p_2001',
    nickname: 'Joon',
    age: 34,
    city: 'Bundang',
    locked: true,
    unlockCost: 10,
    intro: 'Founder, tennis on Sundays, looking for a serious relationship.'
  },
  {
    profileId: 'p_2002',
    nickname: 'Ara',
    age: 29,
    city: 'Songpa',
    locked: true,
    unlockCost: 10,
    intro: 'Doctor, slow weekends, values direct conversation.'
  }
];

const matches = [
  {
    matchId: 'm_3001',
    profileId: 'p_2001',
    nickname: 'Joon',
    latestMessage: 'Nice to meet you here.',
    unreadCount: 1
  }
];

let unlockedProfiles = new Set();
const walletLedger = [
  {
    id: 'led_1',
    type: 'welcome_grant',
    amount: 120,
    balanceAfter: currentUser.diamonds,
    reason: 'Welcome preview grant',
    createdAt: startedAt
  }
];
const chatMessages = [
  { id: 'msg_1', sender: 'match', text: 'Nice to meet you here.', sentAt: startedAt },
  { id: 'msg_2', sender: 'me', text: 'Likewise. Your profile stood out.', sentAt: new Date().toISOString() }
];
const supportRequests = [];
const deletionRequests = [];
const reports = [
  {
    reportId: 'r_9001',
    reporterUserId: currentUser.id,
    targetUserId: 'u_1003',
    targetProfileId: 'p_2002',
    reasonCode: 'inappropriate_message',
    note: 'Preview report from chat safety entry point.',
    status: 'open',
    createdAt: startedAt
  }
];
const suspensions = [];

function json(res, status, payload) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  });
  res.end(JSON.stringify(payload, null, 2));
}

function notFound(res, path) {
  json(res, 404, {
    code: 'NOT_FOUND',
    message: `No preview route for ${path}`
  });
}

function readBody(req) {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
  });
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);

  if (url.pathname === '/health') {
    json(res, 200, {
      status: 'ok',
      service: 'hashdate-api',
      startedAt,
      checkedAt: new Date().toISOString()
    });
    return;
  }

  if (url.pathname === '/version') {
    json(res, 200, {
      name: '@hashdate/api',
      version: '0.1.0',
      mode: 'dependency-free-preview',
      contract: '../../docs/architecture/API_CONTRACT.md'
    });
    return;
  }

  if (url.pathname === '/v1/payments/products') {
    json(res, 200, {
      products: [
        { id: 'diamonds_30', diamonds: 30, label: '30 Diamonds', storeProductId: 'dev.diamonds.30' },
        { id: 'diamonds_100', diamonds: 100, label: '100 Diamonds', storeProductId: 'dev.diamonds.100' },
        { id: 'diamonds_300', diamonds: 300, label: '300 Diamonds', storeProductId: 'dev.diamonds.300' }
      ]
    });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/v1/auth/dev-login') {
    const body = await readBody(req);
    json(res, 200, {
      accessToken: 'dev-access-token',
      refreshToken: 'dev-refresh-token',
      user: currentUser,
      nextRoute: body?.hasProfile === false ? '/onboarding/profile' : '/app/discovery'
    });
    return;
  }

  if (url.pathname === '/v1/users/me') {
    json(res, 200, {
      user: currentUser,
      onboardingState: 'approved',
      profileId: profile.id
    });
    return;
  }

  if (url.pathname === '/v1/profiles/me') {
    json(res, 200, { profile });
    return;
  }

  if (req.method === 'PUT' && url.pathname === '/v1/profiles/me') {
    const body = await readBody(req);
    json(res, 200, {
      profile: {
        ...profile,
        ...body,
        reviewStatus: 'pending'
      }
    });
    return;
  }

  if (url.pathname === '/v1/discovery/swipe-deck') {
    json(res, 200, {
      candidates: candidates.map((candidate) => ({
        ...candidate,
        locked: !unlockedProfiles.has(candidate.profileId)
      }))
    });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/v1/discovery/swipes') {
    const body = await readBody(req);
    json(res, 200, {
      recorded: true,
      action: body.action ?? 'like',
      profileId: body.profileId ?? candidates[0].profileId,
      matchCreated: body.action === 'like'
    });
    return;
  }

  if (url.pathname === '/v1/wallet') {
    json(res, 200, {
      balance: currentUser.diamonds,
      currency: 'diamonds'
    });
    return;
  }

  if (req.method === 'POST' && /^\/v1\/profiles\/[^/]+\/unlocks$/.test(url.pathname)) {
    const profileId = url.pathname.split('/')[3];
    const alreadyUnlocked = unlockedProfiles.has(profileId);
    if (!alreadyUnlocked) {
      unlockedProfiles.add(profileId);
      currentUser.diamonds -= 10;
      walletLedger.push({
        id: `led_${walletLedger.length + 1}`,
        type: 'unlock_spend',
        amount: -10,
        balanceAfter: currentUser.diamonds,
        reason: `Profile detail unlock ${profileId}`,
        createdAt: new Date().toISOString()
      });
    }
    json(res, 200, {
      profileId,
      unlocked: true,
      charged: !alreadyUnlocked,
      chargedDiamonds: alreadyUnlocked ? 0 : 10,
      balance: currentUser.diamonds
    });
    return;
  }

  if (url.pathname === '/v1/wallet/ledger') {
    json(res, 200, { entries: walletLedger });
    return;
  }

  if (url.pathname === '/v1/matches') {
    json(res, 200, { matches });
    return;
  }

  if (url.pathname === '/v1/chat/rooms') {
    json(res, 200, {
      rooms: matches.map((match) => ({
        roomId: `room_${match.matchId}`,
        matchId: match.matchId,
        title: match.nickname,
        latestMessage: match.latestMessage,
        unreadCount: match.unreadCount
      }))
    });
    return;
  }

  if (/^\/v1\/chat\/rooms\/[^/]+\/messages$/.test(url.pathname)) {
    if (req.method === 'GET') {
      json(res, 200, { messages: chatMessages });
      return;
    }

    if (req.method === 'POST') {
      const body = await readBody(req);
      const message = {
        id: `msg_${chatMessages.length + 1}`,
        sender: 'me',
        text: body.text ?? body.message ?? '',
        sentAt: new Date().toISOString()
      };
      chatMessages.push(message);
      json(res, 201, { message });
      return;
    }
  }

  if (url.pathname === '/v1/admin/support/requests') {
    json(res, 200, { requests: supportRequests });
    return;
  }

  if (url.pathname === '/v1/admin/deletion-requests') {
    json(res, 200, { requests: deletionRequests });
    return;
  }

  if (url.pathname === '/v1/reports') {
    if (req.method === 'GET') {
      json(res, 200, { reports });
      return;
    }

    if (req.method === 'POST') {
      const body = await readBody(req);
      const report = {
        reportId: `r_${String(9001 + reports.length).padStart(4, '0')}`,
        reporterUserId: currentUser.id,
        targetUserId: body.targetUserId ?? 'u_unknown',
        targetProfileId: body.targetProfileId ?? null,
        reasonCode: body.reasonCode ?? 'other',
        note: body.note ?? '',
        status: 'open',
        createdAt: new Date().toISOString()
      };
      reports.push(report);
      json(res, 201, report);
      return;
    }
  }

  if (req.method === 'POST' && /^\/v1\/admin\/users\/[^/]+\/suspensions$/.test(url.pathname)) {
    const body = await readBody(req);
    const targetUserId = url.pathname.split('/')[4];
    const suspension = {
      suspensionId: `sus_${String(suspensions.length + 1).padStart(4, '0')}`,
      targetUserId,
      reasonCode: body.reasonCode ?? 'safety_review',
      duration: body.duration ?? 'indefinite',
      status: 'active',
      createdAt: new Date().toISOString()
    };
    suspensions.push(suspension);

    for (const report of reports) {
      if (report.targetUserId === targetUserId && report.status === 'open') {
        report.status = 'actioned';
      }
    }

    json(res, 201, {
      suspension,
      actionedReportCount: reports.filter((report) => report.targetUserId === targetUserId && report.status === 'actioned').length
    });
    return;
  }

  if (url.pathname === '/v1/admin/suspensions') {
    json(res, 200, { suspensions });
    return;
  }

  if (url.pathname === '/v1/content/legal') {
    json(res, 200, {
      documents: [
        { type: 'privacy', version: 'draft-2026-05-17', url: '/privacy', status: 'draft' },
        { type: 'terms', version: 'draft-2026-05-17', url: '/terms', status: 'draft' }
      ]
    });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/v1/support/requests') {
    const body = await readBody(req);
    const request = {
      requestId: `sup_${String(supportRequests.length + 1).padStart(4, '0')}`,
      status: 'open',
      category: body.category ?? 'general',
      subject: body.subject ?? 'Support request',
      email: body.email ?? null,
      createdAt: new Date().toISOString()
    };
    supportRequests.push(request);
    json(res, 201, request);
    return;
  }

  if (url.pathname === '/v1/support/requests/me') {
    json(res, 200, { requests: supportRequests });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/v1/users/me/deletion-requests') {
    const body = await readBody(req);
    const request = {
      requestId: `del_${String(deletionRequests.length + 1).padStart(4, '0')}`,
      status: 'pending',
      reasonCode: body.reasonCode ?? 'privacy',
      scheduledDeletionDate: '2026-06-15',
      createdAt: new Date().toISOString()
    };
    deletionRequests.push(request);
    json(res, 201, request);
    return;
  }

  notFound(res, url.pathname);
}).listen(port, '127.0.0.1', () => {
  console.log(`Hashdate API preview running at http://localhost:${port}/health`);
});
