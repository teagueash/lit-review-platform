import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring';

const LoginForm = ({ onSubmit, onChange, errors, user, open }) => (
  <Fragment>
    <Spring delay={300} from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {({ opacity }) => (
        <div className="login-container" style={{ opacity }}>
          <h1 className="login-header">Log In</h1>
          <div className="login-card">
            <form name="form" onSubmit={onSubmit}>
              <div className="form-group">
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
              <div className="form-group">
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
              <button onClick={onSubmit}>LOG IN</button>
            </form>
            <div className="signup-line">
              Don't have an account?{' '}
              <Link to="/verifyAuthorize">See if you're verified</Link>
            </div>
          </div>
        </div>
      )}
    </Spring>
  </Fragment>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
