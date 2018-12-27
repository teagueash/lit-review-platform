import React, { Component } from 'react';
import { Parallax, ParallaxLayer } from 'react-spring/addons';

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
    this.next(1);
  };

  // update state (next not called here as each keystroke changes state)
  setTopic = topic => {
    this.setState({ topic });
  };

  // update state and call next to render next component
  setDueDate = dueDate => {
    this.setState({ dueDate });
    this.next(3);
  };

  handleChange = e => {
    e.preventDefault();
    // validate form, if empty do not set topic
    this.setTopic(e.target.value);
  };

  handleDateChange = date => {
    this.setDueDate(date);
  };

  next = page => {
    this.parallax.scrollTo(page);
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
    return (
      <div className="assign-container">
        <Parallax
          ref={ref => (this.parallax = ref)}
          pages={3}
          horizontal
          scrolling={false}
        >
          <ParallaxLayer
            factor={0.9}
            offset={0}
            speed={0.1}
            style={{
              height: '',
              justifyContent: 'center'
            }}
          >
            <AssignUser allUsers={this.state.allUsers} setUser={this.setUser} />
          </ParallaxLayer>
          <ParallaxLayer
            factor={0.9}
            offset={1}
            speed={0.1}
            style={{
              height: '',
              justifyContent: 'center'
            }}
          >
            <AssignTopic
              handleChange={this.handleChange}
              topic={this.state.topic}
              next={this.next}
            />
          </ParallaxLayer>
          <ParallaxLayer
            factor={0.9}
            offset={2}
            speed={-0}
            style={{
              justifyContent: 'center'
            }}
          >
            <AssignDate
              handleChange={this.handleDateChange}
              date={this.state.dueDate}
            />
          </ParallaxLayer>
        </Parallax>
      </div>
    );
  }

  // <APIFeedback submitAssignment={this.submitAssignment} />
}

export default AssignReviews;
