import React, { Component } from 'react';
import auth from '../modules/auth';

const enhancedSidebar = WrappedComponent => {
  return class extends Component {
    // state var keeps track of which navigation option to pass to wrapped component
    state = {
      navOptions: []
    };
    // object instance var that keeps track of all available navigation options
    sidebarOptions = {
      admin: [
        {
          id: 'Home',
          faType: 'fa fa-home fa-10x'
        },
        {
          id: 'Assign',
          faType: 'fa fa-book fa-10x'
        },
        {
          id: 'View',
          faType: 'fa fa-eye fa-10x'
        },
        {
          id: 'Authorize',
          faType: 'fa fa-user-check fa-10x'
        }
      ],
      student: [
        {
          id: 'Home',
          faType: 'fa fa-home fa-10x'
        },
        {
          id: 'View',
          faType: 'fa fa-eye fa-10x'
        }
      ]
    };

    // set navigation options based off permissions
    populateSidebar = isAdmin => {
      isAdmin
        ? this.setState({ navOptions: this.sidebarOptions.admin })
        : this.setState({ navOptions: this.sidebarOptions.student });
    };

    // grab role property from session storage
    componentDidMount() {
      const { role } = JSON.parse(auth.getUser());
      const isAdmin = role === 'admin';

      this.populateSidebar(isAdmin);
    }

    render() {
      return (
        <WrappedComponent navOptions={this.state.navOptions} {...this.props} />
      );
    }
  };
};

export default enhancedSidebar;
