import React, { useEffect } from 'react';

import Layout from '../../Layout';

import { getHomeByRole } from '../../Hooks/homeByRole.hook';
import { useDispatch } from 'react-redux';
import { getUser } from '../../store/Auth/action';

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const userStorage = localStorage.getItem("user")
    const user=JSON.parse(userStorage)
    dispatch(getUser(user.token))
  }, [dispatch])
  
  return (
    <Layout>
      {getHomeByRole()}
    </Layout>
  )
}

export default Home;
