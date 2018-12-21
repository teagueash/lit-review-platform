import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import DashComponent from './DashComponentPage';
import auth from '../modules/auth';

const adminDashItems = [
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
];

const studentDashItems = [
  {
    id: 'Home',
    faType: 'fa fa-home fa-10x'
  },
  {
    id: 'View',
    faType: 'fa fa-eye fa-10x'
  }
];

class DashContainerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dashItems: [],
      role: ''
    };
  }

  componentDidMount() {
    // grab role property from local storage
    const { role } = JSON.parse(auth.getUser());

    this.setState({ role });
    role === 'admin'
      ? this.setState({ dashItems: adminDashItems })
      : this.setState({ dashItems: studentDashItems });
  }

  // This component receives the active item from redux store and passes it down
  // to <Sidebar /> and <DashComponent />. User privilege also determined and passed
  // to <DashComponent /> to properly render user page
  render() {
    const { activeItem } = this.props;
    const { dashItems, role } = this.state;

    return (
      <div className="dash-container">
        <Sidebar activeItem={activeItem} dashItems={dashItems} />
        <DashComponent activeItem={activeItem} auth={role} />
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
