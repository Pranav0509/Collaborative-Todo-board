import React from 'react';
import { Users } from 'lucide-react';

const Header = ({ user, users }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">Webalar Dashboard</h1>
          <div className="users-info">
            <Users className="icon-md text-white-60" />
            <span className="users-info-text">{users.length} users online</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="users-avatars">
            {users.slice(0, 5).map(u => (
              <div
                key={u.id}
                className="user-avatar"
                style={{ backgroundColor: u.color }}
                title={u.name}
              >
                {u.name.charAt(0)}
              </div>
            ))}
          </div>
          <div className="welcome-text">
            Welcome, {user.name}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;