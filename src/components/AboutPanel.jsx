import Modal from './Modal.jsx';
import './AboutPanel.css';

export default function AboutPanel({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="About JSON Editor Online" width="480px">
      <div className="about-content">
        <div className="about-logo">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <rect width="56" height="56" rx="14" fill="#3d8b37"/>
            <text x="8" y="40" fontSize="32" fontWeight="700" fill="white" fontFamily="monospace">{'{}'}</text>
          </svg>
        </div>

        <h2 className="about-name">JSON Editor Online</h2>
        <p className="about-version">Version 1.0.0 (self-hosted)</p>

        <p className="about-desc">
          A self-hosted dual-panel JSON editor with full feature parity to JSONEditorOnline.
          Supports tree, text, table, and view modes — plus diff comparison, autosave,
          drag-and-drop, clipboard, and full keyboard control.
        </p>

        <div className="about-tech">
          <div className="about-tech-title">Built with</div>
          <div className="about-tech-items">
            <span className="about-badge">React 19</span>
            <span className="about-badge">Vite 8</span>
            <span className="about-badge">vanilla-jsoneditor</span>
            <span className="about-badge">jsondiffpatch</span>
          </div>
        </div>

        <div className="about-shortcuts-hint">
          Press <kbd className="about-kbd">?</kbd> anytime for keyboard shortcuts.
        </div>

        <p className="about-made-by">made by yashraj</p>
      </div>
    </Modal>
  );
}
