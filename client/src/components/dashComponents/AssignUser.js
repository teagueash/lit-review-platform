import React from 'react';
import { Spring } from 'react-spring';

const AssignUser = ({ allUsers, setUser }) => (
  <Spring delay={300} from={{ opacity: 0 }} to={{ opacity: 1 }}>
    {({ opacity }) => (
      <div style={{ opacity }}>
        <h3 className="assign-direction">Choose a Student</h3>
        <div className="assign-carousel-content">
          {allUsers.map(user => (
            <div
              onClick={() => setUser(user)}
              key={user.name}
              className="assign-user-card"
            >
              <h4>{user.name}</h4>
            </div>
          ))}
        </div>
      </div>
    )}
  </Spring>
);

export default AssignUser;
