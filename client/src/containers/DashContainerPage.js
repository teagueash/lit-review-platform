import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import DashComponent from './DashComponentPage';
import auth from '../modules/auth';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';

class DashContainerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dashItems: [],
      role: ''
    };
  }

  // This component receives the active item from redux store and passes it down
  // to <Sidebar /> and <DashComponent />. User privilege also determined and passed
  // to <DashComponent /> to properly render user page
  render() {
    const { activeItem } = this.props;

    return (
      <div className="dash-container">
        <Sidebar activeItem={activeItem} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { activeItem } = state.dash;

  return {
    activeItem
  };
};

export default connect(mapStateToProps)(DashContainerPage);
