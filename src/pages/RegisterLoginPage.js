import React, { useEffect, useRef, useState } from 'react'
import '../stylesheets/registerlogin.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

export default function RegisterLoginPage() {
    const {cartItems} = useSelector((state)=>state.cartReducer)
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);

    const salesTax = 20;
    const delivery = 200;
    const checkoutTotal = salesTax + delivery;

    const registerUser = useRef();
    const registerPage = useRef();

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

    //Body margin
    useEffect(() => {
        document.body.style.marginTop ="0px";
    
        return () => {
          document.body.style.marginTop ="93px";
        };
      }, []);

      //Show and hide registeration
      const showHideRegisterForm =() =>{

            if (registerUser.current.classList.contains("showSlideRegisterForm")) {
                registerUser.current.classList.remove("showSlideRegisterForm");
            } else {
                registerUser.current.classList.add("showSlideRegisterForm");
            }
          
      }
    //   //Hide registeration
    //   const hideRegisterForm =() =>{
    //       registerUser.current.style.display="none"
    //   }

    // useEffect(() => {
    //   if(registerUser.current.style)
    // }, [])
    

    return (
        <div className='register-page' ref={registerPage}>
            <div>
                <div>
                    <div>
                        <h1>Checkout</h1>
                        <button onClick={() => navigate(-1)}> Go back</button>
                    </div>
                    <div>
                        <p>Before you can check out, you need to have an existing account with us. Don't worry, you'll continue <br /> where you left off after we sign you in.</p>
                        <div className='login-form-container'>
                            <div>
                                <h1>Login</h1>
                                <input type="text" placeholder='Email' />
                                <input type="password" placeholder='Password' />
                                <Link alt="" to="/">Forgot your password?</Link>
                                <button className='checkout-signin-btn'>Sign in</button>
                                <span className='no-account'>Don't have an account yet? &nbsp;<button onClick={showHideRegisterForm}>Sign up</button></span>
                            </div>
                            <div>
                                <h1>Guest</h1>
                                <button className='checkout-signin-btn checkguest'>Checkout as a Guest</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='register-user' ref={registerUser}>
                    <div>
                        <h1>Checkout</h1>
                        <button onClick={() => navigate(-1)}> Go back</button>
                    </div>
                    <div>
                        <p>Before you can check out, you need to have an existing account with us. Don't worry, you'll continue <br /> where you left off after we sign you in.</p>
                        <div className='login-form-container'>
                            <div>
                                <h1>Register</h1>
                                <input type="text" placeholder='First Name' />
                                <input type="password" placeholder='Last Name' />
                                <input type="password" placeholder='Email' />
                                <input type="password" placeholder='Password' />
                                <input type="password" placeholder='Phone' />
                                <button className='checkout-signin-btn padding'>Sign up</button>
                                <span className='no-account'>Already have an account? &nbsp;<button onClick={showHideRegisterForm}>Login</button></span>
                            </div>
                            <div>
                                <h1>Guest</h1>
                                <button className='checkout-signin-btn checkguest'>Checkout as a Guest</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='cart-summary'>
                    <h1>Cart summary</h1>
                    {cartItems.map(item=>{
                    return<div>
                            <div><img src={item.imageURL} height="80" width="80" alt=''/></div>
                            <div className='cart-title'>
                                <p>{item.name}</p>
                                <p>R{item.price}</p>
                            </div>
                            <div><span>1</span></div>
                        </div>
                    })}
                </div>
                <div>
                    <h1>Summary</h1>
                    <div className='summary-block'>
                        <div>
                            <p>Subtotal</p>
                            <p>Sales Tax</p>
                            <p>Delivery</p>
                        </div>
                        <div>
                            <p>R{totalAmount}</p>
                            <p>R{salesTax.toFixed(2)}</p>
                            <p>R{delivery.toFixed(2)}</p>
                        </div>
                    </div>
                    <hr className='total-outline'/>
                    <div className='total-block'>
                        <div>
                            <p>Total</p>
                        </div>
                        <div>
                            <p>R{(totalAmount + salesTax + delivery).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}
