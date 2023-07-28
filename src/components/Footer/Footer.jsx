import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/Footer.module.css';
import { ROUTES } from '../../utils/routes';

import logo from '../../images/logo.svg';

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className={styles.rights}>
        {'Developer by '}
        <a
          href="https://www.canva.com/design/DAFb26cYOZM/ba8ZFXwgX04-Duwj_yvBWw/view?utm_content=DAFb26cYOZM&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
          target="_blamk"
          rel="noreferrer"
        >
          Bogdan Zinkivskyi
        </a>
      </div>
      <div className={styles.socials}>
        <a
          href="https://www.linkedin.com/in/%D0%B1%D0%BE%D0%B3%D0%B4%D0%B0%D0%BD-%D0%B7%D1%96%D0%BD%D1%8C%D0%BA%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B8%D0%B9-570b42264/"
          target="_blamk"
          rel="noreferrer"
        >
          <svg className={styles['icon-cart']}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#linkedin`} />
          </svg>
        </a>
        <a
          href="https://github.com/zenbogdan17"
          target="_blamk"
          rel="noreferrer"
        >
          <svg className={styles['icon-cart']}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#github`} />
          </svg>
        </a>
        <a href="https://t.me/zenbogdan" target="_blamk" rel="noreferrer">
          <img
            className="telegram-logo"
            src={`${process.env.PUBLIC_URL}/telegram_logo.svg`}
            alt="telegram_logo"
          />
        </a>
      </div>
    </section>
  );
};

export default Footer;
