import React from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring';

const AuthorizeForm = ({ onSubmit, onChange, value, errors }) => (
  <Spring delay={300} from={{ opacity: 0 }} to={{ opacity: 1 }}>
    {({ opacity }) => (
      <div className="authorize-container" style={{ opacity }}>
        <h1 className="authorize-header">Authorization</h1>
        <div className="authorize-card">
          <form name="form">
            <div className="form-group-signup">
              <input
                placeholder="USC ID"
                type="text"
                className="form-control"
                name="ID"
                value={value}
                onChange={onChange}
              />
              {errors && <p className="error-msg">{errors.verify}</p>}
            </div>

            <button type="button" onClick={onSubmit}>
              Verify
            </button>
          </form>
        </div>
      </div>
    )}
  </Spring>
);

AuthorizeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

export default AuthorizeForm;
