import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring';

const SignupForm = ({ onSubmit, onChange, errors, user, toast }) => (
  <Spring delay={300} from={{ opacity: 0 }} to={{ opacity: 1 }}>
    {({ opacity }) => (
      <div className="login-container" style={{ opacity }}>
        <h1 className="login-header">Sign Up</h1>
        <div className="signup-card">
          <form name="form" onSubmit={onSubmit}>
            <div className="form-group-signup">
              <input
                placeholder="name"
                type="text"
                className="form-control"
                name="name"
                value={user.value}
                onChange={onChange}
              />
              {errors && <p className="error-msg">{errors.name}</p>}
            </div>
            <div className="form-group-signup ">
              <input
                placeholder="email"
                type="text"
                className="form-control"
                name="email"
                value={user.value}
                onChange={onChange}
              />
              {errors && <p className="error-msg">{errors.email}</p>}
            </div>
            <div className="form-group-signup">
              <input
                placeholder="password"
                type="password"
                className="form-control"
                name="password"
                value={user.value}
                onChange={onChange}
              />
              {errors && <p className="error-msg">{errors.password}</p>}
            </div>
            <button onClick={onSubmit}>SIGN UP</button>
          </form>
          <div className="signup-line">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
        {toast}
      </div>
    )}
  </Spring>
);

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignupForm;
