import React, { Component } from 'react';
import { taskAPI } from '../API';
import { userAPI } from '../API';
import AssignUser from '../components/dashComponents/AssignUser';
import AssignTopic from '../components/dashComponents/AssignTopic';
import AssignDate from '../components/dashComponents/AssignDate';
import APIFeedback from '../components/dashComponents/APIFeedback';

class AssignReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allUsers: [],
      assignedUser: {},
      topic: '',
      dueDate: new Date(),
      activeComponentIndex: 0
    };
  }

  // load database users into component state on mount
  async componentDidMount() {
    const dbRes = await this.getUsers();
    const { users } = dbRes.data;

    this.setState({ allUsers: users });
  }

  // get all current users
  getUsers = async () => {
    try {
      const res = await userAPI.getAll();
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  // update state and call next to render next component
  setUser = assignedUser => {
    this.setState({ assignedUser });
    this.next();
  };

  // update state (next not called here as each keystroke changes state)
  setTopic = topic => {
    this.setState({ topic });
  };

  // update state and call next to render next component
  setDueDate = dueDate => {
    this.setState({ dueDate });
    this.next();
  };

  handleChange = e => {
    e.preventDefault();
    // validate form, if empty do not set topic
    this.setTopic(e.target.value);
  };

  handleDateChange = date => {
    this.setDueDate(date);
  };

  // update which component index to display
  next = () => {
    const { activeComponentIndex } = this.state;
    this.setState({
      activeComponentIndex: activeComponentIndex + 1
    });
  };

  back = () => {
    const { activeComponentIndex } = this.state;
    this.setState({
      activeComponentIndex: activeComponentIndex - 1
    });
  };

  // make post request to api to update assignedUsers tasklist
  submitAssignment = async () => {
    const { assignedUser, topic, dueDate } = this.state;
    const { name, id } = assignedUser;

    const taskData = {
      name,
      id,
      topic,
      dueDate
    };
    try {
      const res = await taskAPI.assignTask(taskData);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { activeComponentIndex } = this.state;
    console.log('Assign Component Page');
    console.log(this);
    return (
      <div className="assign-container">
        {activeComponentIndex === 0 && (
          <AssignUser allUsers={this.state.allUsers} setUser={this.setUser} />
        )}
        {activeComponentIndex === 1 && (
          <AssignTopic
            handleChange={this.handleChange}
            topic={this.state.topic}
            next={this.next}
            back={this.back}
          />
        )}
        {activeComponentIndex === 2 && (
          <AssignDate
            handleChange={this.handleDateChange}
            date={this.state.dueDate}
            back={this.back}
          />
        )}
        {activeComponentIndex === 3 && (
          <APIFeedback submitAssignment={this.submitAssignment} />
        )}
      </div>
    );
  }
}

export default AssignReviews;
