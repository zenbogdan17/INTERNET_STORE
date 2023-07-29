import React, { useState, useEffect } from 'react';
import styles from '../styles/Alert.module.css';
import { useDispatch } from 'react-redux';
import { clearAler } from '../../store/user/userSlice';

const Alert = ({ text }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setVisible(true);
  }, []);

  setTimeout(() => {
    if (visible) {
      setVisible(false);
      dispatch(clearAler());
    }
  }, 4000);

  return (
    <div
      className={`${styles.container} ${
        visible ? styles.visible : styles.hidden
      }`}
    >
      <div
        className={styles.close}
        onClick={() => {
          setVisible(false);
          dispatch(clearAler());
        }}
      >
        X
      </div>

      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Alert;
