import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../store/categories/categoriesSlice';
import { getProducts } from '../store/products/productsSlice';
import UserForm from './User/UserForm';
import Alert from './Alert/Alert';

const App = () => {
  const dispatch = useDispatch();
  const { textInAler } = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      <UserForm />
      {textInAler && <Alert text={textInAler} />}
      <div className="container">
        <Sidebar /> <AppRoutes />
      </div>

      <Footer />
    </div>
  );
};

export default App;
