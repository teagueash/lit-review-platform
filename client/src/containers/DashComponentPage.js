import React, { Component } from 'react';
import { Spring } from 'react-spring';
import { taskAPI } from '../API';
import ViewOne from '../components/dashComponents/ViewOne';
import HomePage from './HomePage';
import AssignReviews from './AssignReviewsPage';
import ViewReviewsPage from './ViewReviewsPage';
import AuthorizeUser from '../components/dashComponents/AuthorizeUser';

class DashComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: {},
      file: [],
      mount: false
    };
  }

  // keeps track of whether a reload occurred from <Sidebar />
  // navigation or the back button in <ViewOne />. Handles an edge
  // case
  navItem = '';

  // sets current component to detailed view of Lit Review Component
  mountReview = review => {
    this.setState({ review, mount: true });
  };

  // sets current component to general view of Lit Review Components.
  dismountReview = () => {
    this.setState({ review: {}, mount: false });
  };

  // this large function handles the different dash board elements users and admins
  // can access/see
  // The main difference between the two are the API calls and dash elements
  // they have access to
  renderDashItem = activeItem => {
    const { auth } = this.props;

    if (auth === 'admin') {
      // provide admin components to user
      if (activeItem === 'Assign') {
        return <AssignReviews />;
      } else if (activeItem === 'View') {
        return (
          <ViewReviewsPage
            viewTasks={taskAPI.viewTasks}
            mountReview={this.mountReview}
          />
        );
      } else if (activeItem === 'Authorize') {
        return <AuthorizeUser />;
      } else {
        return (
          <HomePage
            viewUpcomingTasks={taskAPI.viewUpcomingTasks}
            mountReview={this.mountReview}
          />
        );
      }
    } else if (auth === 'student') {
      if (activeItem === 'View')
        return (
          <ViewReviewsPage
            viewTasks={taskAPI.viewMyTasks}
            mountReview={this.mountReview}
          />
        );
      return (
        <HomePage
          viewUpcomingTasks={taskAPI.viewMyUpcomingTasks}
          mountReview={this.mountReview}
        />
      );
    }
  };

  // edge case for when user has clicked a Review from <HomePage />
  // or <ViewReviewsPage />, and clicks another sidebar item
  simulateNewLoad = () => {
    const { activeItem } = this.props;

    if (this.navItem !== activeItem) {
      this.navItem = activeItem;
      return false;
    }
    return true;
  };

  uploadReview = async (file, review) => {
    const data = new FormData();
    data.append('file', file[0]);
    data.append('filename', file[0].name);
    data.append('reviewDetails', JSON.stringify(review));
    data.append('encoding', 'multipart/form-data');

    const res = await taskAPI.submitTask(data);
    if (res.status === 200) {
      console.log('file successfully uploaded!');
    } else {
      console.log('an error occurred, the file was not uploaded');
    }
  };

  deleteReview = async id => {
    const res = await taskAPI.deleteTask(id);

    if (res.status === 200) {
      this.dismountReview();
    } else {
      console.log('an error occurred, review was not deleted');
    }
  };

  render() {
    const { activeItem, renderDashItem } = this.props;
    const { review, mount } = this.state;

    const shouldMount = this.simulateNewLoad() ? mount : false;

    return (
      <div className="dash-component-container">
        {shouldMount ? (
          <Spring delay={300} from={{ opacity: 0 }} to={{ opacity: 1 }}>
            {({ opacity }) => (
              <div style={{ opacity }}>
                <ViewOne
                  review={review}
                  dismountReview={this.dismountReview}
                  deleteReview={this.deleteReview}
                  uploadReview={this.uploadReview}
                />
              </div>
            )}
          </Spring>
        ) : (
          this.renderDashItem(activeItem)
        )}
      </div>
    );
  }
}

export default DashComponent;
