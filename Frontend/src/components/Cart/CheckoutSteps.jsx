import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className="checkout-progress d-flex justify-content-center align-items-center mt-5">
{shipping ? (
  <Link to="/shipping" className="step-wrapper">
    <div className="triangle2-active"></div>
    <div className="step active-step">Shipping</div>
    <div className="triangle-active"></div>
  </Link> ) : (
  <div className="step-wrapper">
    <div className="triangle2-incomplete"></div>
    <div className="step incomplete">Shipping</div>
    <div className="triangle-incomplete"></div>
  </div>
  )}
{confirmOrder ? (
  <Link to="/confirm_order" className="step-wrapper">
    <div className="triangle2-active"></div>
    <div className="step active-step">Confirm Order</div>
    <div className="triangle-active"></div>
  </Link> ) : (

  <div className="step-wrapper">
    <div className="triangle2-incomplete"></div>
    <div className="step incomplete">Confirm Order</div>
    <div className="triangle-incomplete"></div>
  </div>
  )}

{payment ? (
  <Link to="/payment_method" className="step-wrapper">
    <div className="triangle2-active"></div>
    <div className="step active-step">Payment</div>
    <div className="triangle-active"></div>
  </Link>): (

  <div className="step-wrapper">
    <div className="triangle2-incomplete"></div>
    <div className="step incomplete">Payment</div>
    <div className="triangle-incomplete"></div>
  </div>
    )}
</div>


  )
}

export default CheckoutSteps
