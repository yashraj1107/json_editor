import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// StrictMode removed: vanilla-jsoneditor uses an imperative API that
// gets double-mounted in StrictMode (dev), causing cursor/focus issues.
createRoot(document.getElementById('root')).render(<App />);
