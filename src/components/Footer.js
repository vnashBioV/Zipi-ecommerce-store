import React from 'react'
import logo from '../images/logo.png'; 
import '../stylesheets/footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='footer'>
            <div>
                <ul>
                    <li><img src={logo} alt="" /></li>
                    <li><p>Zipi Store, a place where all your shopping needs are fulfilled.</p></li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><h1>Useful Links</h1></li>
                    <li><Link to="/">Terms of use</Link></li>
                    <li><Link to="/">Privacy Policy</Link></li>
                    <li><Link to="/">Frequently Asked Questions</Link></li>
                    <li><Link to="/">How to shop on Zipi Store</Link></li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><h1>My Account</h1></li>
                    <li><Link to="/">Sign In</Link></li>
                    <li><Link to="/">View Cart</Link></li>
                    <li><Link to="/">My Wishlist</Link></li>
                    <li><Link to="/">Track My Order</Link></li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><h1>Connect</h1></li>
                    <li><Link to="/"><i class="fab fa-facebook"></i></Link></li>
                    <li><Link to="/"><i class="fab fa-twitter"></i></Link></li>
                    <li><Link to="/"><i class="fab fa-instagram"></i></Link></li>
                    <li><Link to="/"><i class="fab fa-linkedin"></i></Link></li>
                </ul>
            </div>
        </div>
    )
}
