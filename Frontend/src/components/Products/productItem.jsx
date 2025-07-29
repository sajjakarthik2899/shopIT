import React from 'react'
import productDef from '../../images/default_product.png'
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const ProductItem = (product) => {
    console.log(product, "Product Item Data");
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
        <div className="card p-3 rounded">
        <img
            className="card-img-top mx-auto"
            src={product?.product?.images[0]?.url || productDef}
            alt=""
        />
        <div
            className="card-body ps-3 d-flex justify-content-center flex-column"
        >
            <h5 className="card-title">
            <Link to={`/product/${product?.product?._id}`}>{product?.product?.name}</Link>
            </h5>
            <div className="ratings mt-auto d-flex">
            <StarRatings
                rating={product?.product?.rating || 0}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name='rating'
                starDimension='22px'
                startSpacing='1px'
            />
            <span id="no_of_reviews" className="pt-2 ps-2"> {product?.product?.numOfReview} </span>
            </div>
            <p className="card-text mt-2">${product?.product?.price}</p>
            <Link to={`product/${product?.product?._id}`} id="view_btn" className="btn btn-block">
                View Product Details
            </Link>
        </div>
        </div>
    </div>
  )
}

export default ProductItem
