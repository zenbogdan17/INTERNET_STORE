import React from 'react';
import styles from '../styles/Home.module.css';

import computerImage from '../../images/computer.png';

const Poster = () => {
  return (
    <section className={styles.home}>
      <div className={styles.title}>DIG SALE 20%</div>
      <div className={styles.product}>
        <div className={styles.text}>
          <div className={styles.subtitle}>the bestseller of 2023</div>
          <h1 className={styles.head}>LENNON r2d2 NVIDIA 5090 TI</h1>
          <button className={styles.button}>Shop now</button>
        </div>
        <div className={styles.image}>
          <img src={computerImage} alt="computer" />
        </div>
      </div>
    </section>
  );
};

export default Poster;
