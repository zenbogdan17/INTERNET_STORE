import React, { useState } from 'react';
import styles from '../styles/User.module.css';
import { useDispatch } from 'react-redux';
import { createUser, changeTypeForm } from '../../store/user/userSlice';

const UserSignUp = ({ closeForm }) => {
  const dispatch = useDispatch();

  const [values, setValue] = useState({
    name: '',
    email: '',
    password: '',
    avatar:
      'https://fastly.picsum.photos/id/84/640/640.jpg?hmac=HJesTNezikR8KRkEHGiGMPCKHZKref0NFYQsUjrQbek',
  });

  const handleChange = ({ target: { value, name } }) => {
    setValue({ ...values, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val.length > 4);

    if (!isNotEmpty) return;

    dispatch(createUser(values));

    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div onClick={closeForm} className={styles.close}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Sign up</div>

      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.group}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={values.email}
            autoComplete="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={values.password}
            autoComplete="password"
            onChange={handleChange}
            required
          />
          <input
            type="name"
            name="name"
            placeholder="Your name"
            value={values.name}
            autoComplete="name"
            onChange={handleChange}
            required
          />

          <input
            type="avatar"
            name="avatar"
            placeholder="Enter the URL on your avatar"
            value={values.avatar}
            autoComplete="avatar"
            onChange={handleChange}
            required
          />
        </div>
        <button className={styles.submit} type="submit">
          Create an account
        </button>
        <div
          className={styles.link}
          onClick={() => dispatch(changeTypeForm('login'))}
        >
          I already have an account
        </div>
      </form>
    </div>
  );
};

export default UserSignUp;
