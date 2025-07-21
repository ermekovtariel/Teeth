import React, { useEffect, useState } from 'react';

import { Input } from 'antd';
import { ChevronsDown, ChevronsUp } from 'react-feather';

import { useHttp } from '../../Hooks/http.hook';
import { useMessage } from '../../Hooks/message.hook';

import styles from './index.module.scss';

const Auth = () => {
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
    <div className={styles['auth']}>
      <form className={styles['auth_img']} onSubmit={registerHandler}>
        <h1>Регистрация</h1>
        <Input
          size='large'
          placeholder='Номер телефона'
          type='Number'
          name='email'
          onChange={changeRegisterHandler}
        />
        <Input.Password
          className={styles['password']}
          name='password'
          placeholder='Пароль'
          onChange={changeRegisterHandler}
        />
        <button onClick={registerHandler} disabled={loading}>
          Зарегистрироваться
        </button>
        <ChevronsDown className={styles['Box']} />
      </form>
      <form className={styles['auth_form']} onSubmit={loginHandler}>
        <ChevronsUp className={styles['Logo']} />
        <h1>Вход</h1>
        <Input
          size='large'
          name='email'
          type='number'
          onChange={changeLoginHandler}
          placeholder='Номер телефона'
        />
        <Input.Password
          type='password'
          name='password'
          className={styles['password']}
          onChange={changeLoginHandler}
          placeholder='Пароль'
        />
        <button onClick={loginHandler} disabled={loading}>
          Войти
        </button>
      </form>
    </div>
  );
}

export default Auth;
