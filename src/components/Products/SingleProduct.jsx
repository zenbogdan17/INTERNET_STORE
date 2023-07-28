import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../store/api/apiSlice';
import { ROUTES } from '../../utils/routes';
import Loader from '../Loader/Loader';
import Product from './Product';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedProduct } from '../../store/products/productsSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });
  const { list, related } = useSelector(({ products }) => products);

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [navigate, isFetching, isLoading, isSuccess]);

  useEffect(() => {
    if (!data || !list.length) return;

    if (data) {
      dispatch(getRelatedProduct(data.category.id));
    }
  }, [dispatch, data, list.length]);

  if (isLoading) {
    return (
      <section className="preloader">
        <Loader />
      </section>
    );
  }

  return (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Related products" />
    </>
  );
};

export default SingleProduct;
