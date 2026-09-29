import Modal from './Modal.jsx';
import './SettingsPanel.css';

export default function SettingsPanel({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  leftMode,
  rightMode,
  onLeftModeChange,
  onRightModeChange,
  indent,
  onIndentChange,
  autosave,
  onAutosaveChange,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings">
      <div className="settings-form">

        <div className="settings-group">
          <div className="settings-group-title">Appearance</div>

          <label className="settings-row">
            <span className="settings-label">Theme</span>
            <div className="settings-options">
              <button
                className={`option-btn ${theme === 'dark' ? 'option-active' : ''}`}
                onClick={() => onThemeChange('dark')}
              >
                🌙 Dark
              </button>
              <button
                className={`option-btn ${theme === 'light' ? 'option-active' : ''}`}
                onClick={() => onThemeChange('light')}
              >
                ☀️ Light
              </button>
            </div>
          </label>
        </div>

        <div className="settings-group">
          <div className="settings-group-title">Editor Defaults</div>

          <label className="settings-row">
            <span className="settings-label">Left panel mode</span>
            <select
              className="settings-select"
              value={leftMode}
              onChange={(e) => onLeftModeChange(e.target.value)}
            >
              <option value="text">Text</option>
              <option value="tree">Tree</option>
              <option value="table">Table</option>
              <option value="view">View</option>
            </select>
          </label>

          <label className="settings-row">
            <span className="settings-label">Right panel mode</span>
            <select
              className="settings-select"
              value={rightMode}
              onChange={(e) => onRightModeChange(e.target.value)}
            >
              <option value="text">Text</option>
              <option value="tree">Tree</option>
              <option value="table">Table</option>
              <option value="view">View</option>
            </select>
          </label>

          <label className="settings-row">
            <span className="settings-label">Indentation</span>
            <select
              className="settings-select"
              value={String(indent)}
              onChange={(e) => onIndentChange(Number(e.target.value))}
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
            </select>
          </label>
        </div>

        <div className="settings-group">
          <div className="settings-group-title">Session</div>

          <label className="settings-row">
            <span className="settings-label">Autosave to browser</span>
            <div className="toggle-wrap">
              <input
                id="autosave-toggle"
                type="checkbox"
                checked={autosave}
                onChange={(e) => onAutosaveChange(e.target.checked)}
                className="toggle-input"
              />
              <label htmlFor="autosave-toggle" className="toggle-label" />
            </div>
          </label>
        </div>

      </div>
    </Modal>
  );
}
