import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    const { component: Component, verified, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          verified === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/verifyAuthorize',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => {
  const { verified } = state.verify;

  return {
    verified
  };
};

export default connect(mapStateToProps)(PrivateRoute);
