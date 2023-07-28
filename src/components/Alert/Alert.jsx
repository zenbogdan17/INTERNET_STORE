import React, { useState, useEffect } from 'react';
import styles from '../styles/Alert.module.css';

const Alert = ({ text }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  setTimeout(() => {
    if (visible) {
      setVisible(false);
    }
  }, 4000);

  return (
    <div
      className={`${styles.container} ${
        visible ? styles.visible : styles.hidden
      }`}
    >
      <div className={styles.close} onClick={() => setVisible(false)}>
        X
      </div>

      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Alert;
