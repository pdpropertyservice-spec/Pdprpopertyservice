import { IconPhone } from "./Icons";
import { BUSINESS, MAIN_PHONE } from "../content";

export function ServiceArea() {
  return (
    <section className="section area" id="area">
      <div className="area__panes" aria-hidden="true" />
      <div className="wrap area__inner">
        <p className="eyebrow">Service area</p>
        <h2>Proudly serving Broome County, NY</h2>
        <ul className="area__towns">
          {BUSINESS.towns.map((t) => (
            <li key={t}>{t}</li>
          ))}
          <li className="area__more">&amp; nearby towns</li>
        </ul>
        <p className="area__foot">
          Not sure if you're in range? Call or text{" "}
          <a href={MAIN_PHONE.href}>
            <IconPhone /> {MAIN_PHONE.display}
          </a>{" "}
          and we'll let you know.
        </p>
      </div>
    </section>
  );
}
