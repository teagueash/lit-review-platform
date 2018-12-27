import React, { Component } from 'react';
import { Parallax, ParallaxLayer } from 'react-spring/addons';

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
      user: {},
      topic: '',
      dueDate: new Date()
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

  // update state
  setUser = user => {
    this.setState({ user });
  };

  // update state
  setTopic = topic => {
    this.setState({ topic });
  };

  // update state
  setDueDate = dueDate => {
    this.setState({ dueDate });
  };

  // update user and queue next carousel item
  handleUserChange = user => {
    this.setUser({ user });
    this.next(1);
  };

  // update topic
  handleTopicChange = e => {
    e.preventDefault();
    // validate form, if empty do not set topic
    this.setTopic(e.target.value);
  };

  // update date and queue next carousel item
  handleDateChange = date => {
    this.setDueDate(date);
    this.next(3);
  };

  // resets state and start at beginning of carousel
  reset = () => {
    this.setUser({});
    this.setTopic('');
    this.setDueDate(new Date());

    this.next(0);
  };

  // toggles specified page in carousel
  next = page => {
    this.parallax.scrollTo(page);
  };

  render() {
    const { allUsers, user, topic, dueDate } = this.state;

    return (
      <div className="assign-container">
        <Parallax
          ref={ref => (this.parallax = ref)}
          pages={4}
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
            <AssignUser
              allUsers={allUsers}
              handleChange={this.handleUserChange}
            />
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
              topic={topic}
              handleChange={this.handleTopicChange}
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
            <AssignDate handleChange={this.handleDateChange} date={dueDate} />
          </ParallaxLayer>
          <ParallaxLayer
            factor={0.9}
            offset={3}
            speed={-0}
            style={{
              justifyContent: 'center'
            }}
          >
            <APIFeedback
              data={user}
              topic={topic}
              dueDate={dueDate}
              reset={this.reset}
            />
          </ParallaxLayer>
        </Parallax>
      </div>
    );
  }
}

export default AssignReviews;
