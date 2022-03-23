import { AUTH } from '../../configs/urls';
import { instance } from '../../utils/instance';

export const loginAction = (credentials) => async () => {
  const data = {
    email: credentials.email,
    password: credentials.password,
  };
  await instance
    .post(`${AUTH}register`, data)
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      console.log(res);
      console.log('wwwwwwwwwwwww');
    })
    .catch((error) => {
      console.log(error);
    });
};
