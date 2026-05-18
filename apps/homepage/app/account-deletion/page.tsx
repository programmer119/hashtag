export default function AccountDeletionPage() {
  return (
    <article className="legal-page">
      <header>
        <p className="eyebrow">Account deletion</p>
        <h1>Delete your Hashdate account</h1>
        <p className="lead">
          Members should be able to understand what deletion does, what may be
          retained, and how to request help when they cannot access the app.
        </p>
      </header>

      <section className="notice">
        <h2>In-app deletion path</h2>
        <p>
          Planned path: open Hashdate, go to Settings, choose Account, then
          select Delete account. The final app route should replace this
          placeholder when implemented.
        </p>
      </section>
      <section>
        <h2>What deletion removes</h2>
        <p>
          Deletion should remove or anonymize profile details, photos, discovery
          visibility, matches, chat availability, and account access except
          where retention is required for legal, safety, fraud prevention, or
          payment records.
        </p>
      </section>
      <section>
        <h2>When you need help</h2>
        <p>
          If you cannot sign in, contact support@hashdate.example from the email
          or phone number connected to your account. Include only the details
          needed to identify the account.
        </p>
      </section>
    </article>
  );
}
