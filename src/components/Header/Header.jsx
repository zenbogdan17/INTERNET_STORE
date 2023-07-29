import React, { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import logo from '../../images/logo.svg';
import avatar from '../../images/avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, toggleForm } from '../../store/user/userSlice';
import { useGetProductsQuery } from '../../store/api/apiSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({ name: 'Guest', avatar: avatar });
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  const { cart, currentUser } = useSelector(({ user }) => user);

  useEffect(() => {
    if (localStorage.getItem('email') && localStorage.getItem('password')) {
      if (!currentUser) {
        dispatch(
          loginUser({
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password'),
          })
        );
      }
    }

    if (!currentUser) return;

    setValues(currentUser);
  }, [dispatch, currentUser]);

  let isQuantityProduct = 0;
  if (cart.length !== 0) {
    cart.forEach(({ quantity }) => {
      isQuantityProduct += quantity;
    });
  }

  const inputChangeHandler = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className={styles.info}>
        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={styles.input}>
            <input
              type="search"
              name="search"
              placeholder="Search goods..."
              autoComplete="off"
              onChange={inputChangeHandler}
              value={searchValue}
            />
          </div>

          {searchValue && (
            <div className={styles.box}>
              {isLoading
                ? 'Loading...'
                : !data.length
                ? 'Not results'
                : data.map(({ title, images, id }) => (
                    <Link
                      onClick={() => setSearchValue('')}
                      className={styles.item}
                      to={`/products/${id}`}
                      key={id}
                    >
                      <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${images})` }}
                      />
                      <div className={styles.title}>{title}</div>
                    </Link>
                  ))}
            </div>
          )}
        </form>

        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={styles.username}></div>
          {values.name}
        </div>

        <div className={styles.account}>
          <Link to={ROUTES.FAVOURITES} className={styles.favourites}>
            <svg className={styles['icon-fav']}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </Link>
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles['icon-cart']}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {isQuantityProduct ? (
              <span className={styles.count}>{isQuantityProduct}</span>
            ) : (
              ''
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
