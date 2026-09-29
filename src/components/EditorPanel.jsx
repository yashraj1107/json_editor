import {
  useEffect, useRef, useState, useCallback,
  forwardRef, useImperativeHandle,
} from 'react';
import { createJSONEditor } from 'vanilla-jsoneditor';
import './EditorPanel.css';

/* ---- Mode icon helpers ---- */
const MODES = [
  { value: 'text',  label: 'Text' },
  { value: 'tree',  label: 'Tree' },
  { value: 'table', label: 'Table' },
  { value: 'view',  label: 'View' },
];

const IconFormat = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" title="Format">
    <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm4 5A.75.75 0 0 1 5.75 7h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 5 7.75ZM5.75 12h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5Z"/>
  </svg>
);
const IconCompact = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" title="Compact">
    <path d="M1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5ZM1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"/>
  </svg>
);
const IconRepair = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" title="Repair">
    <path d="M14.064 0a8.75 8.75 0 0 0-6.187 2.563l-.459.458c-.314.314-.616.641-.904.979H3.31a1.75 1.75 0 0 0-1.49.833L.11 7.607a.75.75 0 0 0 .765 1.125l3.064-.656 2.81 2.811-.656 3.064a.75.75 0 0 0 1.124.765l2.774-1.707a1.75 1.75 0 0 0 .833-1.49V9.485c.338-.288.665-.59.979-.904l.458-.459A8.75 8.75 0 0 0 16 1.936V1.75A1.75 1.75 0 0 0 14.25 0ZM10.5 10.709V12.5a.25.25 0 0 1-.119.213l-1.887 1.161.48-2.249 1.526-1.525Zm-1.657-5.967a7.25 7.25 0 0 1 5.12-2.242.25.25 0 0 1 .25.25v.186a7.25 7.25 0 0 1-2.12 5.133L8 11.176 4.823 8l3.02-3.258ZM3.5 6.837 5.292 5.31 3.043 5.793 1.882 7.68 3.769 6.519Z"/>
  </svg>
);
const IconSort = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" title="Sort keys">
    <path d="M0 .75A.75.75 0 0 1 .75 0h4.5a.75.75 0 0 1 .75.75 .75.75 0 0 1-.75.75H.75A.75.75 0 0 1 0 .75ZM0 6a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 6Zm0 5.25a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75ZM12.5.75a.75.75 0 0 0-1.5 0v5.5l-1.22-1.22a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 0 0-1.06-1.06L12.5 6.25Z"/>
  </svg>
);
const IconUndo = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1.22 6.28a.749.749 0 0 0 0 1.06l3.5 3.5a.749.749 0 1 0 1.06-1.06L3.561 7.75H12.5a3.25 3.25 0 0 1 0 6.5h-1.5a.75.75 0 0 0 0 1.5h1.5a4.75 4.75 0 0 0 0-9.5H3.56l2.22-2.22a.749.749 0 0 0-1.06-1.06l-3.5 3.5Z"/>
  </svg>
);
const IconRedo = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M14.78 6.28a.749.749 0 0 1 0 1.06l-3.5 3.5a.749.749 0 1 1-1.06-1.06l2.22-2.22H3.5a3.25 3.25 0 0 0 0 6.5h1.5a.75.75 0 0 1 0 1.5H3.5a4.75 4.75 0 0 1 0-9.5h8.94l-2.22-2.22a.749.749 0 0 1 1.06-1.06l3.5 3.5Z"/>
  </svg>
);
const IconValidate = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/>
  </svg>
);
const IconExpand = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1.75 2.5a.25.25 0 0 0-.25.25v1.5h1.5V3H4.5a.75.75 0 0 0 0-1.5h-2.75ZM11.5 2.5h-.25a.75.75 0 0 0 0 1.5H12.5v.75h1.5V2.75a.25.25 0 0 0-.25-.25H11.5ZM3 11.75v-1h-1.5v1.5c0 .138.112.25.25.25H3.5a.75.75 0 0 0 0-1.5H3ZM13.5 12v-.25h-1.5v1.5H13.5a.25.25 0 0 0 .25-.25v-.75a.75.75 0 0 0-.75-.75H12v.5h1.5Z"/>
  </svg>
);
const IconCollapse = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M3 3.25V4.5H1.5V2.75c0-.138.112-.25.25-.25H3.5a.75.75 0 0 1 0 1.5H3ZM12.5 4.5V3.25H12a.75.75 0 0 1 0-1.5h1.75c.138 0 .25.112.25.25V4.5h-1.5ZM2.5 12h1.25v-.5a.75.75 0 0 1 1.5 0V13.25a.25.25 0 0 1-.25.25H3.5a.75.75 0 0 1 0-1.5H2.5V12ZM12 13.25V12.5h-.5a.75.75 0 0 1 0-1.5h1.75c.138 0 .25.112.25.25V13.5h-1.5Z"/>
  </svg>
);
const IconEdit = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Z"/>
  </svg>
);

