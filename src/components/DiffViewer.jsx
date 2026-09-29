import { useMemo } from 'react';
import * as jsondiffpatch from 'jsondiffpatch';
import './DiffViewer.css';

/* Build a formatter that outputs HTML visually like JSONEditorOnline */
function formatDiff(left, right) {
  try {
    const delta = jsondiffpatch.diff(left, right);
    if (!delta) return null; // identical
    return { delta, left, right };
  } catch {
    return null;
  }
}

function renderDelta(delta, left, path = []) {
  if (delta === undefined) return null;

  const rows = [];

  // Array / object delta
  if (typeof delta === 'object' && !Array.isArray(delta)) {
    // Added (not present in left)
    if (delta[0] === undefined && delta[1] !== undefined && delta[2] === undefined) {
      // jsondiffpatch added: [newValue]
    }

    for (const key of Object.keys(delta)) {
      if (key === '_t') continue; // array marker

      const childDelta = delta[key];
      const childLeft  = left?.[key];
      const childPath  = [...path, key];
      const keyLabel   = path.length === 0 ? String(key) : String(key);

      if (Array.isArray(childDelta)) {
        if (childDelta.length === 1) {
          // Added
          rows.push(
            <tr key={childPath.join('.')} className="diff-row diff-added">
              <td className="diff-key">{keyLabel}</td>
              <td className="diff-old">—</td>
              <td className="diff-arrow">+</td>
              <td className="diff-new">{renderValue(childDelta[0])}</td>
            </tr>
          );
        } else if (childDelta.length === 2) {
          // Modified
          rows.push(
            <tr key={childPath.join('.')} className="diff-row diff-modified">
              <td className="diff-key">{keyLabel}</td>
              <td className="diff-old">{renderValue(childDelta[0])}</td>
              <td className="diff-arrow">~</td>
              <td className="diff-new">{renderValue(childDelta[1])}</td>
            </tr>
          );
        } else if (childDelta.length === 3 && childDelta[2] === 0) {
          // Deleted
          rows.push(
            <tr key={childPath.join('.')} className="diff-row diff-deleted">
              <td className="diff-key">{keyLabel}</td>
              <td className="diff-old">{renderValue(childDelta[0])}</td>
              <td className="diff-arrow">−</td>
              <td className="diff-new">—</td>
            </tr>
          );
        }
      } else if (typeof childDelta === 'object' && childDelta !== null) {
        // Nested
        const nestedRows = renderDelta(childDelta, childLeft, childPath);
        if (nestedRows?.length) {
          rows.push(
            <tr key={`${childPath.join('.')}-header`} className="diff-row diff-group-header">
              <td colSpan={4}>{keyLabel}</td>
            </tr>,
            ...nestedRows
          );
        }
      }
    }
  }

  return rows;
}

function renderValue(val) {
  if (val === null) return <span className="diff-null">null</span>;
  if (typeof val === 'boolean') return <span className="diff-bool">{String(val)}</span>;
  if (typeof val === 'number') return <span className="diff-num">{val}</span>;
  if (typeof val === 'string') return <span className="diff-str">"{val}"</span>;
  if (Array.isArray(val)) return <span className="diff-complex">[Array({val.length})]</span>;
  if (typeof val === 'object') return <span className="diff-complex">{`{${Object.keys(val).length} keys}`}</span>;
  return String(val);
}

export default function DiffViewer({ leftContent, rightContent }) {
  const left  = useMemo(() => parseContent(leftContent),  [leftContent]);
  const right = useMemo(() => parseContent(rightContent), [rightContent]);

  const diffResult = useMemo(() => formatDiff(left, right), [left, right]);

  if (!diffResult) {
    return (
      <div className="diff-viewer diff-identical">
        <div className="diff-identical-msg">
          <span className="diff-check">✓</span>
          Documents are identical
        </div>
      </div>
    );
  }

  const rows = renderDelta(diffResult.delta, diffResult.left);

  if (!rows || rows.length === 0) {
    return (
      <div className="diff-viewer diff-identical">
        <div className="diff-identical-msg">
          <span className="diff-check">✓</span>
          No structural differences detected
        </div>
      </div>
    );
  }

  return (
    <div className="diff-viewer">
      <div className="diff-legend">
        <span className="diff-legend-added">+ added</span>
        <span className="diff-legend-modified">~ modified</span>
        <span className="diff-legend-deleted">− deleted</span>
      </div>
      <div className="diff-table-wrap">
        <table className="diff-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Left (original)</th>
              <th></th>
              <th>Right (modified)</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}

function parseContent(content) {
  if (!content) return {};
  try {
    if (content.json !== undefined) return content.json;
    if (content.text !== undefined) return JSON.parse(content.text);
  } catch {
    // invalid JSON
  }
  return {};
}
