import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Pagination from './Pagination';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { productList } from '../../redux/actions/product';
import Loading from '../errors/Loading';
import Message from '../errors/Error';

const ShopSection = (props) => {
  const { keyword, pageNumber } = props;
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = listProduct;

  useEffect(() => {
    console.log('ShopSection-useEffect');
    dispatch(productList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <React.Fragment>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant={'alert-danger'}>{error}</Message>
                ) : (
                  <>
                    {products.map((product) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={product._id}
                      >
                        <div className="border-product">
                          <Link to={`/products/${product._id}`}>
                            <div className="shopBack">
                              <img src={product.image} alt={product.name} />
                            </div>
                          </Link>
                          <div className="shoptext">
                            <p>
                              <Link to={`/products/${product._id}`}>
                                {product.name}
                              </Link>
                            </p>
                            <Rating
                              value={product.rating}
                              text={`${product.numReviews} reviews`}
                            />
                            <h3>${product.price}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                <Pagination pages={pages} page={page} keyword={keyword || ''} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShopSection;
