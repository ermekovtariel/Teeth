import React from 'react'

import cn from "classnames";

import Card from '../../../Components/Card';

import styles from "./index.module.scss";

const Client = () => {
  return (
    <div className={cn(styles.cards, styles.container)}>
      <Card />
      <Card />
      <Card />
    </div>
  )
}

export default Client