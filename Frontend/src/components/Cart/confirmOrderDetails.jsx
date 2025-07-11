import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { calculateOrderCost } from '../Helpers/helper';
import CheckoutSteps from './CheckoutSteps';

const ConfirmOrderDetails = () => {
    const {cartItems, shippingInfo} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.auth);
    const {subtotal, shipping, tax, total} = calculateOrderCost(cartItems);
  return (
    <>
    <CheckoutSteps shipping confirmOrder/>
    <div className="row d-flex justify-content-between">
      <div className="col-12 col-lg-8 mt-5 order-confirm">
        <h4 className="mb-3">Shipping Info</h4>
        <p><b>Name:</b> {user?.name}</p>
        <p><b>Email:</b> {user?.email}</p>
         <p><b>Phone No:</b> {shippingInfo?.phoneNo}</p>
        <p className="mb-4">
          <b>Address:</b> {shippingInfo?.address}</p>

        <hr />
        <h4 className="mt-4">Your Cart Items:</h4>

        <hr />
        {cartItems?.map((item) => (
            <div className="cart-item my-1">
                <div className="row">
                    <div className="col-4 col-lg-2">
                    <img
                        src="../images/product.jpg"
                        alt="Laptop"
                        height="45"
                        width="65"
                    />
                    </div>

                    <div className="col-5 col-lg-6">
                    <Link to={`/product/${item?.product}`}>{item?.name}</Link>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>{item?.quantity} x ${item?.price} = <b>${item?.quantity * item?.price}</b></p>
                    </div>
                </div>
            </div>
        ))}
        <hr />
      </div>

      <div className="col-12 col-lg-3 my-4">
        <div id="order_summary">
          <h4>Order Summary</h4>
          <hr />
          <p>Subtotal: <span className="order-summary-values"> ${subtotal}</span></p>
          <p>Shipping: <span className="order-summary-values"> ${shipping}</span></p>
          <p>Tax: <span className="order-summary-values"> ${tax}</span></p>

          <hr />

          <p>Total: <span className="order-summary-values"> ${total}</span></p>

          <hr />
          <Link to="/payment" id="checkout_btn" className="btn btn-primary w-100" >
            Proceed to Payment
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default ConfirmOrderDetails
