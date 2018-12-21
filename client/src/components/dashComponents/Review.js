import React, { Component } from 'react';
import { Spring } from 'react-spring';
import { taskAPI } from '../../API';
import auth from '../../modules/auth';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      auth: ''
    };
  }

  componentDidMount() {
    const { role } = JSON.parse(auth.getUser());
    this.setState({ auth: role });
  }

  onChange = () => {
    const { isHovering } = this.state;
    this.setState({ isHovering: !isHovering });
  };

  downloadReview = async metadata => {
    const res = await taskAPI.downloadReview(metadata);

    if (res.status !== 200) {
      console.log('an error occurred, review unable to be downloaded');
    }
    console.log(res.data);
  };

  render() {
    const { content, mountReview } = this.props;
    const { isHovering, auth } = this.state;

    return (
      <Spring delay={300} from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {({ opacity }) => (
          <div style={{ opacity }} className="view-content">
            <div
              onMouseEnter={this.onChange}
              onMouseLeave={this.onChange}
              className="view-review-card"
            >
              <h4>{content.topic}</h4>
              {isHovering && auth === 'admin' && (
                <div>
                  <i
                    onClick={() => mountReview(content)}
                    className="far fa-eye delete-button fa-button"
                  />
                  <i className="fa fa-trash-o delete-button fa-button" />
                  <i
                    onClick={() => this.downloadReview(content)}
                    className="fas fa-cloud-download-alt delete-button fa-button"
                  />
                </div>
              )}
              {isHovering && auth === 'student' && (
                <div>
                  <i
                    onClick={() => mountReview(content)}
                    className="far fa-eye delete-button fa-button"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default Review;