/**
 * Focus helper – tries CM6 first, falls back to contenteditable, then the container.
 * Called after mount, mode change, and content load to fix the caret-visibility bug.
 */
function focusEditor(containerEl) {
  if (!containerEl) return;
  requestAnimationFrame(() => {
    const cm = containerEl.querySelector('.cm-content');
    if (cm) { cm.focus(); return; }
    const ce = containerEl.querySelector('[contenteditable="true"]');
    if (ce) { ce.focus(); return; }
    containerEl.querySelector('[tabindex]')?.focus();
  });
}

/**
 * Get JSON text from content object (handles both .json and .text forms).
 */
function contentToText(content, indent = 2) {
  if (content?.text !== undefined) return content.text;
  if (content?.json !== undefined) return JSON.stringify(content.json, null, indent);
  return '';
}

/**
 * Per-panel editor component.
 * Exposes imperative API via ref:
 *   ref.get()        → content object
 *   ref.set(content) → set content
 *   ref.focus()      → focus editor
 *   ref.mode         → current mode string
 */
const EditorPanel = forwardRef(function EditorPanel(
  {
    side,
    fileName,
    onFileNameChange,
    mode,
    onModeChange,
    initialContent,
    onContentChange,
    onAction,
    isActive,
    onActivate,
  },
  ref
) {
  const containerRef = useRef(null);
  const editorRef    = useRef(null);
  const fileInputRef = useRef(null);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue]     = useState(fileName);
  const [isValid, setIsValid]         = useState(true);

  // ── Build / destroy editor ──────────────────────────────────────
  useEffect(() => {
    const editor = createJSONEditor({
      target: containerRef.current,
      props: {
        content: initialContent ?? { text: '' },
        mode,
        navigationBar: true,
        statusBar: false,         // we render our own status bar
        onChange: (updatedContent, _prev, { contentErrors }) => {
          const valid = !contentErrors || contentErrors.validationErrors?.length === 0;
          setIsValid(valid);
          onContentChange?.(updatedContent, valid);
        },
      },
    });

    editorRef.current = editor;

    // CRITICAL FIX #1: focus after mount
    focusEditor(containerRef.current);

    return () => {
      editor.destroy();
      editorRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Mode changes ────────────────────────────────────────────────
  useEffect(() => {
    editorRef.current?.updateProps({ mode });
    // Re-focus after mode switch
    requestAnimationFrame(() => focusEditor(containerRef.current));
  }, [mode]);

  // ── Sync fileName to local state ────────────────────────────────
  useEffect(() => { setNameValue(fileName); }, [fileName]);

  // ── Imperative API ──────────────────────────────────────────────
  useImperativeHandle(ref, () => ({
    get: () => editorRef.current?.get() ?? { text: '' },
    set: (content) => {
      editorRef.current?.set(content);
      requestAnimationFrame(() => focusEditor(containerRef.current));
    },
    focus: () => focusEditor(containerRef.current),
    get mode() { return mode; },

    // Expose container for diff calculations
    getContainer: () => containerRef.current,
  }), [mode]);

  // ── Toolbar actions ─────────────────────────────────────────────
  const handleFormat = useCallback(() => {
    try {
      const content = editorRef.current?.get();
      const text = contentToText(content);
      const formatted = JSON.stringify(JSON.parse(text), null, 2);
      editorRef.current?.set({ text: formatted });
      onAction?.('Formatted JSON');
      focusEditor(containerRef.current);
    } catch (e) {
      onAction?.(`Format failed: ${e.message}`, 'error');
    }
  }, [onAction]);

  const handleCompact = useCallback(() => {
    try {
      const content = editorRef.current?.get();
      const text = contentToText(content);
      const compact = JSON.stringify(JSON.parse(text));
      editorRef.current?.set({ text: compact });
      onAction?.('Compacted JSON');
      focusEditor(containerRef.current);
    } catch (e) {
      onAction?.(`Compact failed: ${e.message}`, 'error');
    }
  }, [onAction]);

  const handleRepair = useCallback(() => {
    try {
      const content = editorRef.current?.get();
      const text = contentToText(content);
      // Basic repair: strip trailing commas, fix single quotes
      const repaired = text
        .replace(/,\s*([}\]])/g, '$1')   // trailing commas
        .replace(/([{,]\s*)'([^']+)'\s*:/g, '$1"$2":')  // single-quoted keys
        .replace(/:\s*'([^']*)'/g, ':"$1"')              // single-quoted values
        .trim();
      JSON.parse(repaired); // validate
      editorRef.current?.set({ text: repaired });
      onAction?.('Repaired JSON');
      focusEditor(containerRef.current);
    } catch (e) {
      onAction?.(`Repair failed: ${e.message}`, 'error');
    }
  }, [onAction]);

  const handleSort = useCallback(() => {
    try {
      const content = editorRef.current?.get();
      const text = contentToText(content);
      const obj = JSON.parse(text);
      const sorted = sortKeys(obj);
      editorRef.current?.set({ text: JSON.stringify(sorted, null, 2) });
      onAction?.('Sorted keys');
      focusEditor(containerRef.current);
    } catch (e) {
      onAction?.(`Sort failed: ${e.message}`, 'error');
    }
  }, [onAction]);

  const handleExpandAll = useCallback(() => {
    editorRef.current?.expand(() => true);
    onAction?.('Expanded all');
  }, [onAction]);

  const handleCollapseAll = useCallback(() => {
    editorRef.current?.expand(() => false);
    onAction?.('Collapsed all');
  }, [onAction]);

  // File open
  const handleOpenFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        editorRef.current?.set({ json: parsed });
        onFileNameChange?.(file.name);
        onAction?.(`Loaded ${file.name}`);
        requestAnimationFrame(() => focusEditor(containerRef.current));
      } catch (err) {
        onAction?.(`Parse error: ${err.message}`, 'error');
      }
    };
    reader.onerror = () => onAction?.('File read error', 'error');
    reader.readAsText(file);
    e.target.value = '';
  }, [onAction, onFileNameChange]);

  // Name editing
  const commitName = useCallback(() => {
    setEditingName(false);
    const trimmed = nameValue.trim() || fileName;
    setNameValue(trimmed);
    onFileNameChange?.(trimmed);
  }, [nameValue, fileName, onFileNameChange]);

  return (
    <div
      className={`editor-panel ${isActive ? 'editor-panel--active' : ''}`}
      onClick={onActivate}
    >
      {/* ── Panel header ── */}
      <div className="panel-header">
        {/* Doc name */}
        <div className="panel-docname" title="Click to rename">
          {editingName ? (
            <input
              className="panel-name-input"
              value={nameValue}
              autoFocus
              onChange={(e) => setNameValue(e.target.value)}
              onBlur={commitName}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitName();
                if (e.key === 'Escape') { setEditingName(false); setNameValue(fileName); }
              }}
            />
          ) : (
            <span
              className="panel-name-text"
              onClick={(e) => { e.stopPropagation(); setEditingName(true); }}
              title="Click to rename"
            >
              {fileName}
              <span className="panel-name-edit-icon"><IconEdit /></span>
            </span>
          )}
        </div>

        <div className="panel-header-spacer" />

        {/* Mode selector */}
        <select
          className="mode-select"
          value={mode}
          onChange={(e) => onModeChange?.(e.target.value)}
          title="Switch editor mode"
        >
          {MODES.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>

        {/* Toolbar */}
        <div className="panel-toolbar">
          <button className="icon-btn ph-btn" onClick={handleFormat} title="Format JSON (Ctrl+Shift+F)">
            <IconFormat />
          </button>
          <button className="icon-btn ph-btn" onClick={handleCompact} title="Compact JSON">
            <IconCompact />
          </button>
          <button className="icon-btn ph-btn" onClick={handleRepair} title="Repair JSON">
            <IconRepair />
          </button>
          <button className="icon-btn ph-btn" onClick={handleSort} title="Sort object keys">
            <IconSort />
          </button>
          <div className="ph-separator" />
          <button className="icon-btn ph-btn" onClick={handleExpandAll} title="Expand all nodes">
            <IconExpand />
          </button>
          <button className="icon-btn ph-btn" onClick={handleCollapseAll} title="Collapse all nodes">
            <IconCollapse />
          </button>
          <div className="ph-separator" />
          <button className="icon-btn ph-btn" onClick={handleOpenFile} title="Open file">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1Z"/>
            </svg>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json,.txt"
            hidden
            onChange={handleFileChange}
          />
        </div>

        {/* Validity indicator */}
        <div
          className={`validity-badge ${isValid ? 'validity-ok' : 'validity-err'}`}
          title={isValid ? 'Valid JSON' : 'Invalid JSON'}
        >
          {isValid ? '✓' : '✗'}
        </div>
      </div>

      {/* ── Editor mount ── */}
      <div
        ref={containerRef}
        className="editor-mount"
      />
    </div>
  );
});

export default EditorPanel;

/* ---- Helper: deep sort object keys ---- */
function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((k) => [k, sortKeys(value[k])])
    );
  }
  return value;
}
