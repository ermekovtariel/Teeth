import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { ChevronsDown, ChevronsUp } from 'react-feather';

import './Auth.scss';
import { useHttp } from '../Hooks/http.hook';
import { useMessage } from '../Hooks/message.hook';

function Auth() {
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message({ text: error, type: 'error' });
    clearError();
  }, [error, message, clearError]);

  const changeLoginHandler = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };
  const changeRegisterHandler = (event) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  const registerHandler = async () => {
    try {
      console.log('registerHandler->', { ...registerData });
      const data = await request('/api/auth/register', 'POST', {
        ...registerData,
      });
      message({ text: 'success registrated', type: 'success' });
      localStorage.setItem('user', JSON.stringify(data));
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const loginHandler = async () => {
    console.log('loginHandler->', { ...loginData });
    try {
      const data = await request('/api/auth/login', 'POST', { ...loginData });
      message({ text: 'success', type: 'success' });
      localStorage.setItem('user', JSON.stringify(data));
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='auth'>
      <form className='auth_img' onSubmit={registerHandler}>
        <h1>Register</h1>
        <Input
          size='large'
          placeholder='Number'
          type='Number'
          name='email'
          onChange={changeRegisterHandler}
        />
        <Input.Password
          className='password'
          name='password'
          placeholder='input password'
          onChange={changeRegisterHandler}
        />
        <button onClick={registerHandler} disabled={loading}>
          Register
        </button>
        <ChevronsDown className='Box' />
      </form>
      <form className='auth_form' onSubmit={loginHandler}>
        <ChevronsUp className='Logo' />
        <h1>Login</h1>
        <Input
          size='large'
          name='email'
          type='number'
          onChange={changeLoginHandler}
          placeholder='large size'
        />
        <Input.Password
          type='password'
          name='password'
          className='password'
          onChange={changeLoginHandler}
          placeholder='input password'
        />
        <button onClick={loginHandler} disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Auth;
