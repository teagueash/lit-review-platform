import React, { Component, Fragment } from 'react';
import Button from '../components/Button';
import { Redirect, withRouter } from 'react-router-dom';

class BackButton extends Component {
  state = {
    prevPath: null
  };

  // generate most recent path for redirect
  setPrevPath = () => {
    const { pathname } = this.props.location;
    const prevPath = pathname.substring(0, pathname.lastIndexOf('/'));

    this.setState({ prevPath });
  };

  render() {
    const { prevPath } = this.state;
    const { className } = this.props;

    return (
      <Fragment>
        {prevPath && <Redirect to={`${prevPath}`} />}
        <Button callback={this.setPrevPath} className={className} />
      </Fragment>
    );
  }
}

export default withRouter(BackButton);
