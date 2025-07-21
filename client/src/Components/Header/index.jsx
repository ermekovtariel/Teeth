import React from 'react'

import cn from "classnames";
import { useDispatch } from 'react-redux';
import { Button, Typography } from 'antd';
import { DeploymentUnitOutlined, UserOutlined } from '@ant-design/icons';

import { changeProfileDrawer } from '../../store/Auth/action';

import styles from "./index.module.scss";
import ClientProfileDrower from '../../Pages/Home/client/components/ProfileDrower';

const { Title } = Typography;

const Header = () => {
  const dispatch = useDispatch()
  const openProfile = () => dispatch(changeProfileDrawer())

  return (
    <div className={styles.root}>
      <div className={cn(styles.header,styles.container)}>
          <DeploymentUnitOutlined className={styles.logo} />
          <Title level={4} className={styles.logoTitle}>MedNet</Title>
      </div>
      <div className={cn(styles.header,styles.container)}>
        <Button 
          shape="circle" 
          onClick={() => openProfile()} 
          size='large'
          icon={<UserOutlined />} 
        />
      </div>
      <ClientProfileDrower />
    </div>
  )
}

export default Header