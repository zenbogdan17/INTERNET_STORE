import React, { useEffect, useState } from 'react';
import styles from '../styles/Product.module.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import { useDispatch } from 'react-redux';
import { addItemToCart, addItemToFavorites } from '../../store/user/userSlice';

const colors = [
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Orange',
  'Purple',
  'Pink',
  'Black',
  'White',
  'Gray',
];

const sizes = [4, 4.5, 5];

const getRandomColors = (array) => {
  const shuffled = array
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.random() < 0.5 ? 2 : 3);
  return shuffled;
};

const Product = (item) => {
  const { images, title, price, description } = item;

  const dispatch = useDispatch();

  const [currentImg, setCurrentImg] = useState();
  const [isColors, setIsColors] = useState();
  const [currentSize, setCurrentSize] = useState();
  const [currentColor, setCurrentColor] = useState();

  useEffect(() => {
    if (!images.length) {
      return;
    }

    setIsColors(getRandomColors(colors));
    setCurrentImg(images[0]);
  }, [images]);

  const addToCart = () => {
    if (!currentSize && !currentColor) {
      return alert('Enter size and color ');
    } else if (!currentSize) {
      return alert('Enter size ');
    } else if (!currentColor) {
      return alert('Enter color');
    }

    dispatch(addItemToCart(item));
  };

  const addToFavourite = () => {
    dispatch(addItemToFavorites(item));
  };

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImg})` }}
        />
        <div className={styles['images-list']}>
          {images.map((image, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => {
                setCurrentImg(image);
              }}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price} $</div>
        <div className={styles.color}>
          <span>Color:</span>
          <div className={styles.list}>
            {!isColors
              ? ''
              : isColors.map((color) => (
                  <div
                    key={color}
                    onClick={() => {
                      setCurrentColor(color);
                    }}
                    className={`${styles.size} ${
                      currentColor === color ? styles.active : ''
                    }`}
                  >
                    {color}
                  </div>
                ))}
          </div>
        </div>
        <div className={styles.sizes}>
          <span>Sizes</span>
          <div className={styles.list}>
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => {
                  setCurrentSize(size);
                }}
                className={`${styles.size} ${
                  currentSize === size ? styles.active : ''
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <button
            className={styles.add}
            // disabled={!currentSize || !currentColor}
            onClick={addToCart}
          >
            Add to cart
          </button>
          <button className={styles.favourite} onClick={addToFavourite}>
            Add to favourite
          </button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.purchse}>{`14 people purchsed`}</div>

          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
