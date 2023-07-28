import React, { useEffect } from 'react';
import Poster from '../Poster/Poster';
import Products from '../Products/Products';
import { useDispatch, useSelector } from 'react-redux';
import Categories from '../Categories/Categories';
import Banner from '../Banner/Banner';
import { filterByPrice } from '../../store/products/productsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const {
    products: { list, filtered, isLoading },
    categories,
  } = useSelector((state) => state);

  useEffect(() => {
    if (list.length === 0) {
      return;
    }
    dispatch(filterByPrice(100));
  }, [dispatch, list.length]);

  return (
    <>
      <Poster />

      <Products
        products={list}
        amount={5}
        title="Trending"
        isLoading={isLoading}
      />
      <Categories
        products={categories.list}
        amount={5}
        title="Categories"
        isLoading={isLoading}
      />
      <Banner />
      <Products
        products={filtered}
        amount={5}
        title="Less than 100$"
        isLoading={isLoading}
      />
    </>
  );
};

export default Home;
