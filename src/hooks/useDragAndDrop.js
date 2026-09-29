import { useEffect, useCallback } from 'react';

/**
 * Registers global drag-and-drop handlers on the document.
 * Calls onFileDrop(file, side) where side is 'left' or 'right'
 * depending on which horizontal half of the window the file was dropped.
 */
export function useDragAndDrop(onFileDrop, onError) {
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const jsonFile = files.find(
      (f) => f.type === 'application/json' || f.name.endsWith('.json') || f.name.endsWith('.txt')
    );

    if (!jsonFile) {
      onError?.('Please drop a valid JSON file (.json)');
      return;
    }

    // Determine left vs right based on drop x position
    const side = e.clientX < window.innerWidth / 2 ? 'left' : 'right';
    onFileDrop(jsonFile, side);
  }, [onFileDrop, onError]);

  useEffect(() => {
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);
    return () => {
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
    };
  }, [handleDragOver, handleDrop]);
}
