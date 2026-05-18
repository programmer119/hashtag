export default function PrivacyPage() {
  return (
    <article className="legal-page">
      <header>
        <p className="eyebrow">Privacy</p>
        <h1>Privacy Policy</h1>
        <p className="lead">
          This draft explains the privacy posture expected for Hashdate&apos;s
          MVP. Legal counsel should review and replace placeholder language
          before launch.
        </p>
      </header>

      <section>
        <h2>Information we collect</h2>
        <p>
          Hashdate may collect account details, profile content, verification
          signals, app activity, payment-related records, device information,
          reports, and support messages needed to operate the service.
        </p>
      </section>
      <section>
        <h2>How we use information</h2>
        <p>
          We use information to create accounts, review profiles, recommend
          introductions, operate matches and chat, process Diamond activity,
          prevent abuse, provide support, and improve product reliability.
        </p>
      </section>
      <section>
        <h2>Sharing</h2>
        <p>
          We do not sell personal information. Limited data may be shared with
          vendors that support hosting, analytics, moderation, payments, safety,
          customer support, and legal compliance.
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          Members can update profile information in the app, request support,
          and start account deletion from the account deletion page.
        </p>
      </section>
    </article>
  );
}
