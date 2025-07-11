import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../../Redux/api/productsApi';
import toast from 'react-hot-toast';
import Loader from '../layouts/Loader';
import StarRatings from 'react-star-ratings';
import { useDispatch } from 'react-redux';
import { setCartItem } from '../../Redux/features/cartSlice';

const ProductDetails = () => {
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const { data, isLoading, error, isError } = useGetProductDetailsQuery(params.id);

  const product = data?.productFound || {};
    const dispatch = useDispatch();
  useEffect(() => {
    setActiveImage(product?.images?.[0]?.url || '../../images/default_product.png');
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || 'Something went wrong while fetching product');
      console.error('Error fetching product:', error);
    }
  }, [isError]);

  const increaseQty = () => {
    if (quantity >= product?.stock) return;
    setQuantity(prev => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity(prev => prev - 1);
  };
  const setItemsToCart = () => {
    const cartItem = {
        product: product?._id,
        name: product?.name,
        price: product?.price,
        image: activeImage,
        stock: product?.stock,    
        quantity: quantity,
    };
    dispatch(setCartItem(cartItem));
    toast.success(`Added item(s) to cart`);
  }
  const addToCartHandler = () => {
    if (product?.stock === 0) return;
    toast.success(`Added ${quantity} item(s) to cart`);
    // dispatch(addToCart({ id: product._id, quantity })) <-- Example if using Redux
  };

  if (isLoading) return <Loader />;

  return (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            alt="product"
            src={activeImage}
            width="340"
            height="390"
          />
        </div>

        <div className="row justify-content-start mt-5">
          {product?.images?.map((image, index) => (
            <div className="col-2 ms-4 mt-2" key={index}>
              <a role="button" onClick={() => setActiveImage(image?.url)}>
                <img
                  className="d-block border rounded p-2 cursor-pointer"
                  src={image?.url}
                  alt=""
                  height="100"
                  width="100"
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">{product?._id}</p>

        <hr />

        <div className="d-flex">
          <StarRatings
            rating={product?.rating || 0}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            starDimension="22px"
            starSpacing="1px"
          />
          <span id="no-of-reviews" className="pt-1 ps-2">
            ({product?.noOfReview || 0})
          </span>
        </div>

        <hr />

        <p id="product_price">${product?.price}</p>

        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
          <input
            type="number"
            className="form-control count d-inline"
            value={quantity}
            readOnly
          />
          <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
        </div>

        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          onClick={setItemsToCart}
          disabled={product?.stock === 0}
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status:{' '}
          <span
            id="stock_status"
            className={product?.stock > 0 ? 'greenColor' : 'redColor'}
          >
            {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>{product?.description}</p>

        <hr />
        <p id="product_seller" className="mb-3">
          Sold by: <strong>{product?.seller}</strong>
        </p>

        <div className="alert alert-danger my-5" type="alert">
          Login to post your review.
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
