import React from 'react'
import logo from '../images/logo.png'; 
import { Link } from 'react-router-dom'; 
import '../stylesheets/header.css'
import searchIcon from '../images/search-interface-symbol.png'

export default function Header() {
    return (
        <div className="nav-container">
            <div>
                <Link className='navbar-brand' to="/"><img src={logo} alt="" /></Link>
                <ul className="navlist">
                    <li className="nav-item">
                        <Link className='nav-link' to="/"><i class="fas fa-info help-icon"></i></Link>
                    </li>
                    <li className="nav-item search-con">
                        <Link className="nav-link" to="/"><img src={searchIcon} alt="" /></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link favorite-icon" to="/"><i class="far fa-heart"></i></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Cart</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
