import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import ProductInfo from './ProductInfo'
import { FaTrash } from 'react-icons/fa'
import '../stylesheets/cart.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer'
import Header from '../components/Header'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import fireDB from '../fireConfig';


export default function Cartpage() {
    const {cartItems} = useSelector((state)=>state.cartReducer)
    const [totalAmount, setTotalAmount] = useState(0);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [ product, setProduct ] = useState(); 
    const [ products, setProducts ] = useState([]);
    const navigate = useNavigate();
    const salesTax = 20;
    const delivery = 200;
    const checkoutTotal = salesTax + delivery;

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
    
     //FUNCTION: get all products
     async function getAllData(){
        setLoading(true);
        try {
            setLoading(true);
            const products = await getDocs(collection(fireDB, "products"));
            //we will store the products in this array
            const productsArray = [];
            products.forEach((doc) => {
                const obj={
                    id:doc.id,
                    ...doc.data()
                }
            productsArray.push(obj)
            setLoading(false);
            });
            //Putting the product data in the state, setProducts then we can use the products to get the data
            setProducts(productsArray);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        //Calling the function on component mount
        getAllData();    
    }, [])

    return (
        <>
            <Header/>
            <div className='cart-wrapper'>
                <div className='cart-container'>
                    <h1 className='cart-hea'>Your cart</h1>
                    <div className='cartInnerWrapper'>
                        {/* {cartItems.map(item=>{
                    return<div className='cart-item-container'>
                                <div><img src={item.imageURL} height="80" width="80" alt=''/></div>
                                <div><p>{item.name}</p></div>
                                <div><p>R {item.price}</p></div>
                                <div><a href="#" className='remove-item-cart' onClick={() => deleteFromCart(item)}>Remove item</a></div>
                            </div>
                        })} */}
                        {cartItems.map(item=>{
                        return<div className='cart-item-wrapper'>
                                <div className='cart-info-section'>
                                    <div><img src={item.imageURL} height="80" width="80" alt=''/></div>
                                    <div className='cart-title'>
                                        <p>{item.name}</p>
                                        <p>R{item.price}</p>
                                    </div>
                                </div>
                                <div className='add-to-cart'>
                                    <div>
                                        <div>
                                            <p>Qty:</p>
                                            <span>1</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span onClick={() => deleteFromCart(item)}>
                                            <i class="fas fa-trash trash-wish-icons"></i> <p>Delete from cart</p>
                                        </span>
                                        <span>
                                            <i class="fas fa-heart trash-wish-icons"></i> <p>Move to wishlist</p>
                                        </span>
                                        
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <div className='order-wrapper'>
                    <div className="order-summary">
                        {/* <div className='summary-header'>
                            <div>
                                <p>Order Summary</p>
                            </div>
                            <div>
                                {cartItems.length} Item/s
                            </div>
                        </div> */}

                        {/* <div className='subtotal'>
                            <div>
                                <p>Subtotal</p>
                            </div>
                            <div>
                                <h1>R {totalAmount}</h1>
                            </div>
                        </div> */}
                        {/* <div className='total'>
                            <div>
                                <p>Total</p>
                            </div>
                            <div>
                                <h1>R {totalAmount}</h1>
                            </div>
                        </div> */}
                        {/* <div className='checkout-container'>
                            <button className='checkout'>Proceed to checkout</button>
                        </div> */}
                        <h1>Enjoy shopping with these <br /> geat DEALS</h1>
                        <button className='shop-now-btn'>Shop now</button>
                    </div>
                    <div>
                        <h1>Suggested</h1>
                        <p>Here's what others bought</p>
                        <motion.div className='carousel' whileTap={{cursor:"grabbing"}}>
                            <motion.div className='suggested-items-card inner-carousel' drag="x" dragConstraints={{right : 0, left: - 750}}>
                                {products.slice(0, 9).map((product, i) =>{
                                        return <motion.div key={i}>
                                            <div onClick={() => {
                                                navigate(`/productinfo/${product.id}`)
                                            }}>
                                                <img src={product.imageURL} alt="" className='product-img'/>
                                            </div>
                                        </motion.div>
                                    })}
                            </motion.div>
                        </motion.div>
                    </div>
                    <div>
                        <h1>Summary</h1>
                        <p>Ready to buy?</p>
                        <div className='summary-text'>
                            <div>
                                <p>Subtotal</p>
                                <p>R{totalAmount.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Sale Tax</p>
                                <p>R{salesTax.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Delivery</p>
                                <p>R{delivery.toFixed(2)}</p>
                            </div>
                            <Link className='checkout-btn' to="/register">Checkout &nbsp;<b>R{(checkoutTotal + totalAmount).toFixed(2)}</b></Link>
                        </div>
                    </div>
                </div>
                
            </div>
            <Footer/>
        </>
    )
}
