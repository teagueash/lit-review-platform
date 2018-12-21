import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import DashComponent from './DashComponentPage';
import auth from '../modules/auth';

class DashContainerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        <DashComponent activeItem={activeItem} auth={'admin'} />
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
