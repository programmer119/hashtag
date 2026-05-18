import { createServer } from 'node:http';

const port = Number(process.env.PORT || 4302);

const screens = [
  { id: 'auth', label: 'Auth', title: 'Phone-first entry', body: 'OTP login with email fallback for development builds.' },
  { id: 'profile', label: 'Profile', title: 'Profile onboarding', body: 'Basics, photos, lifestyle tags, intent, and review submission.' },
  { id: 'review', label: 'Review', title: 'Pending review', body: 'Approved members enter discovery; rejected members edit and resubmit.' },
  { id: 'discover', label: 'Discover', title: 'Swipe discovery', body: 'Photo-first cards with like/pass and locked premium profile details.' },
  { id: 'unlock', label: 'Unlock', title: '10 diamond unlock', body: 'Explicit confirmation, one viewer-target unlock, no double charge.' },
  { id: 'matches', label: 'Matches', title: 'Mutual matches', body: 'Mutual likes create one match and open chat access.' },
  { id: 'chat', label: 'Chat', title: 'Match-only chat', body: 'Text messages, failed-send state, report and block entry points.' },
  { id: 'wallet', label: 'Wallet', title: 'Diamond wallet', body: 'Balance, store products, immutable ledger, admin adjustments.' },
  { id: 'safety', label: 'Safety', title: 'Report and block', body: 'Choose a controlled reason, submit report evidence, and block further contact while admin review runs.' }
];

const screenRows = {
  auth: [
    ['Method', 'Phone OTP'],
    ['Fallback', 'Email dev login'],
    ['Next', 'Profile setup']
  ],
  profile: [
    ['Nickname', '<input id="nickname" value="Mina" aria-label="Nickname" />'],
    ['Tags', '<input id="tags" value="coffee, hiking, serious" aria-label="Tags" />'],
    ['Review', '<strong id="profile-state">Draft</strong>']
  ],
  review: [
    ['Submitted', 'Today'],
    ['Queue', 'Admin review'],
    ['State', '<strong id="review-state">Pending</strong>']
  ],
  discover: [
    ['Candidate', '<strong id="candidate-name">Joon</strong>'],
    ['Profile detail', '<strong id="candidate-lock">Locked</strong>'],
    ['Decision', '<strong id="decision-state">Waiting</strong>']
  ],
  unlock: [
    ['Diamonds', '<strong id="diamond-balance">120</strong>'],
    ['Unlock cost', '10'],
    ['Status', '<strong id="unlock-state">Locked</strong>']
  ],
  matches: [
    ['Match', 'Joon'],
    ['Unread', '<strong id="unread-count">1</strong>'],
    ['Chat access', 'Open']
  ],
  chat: [
    ['Thread', 'Joon'],
    ['Latest', '<strong id="latest-message">Nice to meet you here.</strong>'],
    ['Send state', '<strong id="send-state">Ready</strong>']
  ],
  wallet: [
    ['Balance', '<strong id="wallet-balance">120</strong>'],
    ['Products', '30 / 100 / 300 diamonds'],
    ['Ledger', '<strong id="ledger-state">No new transaction</strong>']
  ],
  safety: [
    ['Reason', 'Inappropriate message'],
    ['Target', 'Ara'],
    ['Immediate action', '<strong id="safety-state">Block contact</strong>']
  ]
};

const screenActions = {
  discover: ['Like', 'Pass'],
  unlock: ['Confirm unlock', 'Back'],
  chat: ['Send message', 'Report'],
  wallet: ['Add 30', 'History'],
  safety: ['Submit report', 'Block only'],
  profile: ['Submit review', 'Reset'],
  review: ['Refresh', 'Edit'],
  auth: ['Continue', 'Back'],
  matches: ['Open chat', 'Back']
};

function renderRows(activeId) {
  return (screenRows[activeId] ?? screenRows.discover)
    .map(([label, value]) => `<div class="row"><span>${label}</span><strong>${value}</strong></div>`)
    .join('');
}

function renderActions(activeId) {
  const [primary, secondary] = screenActions[activeId] ?? screenActions.discover;
  return `<div class="actions"><button id="primary-action">${primary}</button><button id="secondary-action" class="secondary">${secondary}</button></div>`;
}

