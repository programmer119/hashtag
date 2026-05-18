export default function SupportPage() {
  return (
    <article className="legal-page">
      <header>
        <p className="eyebrow">Support</p>
        <h1>How can we help?</h1>
        <p className="lead">
          A launch-ready support page for account, billing, safety, and app
          reliability questions.
        </p>
      </header>

      <div className="grid-2">
        <section className="policy-card">
          <h2>Account help</h2>
          <p>
            Get help with sign-in, profile review, verification, account
            updates, blocked accounts, or deletion requests.
          </p>
        </section>
        <section className="policy-card">
          <h2>Payments and Diamonds</h2>
          <p>
            Ask about Diamond purchases, profile unlocks, receipts, failed
            transactions, and refund routing through the app stores.
          </p>
        </section>
        <section className="policy-card">
          <h2>Safety reports</h2>
          <p>
            Report harassment, impersonation, suspicious payment requests,
            abusive content, or off-platform pressure.
          </p>
        </section>
        <section className="policy-card">
          <h2>Contact</h2>
          <p>
            Placeholder support inbox: support@hashdate.example. Replace with
            the production support channel before launch.
          </p>
        </section>
      </div>

      <section>
        <h2>Support request preview</h2>
        <p>
          The production form will submit to `POST /v1/support/requests`. The
          current preview API accepts account, billing, safety, and reliability
          categories and returns an open support request ID.
        </p>
        <form className="support-form">
          <label>
            Email
            <input value="owner@example.com" readOnly aria-label="Email" />
          </label>
          <label>
            Category
            <select value="account" aria-label="Category">
              <option value="account">Account</option>
              <option value="billing">Payments and Diamonds</option>
              <option value="safety">Safety report</option>
              <option value="reliability">App reliability</option>
            </select>
          </label>
          <label>
            Subject
            <input value="Profile review question" readOnly aria-label="Subject" />
          </label>
          <label>
            Message
            <textarea
              value="I need help understanding my profile review status."
              readOnly
              aria-label="Message"
            />
          </label>
          <button type="button">Preview submit</button>
        </form>
      </section>
    </article>
  );
}
