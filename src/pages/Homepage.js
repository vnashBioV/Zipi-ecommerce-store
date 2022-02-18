import React, { useRef, useState, useEffect } from 'react'
import Layout from '../components/Layout';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import fireDB from '../fireConfig';
import { fireproducts } from '../firecommerce-products';
import {useNavigate} from 'react-router-dom';
import '../stylesheets/homepage.css'
import Slider from '../components/Slider/Slider'
import SlidingLogos from '../components/SlidingLogos'
import discount from '../images/discount.png'
import {motion} from 'framer-motion';

export default function Homepage() {

    //state to put/set product data
    const [ products, setProducts ] = useState([]);
    //Use useNavigate from react-router-dom to navigate to the product info  
    const navigate = useNavigate();
    //Loader
    const [loading, setLoading] = useState(false);

    const [width, setWidth] = useState(0);
    const carousel = useRef();

    useEffect(() => {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }, [])
    

    useEffect(() => {
        //Calling the function on component mount
        getData()    
    }, [])

    //FUNCTION: get data from firestore, grab that data and put it in a state setProducts
    async function getData(){
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

    //FUNCTION: Add products to firestore
    function addProductsData(){
        fireproducts.map(async (product) =>{
            try {
                await addDoc(collection(fireDB, "products"), product);
            } catch (error) {
                console.log(error)
            } 
        })
    }

    return (
        <Layout loading={loading}>
            <>
            
            <div className="container home">
                    <div className='home-banner'>
                        <Slider />
                    </div>
                    <div className='brands'>
                        <h1>Shop brands</h1>
                        <SlidingLogos/>
                    </div>
                    <motion.div className='on-sale carousel' ref={carousel} whileTap={{cursor:"grabbing"}}>
                        <p><b>On sale</b></p>
                        {/* <button onClick={addProductsData}>add data</button> */}
                        <motion.div className='inner-carousel' drag="x" dragConstraints={{right : 0, left: -width}}>
                            {products.map((product, i) =>{
                                return <motion.div key={i}  className='products-details'>
                                    <motion.div onClick={() => {
                                        navigate(`/productinfo/${product.id}`)
                                    }}>
                                        <img src={product.imageURL} alt="" className='product-img'/>
                                        <i class="far fa-heart item-fav"></i>
                                        <h3>{product.name}</h3>
                                        <b>R {product.price}</b>
                                        <p className='initial-price'>R1234</p>
                                        <div className='discount'>
                                            <img src={discount} alt="" />
                                        </div>
                                        <p><i className="fas fa-star"></i><span>{product.rating}</span></p>
                                    </motion.div>
                                </motion.div>
                            })}
                        </motion.div>
                    </motion.div>
            
                    <div className='lifestyle-shopping'>
                        <div>
                            <h1>Lifestyle shopping for less</h1>
                            <a href="shop-essential">Shop Essentials</a>
                        </div>
                        <motion.div className='essentials carousel' ref={carousel} whileTap={{cursor:"grabbing"}}>
                            {/* <button onClick={addProductsData}>add data</button> */}
                            <motion.div className='inner-carousel' drag="x" dragConstraints={{right : 0, left: -width}}>
                                {products.map((product, i) =>{
                                    return <motion.div key={i}  className='products-details'>
                                        <motion.div onClick={() => {
                                            navigate(`/productinfo/${product.id}`)
                                        }}>
                                            <img src={product.imageURL} alt="" className='product-img'/>
                                            <i class="far fa-heart item-fav"></i>
                                            <h3>{product.name}</h3>
                                            <b>R {product.price}</b>
                                            <p className='initial-price'>R1234</p>
                                            <div className='discount'>
                                            </div>
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
                            <motion.div className='inner-carousel' drag="x" dragConstraints={{right : 0, left: -width}}>
                                {products.map((product, i) =>{
                                    return <motion.div key={i}  className='products-details'>
                                        <motion.div onClick={() => {
                                            navigate(`/productinfo/${product.id}`)
                                        }}>
                                            <img src={product.imageURL} alt="" className='product-img'/>
                                            <i class="far fa-heart item-fav"></i>
                                            <h3>{product.name}</h3>
                                            <b>R {product.price}</b>
                                            <p className='initial-price'>R1234</p>
                                            <div className='discount'>
                                            </div>
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

            </>
        </Layout>
    )
}
