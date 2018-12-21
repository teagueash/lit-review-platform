import axios from 'axios';
import auth from '../modules/auth';
import { userAPIConstants } from '../constants';

/**
 *   refactor all paths to reflect a unique string   *
 *   ie remove case/switch from api routes           *
 *                                                   *
 *                                                   */

// can probably refactor the constant out of this
const getAll = async () => {
  try {
    const res = await axios.post('/admin', {
      action: userAPIConstants.GET_ALL
    });
    // response containing all users in DB
    return res;
  } catch (error) {
    console.log('An error occurred in getAll(), with error: ', error.message);
  }
};

const getUser = async userID => {
  try {
    const res = await axios.post('/admin', {
      action: userAPIConstants.GET_USER,
      userID
    });
    // response containing the user in DB
    return res;
  } catch (error) {
    console.log(error);
    console.log('An error occurred in getUser(), with arg: ', userID);
  }
};

const authorizeUser = async studentID => {
  const config = {
    headers: {
      authorization: `bearer ${auth.getToken()}`,
      users: { studentID }
    }
  };

  try {
    const res = await axios.post('/authorizeUser', config);
    return res;
  } catch (error) {
    return error;
  }
};

const removeUser = async userID => {
  try {
    const res = await axios.post('/admin', {
      action: userAPIConstants.REMOVE_USER,
      userID
    });
    // response containing success message
    return res;
  } catch (error) {
    console.log(error);
    console.log('An error occurred in removeUser(), with arg: ', userID);
  }
};

export const userAPI = {
  getAll,
  getUser,
  authorizeUser,
  removeUser
};
