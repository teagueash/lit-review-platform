import axios from 'axios';
import auth from '../modules/auth';

const assignTask = async details => {
  const config = {
    headers: {
      authorization: `bearer ${auth.getToken()}`,
      details: { ...details }
    }
  };
  // THIS IS UGLE CODE REFACTOR LATER PLEASE
  // if student user exists, update DB entry with new task details
  try {
    const res = await axios.post('/assignTask', config);

    return res;
  } catch (error) {
    console.log('An error occurred: ', error);
  }
};

const viewTasks = async () => {
  const config = {
    headers: {
      authorization: `bearer ${auth.getToken()}`
    }
  };

  try {
    const res = await axios.get('/viewTasks', config);
    return res;
  } catch (error) {
    console.log('An error occurred: ', error);
  }
};

const viewMyTasks = async () => {
  const config = {
    headers: {
      authorization: `bearer ${auth.getToken()}`
    }
  };

  try {
    const res = await axios.get('/viewMyTasks', config);
    return res;
  } catch (error) {
    console.log('An error occurred: ', error);
  }
};

const viewMyUpcomingTasks = async ({ start, end }) => {
  const config = {
    headers: {
      authorization: `bearer ${auth.getToken()}`,
      start,
      end
    }
  };

  try {
    const res = await axios.get('/viewMyUpcomingTasks', config);
    return res;
  } catch (error) {
    console.log('An error occurred: ', error);
  }
};

const viewUpcomingTasks = async ({ start, end }) => {
  const config = {
    headers: {
      authorization: `bearer ${auth.getToken()}`,
      start,
      end
    }
  };

  try {
    const res = await axios.get('/viewUpcomingTasks', config);
    return res;
  } catch (error) {
    console.log('An error occurred: ', error);
  }
};

const submitTask = async data => {
  try {
    const res = await fetch('/submitTask', {
      method: 'POST',
      body: data,
      headers: { authorization: `bearer ${auth.getToken()}` }
    });
    return res;
  } catch (error) {
    console.log('An error occurred: ', error);
  }
};

const deleteTask = async taskID => {
  const config = {
    headers: {
      authorization: `bearer ${auth.getToken()}`
    },
    data: taskID
  };

  try {
    const res = await axios.post('/deleteTask', config);
    return res;
  } catch (error) {
    console.log('An error occurred: ', error);
  }
};

const downloadReview = async data => {
  try {
    const res = await axios.post(
      '/downloadTask',
      {
        data
      },
      { headers: { authorization: `bearer ${auth.getToken()}` } }
    );
    return res;
  } catch (error) {
    console.log('An error occurred: ', error);
  }
};

export const taskAPI = {
  assignTask,
  viewTasks,
  viewMyTasks,
  viewUpcomingTasks,
  viewMyUpcomingTasks,
  submitTask,
  deleteTask,
  downloadReview
};
