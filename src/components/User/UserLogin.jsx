import React, { useState } from 'react';
import styles from '../styles/User.module.css';
import { useDispatch } from 'react-redux';
import { changeTypeForm, loginUser } from '../../store/user/userSlice';

const UserSignUp = ({ closeForm }) => {
  const dispatch = useDispatch();
  const [values, setValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { value, name } }) => {
    setValue({ ...values, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val.length > 4);

    if (!isNotEmpty) return;

    dispatch(loginUser(values));

    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div onClick={closeForm} className={styles.close}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Login in account</div>

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
        </div>
        <button className={styles.submit} type="submit">
          Login
        </button>{' '}
        <div
          className={styles.link}
          onClick={() => dispatch(changeTypeForm('signup'))}
        >
          Create an account
        </div>
      </form>
    </div>
  );
};

export default UserSignUp;
