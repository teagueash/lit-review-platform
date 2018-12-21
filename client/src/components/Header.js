import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Keyframes, animated, config } from 'react-spring';
import { userActions } from '../actions';

const fast = {
  ...config.stiff,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 0.01
};

// Creates a spring with predefined animation slots
const SpringSidebar = Keyframes.Spring({
  // Slots can take arrays/chains,
  peek: [{ delay: 100, from: { y: -100 }, to: { y: 0 }, config: fast }]
});

class Header extends Component {
  logout = () => {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  };

  renderContent() {
    const { redirect } = this.props;

    switch (redirect) {
      case true:
        return (
          <div className="header-right-item-1">
            <Link to="/" onClick={this.logout}>
              LOG OUT
            </Link>
          </div>
        );
      default:
        return (
          <Fragment>
            <div className="header-right-item-1">
              <Link to="/login">LOG IN</Link>
            </div>
            <div className="header-right-item-2">
              <Link to="/info"> HOW IT WORKS</Link>
            </div>
          </Fragment>
        );
    }
  }

  render() {
    const state = 'peek';

    return (
      <SpringSidebar native={'true'} state={state}>
        {({ y }) => (
          <animated.div
            className="header-container"
            style={{
              transform: y.interpolate(y => `translate3d(0,${y}%,0)`)
            }}
          >
            <div className="header-left">
              <Link to="/">STEM RESEARCH GROUP</Link>
            </div>
            <div className="header-right">{this.renderContent()}</div>
          </animated.div>
        )}
      </SpringSidebar>
    );
  }
}

const mapStateToProps = state => {
  const { redirect } = state.authentication;

  return {
    redirect
  };
};

export default connect(mapStateToProps)(Header);
