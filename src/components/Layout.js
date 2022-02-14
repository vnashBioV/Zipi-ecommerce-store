import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Subscribe from './Subscribe'

export default function Layout(props) {
    return (
        <div>
            <Header/>
            <div className="content">
                {props.children}
            </div>
            <Subscribe/>
            <Footer/>
        </div>
    )
}
