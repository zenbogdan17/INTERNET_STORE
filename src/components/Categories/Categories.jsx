import React from 'react';
import styles from '../styles/Categories.module.css';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Categories = ({ title, products = [], amount, isLoading }) => {
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {isLoading ? (
        <section className="preloader">
          <Loader />
        </section>
      ) : (
        <div className={styles.list}>
          {list.map(({ id, name, image }) => (
            <Link key={id} className={styles.item} to={`/categories/${id}`}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${image})` }}
              />
              <h3 className={styles.title}>{name}</h3>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Categories;
