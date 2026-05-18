import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const port = Number(process.env.PORT || 3000);

const servicePage = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hashdate</title>
    <style>
      :root { --ink:#14201d; --muted:#5f6f6a; --paper:#fbfaf7; --panel:#fff; --line:#dce5df; --brand:#0f7b68; --brand-dark:#0a574a; --mint:#dff4ec; --gold:#f2c768; --shadow:0 22px 70px rgba(20,32,29,.12); }
      *{box-sizing:border-box} body{margin:0;background:var(--paper);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif} a{color:inherit;text-decoration:none}
      header{position:sticky;top:0;z-index:10;border-bottom:1px solid rgba(220,229,223,.84);background:rgba(251,250,247,.92);backdrop-filter:blur(18px)}
      .bar,.hero-inner,.section,.footer-inner{width:min(1120px,calc(100% - 40px));margin:0 auto}.bar{min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand{display:inline-flex;align-items:center;gap:10px;font-weight:850}.mark{width:34px;height:34px;display:grid;place-items:center;border-radius:8px;background:var(--brand);color:#fff;font-weight:900}nav{display:flex;align-items:center;gap:18px;color:var(--muted);font-size:.95rem}
      nav button{border:0;padding:0;background:transparent;color:inherit;font:inherit;cursor:pointer}.button{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 18px;border:1px solid transparent;border-radius:8px;background:var(--brand);color:#fff;font-weight:750}.button.secondary{border-color:var(--line);background:var(--panel);color:var(--ink)}
      .hero{overflow:hidden;background:linear-gradient(125deg,rgba(223,244,236,.95),rgba(251,250,247,.8)),radial-gradient(circle at 78% 32%,rgba(242,199,104,.42),transparent 28%)}.hero-inner{min-height:calc(100vh - 72px);padding:72px 0 56px;display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,440px);gap:56px;align-items:center}
      .eyebrow{margin:0 0 14px;color:var(--brand-dark);font-weight:800;text-transform:uppercase;font-size:.78rem;letter-spacing:.08em}h1,h2,h3,p{margin-top:0}h1{margin-bottom:20px;font-size:clamp(3rem,7vw,5.9rem);line-height:.94}h2{margin-bottom:16px;font-size:clamp(2rem,4vw,3.4rem);line-height:1.02}h3{margin-bottom:10px;font-size:1.15rem}.lead{max-width:660px;color:var(--muted);font-size:clamp(1.08rem,2vw,1.32rem);line-height:1.6}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.hero-tools{display:inline-flex;gap:6px;padding:4px;margin-bottom:24px;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.72)}.lang-button{min-width:42px;min-height:34px;border:0;border-radius:6px;background:transparent;color:var(--muted);font-weight:800;cursor:pointer}.lang-button.active{background:var(--brand);color:#fff}
      .trust-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:42px}.trust-item,.card,.phone-preview{border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.84)}.trust-item{padding:16px;font-weight:750}.trust-item span{display:block;margin-top:6px;color:var(--muted);font-size:.9rem;font-weight:500}
      .phone-preview{padding:18px;box-shadow:var(--shadow)}.phone-screen{overflow:hidden;min-height:620px;border-radius:8px;background:var(--ink);color:#fff}.match-card{min-height:420px;padding:24px;display:flex;flex-direction:column;justify-content:flex-end;background:linear-gradient(180deg,transparent 10%,rgba(20,32,29,.86) 78%),linear-gradient(135deg,#91d2c2,#f5b7a8)}.match-card strong{font-size:2rem}.mini-stack{padding:16px;display:grid;gap:10px}.mini-row{display:flex;justify-content:space-between;gap:12px;padding:14px;border-radius:8px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.82)}
      .section{padding:82px 0}.section-heading{max-width:780px}.grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:28px}.card{padding:24px}.card p{color:var(--muted);line-height:1.65}.band{background:var(--ink);color:#fff}.band .lead,.band .card p{color:rgba(255,255,255,.72)}.band .card{border-color:rgba(255,255,255,.14);background:rgba(255,255,255,.06)}footer{border-top:1px solid var(--line);background:var(--panel)}.footer-inner{padding:32px 0;display:flex;justify-content:space-between;gap:24px;color:var(--muted);font-size:.95rem}
      @media(max-width:860px){.bar{align-items:flex-start;padding:16px 0;flex-direction:column}nav{width:100%;overflow-x:auto;padding-bottom:4px}.hero-inner,.grid-3,.trust-list{grid-template-columns:1fr}.hero-inner{min-height:auto;padding-top:56px}.phone-screen{min-height:520px}.footer-inner{flex-direction:column}}@media(max-width:560px){.bar,.hero-inner,.section,.footer-inner{width:min(100% - 28px,1120px)}.button,.actions{width:100%}}
    </style>
  </head>
  <body>
    <header><div class="bar"><a class="brand" href="/"><span class="mark">#</span><span>Hashdate</span></a><nav><button type="button" onclick="preparing()">서비스 소개</button><button type="button" onclick="preparing()">안전 정책</button><button type="button" onclick="preparing()">고객센터</button><a class="button" href="https://cruise.suaveforge.com/app-debug.apk">앱 다운로드</a></nav></div></header>
    <main>
      <section class="hero"><div class="hero-inner"><div><div class="hero-tools"><button id="koButton" class="lang-button active" type="button" onclick="setLanguage('ko')">한</button><button id="enButton" class="lang-button" type="button" onclick="setLanguage('en')">EN</button></div><p class="eyebrow" data-ko="검증 기반 프리미엄 데이팅" data-en="Premium dating, verified by design">검증 기반 프리미엄 데이팅</p><h1>Hashdate</h1><p class="lead" data-ko="해시데이트는 신뢰할 수 있는 회원 검증, 선명한 매칭 방식, 안전한 대화를 하나로 묶은 프리미엄 데이팅 서비스입니다." data-en="Hashdate brings verified profiles, intentional discovery, and safer conversations into one premium dating experience.">해시데이트는 신뢰할 수 있는 회원 검증, 선명한 매칭 방식, 안전한 대화를 하나로 묶은 프리미엄 데이팅 서비스입니다.</p><div class="actions"><a class="button" href="https://cruise.suaveforge.com/app-debug.apk" data-ko="앱 다운로드" data-en="Download app">앱 다운로드</a><button class="button secondary" type="button" onclick="preparing()" data-ko="안전 기준 보기" data-en="View safety standards">안전 기준 보기</button></div><div class="trust-list"><div class="trust-item" data-ko="검증" data-en="Verified">검증<span data-ko="가입 조건과 프로필 심사" data-en="Eligibility and profile review">가입 조건과 프로필 심사</span></div><div class="trust-item" data-ko="추천" data-en="Curated">추천<span data-ko="목적이 분명한 매칭 경험" data-en="Focused member discovery">목적이 분명한 매칭 경험</span></div><div class="trust-item" data-ko="보호" data-en="Protected">보호<span data-ko="신고와 운영 검토 체계" data-en="Reporting and moderation">신고와 운영 검토 체계</span></div></div></div><div class="phone-preview"><div class="phone-screen"><div class="match-card"><p class="eyebrow" data-ko="오늘의 추천" data-en="Today's introduction">오늘의 추천</p><strong data-ko="민아, 31" data-en="Mina, 31">민아, 31</strong><p data-ko="브랜드 디자이너, 주말 하이커, 진정성 있는 만남을 찾고 있습니다." data-en="Brand designer, weekend hiker, looking for something real.">브랜드 디자이너, 주말 하이커, 진정성 있는 만남을 찾고 있습니다.</p></div><div class="mini-stack"><div class="mini-row"><span data-ko="검증 상태" data-en="Verification">검증 상태</span><strong data-ko="완료" data-en="Complete">완료</strong></div><div class="mini-row"><span data-ko="만남 의향" data-en="Match intent">만남 의향</span><strong data-ko="진지한 관계" data-en="Long-term">진지한 관계</strong></div><div class="mini-row"><span data-ko="대화 상태" data-en="Conversation">대화 상태</span><strong data-ko="열림" data-en="Unlocked">열림</strong></div></div></div></div></div></section>
      <section class="section"><div class="section-heading"><p class="eyebrow">Why Hashdate</p><h2>A public surface for a trust-heavy dating product.</h2><p class="lead">The homepage introduces the visible surfaces members expect from a premium dating service while keeping the brand original, direct, and easy to expand.</p></div><div class="grid-3"><article class="card"><h3>Verified first</h3><p>Profile review, identity signals, and moderation workflows are treated as part of the product experience from day one.</p></article><article class="card"><h3>Intentional discovery</h3><p>Members see focused introductions, meaningful profile prompts, and clear next steps instead of noisy endless browsing.</p></article><article class="card"><h3>Respectful monetization</h3><p>Premium unlocks and Diamond wallet moments are explained plainly so members know what they are choosing.</p></article></div></section>
      <section class="band"><div class="section"><div class="section-heading"><p class="eyebrow">Member lifecycle</p><h2>From signup review to safer conversations.</h2><p class="lead">Hashdate is structured around verified onboarding, profile discovery, mutual matches, wallet controls, reporting, support, and account management.</p></div><div class="grid-3"><article class="card"><h3>가입 및 심사</h3><p>회원 조건 확인, 프로필 작성, 인증 서류 제출, 승인 대기 흐름.</p></article><article class="card"><h3>매칭과 채팅</h3><p>추천 프로필, 관심 표시, 상호 매칭, 1:1 대화로 이어지는 흐름.</p></article><article class="card"><h3>결제와 안전</h3><p>다이아 지갑, 유료 열람, 신고, 차단, 고객센터 운영 흐름.</p></article></div></div></section>
    </main>
    <footer><div class="footer-inner"><span>Hashdate</span><span>Privacy · Terms · Support · Account deletion</span></div></footer>
    <script>
      function preparing() { alert('개발중입니다.'); }
      function setLanguage(language) {
        document.querySelectorAll('[data-ko][data-en]').forEach(function (node) {
          node.childNodes.forEach(function (child) {
            if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
              child.textContent = node.dataset[language];
            }
          });
          if (node.childNodes.length === 1) {
            node.textContent = node.dataset[language];
          }
        });
        document.getElementById('koButton').classList.toggle('active', language === 'ko');
        document.getElementById('enButton').classList.toggle('active', language === 'en');
      }
    </script>
  </body>
</html>`;

const page = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hashdate Work Status</title>
    <style>
      :root {
        --ink: #14201d;
        --muted: #5f6f6a;
        --paper: #fbfaf7;
        --panel: #ffffff;
        --line: #dce5df;
        --brand: #0f7b68;
        --mint: #dff4ec;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: var(--paper);
        color: var(--ink);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      header {
        border-bottom: 1px solid var(--line);
        background: rgba(251, 250, 247, 0.94);
      }
      .bar, main {
        width: min(1120px, calc(100% - 40px));
        margin: 0 auto;
      }
      .bar {
        min-height: 72px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
      }
      .brand {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-weight: 850;
      }
      .mark {
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        border-radius: 8px;
        background: var(--brand);
        color: white;
      }
      nav {
        display: flex;
        gap: 16px;
        color: var(--muted);
      }
      main {
        padding: 70px 0 90px;
      }
      .eyebrow {
        margin: 0 0 12px;
        color: var(--brand);
        font-weight: 800;
        text-transform: uppercase;
        font-size: 0.78rem;
        letter-spacing: 0.08em;
      }
      h1 {
        margin: 0 0 18px;
        font-size: clamp(2.6rem, 7vw, 5rem);
        line-height: 0.96;
      }
      h2 {
        margin-top: 54px;
        font-size: clamp(1.8rem, 4vw, 2.7rem);
      }
      p {
        color: var(--muted);
        line-height: 1.65;
      }
      .lead {
        max-width: 760px;
        font-size: 1.2rem;
      }
      .table {
        display: grid;
        gap: 8px;
      }
      .row {
        display: grid;
        grid-template-columns: 0.9fr 1.2fr 0.7fr 1.7fr;
        gap: 14px;
        align-items: center;
        padding: 14px 16px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--panel);
        color: var(--muted);
      }
      .row strong, .row span:first-child { color: var(--ink); }
      .head {
        background: var(--mint);
        color: var(--ink);
        font-weight: 800;
      }
      .compact .row {
        grid-template-columns: 1fr 0.5fr 2fr;
      }
      .devinfo .row {
        grid-template-columns: 0.9fr 1.1fr 1.8fr;
      }
      ul {
        display: grid;
        gap: 10px;
        color: var(--muted);
        line-height: 1.65;
      }
      @media (max-width: 780px) {
        .bar { align-items: flex-start; flex-direction: column; padding: 16px 0; }
        .row, .compact .row, .devinfo .row { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <header>
      <div class="bar">
        <div class="brand"><span class="mark">#</span><span>Hashdate</span></div>
        <nav><span>Download</span><span>Safety</span><strong>Work status</strong><span>Support</span></nav>
      </div>
    </header>
    <main>
      <p class="eyebrow">Project operations</p>
      <h1>Work status</h1>
      <p class="lead">Artifact-backed progress for the Hashdate build. Percentages move only when files, specs, runnable code, builds, tests, or reviewed outputs actually change.</p>

      <h2>Development info</h2>
      <div class="table devinfo">
        <div class="row head"><span>Item</span><span>Current value</span><span>Notes</span></div>
        <div class="row"><span>Mobile stack</span><strong>Flutter 3.41.9 / Dart 3.11.5</strong><span>Flutter is the app framework; Dart is the language.</span></div>
        <div class="row"><span>Mobile UI entry</span><strong>apps/mobile/lib/app/hashdate_mock_app.dart</strong><span>Edit Flutter widgets here for the current mock UI, auth gate, tabs, and benchmark screen catalog.</span></div>
        <div class="row"><span>Mobile app entry</span><strong>apps/mobile/lib/main.dart</strong><span>Flutter starts here, then loads HashdateAppRoot and runtime repository mode.</span></div>
        <div class="row"><span>Mobile state/features</span><strong>apps/mobile/lib/features/*/controllers</strong><span>Session, discovery, profile, chat, wallet, and safety UI actions are separated into feature controllers.</span></div>
        <div class="row"><span>Mobile runtime packages</span><strong>flutter SDK only</strong><span>No third-party runtime Flutter packages are currently used; the app uses Flutter Material widgets.</span></div>
        <div class="row"><span>Mobile dev packages</span><strong>flutter_test, flutter_lints</strong><span>Used for widget/API/repository tests and lint rules.</span></div>
        <div class="row"><span>Likely mobile libraries</span><strong>go_router, flutter_riverpod, dio</strong><span>High-probability additions for navigation/deep links, state management, and production API calls.</span></div>
        <div class="row"><span>Model/codegen candidates</span><strong>freezed, json_serializable</strong><span>Likely additions for immutable models, typed API payloads, and safer JSON mapping.</span></div>
        <div class="row"><span>Media/UI candidates</span><strong>cached_network_image, flutter_svg, image_picker</strong><span>Likely additions for profile image caching, SVG assets, profile photos, and verification document uploads.</span></div>
        <div class="row"><span>Payment candidate</span><strong>in_app_purchase</strong><span>Likely Apple App Store and Google Play billing integration for diamonds/hearts.</span></div>
        <div class="row"><span>Push/error candidates</span><strong>firebase_messaging, sentry_flutter</strong><span>Likely additions for push notifications and production crash/error monitoring.</span></div>
        <div class="row"><span>Animation candidates</span><strong>lottie, rive</strong><span>Optional additions for onboarding, empty states, premium effects, and polished micro-interactions.</span></div>
        <div class="row"><span>Chart/form candidates</span><strong>fl_chart, flutter_form_builder</strong><span>Optional additions for admin-style charts in shared Flutter surfaces and complex signup/verification forms.</span></div>
        <div class="row"><span>Homepage stack</span><strong>Next.js 15 / React 19 / TypeScript 5</strong><span>Declared for the future real Next.js app-router build.</span></div>
        <div class="row"><span>Homepage preview server</span><strong>apps/homepage/scripts/dev-server.mjs</strong><span>This dependency-free server powers the current localhost work-status preview.</span></div>
        <div class="row"><span>Homepage packages</span><strong>next, react, react-dom</strong><span>External runtime libraries declared for the homepage package.</span></div>
        <div class="row"><span>Frontend scope</span><strong>Flutter mobile + Next.js web</strong><span>Flutter owns iOS/Android app UI; Next.js owns homepage and future admin web UI.</span></div>
        <div class="row"><span>Backend scope</span><strong>Node.js API preview now; NestJS-style API planned</strong><span>Current preview APIs are dependency-free Node scripts. Production backend should own auth, verification, matching, chat, wallet, payments, reports, admin, and audit logic.</span></div>
        <div class="row"><span>Database scope</span><strong>PostgreSQL planned</strong><span>Production DB should store users, profiles, verification status, matching state, wallet ledger, reports, admin audit logs, and structured behavior logs.</span></div>
        <div class="row"><span>Cache/queue scope</span><strong>Redis planned</strong><span>Use for sessions, rate limits, short-lived OTP state, queues, locks, and async worker coordination.</span></div>
        <div class="row"><span>Object storage scope</span><strong>AWS S3 + KMS planned</strong><span>Verification document images should be encrypted, reviewed through controlled admin access, then destroyed by retention policy.</span></div>
        <div class="row"><span>Payment scope</span><strong>Apple/Google in-app purchase planned</strong><span>Digital diamonds/hearts should use App Store and Google Play billing, with backend receipt validation and ledger recording.</span></div>
        <div class="row"><span>Android min SDK</span><strong>API 24</strong><span>Android 7.0 Nougat and newer can install the current debug APK.</span></div>
        <div class="row"><span>Android target / compile SDK</span><strong>API 36 / API 36</strong><span>Current Flutter Gradle defaults are used for target and compile SDK.</span></div>
        <div class="row"><span>Java / Gradle</span><strong>Java 17 / Gradle 8.14</strong><span>Used by the Android build path.</span></div>
        <div class="row"><span>Android application ID</span><strong>com.example.hashdate_mobile</strong><span>Temporary debug value; must become a production package name before store release.</span></div>
        <div class="row"><span>Android APK</span><strong>build/app/outputs/flutter-apk/app-debug.apk</strong><span>Debug APK exists and is rebuilt from Flutter CLI.</span></div>
        <div class="row"><span>iOS IPA</span><strong>build/ios/ipa/*.ipa</strong><span>Mac/Xcode signing path is prepared; Windows cannot produce an installable IPA.</span></div>
        <div class="row"><span>Client company</span><strong>Not disclosed</strong><span>The brief names no company; current owner is tracked as project owner/client.</span></div>
      </div>

      <h2>Recent updates</h2>
      <ul>
        <li>No-question autonomous execution mode is active.</li>
        <li>Hashdate is the working product name.</li>
        <li>Homepage public routes include the work status page.</li>
        <li>Mobile mock placeholders exist for core app flows.</li>
        <li>QA tracks external owner blockers separately from implementation work.</li>
      </ul>
    </main>
  </body>
</html>`;

createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(readFileSync(new URL('../static/index.html', import.meta.url), 'utf8'));
    return;
  }

  if (req.url === '/work-status') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(page);
    return;
  }

  res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
  res.end('Not found');
}).listen(port, '0.0.0.0', () => {
  console.log(`Hashdate homepage preview running at http://localhost:${port}/work-status`);
});
