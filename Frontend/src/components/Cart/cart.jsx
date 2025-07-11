import {React} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCartItem, removeCartItem } from '../../Redux/features/cartSlice';

const Cart = () => {
    const {cartItems} = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log("Cart Items:", cartItems);
    const dispatch = useDispatch();
    const increaseQty = (item, quantity) => {
        const newQuantity = quantity + 1;
        if (newQuantity >= item?.stock) return;
        setItemsToCart(item, newQuantity);
    };

    const decreaseQty = (item, quantity) => {
        if (quantity <= 1) return;
        setItemsToCart(item, quantity - 1);
    };
    const removeFromCart = (id) => {
        dispatch(removeCartItem({ product: id}));
    }
    const setItemsToCart = (item, newQnty) => {
        const cartItem = {
            product: item?.product,
            name: item?.name,
            price: item?.price,
            image: item?.image,
            stock: item?.stock,
            quantity: newQnty,
        };
        console.log("Setting item to cart:", cartItem);
        dispatch(setCartItem(cartItem));
    };
    const onCheckoutHandler = () => {
        navigate('/shipping');
    }
  return (
    <>
        <h2 className="mt-5">Your Cart: {cartItems.length} items</h2>
        <div className="row d-flex justify-content-between">
     {
     cartItems.length === 0 ? (
        <h2 className="mt-5">No Cart Items</h2>
        ) : (
            cartItems.map((item) => (
            
                <div className="col-12 col-lg-8">
                    <hr />
                    <div className="cart-item" data-key={item.product}>
                    <div className="row">
                        <div className="col-4 col-lg-3">
                        <img
                            src={item.image}
                            alt="Laptop"
                            height="90"
                            width="115"
                        />
                        </div>
                        <div className="col-5 col-lg-3">
                            <Link href={`/products/${item?.product}`}>{item?.name}</Link>
                        </div>
                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item?.price}</p>
                        </div>
                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus" onClick={() => decreaseQty(item, item?.quantity)}> - </span>
                            <input
                            type="number"
                            className="form-control count d-inline"
                            value={item?.quantity}
                            readOnly
                            />
                            <span className="btn btn-primary plus" onClick={() => increaseQty(item, item?.quantity)}> + </span>
                        </div>
                        </div>
                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeFromCart(item?.product)}></i>
                        </div>
                        
                    </div>
                    </div>
                </div>
            
        ))
        )
        }

        <div class="col-12 col-lg-3">
            <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal: <span class="order-summary-values">{`${totalQuantity} (Units)`}</span></p>
                <p>Est. total: <span class="order-summary-values">${totalPrice.toFixed(2)}</span></p>
                <hr />
                <button id="checkout_btn" class="btn btn-primary w-100" onClick={onCheckoutHandler}>
                    Check out
                </button>
            </div>
        </div>
        </div>
    </>
  )
}

export default Cart;
