import { IconCheck, IconSparkle } from "./Icons";

/** A window with four panes of morning sky. A squeegee wipes the haze away on a loop. */
export function WindowVisual() {
  return (
    <div className="pane-window" aria-hidden="true">
      <div className="pane-window__glass">
        <span className="pane-window__sun" />
        <svg className="pane-window__hills" viewBox="0 0 400 184" preserveAspectRatio="none">
          <path d="M0 96C60 70 120 62 180 78s110 42 160 30 60-30 60-30v106H0z" fill="#8fc7a9" opacity="0.7" />
          <path d="M0 126c70-34 130-30 190-8s120 34 210-6v72H0z" fill="#3e9a6c" opacity="0.8" />
          <path d="M0 150c80-28 150-22 230 2s120 18 170 0v32H0z" fill="#1d6b48" />
        </svg>
        <span className="pane-window__haze" />
        <span className="pane-window__squeegee" />
        <span className="pane-window__mullion pane-window__mullion--v" />
        <span className="pane-window__mullion pane-window__mullion--h" />
      </div>
      <span className="pane-window__tag pane-window__tag--a">
        <IconCheck /> Streak-free, guaranteed
      </span>
      <span className="pane-window__tag pane-window__tag--b">
        <IconSparkle /> Inside &amp; out
      </span>
    </div>
  );
}
