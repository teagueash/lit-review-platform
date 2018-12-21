let id = 0;

const defaultOptions = {
  color: '#bf1a1a'
};

const createToast = options => {
  return {
    ...defaultOptions,
    ...options,
    id: id++
  };
};

export const toastService = {
  createToast
};
