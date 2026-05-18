const teamRows = [
  ["Codex", "Lead Architect", "22%", "Architecture, integration, progress tracking"],
  ["James", "Product / Policy / Copy", "32%", "Benchmark audit, policy, copy"],
  ["Poincare", "Mobile App", "22%", "Flutter-ready app screens and mock flow"],
  ["Dalton", "Backend/API", "18%", "Mobile, admin, and homepage API planning"],
  ["Mason", "Admin Frontend", "12%", "Admin web ownership and route standards"],
  ["Lena", "Homepage Frontend", "32%", "Public website pages and Next.js skeleton"],
  ["Carver", "QA / Release", "24%", "QA matrix, release readiness, blockers"],
];

const areaRows = [
  ["Overall", "18%", "Artifact-backed project readiness"],
  ["Project setup", "50%", "Monorepo docs, principles, roles, and naming initialized"],
  ["Product planning", "32%", "MVP scope, policies, and benchmark audit drafted"],
  ["Mobile app", "22%", "Mock screen skeleton and route map created"],
  ["Backend API", "18%", "API planning and support/content modules drafted"],
  ["Admin web", "12%", "Admin ownership and worklist documented"],
  ["Homepage web", "32%", "Pages, shell, package/config, sitemap, and robots created"],
  ["QA and release", "24%", "Verification rules, smoke checklist, and blocker register added"],
];

const recentChanges = [
  "No-question autonomous execution mode is active.",
  "Hashdate is the working product name.",
  "Homepage public routes now include landing, download, safety, support, privacy, terms, account deletion, and work status.",
  "Mobile mock placeholders exist for auth, onboarding, discovery, profile unlock, matches, chat, wallet, settings, and safety.",
  "QA now tracks external owner blockers separately from implementation work.",
];

const developmentInfoRows = [
  ["Mobile stack", "Flutter 3.41.9 / Dart 3.11.5", "Flutter is the app framework; Dart is the language."],
  ["Mobile UI entry", "apps/mobile/lib/app/hashdate_mock_app.dart", "Edit Flutter widgets here for the current mock UI, auth gate, tabs, and benchmark screen catalog."],
  ["Mobile app entry", "apps/mobile/lib/main.dart", "Flutter starts here, then loads HashdateAppRoot and runtime repository mode."],
  ["Mobile state/features", "apps/mobile/lib/features/*/controllers", "Session, discovery, profile, chat, wallet, and safety UI actions are separated into feature controllers."],
  ["Mobile runtime packages", "flutter SDK only", "No third-party runtime Flutter packages are currently used; the app uses Flutter Material widgets."],
  ["Mobile dev packages", "flutter_test, flutter_lints", "Used for widget/API/repository tests and lint rules."],
  ["Likely mobile libraries", "go_router, flutter_riverpod, dio", "High-probability additions for navigation/deep links, state management, and production API calls."],
  ["Model/codegen candidates", "freezed, json_serializable", "Likely additions for immutable models, typed API payloads, and safer JSON mapping."],
  ["Media/UI candidates", "cached_network_image, flutter_svg, image_picker", "Likely additions for profile image caching, SVG assets, profile photos, and verification document uploads."],
  ["Payment candidate", "in_app_purchase", "Likely Apple App Store and Google Play billing integration for diamonds/hearts."],
  ["Push/error candidates", "firebase_messaging, sentry_flutter", "Likely additions for push notifications and production crash/error monitoring."],
  ["Animation candidates", "lottie, rive", "Optional additions for onboarding, empty states, premium effects, and polished micro-interactions."],
  ["Chart/form candidates", "fl_chart, flutter_form_builder", "Optional additions for admin-style charts in shared Flutter surfaces and complex signup/verification forms."],
  ["Homepage stack", "Next.js 15 / React 19 / TypeScript 5", "Declared for the future real Next.js app-router build."],
  ["Homepage preview server", "apps/homepage/scripts/dev-server.mjs", "This dependency-free server powers the current localhost work-status preview."],
  ["Homepage packages", "next, react, react-dom", "External runtime libraries declared for the homepage package."],
  ["Frontend scope", "Flutter mobile + Next.js web", "Flutter owns iOS/Android app UI; Next.js owns homepage and future admin web UI."],
  ["Backend scope", "Node.js API preview now; NestJS-style API planned", "Current preview APIs are dependency-free Node scripts. Production backend should own auth, verification, matching, chat, wallet, payments, reports, admin, and audit logic."],
  ["Database scope", "PostgreSQL planned", "Production DB should store users, profiles, verification status, matching state, wallet ledger, reports, admin audit logs, and structured behavior logs."],
  ["Cache/queue scope", "Redis planned", "Use for sessions, rate limits, short-lived OTP state, queues, locks, and async worker coordination."],
  ["Object storage scope", "AWS S3 + KMS planned", "Verification document images should be encrypted, reviewed through controlled admin access, then destroyed by retention policy."],
  ["Payment scope", "Apple/Google in-app purchase planned", "Digital diamonds/hearts should use App Store and Google Play billing, with backend receipt validation and ledger recording."],
  ["Android min SDK", "API 24", "Android 7.0 Nougat and newer can install the current debug APK."],
  ["Android target / compile SDK", "API 36 / API 36", "Current Flutter Gradle defaults are used for target and compile SDK."],
  ["Java / Gradle", "Java 17 / Gradle 8.14", "Used by the Android build path."],
  ["Android application ID", "com.example.hashdate_mobile", "Temporary debug value; must become a production package name before store release."],
  ["Android APK", "build/app/outputs/flutter-apk/app-debug.apk", "Debug APK exists and is rebuilt from Flutter CLI."],
  ["iOS IPA", "build/ios/ipa/*.ipa", "Mac/Xcode signing path is prepared; Windows cannot produce an installable IPA."],
  ["Client company", "Not disclosed", "The brief names no company; current owner is tracked as project owner/client."],
];

