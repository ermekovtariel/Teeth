import React from 'react'

import { Typography } from 'antd';

import styles from "./index.module.scss";

const { Title, Text } = Typography;

const Card = () => {
  return (
    <div className={styles.root}>
        <Title level={3} className={styles.title}>
            Card
        </Title>
        <Text strong className={styles.description}>
            h3. Ant Design
        </Text>
    </div>
  )
}

export default Card