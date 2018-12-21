import axios from 'axios';

const autoLogin = async token => {
  const config = {
    headers: {
      authorization: `bearer ${token}`
    }
  };

  try {
    const res = await axios.get('/authorize', config);

    const { data } = res;

    if (data.token) {
      return res;
    }
  } catch (error) {
    const errResponse = {
      data: {
        errors: 'Invalid token'
      }
    };
    // handle login error. On 401 log user out, o/w return error msgs
    return errResponse;
  }
};

const login = async (email, password) => {
  try {
    const res = await axios.post('/login', {
      email,
      password
    });
    const { data } = res;

    if (data.token) {
      const user = JSON.stringify(data.user);
      // not sure why we want to return user
      sessionStorage.setItem('user', user);
      sessionStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    const { data } = error.response;
    // handle login error. On 401 log user out, o/w return error msgs
    return data;
  }
};

const register = async (name, email, password) => {
  try {
    return await axios.post('/signup', {
      name,
      email,
      password
    });
  } catch (error) {
    const { data } = error.response;
    console.log(data);

    return data;
    // handle signup error. On 401 log user out, o/w return error msgs
  }
};

const logout = () => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
};

const verify = async studentID => {
  try {
    return await axios.post('/verifyAuthorize', { studentID });
  } catch (error) {
    const { data } = error.response;

    return data;
  }
};

export const userService = {
  autoLogin,
  login,
  register,
  logout,
  verify
};
