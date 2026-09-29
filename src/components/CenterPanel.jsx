import './CenterPanel.css';

const ArrowLeft  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M7.78 12.53a.75.75 0 0 1-1.06 0L2.47 8.28a.749.749 0 0 1 0-1.06l4.25-4.25a.749.749 0 1 1 1.06 1.06L4.81 7h7.44a.75.75 0 0 1 0 1.5H4.81l2.97 2.97a.749.749 0 0 1 0 1.06Z"/></svg>;
const ArrowRight = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 1 1-1.06-1.06l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.749.749 0 0 1 0-1.06Z"/></svg>;
const IconCompare = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.5h-6.5a.75.75 0 0 0 0 1.5h6.5v6.5a.75.75 0 0 0 1.5 0v-6.5h6.5a.75.75 0 0 0 0-1.5h-6.5v-6.5Z"/>
  </svg>
);

export default function CenterPanel({
  onCopyLeft,
  onCopyRight,
  compareMode,
  onCompareToggle,
  onTransformLeft,
  onTransformRight,
}) {
  return (
    <aside className="center-panel" aria-label="Panel controls">

      {/* ── Section 1: Copy ── */}
      <section className="cp-section">
        <div className="cp-label">Copy</div>
        <div className="cp-btns">
          <button
            id="btn-copy-right-to-left"
            className="cp-btn"
            onClick={onCopyLeft}
            title="Copy right → left (Ctrl+←)"
          >
            <ArrowLeft />
          </button>
          <button
            id="btn-copy-left-to-right"
            className="cp-btn"
            onClick={onCopyRight}
            title="Copy left → right (Ctrl+→)"
          >
            <ArrowRight />
          </button>
        </div>
      </section>

      <div className="cp-divider" />

      {/* ── Section 2: Transform ── */}
      <section className="cp-section">
        <div className="cp-label">Transform</div>
        <div className="cp-btns">
          <button
            id="btn-transform-right-to-left"
            className="cp-btn"
            onClick={onTransformLeft}
            title="Transform right → left"
          >
            <ArrowLeft />
          </button>
          <button
            id="btn-transform-left-to-right"
            className="cp-btn"
            onClick={onTransformRight}
            title="Transform left → right"
          >
            <ArrowRight />
          </button>
        </div>
      </section>

      <div className="cp-divider" />

      {/* ── Section 3: Compare/Diff ── */}
      <section className="cp-section">
        <div className="cp-label">Diff</div>
        <div className="cp-btns">
          <button
            id="btn-compare"
            className={`cp-btn cp-btn-compare ${compareMode ? 'cp-btn-active' : ''}`}
            onClick={onCompareToggle}
            title={compareMode ? 'Hide diff' : 'Show diff'}
          >
            <IconCompare />
          </button>
        </div>
        {compareMode && (
          <div className="cp-compare-hint">
            diff&nbsp;active
          </div>
        )}
      </section>

    </aside>
  );
}
