import Modal from './Modal.jsx';
import './KeyboardShortcuts.css';

const SHORTCUTS = [
  { category: 'File', shortcuts: [
    { keys: ['Ctrl', 'N'], action: 'New document' },
    { keys: ['Ctrl', 'O'], action: 'Open file' },
    { keys: ['Ctrl', 'S'], action: 'Save / download file' },
  ]},
  { category: 'Clipboard', shortcuts: [
    { keys: ['Ctrl', 'Shift', 'C'], action: 'Copy JSON to clipboard' },
    { keys: ['Ctrl', 'Shift', 'V'], action: 'Paste JSON from clipboard' },
  ]},
  { category: 'Edit', shortcuts: [
    { keys: ['Ctrl', 'Z'], action: 'Undo' },
    { keys: ['Ctrl', 'Y'], action: 'Redo' },
    { keys: ['Ctrl', 'F'], action: 'Search' },
    { keys: ['Ctrl', 'H'], action: 'Find & Replace' },
    { keys: ['Ctrl', 'A'], action: 'Select all' },
  ]},
  { category: 'Panels', shortcuts: [
    { keys: ['Ctrl', '←'], action: 'Copy right → left' },
    { keys: ['Ctrl', '→'], action: 'Copy left → right' },
    { keys: ['Tab'], action: 'Switch active panel' },
  ]},
  { category: 'View', shortcuts: [
    { keys: ['F11'], action: 'Toggle fullscreen' },
    { keys: ['?'], action: 'Show keyboard shortcuts' },
    { keys: ['Esc'], action: 'Close dialog / cancel' },
  ]},
  { category: 'JSON', shortcuts: [
    { keys: ['Ctrl', 'Shift', 'F'], action: 'Format JSON' },
    { keys: ['Alt', 'Shift', 'F'], action: 'Compact JSON' },
  ]},
];

function Kbd({ children }) {
  return <kbd className="shortcut-key">{children}</kbd>;
}

export default function KeyboardShortcuts({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Keyboard Shortcuts" width="520px">
      <div className="shortcuts-list">
        {SHORTCUTS.map((group) => (
          <div key={group.category} className="shortcut-group">
            <div className="shortcut-category">{group.category}</div>
            {group.shortcuts.map((s) => (
              <div key={s.action} className="shortcut-row">
                <div className="shortcut-keys">
                  {s.keys.map((k, i) => (
                    <span key={k}>
                      <Kbd>{k}</Kbd>
                      {i < s.keys.length - 1 && <span className="shortcut-plus">+</span>}
                    </span>
                  ))}
                </div>
                <div className="shortcut-action">{s.action}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Modal>
  );
}
