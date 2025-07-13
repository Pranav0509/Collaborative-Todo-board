import React from 'react';
import TaskCard from './TaskCard';
import './styles.css';

const KanbanBoard = ({ 
  tasks, 
  users, 
  onDragOver, 
  onDrop, 
  onDragStart, 
  onDeleteTask, 
  onSmartAssign, 
  formatTime 
}) => {
  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ];

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getUserById = (userId) => {
    return users.find(u => u.id === userId);
  };

  return (
    <div className="kanban-grid">
      {columns.map(column => (
        <div
          key={column.id}
          className="kanban-column"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, column.id)}
        >
          <div className="column-header">
            <h3 className="column-title">{column.title}</h3>
            <span className="column-count">
              {getTasksByStatus(column.id).length}
            </span>
          </div>
          
          <div className="tasks-container">
            {getTasksByStatus(column.id).map(task => (
              <TaskCard
                key={task.id}
                task={task}
                assignedUser={getUserById(task.assignedTo)}
                onDragStart={onDragStart}
                onDelete={onDeleteTask}
                onSmartAssign={onSmartAssign}
                formatTime={formatTime}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;