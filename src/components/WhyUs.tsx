import { IconShield, IconTag, IconUsers, IconWindow } from "./Icons";

const REASONS = [
  {
    icon: IconUsers,
    title: "Owner on every job",
    desc: "You deal with Mike from your first call to the final wipe-down.",
  },
  {
    icon: IconWindow,
    title: "Windows only",
    desc: "No splitting time across a dozen services. Clean glass is the whole business.",
  },
  {
    icon: IconTag,
    title: "Honest, flat-rate pricing",
    desc: "You get a clear price before we start. No hidden fees and no pushy upsells.",
  },
  {
    icon: IconShield,
    title: "Satisfaction guaranteed",
    desc: "If you're not happy with any spot, we come back and re-clean it free.",
  },
];

export function WhyUs() {
  return (
    <section className="section section--alt" id="why">
      <div className="wrap why">
        <div className="why__intro">
          <p className="eyebrow">Why Pav's</p>
          <h2 className="silver">A local business that sweats the details.</h2>
          <p className="lead">Big franchises send whoever is on shift. With Pav's, you get the owner, every time.</p>
          <figure className="owner-note panel">
            <blockquote>
              <p>
                "I'm Mike Pavlisak, and I own and run Pav's Window Co. I'm on every job myself, so you get
                someone who cares about the result, not a faceless franchise."
              </p>
            </blockquote>
            <figcaption className="owner-note__sig">
              <img className="owner-note__mark" src="images/work/mike.webp" width={240} height={240} alt="Mike Pavlisak" />
              <span>
                <span className="owner-note__name">Mike Pavlisak</span>
                <span className="owner-note__role">Owner, Pav's Window Co.</span>
              </span>
            </figcaption>
          </figure>
        </div>

        <ul className="reasons">
          {REASONS.map((r) => {
            const Icon = r.icon;
            return (
              <li className="reason panel" key={r.title}>
                <span className="badge-icon">
                  <Icon />
                </span>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
