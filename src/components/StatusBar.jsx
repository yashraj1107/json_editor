import './StatusBar.css';

export default function StatusBar({
  leftSession,
  rightSession,
  activePanel,
  leftValid,
  rightValid,
  cursorInfo,
  lastAction,
}) {
  const session = activePanel === 'left' ? leftSession : rightSession;
  const isValid = activePanel === 'left' ? leftValid : rightValid;

  return (
    <footer className="status-bar" role="contentinfo" aria-label="Status bar">

      {/* Active panel indicator */}
      <div className="sb-segment sb-panel">
        <span className="sb-panel-dot" />
        <span>{activePanel} panel</span>
      </div>

      <div className="sb-divider" />

      {/* Mode */}
      <div className="sb-segment sb-mode">
        {session?.mode ?? 'text'}
      </div>

      <div className="sb-divider" />

      {/* Validity */}
      <div className={`sb-segment sb-valid ${isValid ? 'sb-ok' : 'sb-err'}`}>
        {isValid ? '✓ Valid JSON' : '✗ Invalid JSON'}
      </div>

      <div className="sb-divider" />

      {/* Cursor info */}
      {cursorInfo && (
        <>
          <div className="sb-segment">
            Ln {cursorInfo.line}, Col {cursorInfo.col}
          </div>
          <div className="sb-divider" />
        </>
      )}

      {/* File name */}
      <div className="sb-segment sb-filename">
        {session?.fileName ?? 'untitled'}
        {session?.modified && <span className="sb-modified"> ●</span>}
      </div>

      <div className="sb-spacer" />

      {/* Last action */}
      {lastAction && (
        <div className="sb-segment sb-action">
          {lastAction}
        </div>
      )}

      {/* Subtle credit */}
      <div className="sb-segment sb-credit">made by yashraj</div>


    </footer>
  );
}