function page(activeId = 'discover') {
  const active = screens.find((screen) => screen.id === activeId) ?? screens[3];
  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hashdate Mobile Preview</title>
    <style>
      :root { --ink:#14201d; --muted:#61716c; --paper:#f8f6f1; --panel:#fff; --line:#dfe6e0; --brand:#0f7b68; --accent:#d64f3f; }
      * { box-sizing:border-box; }
      body { margin:0; min-width:320px; background:linear-gradient(135deg,#e2f5ee,#f8f6f1); color:var(--ink); font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      main { width:min(1180px,calc(100% - 36px)); min-height:100vh; margin:0 auto; padding:42px 0; display:grid; grid-template-columns:260px minmax(320px,420px) 1fr; gap:32px; align-items:center; }
      .nav, .notes, .phone { border:1px solid var(--line); border-radius:8px; background:rgba(255,255,255,.88); box-shadow:0 22px 60px rgba(20,32,29,.1); }
      .nav { padding:18px; display:grid; gap:8px; }
      .brand { display:flex; gap:10px; align-items:center; font-weight:850; margin-bottom:16px; }
      .mark { width:34px; height:34px; border-radius:8px; display:grid; place-items:center; background:var(--brand); color:white; }
      a { color:inherit; text-decoration:none; }
      .nav a { padding:11px 12px; border-radius:8px; color:var(--muted); font-weight:700; }
      .nav a.active, .nav a:hover { background:#dff4ec; color:var(--brand); }
      .phone { padding:14px; background:#101a17; }
      .screen { min-height:720px; border-radius:8px; overflow:hidden; background:var(--paper); display:flex; flex-direction:column; }
      .status { padding:14px 18px; display:flex; justify-content:space-between; font-size:.84rem; font-weight:800; }
      .hero { min-height:360px; padding:22px; display:flex; flex-direction:column; justify-content:flex-end; color:white; background:linear-gradient(180deg,rgba(20,32,29,.05),rgba(20,32,29,.88)),linear-gradient(135deg,#8ed6c4,#f6b49d); }
      .eyebrow { margin:0 0 10px; color:#0a574a; font-size:.76rem; font-weight:850; letter-spacing:.08em; text-transform:uppercase; }
      .hero .eyebrow { color:#dff4ec; }
      h1 { margin:0 0 10px; font-size:2.1rem; line-height:1; }
      p { color:var(--muted); line-height:1.6; }
      .hero p { color:rgba(255,255,255,.82); }
      .content { padding:20px; display:grid; gap:14px; }
      .row { padding:15px; border:1px solid var(--line); border-radius:8px; background:white; display:flex; justify-content:space-between; gap:12px; color:var(--muted); }
      .row strong { color:var(--ink); }
      input { width:180px; max-width:100%; min-height:34px; border:1px solid var(--line); border-radius:8px; padding:0 10px; color:var(--ink); font:inherit; font-weight:750; }
      .actions { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
      button { min-height:44px; border:0; border-radius:8px; color:white; background:var(--brand); font-weight:850; }
      button.secondary { background:#eef2ef; color:var(--ink); }
      .notes { padding:24px; }
      .progress { height:9px; border-radius:999px; background:#e9efec; overflow:hidden; }
      .bar { height:100%; width:22%; background:var(--brand); }
      ul { color:var(--muted); line-height:1.7; }
      @media (max-width:980px){ main{grid-template-columns:1fr;} .screen{min-height:620px;} }
    </style>
  </head>
  <body>
    <main>
      <nav class="nav">
        <div class="brand"><span class="mark">#</span><span>Hashdate Mobile</span></div>
        ${screens.map((screen) => `<a class="${screen.id === active.id ? 'active' : ''}" href="/${screen.id}">${screen.label}</a>`).join('')}
      </nav>
      <section class="phone" aria-label="Mobile preview">
        <div class="screen">
          <div class="status"><span>9:41</span><span># Hashdate</span><span>22%</span></div>
          <div class="hero">
            <p class="eyebrow">${active.label}</p>
            <h1>${active.title}</h1>
            <p>${active.body}</p>
          </div>
          <div class="content">
            ${renderRows(active.id)}
            ${renderActions(active.id)}
          </div>
        </div>
      </section>
      <aside class="notes">
        <p class="eyebrow">Preview scope</p>
        <h1>Clickable mobile flow</h1>
        <p>This browser preview mirrors the Flutter MVP information architecture until the Flutter toolchain is available.</p>
        <div class="progress"><div class="bar"></div></div>
        <ul>
          <li>Auth, profile, review, discovery, unlock, matches, chat, wallet, and safety surfaces are represented.</li>
          <li>Real Flutter widgets and device builds remain next.</li>
          <li>Mock state follows the 10-diamond unlock and no-double-charge policy.</li>
        </ul>
      </aside>
    </main>
    <script>
      const activeId = ${JSON.stringify(active.id)};
      const primary = document.querySelector('#primary-action');
      const secondary = document.querySelector('#secondary-action');
      const setText = (id, value) => {
        const node = document.querySelector(id);
        if (node) node.textContent = value;
      };

      primary?.addEventListener('click', () => {
        if (activeId === 'discover') {
          setText('#decision-state', 'Liked');
          setText('#candidate-lock', 'Match created');
        } else if (activeId === 'unlock') {
          const current = Number(document.querySelector('#diamond-balance')?.textContent || '120');
          if (document.querySelector('#unlock-state')?.textContent !== 'Unlocked') {
            setText('#diamond-balance', String(Math.max(0, current - 10)));
            setText('#unlock-state', 'Unlocked');
          } else {
            setText('#unlock-state', 'Already unlocked');
          }
        } else if (activeId === 'chat') {
          setText('#latest-message', 'Preview message sent.');
          setText('#send-state', 'Sent');
        } else if (activeId === 'wallet') {
          const current = Number(document.querySelector('#wallet-balance')?.textContent || '120');
          setText('#wallet-balance', String(current + 30));
          setText('#ledger-state', '+30 preview grant');
        } else if (activeId === 'safety') {
          setText('#safety-state', 'Report submitted');
        } else if (activeId === 'profile') {
          setText('#profile-state', 'Submitted');
        } else if (activeId === 'review') {
          setText('#review-state', 'Still pending');
        } else if (activeId === 'matches') {
          window.location.href = '/chat';
        } else {
          window.location.href = '/profile';
        }
      });

      secondary?.addEventListener('click', () => {
        if (activeId === 'discover') {
          setText('#decision-state', 'Passed');
          setText('#candidate-name', 'Ara');
        } else if (activeId === 'safety') {
          setText('#safety-state', 'Blocked only');
        } else if (activeId === 'chat') {
          window.location.href = '/safety';
        } else if (activeId === 'profile') {
          setText('#profile-state', 'Draft');
        } else {
          window.location.href = '/discover';
        }
      });
    </script>
  </body>
</html>`;
}

createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  const id = url.pathname === '/' ? 'discover' : url.pathname.replace('/', '');
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(page(id));
}).listen(port, '127.0.0.1', () => {
  console.log(`Hashdate mobile preview running at http://localhost:${port}/discover`);
});
