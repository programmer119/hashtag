export default function SafetyPage() {
  return (
    <article className="legal-page">
      <header>
        <p className="eyebrow">Safety</p>
        <h1>Safer dating starts before the first message.</h1>
        <p className="lead">
          Hashdate&apos;s public safety page sets expectations for verification,
          moderation, reporting, and respectful member behavior.
        </p>
      </header>

      <div className="grid-2">
        <section className="policy-card">
          <h2>Verification and review</h2>
          <p>
            Profiles can be reviewed before full visibility. Suspicious
            identity signals, duplicate accounts, and policy violations should
            enter moderation workflows.
          </p>
        </section>
        <section className="policy-card">
          <h2>Member reporting</h2>
          <p>
            Members should be able to report profiles, messages, impersonation,
            harassment, scams, and unsafe offline behavior from relevant app
            screens.
          </p>
        </section>
        <section className="policy-card">
          <h2>Conversation boundaries</h2>
          <p>
            Hashdate does not tolerate threats, sexual pressure, hate, repeated
            unwanted contact, payment coercion, or attempts to move members into
            unsafe channels.
          </p>
        </section>
        <section className="policy-card">
          <h2>Dating guidance</h2>
          <p>
            Meet in public, tell someone you trust, protect financial details,
            and report behavior that feels manipulative or unsafe.
          </p>
        </section>
      </div>
    </article>
  );
}
