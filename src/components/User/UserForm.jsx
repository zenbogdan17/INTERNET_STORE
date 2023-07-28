import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSignUp from './UserSignUp';
import UserLogin from './UserLogin';
import styles from '../styles/User.module.css';
import { toggleForm } from '../../store/user/userSlice';

const UserForm = () => {
  const dispatch = useDispatch();
  const { showForm, formType } = useSelector(({ user }) => user);

  const closeForm = () => dispatch(toggleForm(false));

  return showForm ? (
    <>
      <div className={styles.overlay} onClick={closeForm} />
      {formType === 'signup' ? (
        <UserSignUp closeForm={closeForm} />
      ) : (
        <UserLogin closeForm={closeForm} />
      )}
    </>
  ) : (
    <></>
  );
};

export default UserForm;
