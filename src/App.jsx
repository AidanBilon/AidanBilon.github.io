import { useState } from "react";

export default function App() {
  const [remindOpen, setRemindOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function openRemind() {
    setRemindOpen(true);
    setSent(false);
    const saved = localStorage.getItem("remind_email");
    if (saved) setEmail(saved);
  }

  function closeRemind() {
    setRemindOpen(false);
  }

  async function submitRemind(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    const endpoint = "https://script.google.com/macros/s/AKfycbyc-UwWqa9W93c4naV-sFOnl3GtmscG1OWWisaCsEIyTBXQnJe0hrVFqDazKGQBaiqr/exec";
    try {
      // POST to Google Apps Script
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage" }),
      });
      const json = await res.json().catch(() => null);
      // Save locally as fallback/quick access
      localStorage.setItem("remind_email", email);
      setSent(true);
      // Optionally inspect json for {ok:true}
      console.log('remind response', json);
    } catch (err) {
      console.error('remind submit failed', err);
      // still save locally so the email isn't lost
      try { localStorage.setItem("remind_email", email); } catch (e) {}
      setSent(true);
    }
  }

  return (
    <div className="page">
      <a className="skip" href="#content">Skip to content</a>

      {/* FULL-BLEED HERO */}
      <header className="hero-bleed">
        {/* Background image lives in CSS via .hero-bleed::before;
            If you prefer an <img>, swap the CSS and put:
            <img src="/hero.jpg" alt="" aria-hidden="true" className="hero-img" /> */}
        <div className="hero-bleed__overlay">
          <div className="hero-bleed__content">
            <h1>Voting Opens October 2nd</h1>
            <p className="tagline">Uplifting affiliates • Bigger events • Stronger EngSoc</p>
            <div className="cta">
              <a className="btn" href="#platform" onClick={(e) => { e.preventDefault(); document.getElementById('platform')?.scrollIntoView({ behavior: 'smooth' }); }}>Read Platform</a>
              <a className="btn" href="https://vote.wusa.ca" target="_blank" rel="noreferrer">Vote</a>
              <button className="btn outline" onClick={openRemind}>Remind Me</button>
            </div>
          </div>
        </div>
  <a className="scroll-cue" href="#platform" aria-label="Scroll to platform" onClick={(e) => { e.preventDefault(); document.getElementById('platform')?.scrollIntoView({ behavior: 'smooth' }); }}>↓</a>
  {/* Portrait on far right of hero; placed outside overlay so it's not dimmed */}
  <img src="/portrait.png" alt="Aidan Bilon portrait" className="hero-portrait" />
      {/* Remind Me modal */}
      {remindOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <button className="modal-close" onClick={closeRemind} aria-label="Close">×</button>
            <h3>Get reminded when voting opens</h3>
            <form onSubmit={submitRemind} className="remind-form">
              <label htmlFor="remind-email">Email address</label>
              <input id="remind-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <div className="modal-actions">
                <button className="btn" type="submit">Save</button>
                <button type="button" className="btn outline" onClick={closeRemind}>Cancel</button>
              </div>
            </form>
            {sent && <p className="note">Thanks — we'll message you when voting opens.</p>}
          </div>
        </div>
      )}
      </header>

      {/* MAIN CONTENT */}
      <main id="content" className="container">
        {/* Platform */}
        <section id="platform" className="section">
          <h2>Platform Priorities</h2>
          <ul className="cards">
            <li className="card">
              <h3>Better Supporting Affiliates</h3>
              <p>With more resources available, I want to provide affiliates with stronger logistics support, promotion, and other help as they fit. I’ve already been talking directly with several affiliates to understand their needs and incorporate their feedback into how EngSoc can support events and growth.</p>
            </li>
            <li className="card">
              <h3>Make Campus More Inviting</h3>
              <p>We can make campus a better place to walk around by adding murals, art pieces, and more engaging public spaces. I’m pushing for projects and other visible improvements that make campus more welcoming and fun.</p>
            </li>
            <li className="card">
              <h3>Open Up EngSoc</h3>
              <p>EngSoc should be easy to join and welcoming so more students can use our resources. As Speaker, I’ve already started initiatives like inviting all reps into mailing lists and council invitations which helped increase awareness and led to some of the highest recorded council attendance.</p>
            </li>
          </ul>
        </section>

        {/* Affiliates
        <section id="affiliates" className="section alt">
          <h2>Affiliates I’ll Champion</h2>
          <p className="chips">
            <span>NSBE</span>
            <span>AISES</span>
            <span>Women in Engineering</span>
            <span>Iron Warrior</span>
            <span>More student groups…</span>
          </p>
          <p className="note">Partnership first: EngSoc × Affiliates → better outcomes for students.</p>
        </section> */}
      </main>

      <footer className="footer">
        <small>© 2025 Aidan Bilon</small>
      </footer>
    </div>
  )
}