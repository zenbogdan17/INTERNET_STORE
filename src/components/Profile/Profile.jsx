import React, { useEffect, useState } from 'react';

import styles from '../styles/Profile.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/user/userSlice';

const Profile = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(({ user }) => user);

  const [values, setValue] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });

  useEffect(() => {
    if (!currentUser) return;

    setValue(currentUser);
  }, [currentUser]);

  const handleChange = ({ target: { value, name } }) => {
    setValue({ ...values, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);

    if (!isNotEmpty) return;

    dispatch(updateUser(values));
  };

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>You need to log in</span>
      ) : (
        <>
          <h2 className={styles.title}>Your Profile</h2>
          <p className={styles.subtitle}>You can update your data</p>
          <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.group}>
              <input
                type="email"
                placeholder="Your email"
                name="email"
                value={values.email}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.group}>
              <input
                type="name"
                placeholder="Your name"
                name="name"
                value={values.name}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.group}>
              <input
                type="password"
                placeholder="Your password"
                name="password"
                value={values.password}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.group}>
              <input
                type="avatar"
                placeholder="Enter the URL on your avatar"
                name="avatar"
                value={values.avatar}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.submit}>
              Update
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default Profile;
