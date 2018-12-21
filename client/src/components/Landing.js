import React, { Component, Fragment } from 'react';
import { Spring } from 'react-spring';
import { Link, Redirect } from 'react-router-dom';
import { userActions } from '../actions';
import { connect } from 'react-redux';
import auth from '../modules/auth';
import clipart from '../images/researcher.png';

class Landing extends Component {
  // handle auto log in if valid token found in session storage
  componentDidMount() {
    const { dispatch } = this.props;
    const token = auth.getToken();
    if (auth.isAuthenticated()) {
      dispatch(userActions.autoLogin(token));
    }
  }

  render() {
    const { redirect, user } = this.props;

    return (
      <Fragment>
        {redirect === false ? (
          <Spring delay={300} from={{ opacity: 0 }} to={{ opacity: 1 }}>
            {({ opacity }) => (
              <Fragment>
                <div
                  className="landing-container flex-container"
                  style={{ opacity }}
                >
                  <div className={'landing-left flex-item-landing'}>
                    <h1>LIT REVIEWS. MADE EASY.</h1>
                    <p>
                      Introducing a platform to help manage lit reviews and
                      automate work flow
                    </p>
                    <Link className={'landing-button'} to={'/verifyAuthorize'}>
                      GET STARTED
                    </Link>
                  </div>
                  <div className="landing-right flex-item-landing">
                    <img src={clipart} alt="worker" />
                  </div>
                </div>
              </Fragment>
            )}
          </Spring>
        ) : (
          <Redirect to="/user" />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { redirect, user } = state.authentication;

  return {
    redirect,
    user
  };
};

export default connect(mapStateToProps)(Landing);
