import React, { Component, Fragment } from 'react';
import { Spring } from 'react-spring';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class APIFeedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: false
    };
  }

  async componentDidMount() {
    const res = await this.props.submitAssignment();

    res.status === 200
      ? this.setState({ status: true })
      : this.setState({ status: false });
  }

  render() {
    const { status } = this.state;

    return (
      <Spring delay={300} from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {({ opacity }) => (
          <div style={{ opacity }} className="assign-carousel-content">
            {status === true ? (
              <Fragment>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 130.2 130.2"
                >
                  <circle
                    className="path circle"
                    fill="none"
                    stroke="#56876D"
                    strokeWidth="6"
                    strokeMiterlimit="10"
                    cx="65.1"
                    cy="65.1"
                    r="62.1"
                  />
                  <polyline
                    className="path check"
                    fill="none"
                    stroke="#56876D"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    points="100.2,40.2 51.5,88.8 29.8,67.5 "
                  />
                </svg>
                <p className="success">All Done</p>
              </Fragment>
            ) : (
              <h2>Something went wrong</h2>
            )}
          </div>
        )}
      </Spring>
    );
  }
}

export default APIFeedback;
