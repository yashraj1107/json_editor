import { useRef, useState, useCallback, useEffect } from 'react';
import TopBar          from './components/TopBar.jsx';
import EditorPanel     from './components/EditorPanel.jsx';
import CenterPanel     from './components/CenterPanel.jsx';
import DiffViewer      from './components/DiffViewer.jsx';
import StatusBar       from './components/StatusBar.jsx';
import Notification    from './components/Notification.jsx';
import SettingsPanel   from './components/SettingsPanel.jsx';
import KeyboardShortcuts from './components/KeyboardShortcuts.jsx';
import AboutPanel      from './components/AboutPanel.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { useDragAndDrop }  from './hooks/useDragAndDrop.js';
import './App.css';
import 'vanilla-jsoneditor/themes/jse-theme-dark.css';


/* ── Default initial documents ── */
const DEFAULT_LEFT = {
  text: JSON.stringify({ "welcome": "JSON Editor Online", "mode": "text", "tip": "Start editing or open a file" }, null, 2),
};
const DEFAULT_RIGHT = {
  text: JSON.stringify({ "compare": "Use the → / ← buttons to copy between panels", "diff": "Enable diff mode to see changes" }, null, 2),
};

let notifCounter = 0;

export default function App() {
  // ── Editor refs ──────────────────────────────────────────────────
  const leftRef  = useRef(null);
  const rightRef = useRef(null);
  const leftFileInputRef  = useRef(null);
  const rightFileInputRef = useRef(null);

  // ── Persisted settings ───────────────────────────────────────────
  const [theme,        setTheme]       = useLocalStorage('jse-theme',         'dark');
  const [leftMode,     setLeftMode]    = useLocalStorage('jse-left-mode',     'text');
  const [rightMode,    setRightMode]   = useLocalStorage('jse-right-mode',    'tree');
  const [autosave,     setAutosave]    = useLocalStorage('jse-autosave',      true);
  const [indent,       setIndent]      = useLocalStorage('jse-indent',        2);

  // ── Session state (not persisted directly; content saved separately) ──
  const [leftFileName,  setLeftFileName]  = useState('New document 1');
  const [rightFileName, setRightFileName] = useState('New document 2');
  const [leftModified,  setLeftModified]  = useState(false);
  const [rightModified, setRightModified] = useState(false);
  const [leftValid,     setLeftValid]     = useState(true);
  const [rightValid,    setRightValid]    = useState(true);

  // ── UI state ─────────────────────────────────────────────────────
  const [activePanel,   setActivePanel]   = useState('left');
  const [compareMode,   setCompareMode]   = useLocalStorage('jse-compare', false);
  const [leftContent,   setLeftContent]   = useState(null);
  const [rightContent,  setRightContent]  = useState(null);
  const [isFullscreen,  setIsFullscreen]  = useState(false);
  const [lastAction,    setLastAction]    = useState('');
  const [notifications, setNotifications] = useState([]);
  const [settingsOpen,  setSettingsOpen]  = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [aboutOpen,     setAboutOpen]     = useState(false);

  // ── autosave debounce ────────────────────────────────────────────
  const leftSaveTimer  = useRef(null);
  const rightSaveTimer = useRef(null);
  const actionTimer    = useRef(null);

  // ── Notification helper ──────────────────────────────────────────
  const notify = useCallback((message, type = 'info') => {
    const id = ++notifCounter;
    setNotifications((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeNotif = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // ── Status action helper ─────────────────────────────────────────
  const doAction = useCallback((message, type = 'info') => {
    setLastAction(message);
    clearTimeout(actionTimer.current);
    actionTimer.current = setTimeout(() => setLastAction(''), 4000);
    if (type === 'error') notify(message, 'error');
    else if (type === 'success') notify(message, 'success');
  }, [notify]);

  // ── Apply theme to body ──────────────────────────────────────────
  useEffect(() => {
    document.body.classList.toggle('jse-theme-dark',  theme === 'dark');
    document.body.classList.toggle('jse-theme-light', theme === 'light');
  }, [theme]);

  // ── Restore session from localStorage on mount ───────────────────
  useEffect(() => {
    if (!autosave) return;
    try {
      const ls = localStorage.getItem('jse-left-session');
      const rs = localStorage.getItem('jse-right-session');
      if (ls) {
        const { fileName } = JSON.parse(ls);
        if (fileName) setLeftFileName(fileName);
      }
      if (rs) {
        const { fileName } = JSON.parse(rs);
        if (fileName) setRightFileName(fileName);
      }
    } catch {
      // corrupted — ignore
    }
  }, []); // eslint-disable-line

  // ── Autosave content on change ───────────────────────────────────
  const handleLeftChange = useCallback((content, valid) => {
    setLeftValid(valid ?? true);
    setLeftModified(true);
    setLeftContent(content);

    if (autosave) {
      clearTimeout(leftSaveTimer.current);
      leftSaveTimer.current = setTimeout(() => {
        try {
          const text = content.text ?? JSON.stringify(content.json ?? '');
          localStorage.setItem('jse-left-content', text);
          localStorage.setItem('jse-left-session', JSON.stringify({ fileName: leftFileName }));
        } catch { /* quota exceeded */ }
      }, 1000);
    }
  }, [autosave, leftFileName]);

  const handleRightChange = useCallback((content, valid) => {
    setRightValid(valid ?? true);
    setRightModified(true);
    setRightContent(content);

    if (autosave) {
      clearTimeout(rightSaveTimer.current);
      rightSaveTimer.current = setTimeout(() => {
        try {
          const text = content.text ?? JSON.stringify(content.json ?? '');
          localStorage.setItem('jse-right-content', text);
          localStorage.setItem('jse-right-session', JSON.stringify({ fileName: rightFileName }));
        } catch { /* quota exceeded */ }
      }, 1000);
    }
  }, [autosave, rightFileName]);

  // ── New document ─────────────────────────────────────────────────
  const handleNew = useCallback((side = activePanel) => {
    const ref = side === 'left' ? leftRef : rightRef;
    const setName = side === 'left' ? setLeftFileName : setRightFileName;
    const setModified = side === 'left' ? setLeftModified : setRightModified;
    const n = Date.now();
    const name = `New document ${n % 1000}`;
    ref.current?.set({ text: '' });
    setName(name);
    setModified(false);
    ref.current?.focus();
    doAction(`New document created (${side})`);
  }, [activePanel, doAction]);

  // ── Open file ────────────────────────────────────────────────────
  const handleOpen = useCallback((side = activePanel) => {
    if (side === 'left') leftFileInputRef.current?.click();
    else rightFileInputRef.current?.click();
  }, [activePanel]);

  const loadFile = useCallback((file, side) => {
    const ref = side === 'left' ? leftRef : rightRef;
    const setName = side === 'left' ? setLeftFileName : setRightFileName;
    const setModified = side === 'left' ? setLeftModified : setRightModified;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        ref.current?.set({ json: parsed });
        setName(file.name);
        setModified(false);
        doAction(`Loaded ${file.name}`, 'success');
        ref.current?.focus();
      } catch (err) {
        doAction(`Parse error in ${file.name}: ${err.message}`, 'error');
      }
    };
    reader.onerror = () => doAction('File read error', 'error');
    reader.readAsText(file);
  }, [doAction]);

  // ── Save/download ────────────────────────────────────────────────
  const handleSave = useCallback((side = activePanel) => {
    const ref = side === 'left' ? leftRef : rightRef;
    const fileName = side === 'left' ? leftFileName : rightFileName;
    const setModified = side === 'left' ? setLeftModified : setRightModified;
    try {
      const content = ref.current?.get() ?? { text: '' };
      const jsonText = content.json !== undefined
        ? JSON.stringify(content.json, null, indent)
        : content.text ?? '';
      const blob = new Blob([jsonText], { type: 'application/json' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = fileName.endsWith('.json') ? fileName : `${fileName}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setModified(false);
      doAction(`Saved ${a.download}`, 'success');
    } catch (err) {
      doAction(`Save failed: ${err.message}`, 'error');
    }
  }, [activePanel, leftFileName, rightFileName, indent, doAction]);

  // ── Clipboard copy ───────────────────────────────────────────────
  const handleCopyClipboard = useCallback(async (side = activePanel) => {
    const ref = side === 'left' ? leftRef : rightRef;
    try {
      const content = ref.current?.get() ?? { text: '' };
      const text = content.json !== undefined
        ? JSON.stringify(content.json, null, indent)
        : content.text ?? '';
      await navigator.clipboard.writeText(text);
      doAction('Copied to clipboard', 'success');
    } catch (err) {
      doAction(`Clipboard copy failed: ${err.message}`, 'error');
    }
  }, [activePanel, indent, doAction]);

  // ── Clipboard paste ──────────────────────────────────────────────
  const handlePasteClipboard = useCallback(async (side = activePanel) => {
    const ref = side === 'left' ? leftRef : rightRef;
    try {
      const text = await navigator.clipboard.readText();
      // Try parse first, fall back to text
      try {
        const parsed = JSON.parse(text);
        ref.current?.set({ json: parsed });
      } catch {
        ref.current?.set({ text });
      }
      doAction('Pasted from clipboard', 'success');
      ref.current?.focus();
    } catch (err) {
      doAction(`Clipboard paste failed: ${err.message}`, 'error');
    }
  }, [activePanel, doAction]);

  // ── Copy between panels ──────────────────────────────────────────
  const copyLeftToRight = useCallback(() => {
    try {
      const content = leftRef.current?.get() ?? { text: '' };
      rightRef.current?.set(content);
      setRightModified(true);
      doAction('Copied left → right');
    } catch (err) {
      doAction(`Copy failed: ${err.message}`, 'error');
    }
  }, [doAction]);

  const copyRightToLeft = useCallback(() => {
    try {
      const content = rightRef.current?.get() ?? { text: '' };
      leftRef.current?.set(content);
      setLeftModified(true);
      doAction('Copied right → left');
    } catch (err) {
      doAction(`Copy failed: ${err.message}`, 'error');
    }
  }, [doAction]);

  // ── Transform (placeholder) ──────────────────────────────────────
  const handleTransformRight = useCallback(() => {
    doAction('Transform: coming soon');
    notify('Transform feature coming soon', 'info');
  }, [doAction, notify]);

  const handleTransformLeft = useCallback(() => {
    doAction('Transform: coming soon');
    notify('Transform feature coming soon', 'info');
  }, [doAction, notify]);

  // ── Fullscreen ───────────────────────────────────────────────────
  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // ── Drag-and-drop ────────────────────────────────────────────────
  useDragAndDrop(loadFile, (msg) => doAction(msg, 'error'));

  // ── Global keyboard shortcuts ────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      const ctrl  = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;

      if (ctrl && !shift && e.key === 'n') { e.preventDefault(); handleNew(); }
      if (ctrl && !shift && e.key === 'o') { e.preventDefault(); handleOpen(); }
      if (ctrl && !shift && e.key === 's') { e.preventDefault(); handleSave(); }
      if (ctrl && shift  && e.key === 'C') { e.preventDefault(); handleCopyClipboard(); }
      if (ctrl && shift  && e.key === 'V') { e.preventDefault(); handlePasteClipboard(); }
      if (ctrl && e.key === 'ArrowRight')  { e.preventDefault(); copyLeftToRight(); }
      if (ctrl && e.key === 'ArrowLeft')   { e.preventDefault(); copyRightToLeft(); }
      if (e.key === 'F11') { e.preventDefault(); handleFullscreen(); }
      if (e.key === '?' && !ctrl && !e.target?.matches('input, textarea, [contenteditable]')) {
        setShortcutsOpen(true);
      }
      if (e.key === 'Tab' && !ctrl && !shift && !e.target?.matches('input, textarea, [contenteditable], select')) {
        e.preventDefault();
        setActivePanel((p) => p === 'left' ? 'right' : 'left');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [
    handleNew, handleOpen, handleSave,
    handleCopyClipboard, handlePasteClipboard,
    copyLeftToRight, copyRightToLeft, handleFullscreen,
  ]);

  // ── Determine initial content (restore from localStorage if available) ──
  const getInitialContent = useCallback((side, defaultContent) => {
    if (!autosave) return defaultContent;
    try {
      const saved = localStorage.getItem(`jse-${side}-content`);
      if (saved) return { text: saved };
    } catch { /* ignore */ }
    return defaultContent;
  }, [autosave]);

  // ── Layout ───────────────────────────────────────────────────────
  return (
    <div className={`app ${theme}`} id="app-root">
      {/* Hidden file inputs for TopBar Open action */}
      <input
        ref={leftFileInputRef}
        type="file"
        accept=".json,application/json,.txt"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) loadFile(f, 'left');
          e.target.value = '';
        }}
      />
      <input
        ref={rightFileInputRef}
        type="file"
        accept=".json,application/json,.txt"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) loadFile(f, 'right');
          e.target.value = '';
        }}
      />

      {/* ── Top Application Bar ── */}
      <TopBar
        theme={theme}
        onThemeToggle={() => setTheme((t) => t === 'dark' ? 'light' : 'dark')}
        onNew={handleNew}
        onOpen={handleOpen}
        onSave={handleSave}
        onCopyClipboard={handleCopyClipboard}
        onPasteClipboard={handlePasteClipboard}
        isFullscreen={isFullscreen}
        onFullscreenToggle={handleFullscreen}
        onSettings={() => setSettingsOpen(true)}
        onShortcuts={() => setShortcutsOpen(true)}
        onAbout={() => setAboutOpen(true)}
        activePanel={activePanel}
      />

      {/* ── Main panels area ── */}
      <main className="main-area">
        {/* Left editor */}
        <EditorPanel
          ref={leftRef}
          side="left"
          fileName={leftFileName}
          onFileNameChange={setLeftFileName}
          mode={leftMode}
          onModeChange={setLeftMode}
          initialContent={getInitialContent('left', DEFAULT_LEFT)}
          onContentChange={handleLeftChange}
          onAction={(msg, type) => doAction(msg, type)}
          isActive={activePanel === 'left'}
          onActivate={() => setActivePanel('left')}
        />

        {/* Center controls */}
        <CenterPanel
          onCopyLeft={copyRightToLeft}
          onCopyRight={copyLeftToRight}
          compareMode={compareMode}
          onCompareToggle={() => setCompareMode((c) => !c)}
          onTransformLeft={handleTransformLeft}
          onTransformRight={handleTransformRight}
        />

        {/* Right editor */}
        <EditorPanel
          ref={rightRef}
          side="right"
          fileName={rightFileName}
          onFileNameChange={setRightFileName}
          mode={rightMode}
          onModeChange={setRightMode}
          initialContent={getInitialContent('right', DEFAULT_RIGHT)}
          onContentChange={handleRightChange}
          onAction={(msg, type) => doAction(msg, type)}
          isActive={activePanel === 'right'}
          onActivate={() => setActivePanel('right')}
        />
      </main>

      {/* ── Diff viewer (shown when compare mode active) ── */}
      {compareMode && (
        <div className="diff-panel">
          <div className="diff-panel-header">
            <span>Diff: Left vs Right</span>
            <button
              className="icon-btn diff-close-btn"
              onClick={() => setCompareMode(false)}
              title="Close diff"
            >
              ✕
            </button>
          </div>
          <DiffViewer
            leftContent={leftContent}
            rightContent={rightContent}
          />
        </div>
      )}

      {/* ── Status Bar ── */}
      <StatusBar
        activePanel={activePanel}
        leftSession={{ fileName: leftFileName, mode: leftMode, modified: leftModified }}
        rightSession={{ fileName: rightFileName, mode: rightMode, modified: rightModified }}
        leftValid={leftValid}
        rightValid={rightValid}
        lastAction={lastAction}
      />

      {/* ── Toast notifications ── */}
      <Notification notifications={notifications} onRemove={removeNotif} />

      {/* ── Modals ── */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
        leftMode={leftMode}
        rightMode={rightMode}
        onLeftModeChange={setLeftMode}
        onRightModeChange={setRightMode}
        indent={indent}
        onIndentChange={setIndent}
        autosave={autosave}
        onAutosaveChange={setAutosave}
      />
      <KeyboardShortcuts
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
      <AboutPanel
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />
    </div>
  );
}