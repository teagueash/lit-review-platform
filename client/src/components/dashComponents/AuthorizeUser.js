import React, { Component } from 'react';
import { Spring } from 'react-spring';
import { userAPI } from '../../API';

class AuthorizeUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentID: '',
      errors: '',
      success: ''
    };
  }

  submitAuthRequest = async () => {
    const { studentID } = this.state;

    const res = await userAPI.authorizeUser(studentID);
    if (res.status === 200) {
      // all set, call delay function then redirect
      const { message } = res.data;
      this.setState({ success: message });
    } else {
      // error occurred, set error state
      const { message } = res.response.data;
      this.setState({ errors: message });
    }
  };

  setStudentID = studentID => {
    this.setState({ studentID });
  };

  handleChange = e => {
    e.preventDefault();
    // validate form, if empty do not set topic
    this.setStudentID(e.target.value);
  };

  render() {
    const { errors, success } = this.state;

    return (
      <Spring delay={300} from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {({ opacity }) => (
          <div style={{ opacity }} className="authorize-container">
            <h1 className="dash-title-text">AUTHORIZE</h1>
            {success && <p className="dash-auth-scss-msg">{success}</p>}
            {errors && <p className="dash-auth-error-msg">{errors}</p>}
            <div className="form-group">
              <input
                placeholder="ENTER A STUDENT ID"
                type="text"
                className="form-control"
                name="text"
                value={this.state.studentID}
                onChange={this.handleChange}
              />
              <button
                style={{ opacity }}
                onClick={this.submitAuthRequest}
                type={'submit'}
                className={'authorize-button'}
              >
                SUBMIT
              </button>
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default AuthorizeUsers;