export default function WorkStatusPage() {
  return (
    <section className="legal-page">
      <header>
        <p className="eyebrow">Project operations</p>
        <h1>Work status</h1>
        <p className="lead">
          Artifact-backed progress for the Hashdate build. Percentages move only
          when files, specs, runnable code, builds, tests, or reviewed outputs
          actually change.
        </p>
      </header>

      <section>
        <h2>Team progress</h2>
        <div className="status-table" role="table" aria-label="Team progress">
          <div className="status-row status-head" role="row">
            <span>Name</span>
            <span>Role</span>
            <span>Progress</span>
            <span>Current ownership</span>
          </div>
          {teamRows.map(([name, role, progress, ownership]) => (
            <div className="status-row" role="row" key={name}>
              <span>{name}</span>
              <span>{role}</span>
              <strong>{progress}</strong>
              <span>{ownership}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Area progress</h2>
        <div className="status-table compact" role="table" aria-label="Area progress">
          <div className="status-row status-head" role="row">
            <span>Area</span>
            <span>Progress</span>
            <span>Status</span>
          </div>
          {areaRows.map(([area, progress, status]) => (
            <div className="status-row" role="row" key={area}>
              <span>{area}</span>
              <strong>{progress}</strong>
              <span>{status}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Recent updates</h2>
        <ul className="check-list">
          {recentChanges.map((change) => (
            <li key={change}>{change}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Development info</h2>
        <div className="status-table" role="table" aria-label="Development info">
          <div className="status-row status-head" role="row">
            <span>Item</span>
            <span>Current value</span>
            <span>Notes</span>
          </div>
          {developmentInfoRows.map(([item, value, notes]) => (
            <div className="status-row" role="row" key={item}>
              <span>{item}</span>
              <strong>{value}</strong>
              <span>{notes}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>External owner blockers</h2>
        <p>
          Apple Developer, Google Play Console, payment, SMS/identity,
          production cloud credentials, and final legal identity publication are
          tracked as external owner blockers. All other work continues without
          routine approval prompts.
        </p>
      </section>
    </section>
  );
}
