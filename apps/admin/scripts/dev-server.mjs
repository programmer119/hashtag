import { createServer } from 'node:http';

const port = Number(process.env.PORT || 4301);

const users = [
  { id: 'u_1001', name: 'Mina', status: 'pending', age: 31, city: 'Seoul', review: 'Ready', phone: '+82 10 **** 1201', email: 'mi***@example.com' },
  { id: 'u_1002', name: 'Joon', status: 'approved', age: 34, city: 'Bundang', review: 'Approved', phone: '+82 10 **** 8820', email: 'jo***@example.com' },
  { id: 'u_1003', name: 'Ara', status: 'reported', age: 29, city: 'Songpa', review: 'Needs safety review', phone: '+82 10 **** 7744', email: 'ar***@example.com' }
];

const safetyReports = [
  { id: 'r_9001', targetUserId: 'u_1003', targetName: 'Ara', reason: 'Inappropriate message', status: 'Open', evidence: 'Chat room room_m_3001', createdAt: '2026-05-17 11:42 KST' }
];

const suspensionHistory = [
  { id: 'sus_7001', userId: 'u_1003', state: 'Draft action', reason: 'Safety report review', operator: 'Mason', createdAt: '2026-05-17 12:10 KST' }
];

const walletAdjustments = [
  { id: 'adj_5001', userId: 'u_1001', userName: 'Mina', type: 'Welcome grant', amount: 120, reason: 'Preview seed balance', operator: 'System', createdAt: '2026-05-17 09:00 KST' },
  { id: 'adj_5002', userId: 'u_1002', userName: 'Joon', type: 'Refund', amount: 10, reason: 'Duplicate unlock prevention review', operator: 'Mason', createdAt: '2026-05-17 13:22 KST' }
];

