import { useEffect, useRef } from 'react';
import './Notification.css';

const ICONS = {
  info:    '💬',
  success: '✅',
  warning: '⚠️',
  error:   '❌',
};

function NotificationItem({ notif, onRemove }) {
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => onRemove(notif.id), 3500);
    return () => clearTimeout(timerRef.current);
  }, [notif.id, onRemove]);

  return (
    <div className={`notif notif-${notif.type}`} role="alert">
      <span className="notif-icon">{ICONS[notif.type] ?? '💬'}</span>
      <span className="notif-msg">{notif.message}</span>
      <button className="notif-close icon-btn" onClick={() => onRemove(notif.id)} aria-label="Dismiss">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z"/>
        </svg>
      </button>
    </div>
  );
}

export default function Notification({ notifications, onRemove }) {
  if (!notifications.length) return null;
  return (
    <div className="notif-stack" aria-live="polite">
      {notifications.map((n) => (
        <NotificationItem key={n.id} notif={n} onRemove={onRemove} />
      ))}
    </div>
  );
}
