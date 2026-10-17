import React, { useEffect } from 'react';
import type { Difficulty, GameMode } from '../types';
import { sound } from '../services/sound';

interface ResetModalProps {
  isOpen: boolean;
  mode: GameMode;
  difficulty: Difficulty;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  mode,
  difficulty,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const modeName =
    mode === 'local'
      ? '2-Player Local'
      : `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} AI`;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
      aria-describedby="reset-modal-desc"
      onClick={onCancel}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon-header">
          <span className="modal-icon">⚠️</span>
        </div>
        <h3 id="reset-modal-title" className="modal-title">
          Reset Scores?
        </h3>
        <p id="reset-modal-desc" className="modal-description">
          Are you sure you want to reset all tracked wins and ties for{' '}
          <strong>{modeName}</strong>? This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="btn-modal-cancel"
            onClick={() => {
              sound.playButtonClick();
              onCancel();
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-modal-confirm"
            onClick={() => {
              sound.playButtonClick();
              onConfirm();
            }}
          >
            Reset Scores
          </button>
        </div>
      </div>
    </div>
  );
};
