const auth = {
  authenticateUser: token => {
    sessionStorage.setItem('token', token);
  },
  isAuthenticated: () => {
    return (
      sessionStorage.getItem('token') !== null &&
      sessionStorage.getItem('user') !== null
    );
  },
  deauthenticateUser: () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
  },
  getToken: () => {
    return sessionStorage.getItem('token');
  },
  getUser: () => {
    return sessionStorage.getItem('user');
  }
};

export default auth;
