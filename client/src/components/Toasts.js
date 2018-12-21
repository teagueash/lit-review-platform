import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from './Toast';
import { toastActions } from '../actions';

const Toasts = ({ actions, toasts }) => {
  const { removeToast } = actions;
  return (
    <ul className="toasts">
      {toasts.map(toast => {
        const { id } = toast;

        return (
          <Toast {...toast} key={id} onDismissClick={() => removeToast(id)} />
        );
      })}
    </ul>
  );
};

Toasts.propTypes = {
  actions: PropTypes.shape({
    removeToast: PropTypes.func.isRequired
  }).isRequired,
  toasts: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapDispatchToProps = dispatch => {
  const { removeToast } = toastActions;

  return {
    actions: bindActionCreators({ removeToast }, dispatch)
  };
};

const mapStateToProps = state => ({
  toasts: state.toast
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toasts);
