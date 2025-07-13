import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import './styles.css';

const TaskForm = ({ onCreateTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onCreateTask(formData);
      setFormData({
        title: '',
        description: '',
        status: 'todo'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="form-card">
      <h2 className="form-title">Quick Add Task</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task title"
            className="input-field"
            required
          />
          
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select-field"
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
          
          <button type="submit" className="btn-primary">
            <Plus className="icon-sm" />
            Add
          </button>
        </div>
        
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task description (optional)"
          className="textarea-field"
          rows={2}
        />
      </form>
    </div>
  );
};

export default TaskForm;