import React from 'react';
import { User, Trash2 } from 'lucide-react';
import './styles.css';

const TaskCard = ({ 
  task, 
  assignedUser, 
  onDragStart, 
  onDelete, 
  onSmartAssign, 
  formatTime 
}) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task)}
    >
      <div className="task-header">
        <div className="task-title-row">
          <div className={`priority-dot ${getPriorityClass(task.priority)}`} />
          <h4 className="task-title">{task.title}</h4>
        </div>
        
        <div className="task-actions">
          <button
            onClick={() => onSmartAssign(task.id)}
            className="btn-icon btn-icon-text"
            title="Smart Assign"
          >
            <User className="icon-sm" />
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="btn-icon btn-icon-danger"
            title="Delete Task"
          >
            <Trash2 className="icon-sm" />
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-footer">
        <div className="task-assignee">
          {assignedUser && (
            <div
              className="assignee-avatar"
              style={{ backgroundColor: assignedUser.color }}
              title={assignedUser.name}
            >
              {assignedUser.name.charAt(0)}
            </div>
          )}
          <span className="assignee-name">
            {assignedUser?.name || 'Unassigned'}
          </span>
        </div>
        
        <span className="task-time">
          {formatTime(task.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;