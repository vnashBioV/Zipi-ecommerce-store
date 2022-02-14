import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import ProductInfo from './ProductInfo'
import { FaTrash } from 'react-icons/fa'
import '../stylesheets/cart.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


export default function Cartpage() {
    const {cartItems} = useSelector((state)=>state.cartReducer)
    const [totalAmount, setTotalAmount] = useState(0);
    const dispatch = useDispatch();

    //Update the local storage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems]);

    //Delete items from cart
    const deleteFromCart = (product) =>{
        dispatch({type:'DELETE_FROM_CART', payload:product});
    }   

    

    //Get the total amount
    useEffect(() => {
      let listPrice = [];
      cartItems.forEach((cartItem) =>{
          listPrice.push(cartItem.price)
      })
      //Total price
      var sum = listPrice.reduce(function(a, b) {
        return parseFloat(a) + parseFloat(b);
      }, 0);
      setTotalAmount(sum)
    }, [cartItems])
    
    return (
        <Layout>
            <div className='cart-container'>
                <div className='continue-container'>
                    <Link className='continue-shopping' to="/">Continue Shopping</Link>
                </div>
                <div className='cart-item-header'>
                    <div>Image</div>
                    <div>Name/Item details</div>
                    <div>Price</div>
                    <div>Action</div>
                </div>
                <div>
                    {cartItems.map(item=>{
                  return<div className='cart-item-container'>
                            <div><img src={item.imageURL} height="80" width="80" alt=''/></div>
                            <div><p>{item.name}</p></div>
                            <div><p>R {item.price}</p></div>
                            <div><a href="#" className='remove-item-cart' onClick={() => deleteFromCart(item)}>Remove item</a></div>
                        </div>
                    })}
                </div>
            </div>
            <div className="order-summary">
                <div className='summary-header'>
                    <div>
                        <p>Order Summary</p>
                    </div>
                    <div>
                        {cartItems.length} Item/s
                    </div>
                </div>

                <div className='subtotal'>
                    <div>
                        <p>Subtotal</p>
                    </div>
                    <div>
                        <h1>R {totalAmount}</h1>
                    </div>
                </div>
                <div className='total'>
                    <div>
                        <p>Total</p>
                    </div>
                    <div>
                        <h1>R {totalAmount}</h1>
                    </div>
                </div>
                <div className='checkout-container'>
                    <button className='checkout'>Proceed to checkout</button>
                </div>
            </div>
        </Layout>
    )
}
