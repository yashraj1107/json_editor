import './TopBar.css';

/* ---- SVG icon helpers ---- */
const IconNew = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 8.75 4.25V1.5Zm6.75.56v2.19c0 .138.112.25.25.25h2.19Z"/>
  </svg>
);
const IconOpen = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1Z"/>
  </svg>
);
const IconSave = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"/>
    <path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.97a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.779a.749.749 0 1 1 1.06-1.06Z"/>
  </svg>
);
const IconCopy = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/>
    <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/>
  </svg>
);
const IconPaste = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5.75 1a.75.75 0 0 0-.75.75V3h-.25A1.75 1.75 0 0 0 3 4.75v9.5c0 .966.784 1.75 1.75 1.75h6.5A1.75 1.75 0 0 0 13 14.25v-9.5A1.75 1.75 0 0 0 11.25 3H11V1.75a.75.75 0 0 0-.75-.75ZM9.5 3h-3V2.5h3Zm1.75 1.5a.25.25 0 0 1 .25.25v9.5a.25.25 0 0 1-.25.25h-6.5a.25.25 0 0 1-.25-.25v-9.5a.25.25 0 0 1 .25-.25Z"/>
  </svg>
);
const IconFullscreen = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1.75 10a.75.75 0 0 1 .75.75v2.75h2.75a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 .75-.75ZM14.25 6a.75.75 0 0 1-.75-.75V2.5h-2.75a.75.75 0 0 1 0-1.5h3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75ZM1.75 6a.75.75 0 0 1-.75-.75v-3.5A.75.75 0 0 1 1.75 1h3.5a.75.75 0 0 1 0 1.5H2.5v2.75A.75.75 0 0 1 1.75 6ZM14.25 10a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5h2.75v-2.75a.75.75 0 0 1 .75-.75Z"/>
  </svg>
);
const IconExitFullscreen = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5.25 1a.75.75 0 0 1 .75.75V4.5h2.75a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 4.5 5.25v-3.5A.75.75 0 0 1 5.25 1ZM10.75 1a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5H10V1.75a.75.75 0 0 1 .75-.75ZM1.75 10.5h2.75v2.75a.75.75 0 0 0 1.5 0v-3.5A.75.75 0 0 0 5.25 9h-3.5a.75.75 0 0 0 0 1.5ZM15 5.25a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0V5.5H14.25a.75.75 0 0 0 .75-.75Z"/>
  </svg>
);
const IconSun = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM8 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0Zm0 13a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 13ZM2.343 2.343a.75.75 0 0 1 1.061 0l1.06 1.061a.75.75 0 0 1-1.06 1.06l-1.061-1.06a.75.75 0 0 1 0-1.061ZM12.596 11.536a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 0-1.061ZM0 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8Zm13 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 13 8ZM2.343 13.657a.75.75 0 0 1 0-1.06l1.06-1.061a.75.75 0 0 1 1.061 1.06l-1.06 1.061a.75.75 0 0 1-1.061 0ZM11.536 3.404a.75.75 0 0 1 0-1.06l1.06-1.061a.75.75 0 1 1 1.061 1.06l-1.06 1.061a.75.75 0 0 1-1.061 0Z"/>
  </svg>
);
const IconMoon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M9.598 1.591a.749.749 0 0 1 .785-.175 7 7 0 1 1-8.967 8.967.75.75 0 0 1 .961-.96 5.5 5.5 0 0 0 7.046-7.046.75.75 0 0 1 .175-.786Z"/>
  </svg>
);
const IconSettings = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.103-.303c-.066-.019-.176-.011-.299.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.212.224l-.288 1.107c-.17.644-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.617-1.458-1.26l-.288-1.107c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.364-1.891l.814-.806c.049-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.814-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071a5.9 5.9 0 0 1 .668-.386c.133-.066.194-.158.212-.224l.288-1.107C5.578.645 6.124.095 6.867.03 7.22.01 7.611 0 8 0Zm1.5 8a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"/>
  </svg>
);
const IconHelp = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 5.5a1.5 1.5 0 1 1 2.64.97c-.24.26-.495.487-.744.7-.19.158-.375.312-.531.491-.208.242-.365.53-.365.839v.5a.75.75 0 0 0 1.5 0v-.5c0-.052.015-.09.04-.125.05-.068.14-.145.259-.249.264-.222.594-.5.882-.809A3 3 0 0 0 5 5.5ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
  </svg>
);
const IconAbout = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
  </svg>
);

