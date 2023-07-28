import React from 'react';
import styles from '../styles/Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';

const Sidebar = () => {
  const { list, isLoading } = useSelector((state) => state.categories);

  return (
    <section className={styles.sidebar}>
      {isLoading ? (
        <section className="preloader">
          <Loader />
        </section>
      ) : (
        <>
          <div className={styles.title}>CATEGORIES</div>
          <nav>
            <ul className={styles.menu}>
              {list.map((el) => (
                <li key={el.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.active : ''}`
                    }
                    to={`/categories/${el.id}`}
                  >
                    {el.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.footer}>
            <a
              href="https://t.me/zenbogdan"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Help
            </a>
            <a
              href="/terms"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Terms & Conditions
            </a>
          </div>
        </>
      )}
    </section>
  );
};

export default Sidebar;
