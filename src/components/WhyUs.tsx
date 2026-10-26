import { IconShield, IconTag, IconUsers, IconWindow } from "./Icons";

const REASONS = [
  {
    icon: IconUsers,
    title: "Owners on every job",
    desc: "You deal with Michael or Takota from your first call to the final wipe-down.",
  },
  {
    icon: IconWindow,
    title: "Windows only",
    desc: "We don't split our time across a dozen services. Clean glass is our whole business.",
  },
  {
    icon: IconTag,
    title: "Honest, flat-rate pricing",
    desc: "You get a clear price before we start. No hidden fees and no pushy upsells.",
  },
  {
    icon: IconShield,
    title: "Satisfaction guaranteed",
    desc: "If you're not happy with any spot, we'll come back and re-clean it free.",
  },
];

export function WhyUs() {
  return (
    <section className="section section--tint" id="why">
      <div className="wrap why">
        <div className="why__intro">
          <p className="eyebrow">Why Pav's</p>
          <h2>A local crew that sweats the details.</h2>
          <p className="lead">
            Big franchises send whoever is on shift. With us, you get the owners, every time.
          </p>
          <figure className="owner-note">
            <blockquote>
              <p>
                "Pav's Window Co. is owned and run by the two of us. We're on every job ourselves, so you get people
                who care about the result, not a faceless franchise."
              </p>
            </blockquote>
            <figcaption className="owner-note__sig">
              <span className="avatars" aria-hidden="true">
                <span className="avatar">M</span>
                <span className="avatar avatar--alt">T</span>
              </span>
              <span>
                <span className="owner-note__name">Michael Pavlisak &amp; Takota Dunlap</span>
                <span className="owner-note__role">Owners, Pav's Window Co.</span>
              </span>
            </figcaption>
          </figure>
        </div>

        <ul className="reasons">
          {REASONS.map((r) => {
            const Icon = r.icon;
            return (
              <li className="reason" key={r.title}>
                <span className="reason__icon">
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
