import React, { useState, useEffect, useRef } from 'react';
import LoginForm from './LoginForm';
import Header from './Header';
import TaskForm from './TaskForm';
import KanbanBoard from './KanbanBoard';
import ActivityLog from './ActivityLog';
import ConflictModal from './ConflictModal';
import './styles.css';

const CollaborativeTodoBoard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [conflictTasks, setConflictTasks] = useState([]);
  const [showConflictModal, setShowConflictModal] = useState(false);
  
  const wsRef = useRef(null);

  // Mock WebSocket simulation
  useEffect(() => {
    // Simulate WebSocket connection
    const mockWebSocket = {
      send: (data) => {
        // Simulate real-time updates
        const message = JSON.parse(data);
        setTimeout(() => {
          handleWebSocketMessage(message);
        }, 100);
      },
      close: () => {},
      readyState: 1
    };
    wsRef.current = mockWebSocket;

    // Initialize with sample data
    const sampleUsers = [
      { id: '1', name: 'Alice Johnson', email: 'alice@example.com', color: '#3b82f6' },
      { id: '2', name: 'Bob Smith', email: 'bob@example.com', color: '#10b981' },
      { id: '3', name: 'Carol Davis', email: 'carol@example.com', color: '#f59e0b' }
    ];
    setUsers(sampleUsers);

    const sampleTasks = [
      { id: '1', title: 'Setup Project Structure', description: 'Initialize the project with necessary dependencies', assignedTo: '1', status: 'todo', priority: 'high', createdAt: new Date().toISOString() },
      { id: '2', title: 'Design Database Schema', description: 'Create tables for users and tasks', assignedTo: '2', status: 'inProgress', priority: 'medium', createdAt: new Date().toISOString() },
      { id: '3', title: 'Create Login System', description: 'Implement authentication with JWT', assignedTo: '3', status: 'done', priority: 'high', createdAt: new Date().toISOString() }
    ];
    setTasks(sampleTasks);

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleWebSocketMessage = (message) => {
    switch (message.type) {
      case 'task_updated':
        setTasks(prev => prev.map(task => 
          task.id === message.task.id ? message.task : task
        ));
        addToActivityLog(`Task "${message.task.title}" updated by ${message.user.name}`);
        break;
      case 'task_created':
        setTasks(prev => [...prev, message.task]);
        addToActivityLog(`Task "${message.task.title}" created by ${message.user.name}`);
        break;
      case 'task_deleted':
        setTasks(prev => prev.filter(task => task.id !== message.taskId));
        addToActivityLog(`Task deleted by ${message.user.name}`);
        break;
      case 'conflict_detected':
        setConflictTasks(message.conflicts);
        setShowConflictModal(true);
        break;
    }
  };

  const addToActivityLog = (action) => {
    const logEntry = {
      id: Date.now(),
      action,
      timestamp: new Date().toISOString(),
      user: user?.name || 'Anonymous'
    };
    setActivityLog(prev => [logEntry, ...prev].slice(0, 20));
  };

  const handleLogin = (email, password, name) => {
    // Simulate login
    const mockUser = {
      id: Date.now().toString(),
      name: name || email.split('@')[0],
      email,
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    };
    setUser(mockUser);
    setUsers(prev => [...prev, mockUser]);
    addToActivityLog(`${mockUser.name} joined the board`);
  };

  const handleRegister = (email, password, name) => {
    handleLogin(email, password, name);
  };

  const createTask = (formData) => {
    const existingTitles = tasks.map(t => t.title.toLowerCase());
    if (existingTitles.includes(formData.title.toLowerCase())) {
      alert('Task title must be unique!');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      assignedTo: user.id,
      status: formData.status,
      priority: 'medium',
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    setTasks(prev => [...prev, newTask]);
    addToActivityLog(`Created task "${newTask.title}"`);
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, lastModified: new Date().toISOString() }
        : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      addToActivityLog(`Updated task "${task.title}"`);
    }
  };

  const deleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setTasks(prev => prev.filter(t => t.id !== taskId));
    if (task) {
      addToActivityLog(`Deleted task "${task.title}"`);
    }
  };

  const smartAssignTask = (taskId) => {
    const userTaskCounts = users.map(u => ({
      user: u,
      count: tasks.filter(t => t.assignedTo === u.id && t.status !== 'done').length
    }));
    
    const userWithFewestTasks = userTaskCounts.reduce((min, current) => 
      current.count < min.count ? current : min
    );
    
    updateTask(taskId, { assignedTo: userWithFewestTasks.user.id });
    addToActivityLog(`Smart assigned task to ${userWithFewestTasks.user.name}`);
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      updateTask(draggedTask.id, { status: newStatus });
      addToActivityLog(`Moved "${draggedTask.title}" to ${newStatus}`);
    }
    setDraggedTask(null);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleConflictResolution = (keepMine) => {
    setShowConflictModal(false);
    addToActivityLog(`Conflict resolved: ${keepMine ? 'kept local changes' : 'kept remote changes'}`);
  };

  if (!user) {
    return (
      <LoginForm 
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    );
  }

  return (
    <div className="app-container">
      <Header user={user} users={users} />
      
      <div className="main-content">
        <div className="board-layout">
          <div className="board-section">
            <TaskForm onCreateTask={createTask} />
            <KanbanBoard 
              tasks={tasks}
              users={users}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onDeleteTask={deleteTask}
              onSmartAssign={smartAssignTask}
              formatTime={formatTime}
            />
          </div>
          
          <ActivityLog 
            activityLog={activityLog}
            formatTime={formatTime}
          />
        </div>
      </div>

      <ConflictModal 
        show={showConflictModal}
        onClose={() => setShowConflictModal(false)}
        onKeepMine={() => handleConflictResolution(true)}
        onKeepTheirs={() => handleConflictResolution(false)}
      />
    </div>
  );
};

export default CollaborativeTodoBoard;