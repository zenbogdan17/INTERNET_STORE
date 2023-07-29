import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import SingleProduct from '../Products/SingleProduct';
import Profile from '../Profile/Profile';
import { ROUTES } from '../../utils/routes';
import SingleCategory from '../Categories/SingleCategory';
import Cart from '../Cart/Cart';
import Favorites from '../Favorites/Favorites';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.PRODUCTS} element={<SingleProduct />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
      <Route path={ROUTES.CART} element={<Cart />} />
      <Route path={ROUTES.FAVOURITES} element={<Favorites />} />
    </Routes>
  );
};

export default AppRoutes;