export default function TopBar({
  theme, onThemeToggle,
  onNew, onOpen, onSave,
  onCopyClipboard, onPasteClipboard,
  isFullscreen, onFullscreenToggle,
  onSettings, onShortcuts, onAbout,
  activePanel,
}) {
  return (
    <header className="topbar" role="banner">
      {/* Brand */}
      <div className="topbar-brand">
        <div className="topbar-logo">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect width="22" height="22" rx="5" fill="#3d8b37"/>
            <text x="4" y="16" fontSize="12" fontWeight="700" fill="white" fontFamily="monospace">{'{}'}</text>
          </svg>
        </div>
        <span className="topbar-title">JSON Editor</span>
      </div>

      <div className="topbar-sep" />

      {/* File actions */}
      <nav className="topbar-group" aria-label="File actions">
        <button
          id="btn-new"
          className="icon-btn topbar-btn"
          onClick={() => onNew(activePanel)}
          title="New document (Ctrl+N)"
        >
          <IconNew /> <span className="btn-label">New</span>
        </button>
        <button
          id="btn-open"
          className="icon-btn topbar-btn"
          onClick={() => onOpen(activePanel)}
          title="Open file (Ctrl+O)"
        >
          <IconOpen /> <span className="btn-label">Open</span>
        </button>
        <button
          id="btn-save"
          className="icon-btn topbar-btn"
          onClick={() => onSave(activePanel)}
          title="Save file (Ctrl+S)"
        >
          <IconSave /> <span className="btn-label">Save</span>
        </button>
      </nav>

      <div className="separator" />

      {/* Clipboard */}
      <nav className="topbar-group" aria-label="Clipboard actions">
        <button
          id="btn-copy-clip"
          className="icon-btn topbar-btn"
          onClick={() => onCopyClipboard(activePanel)}
          title="Copy JSON to clipboard (Ctrl+Shift+C)"
        >
          <IconCopy /> <span className="btn-label">Copy</span>
        </button>
        <button
          id="btn-paste-clip"
          className="icon-btn topbar-btn"
          onClick={() => onPasteClipboard(activePanel)}
          title="Paste JSON from clipboard (Ctrl+Shift+V)"
        >
          <IconPaste /> <span className="btn-label">Paste</span>
        </button>
      </nav>

      <div className="separator" />

      {/* Right side tools */}
      <nav className="topbar-group topbar-right" aria-label="View options">
        <button
          id="btn-fullscreen"
          className="icon-btn topbar-btn"
          onClick={onFullscreenToggle}
          title={isFullscreen ? 'Exit fullscreen (F11)' : 'Fullscreen (F11)'}
        >
          {isFullscreen ? <IconExitFullscreen /> : <IconFullscreen />}
        </button>

        <button
          id="btn-theme"
          className="icon-btn topbar-btn"
          onClick={onThemeToggle}
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <IconSun /> : <IconMoon />}
        </button>

        <div className="separator" />

        <button
          id="btn-settings"
          className="icon-btn topbar-btn"
          onClick={onSettings}
          title="Settings"
        >
          <IconSettings />
        </button>
        <button
          id="btn-shortcuts"
          className="icon-btn topbar-btn"
          onClick={onShortcuts}
          title="Keyboard shortcuts (?)"
        >
          <IconHelp />
        </button>
        <button
          id="btn-about"
          className="icon-btn topbar-btn"
          onClick={onAbout}
          title="About"
        >
          <IconAbout />
        </button>
      </nav>
    </header>
  );
}
