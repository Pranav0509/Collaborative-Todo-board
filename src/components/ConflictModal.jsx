import React from 'react';
import { AlertCircle } from 'lucide-react';
import './styles.css';

const ConflictModal = ({ show, onClose, onKeepMine, onKeepTheirs }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <AlertCircle className="icon-md text-warning" />
          <h3 className="modal-title">Conflict Detected</h3>
        </div>
        
        <p className="modal-text">
          Multiple users have edited the same task. Please choose which version to keep:
        </p>
        
        <div className="modal-actions">
          <button
            onClick={onKeepMine}
            className="btn-modal btn-modal-success"
          >
            Keep Mine
          </button>
          <button
            onClick={onKeepTheirs}
            className="btn-modal btn-modal-primary"
          >
            Keep Theirs
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConflictModal;