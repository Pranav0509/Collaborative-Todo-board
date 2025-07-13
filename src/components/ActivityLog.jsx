import React from 'react';
import { Clock } from 'lucide-react';
import './styles.css';

const ActivityLog = ({ activityLog, formatTime }) => {
  return (
    <div className="activity-log">
      <div className="activity-header">
        <Clock className="icon-md text-white-60" />
        <h3 className="activity-title">Activity Log</h3>
      </div>
      
      <div className="activity-list">
        {activityLog.map(entry => (
          <div key={entry.id} className="activity-item">
            <p className="activity-text">{entry.action}</p>
            <div className="activity-meta">
              <span className="activity-user">{entry.user}</span>
              <span className="activity-time">{formatTime(entry.timestamp)}</span>
            </div>
          </div>
        ))}
        
        {activityLog.length === 0 && (
          <div className="activity-empty">
            No recent activity
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;