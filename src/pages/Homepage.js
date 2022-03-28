import React, { useRef, useState, useEffect } from 'react'
import Layout from '../components/Layout';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import fireDB from '../fireConfig';
import { fireproducts } from '../firecommerce-products';
import {useNavigate, Link} from 'react-router-dom';
import '../stylesheets/homepage.css'
import Slider from '../components/Slider/Slider'
import SlidingLogos from '../components/SlidingLogos'
import discount from '../images/discount.png'
import {motion} from 'framer-motion';
import favHeartIcon from '../images/Icon feather-heart.png'

export default function Homepage() {

    //state to put/set product data
    const [ products, setProducts ] = useState([]);
    //Use useNavigate from react-router-dom to navigate to the product info  
    const navigate = useNavigate();
    //Loader
    const [loading, setLoading] = useState(false);

    // const [width, setWidth] = useState(0);
    const carousel = useRef();
    const innerCarouselDiv = useRef();

    const [position, setPosition] = useState(0);
    // useEffect(() => {
    //   setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    // }, [])
    

    useEffect(() => {
        //Calling the function on component mount
        getData()    
    }, [])

    //FUNCTION: get data from firestore, grab that data and put it in a state setProducts
    async function getData(){
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

    // //FUNCTION: Add products to firestoreabout
    // function addProductsData(){
    //     fireproducts.map(async (product) =>{
    //         try {
    //             await addDoc(collection(fireDB, "products"), product);
    //         } catch (error) {
    //             console.log(error)
    //         } 
    //     })
    // }

    const dragMe = () =>{
        // if(innerCarouselDiv.current.scrollWidth === 1487){

        // };
        innerCarouselDiv.current.classList.add("corouselMove");
        innerCarouselDiv.current.setAttribute('draggable', false);
        carousel.current.setAttribute('draggable', false);
        carousel.current.style.listStyle = "-webkit-user-drag: none;";
    }

    return (
        <Layout loading={loading}>            
            <div className="container home">
                    <div className='home-banner'>
                        <Slider />
                    </div>
                    <div className='brands'>
                        <h1>Shop brands</h1>
                        <SlidingLogos/>
                    </div>
                    <div className='btn-container'>
                    <motion.div className='on-sale carousel' ref={carousel} whileTap={{cursor:"grabbing"}}>
                        <p><b>On sale</b></p>
                        {/* <button onClick={addProductsData}>add data</button> */}
                        <motion.div className='inner-carousel' ref={innerCarouselDiv} drag="x" dragConstraints={{right : 0, left: - 500}}>
                            {products.slice(0, 9).map((product, i) =>{
                                return <motion.div key={i}  className='products-details'>
                                    <div onClick={() => {
                                        navigate(`/productinfo/${product.id}`)
                                    }}>
                                        <img src={product.imageURL} alt="" className='product-img'/>
                                        <img class="item-fav" src={favHeartIcon} alt="" />
                                        <h3>{product.name}</h3>
                                        <b>R{product.price}</b>
                                        <p className='initial-price'>R1234</p>
                                        <div className='discount'>
                                            <img src={discount} alt="" />
                                        </div>
                                        <p><i className="fas fa-star"></i><span>{product.rating}</span></p>
                                    </div>
                                </motion.div>
                            })}
                        </motion.div>
                    </motion.div>
                        {/* <button className='carouselBtn' onClick={dragMe}><i class="fas fa-chevron-right chev"></i></button> */}
                    </div>
                    <div className='lifestyle-shopping'>
                        <div>
                            <h1>Lifestyle shopping for less</h1>
                            <a href="shop-essential">Shop Essentials</a>
                            {/* <button onClick={addProductsData}>add</button> */}
                        </div>
                        <motion.div className='essentials carousel' ref={carousel} whileTap={{cursor:"grabbing"}}>
                            {/* <button onClick={addProductsData}>add data</button> */}
                            <motion.div className='inner-carousel' drag="x" dragConstraints={{right : 0, left: - 500}}>
                                {products.map((product, i) =>{
                                    return <motion.div key={i}  className='products-details'>
                                        <motion.div onClick={() => {
                                            navigate(`/productinfo/${product.id}`)
                                        }}>
                                            <img src={product.imageURL} alt="" className='product-img'/>
                                            <i class="far fa-heart item-fav"></i>
                                            <h3>{product.name}</h3>
                                            <b>R{product.price}</b>
                                            <p><i className="fas fa-star"></i><span>{product.rating}</span></p>
                                        </motion.div>
                                    </motion.div>
                                })}
                            </motion.div>
                        </motion.div>
                    </div>
                    
                    <div className='lifestyle-shopping'>
                        <div className='deals'>
                            <h1>Deals to get you going</h1>
                            <a href="shop-essential">Shop all deals</a>
                        </div>
                        <motion.div className='essentials carousel' ref={carousel} whileTap={{cursor:"grabbing"}}>
                            {/* <button onClick={addProductsData}>add data</button> */}
                            <motion.div className='inner-carousel' drag="x" dragConstraints={{right : 0, left: - 500}}>
                                {products.map((product, i) =>{
                                    return <motion.div key={i}  className='products-details'>
                                        <motion.div onClick={() => {
                                            navigate(`/productinfo/${product.id}`)
                                        }}>
                                            <img src={product.imageURL} alt="" className='product-img'/>
                                            <i class="far fa-heart item-fav"></i>
                                            <h3>{product.name}</h3>
                                            <b>R{product.price}</b>
                                            <p><i className="fas fa-star"></i><span>{product.rating}</span></p>
                                        </motion.div>
                                    </motion.div>
                                })}
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className='sell-on-zipi'>
                        <div>
                            <h1>Sell on Zipi</h1>
                            <p>
                                Earn by becoming a reseller with Zipi Now. <br />
                                Earn on every purchase and get live updates on your
                                sales to scale up and get access to free analytics
                            </p>
                            <a href="#">Learn more</a>
                        </div>
                    </div>
                    
            </div>
        </Layout>
    )
}