function layout(title, body) {
  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title} - Hashdate Admin</title>
    <style>
      :root { --ink:#121b18; --muted:#66736f; --paper:#f7f8f6; --panel:#fff; --line:#dfe6e2; --brand:#0f7b68; --danger:#c94432; }
      * { box-sizing:border-box; }
      body { margin:0; background:var(--paper); color:var(--ink); font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .shell { min-height:100vh; display:grid; grid-template-columns:260px 1fr; }
      aside { padding:24px; border-right:1px solid var(--line); background:var(--panel); }
      main { padding:34px; }
      .brand { display:flex; gap:10px; align-items:center; font-weight:850; margin-bottom:34px; }
      .mark { width:34px; height:34px; border-radius:8px; display:grid; place-items:center; color:#fff; background:var(--brand); }
      nav { display:grid; gap:8px; }
      nav a { padding:10px 12px; color:var(--muted); text-decoration:none; border-radius:8px; }
      nav a.active, nav a:hover { background:#e4f4ee; color:var(--brand); }
      h1 { margin:0 0 10px; font-size:2.4rem; }
      p { color:var(--muted); line-height:1.6; }
      .grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; margin:28px 0; }
      .card, table, .panel { background:var(--panel); border:1px solid var(--line); border-radius:8px; }
      .card { padding:18px; }
      .card strong { display:block; margin-top:8px; font-size:1.8rem; }
      table { width:100%; border-collapse:collapse; overflow:hidden; }
      th, td { padding:14px 16px; border-bottom:1px solid var(--line); text-align:left; }
      th { color:var(--muted); font-size:.86rem; }
      tr:last-child td { border-bottom:0; }
      .badge { display:inline-flex; padding:5px 9px; border-radius:999px; background:#e4f4ee; color:var(--brand); font-weight:750; font-size:.82rem; }
      .badge.reported { background:#fff0ed; color:var(--danger); }
      .actions { display:flex; gap:8px; }
      button, .button { border:0; border-radius:8px; padding:9px 12px; background:var(--brand); color:#fff; font-weight:750; text-decoration:none; }
      button.secondary { background:#edf1ef; color:var(--ink); }
      .login { min-height:100vh; display:grid; place-items:center; padding:24px; }
      .login .panel { width:min(420px,100%); padding:26px; }
      input { width:100%; min-height:44px; margin:8px 0 14px; padding:0 12px; border:1px solid var(--line); border-radius:8px; }
      @media (max-width:860px){ .shell{grid-template-columns:1fr;} aside{border-right:0;border-bottom:1px solid var(--line);} .grid{grid-template-columns:1fr 1fr;} }
      @media (max-width:560px){ .grid{grid-template-columns:1fr;} main{padding:22px;} }
    </style>
  </head>
  <body>${body}</body>
</html>`;
}

function chrome(active, content) {
  return `<div class="shell">
    <aside>
      <div class="brand"><span class="mark">#</span><span>Hashdate Admin</span></div>
      <nav>
        <a class="${active === 'dashboard' ? 'active' : ''}" href="/dashboard">Dashboard</a>
        <a class="${active === 'review' ? 'active' : ''}" href="/users/review">Review Queue</a>
        <a class="${active === 'users' ? 'active' : ''}" href="/users">Users</a>
        <a class="${active === 'reports' ? 'active' : ''}" href="/reports">Reports</a>
        <a class="${active === 'wallets' ? 'active' : ''}" href="/wallets">Wallets</a>
      </nav>
    </aside>
    <main>${content}</main>
  </div>`;
}

function dashboard() {
  return chrome('dashboard', `<h1>Operations dashboard</h1>
    <p>Preview console for review pressure, safety work, wallet oversight, and launch readiness.</p>
    <div class="grid">
      <div class="card">Pending reviews<strong>1</strong></div>
      <div class="card">Open reports<strong>1</strong></div>
      <div class="card">Approved users<strong>1</strong></div>
      <div class="card">Diamond spend<strong>120</strong></div>
    </div>
    <div class="panel"><table>
      <thead><tr><th>Queue</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>
        <tr><td>Profile review</td><td><span class="badge">Healthy</span></td><td><a class="button" href="/users/review">Open</a></td></tr>
        <tr><td>Safety reports</td><td><span class="badge reported">Needs review</span></td><td><a class="button" href="/reports">Open</a></td></tr>
      </tbody>
    </table></div>`);
}

function userTable(mode = 'users') {
  const visible = mode === 'review' ? users.filter((user) => user.status === 'pending') : users;
  return chrome(mode === 'review' ? 'review' : 'users', `<h1>${mode === 'review' ? 'Review queue' : 'Users'}</h1>
    <p>${mode === 'review' ? 'Approve or reject submitted profiles before discovery exposure.' : 'Search and inspect user state across profile, safety, and wallet operations.'}</p>
    <table>
      <thead><tr><th>User</th><th>Masked contact</th><th>Age</th><th>City</th><th>Status</th><th>Review</th><th>Actions</th></tr></thead>
      <tbody>${visible.map((user) => `<tr>
        <td>${user.name}<br/><small>${user.id}</small></td>
        <td>${user.phone}<br/><small>${user.email}</small></td>
        <td>${user.age}</td>
        <td>${user.city}</td>
        <td><span class="badge ${user.status === 'reported' ? 'reported' : ''}">${user.status}</span></td>
        <td>${user.review}</td>
        <td><div class="actions"><a class="button" href="/users/${user.id}">Detail</a><button class="secondary">Reject</button></div></td>
      </tr>`).join('')}</tbody>
    </table>`);
}

function userDetail(userId) {
  const user = users.find((item) => item.id === userId);
  if (!user) return chrome('users', `<h1>User not found</h1><p>No user preview record for ${userId}</p>`);
  const history = suspensionHistory.filter((item) => item.userId === user.id);
  return chrome('users', `<h1>${user.name}</h1>
    <p>Operator detail preview with masked PII, review state, safety context, suspension history, and wallet action guardrails.</p>
    <div class="grid">
      <div class="card">Status<strong>${user.status}</strong></div>
      <div class="card">Review<strong>${user.review}</strong></div>
      <div class="card">City<strong>${user.city}</strong></div>
      <div class="card">Age<strong>${user.age}</strong></div>
    </div>
    <div class="panel" style="padding:18px;margin-bottom:16px;">
      <strong>Masked contact</strong>
      <p>${user.phone}<br/>${user.email}</p>
      <p>Sensitive reveal requires elevated authorization and audit logging in the production admin flow.</p>
    </div>
    <table>
      <thead><tr><th>Suspension</th><th>Reason</th><th>Operator</th><th>Created</th><th>Action</th></tr></thead>
      <tbody>${history.length ? history.map((item) => `<tr>
        <td>${item.id}<br/><span class="badge reported">${item.state}</span></td>
        <td>${item.reason}</td>
        <td>${item.operator}</td>
        <td>${item.createdAt}</td>
        <td><div class="actions"><button>Suspend</button><button class="secondary">Restore</button></div></td>
      </tr>`).join('') : '<tr><td colspan="5">No suspension history.</td></tr>'}</tbody>
    </table>`);
}

function reports() {
  return chrome('reports', `<h1>Reports</h1>
    <p>Safety reports require context review, internal notes, and clear operator action.</p>
    <table>
      <thead><tr><th>Report</th><th>Evidence</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>${safetyReports.map((report) => `<tr>
        <td>${report.id} against ${report.targetName}<br/><small>${report.targetUserId} · ${report.createdAt}</small></td>
        <td>${report.evidence}</td>
        <td>${report.reason}</td>
        <td><span class="badge reported">${report.status}</span></td>
        <td><div class="actions"><button>Suspend user</button><button class="secondary">Dismiss</button></div></td>
      </tr>`).join('')}</tbody>
    </table>
    <div class="panel" style="margin-top:16px;padding:18px;">
      <strong>Suspension action preview</strong>
      <p>Submitting a suspension calls <code>POST /v1/admin/users/:userId/suspensions</code>, closes open reports for that user, and blocks discovery/chat access in the real app flow.</p>
    </div>`);
}

function wallets() {
  return chrome('wallets', `<h1>Wallets</h1>
    <p>Wallet lookup and adjustment preview. Every grant, refund, or deduction requires a reason and immutable ledger entry.</p>
    <div class="panel" style="padding:18px;margin-bottom:16px;">
      <strong>Adjustment guardrails</strong>
      <p>Operators must select adjustment type, amount, target user, and reason before submitting. Production actions map to <code>POST /v1/admin/wallet-adjustments</code>.</p>
      <div class="actions"><button>Grant diamonds</button><button class="secondary">Refund unlock</button><button class="secondary">Deduct abuse credit</button></div>
    </div>
    <table>
      <thead><tr><th>Entry</th><th>User</th><th>Type</th><th>Amount</th><th>Reason</th><th>Operator</th></tr></thead>
      <tbody>${walletAdjustments.map((item) => `<tr>
        <td>${item.id}<br/><small>${item.createdAt}</small></td>
        <td>${item.userName}<br/><small>${item.userId}</small></td>
        <td>${item.type}</td>
        <td>${item.amount}</td>
        <td>${item.reason}</td>
        <td>${item.operator}</td>
      </tr>`).join('')}</tbody>
    </table>`);
}

function login() {
  return `<div class="login"><div class="panel">
    <div class="brand"><span class="mark">#</span><span>Hashdate Admin</span></div>
    <h1>Admin login</h1>
    <p>Preview login shell. Real authentication will use the admin API.</p>
    <label>Email<input value="ops@hashdate.local" aria-label="Email" /></label>
    <label>Password<input value="preview-password" type="password" aria-label="Password" /></label>
    <a class="button" href="/dashboard">Sign in</a>
  </div></div>`;
}

createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  let html;

  if (url.pathname === '/' || url.pathname === '/login') html = layout('Login', login());
  else if (url.pathname === '/dashboard') html = layout('Dashboard', dashboard());
  else if (url.pathname === '/users/review') html = layout('Review Queue', userTable('review'));
  else if (url.pathname === '/users') html = layout('Users', userTable('users'));
  else if (url.pathname.startsWith('/users/')) html = layout('User Detail', userDetail(url.pathname.split('/').at(-1)));
  else if (url.pathname === '/reports') html = layout('Reports', reports());
  else if (url.pathname === '/wallets') html = layout('Wallets', wallets());
  else html = layout('Not found', chrome('', `<h1>Not found</h1><p>No admin preview route for ${url.pathname}</p>`));

  res.writeHead(url.pathname === '/missing' ? 404 : 200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(html);
}).listen(port, '127.0.0.1', () => {
  console.log(`Hashdate admin preview running at http://localhost:${port}/login`);
});
