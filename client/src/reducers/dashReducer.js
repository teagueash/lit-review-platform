import { dashConstants } from '../constants';

export const dash = (state = { activeItem: 'Home' }, action) => {
  const { type, payload } = action;

  switch (type) {
    case dashConstants.RENDER_HOME:
      return {
        ...state,
        activeItem: payload
      };
    case dashConstants.RENDER_ASSIGN:
      return {
        ...state,
        activeItem: payload
      };
    case dashConstants.RENDER_EDIT:
      return {
        ...state,
        activeItem: payload
      };
    case dashConstants.RENDER_DELETE:
      return {
        ...state,
        activeItem: payload
      };
    case dashConstants.RENDER_VIEW:
      return {
        ...state,
        activeItem: payload
      };
    case dashConstants.RENDER_AUTHORIZE:
      return {
        ...state,
        activeItem: payload
      };
    default:
      return state;
  }
};
