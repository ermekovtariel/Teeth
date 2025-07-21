import React from 'react'


import Header from '../Components/Header';

import styles from "./index.module.scss";

const Layout = ({children}) => {
  return <div className={styles.root}>
    <Header />
      {children}
  </div>;
}

export default Layout