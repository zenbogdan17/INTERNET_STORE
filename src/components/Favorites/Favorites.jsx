import React from 'react';
import styles from '../styles/Favorites.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { reducersItemFavorites } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorites } = useSelector(({ user }) => user);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Your favorites</h2>

      {!favorites.length ? (
        <div className={styles.empty}>Favorites list is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {favorites.map((item) => {
              const { title, category, images, price, id } = item;

              return (
                <div className={styles.item} key={id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{category.name}</div>
                  </div>

                  <div className={styles.price}>{price}$</div>

                  <button
                    className={styles.btn}
                    onClick={() => {
                      navigate(`/products/${id}`);
                    }}
                  >
                    GO TO BUY
                  </button>

                  <div
                    className={styles.close}
                    onClick={() => {
                      dispatch(reducersItemFavorites(item));
                    }}
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default Favorites;
