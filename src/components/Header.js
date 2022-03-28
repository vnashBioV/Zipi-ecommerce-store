import React from 'react'
import logo from '../images/logo.png'; 
import { Link } from 'react-router-dom'; 
import '../stylesheets/header.css'
import searchIcon from '../images/search-interface-symbol.png';
import carticon from '../images/cart-icon.png'
import profilepic from '../images/user.png'
import helpIcon from '../images/Icon ionic-ios-information-circle-outline.png'
import heart from '../images/Icon ionic-md-heart-empty.png'
import {useSelector} from 'react-redux';

export default function Header() {

    //grabbing the Items from cartReducer
    const {cartItems} = useSelector(state=>state.cartReducer)

    return (
        <div className="nav-container">
            <div>
                <Link className='navbar-brand' to="/"><img src={logo} alt="" /></Link>
                <ul className='category'>
                    <li>
                        <a href="#">Categories <i className="fas fa-chevron-down category-down-arr"></i></a>
                        <ul className='dropdown-top-nav'>
                            <li><a href="#">Electronics</a></li>
                            <li><a href="#">Home appliances</a></li>
                            <li><a href="#">Clothes</a></li>
                            <li><a href="#">furniture</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Sell on zipi</a></li>
                </ul>
                <ul className="navlist">
                    <li className="nav-item">
                        <Link className='nav-link' to="/"><img src={helpIcon} alt="" /> </Link>
                    </li>
                    <li className="nav-item search-con">
                        <Link className="nav-link" to="/"><img src={searchIcon} alt="" /></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link favorite-icon" to="/"><img src={heart} alt="" /> </Link>
                    </li>
                    <li className="nav-item cart" id='cart'>
                        <Link className="nav-link" to="/cart"><img src={carticon} alt="" /><p className='cartcountervar'>{cartItems.length}</p></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link login-btn" to="/register">Login</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
