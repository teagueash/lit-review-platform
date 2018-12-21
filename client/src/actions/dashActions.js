import { dashConstants } from '../constants';

// not sure if we need first case "Home", since if id doesn't match any other case,
// should automatically default to the default case, which is 'Home'
export const changeDashItem = id => {
  switch (id) {
    case 'Home':
      return {
        type: dashConstants.RENDER_HOME,
        payload: id
      };
    case 'Assign':
      return {
        type: dashConstants.RENDER_ASSIGN,
        payload: id
      };
    case 'Edit':
      return {
        type: dashConstants.RENDER_EDIT,
        payload: id
      };
    case 'Delete':
      return {
        type: dashConstants.RENDER_DELETE,
        payload: id
      };
    case 'View':
      return {
        type: dashConstants.RENDER_VIEW,
        payload: id
      };
    case 'Authorize':
      return {
        type: dashConstants.RENDER_AUTHORIZE,
        payload: id
      };
    default:
      return {
        type: dashConstants.RENDER_HOME,
        payload: id
      };
  }
};

export const dashAction = {
  changeDashItem
};
