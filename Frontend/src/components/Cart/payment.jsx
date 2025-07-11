import React, { useEffect, useState } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useSelector } from 'react-redux';
import { calculateOrderCost } from '../Helpers/helper';
import { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } from '../../Redux/api/orderApi.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [paymentMode, setPaymentMode] = useState('');
  const {shippingInfo, cartItems} = useSelector((state) => state.cart);   
  const [createNewOrder, {isLoading, error, isSuccess}] = useCreateNewOrderMutation();
  const [stripeCheckoutSession, {data: checkoutData, error: checkoutError}] = useStripeCheckoutSessionMutation();
  const navigate = useNavigate()
  useEffect(() => {
    if(checkoutData ){
        window.location.href = checkoutData?.url;
    }
    if(checkoutError){
        toast.error(checkoutError?.data?.message);
    }
  },[checkoutData, checkoutError])
  useEffect(() => { 
    if(error){
        console.log("Error:", error);
        toast.error(error?.data?.message);
    }
    if(isSuccess){
        navigate("/")
    }
  },[error, isSuccess] )
  const handleSubmit = (e) => {
    e.preventDefault();
    const {subtotal, shipping, tax, total} = calculateOrderCost(cartItems);
    if(paymentMode === 'COD'){
        const orderDetails = {
            shippingInfo,                    
            orderItems: cartItems,           
            paymentMethod: paymentMode,      
            paymentInfo: {
                id: '',                        
                status: 'Pending',            
            },
            itemsPrice: subtotal,            
            shippingPrice: shipping,         
            taxPrice: tax,                   
            totalPrice: total,               
        };
        console.log('Order Details:', orderDetails);
        createNewOrder(orderDetails);
    } 
    if(paymentMode === 'Card'){
        const orderDetails = {
            shippingInfo,                    
            orderItems: cartItems,   
            itemsPrice: subtotal,            
            shippingAmount: shipping,         
            taxAmount: tax,
            totalAmount: total,               
        };
        console.log('Order Details:', orderDetails);
        stripeCheckoutSession(orderDetails);
    }

  };

  return (
    <>
    <CheckoutSteps shipping confirmOrder payment />
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4">Select Payment Method</h2>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment_mode"
              id="codradio"
              value="COD"
              checked={paymentMode === 'COD'}
              onChange={(e) => setPaymentMode(e.target.value)}
            />
            <label className="form-check-label" htmlFor="codradio">
              Cash on Delivery
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment_mode"
              id="cardradio"
              value="Card"
              checked={paymentMode === 'Card'}
              onChange={(e) => setPaymentMode(e.target.value)}
            />
            <label className="form-check-label" htmlFor="cardradio">
              Card - VISA, MasterCard
            </label>
          </div>

          <button id="shipping_btn" type="submit" className="btn py-2 w-100">
            CONTINUE
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Payment;
