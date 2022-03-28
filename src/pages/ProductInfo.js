import React, {useRef, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getDoc, doc } from "firebase/firestore"; 
import fireDB from '../fireConfig';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import productdiscountimg from '../images/product-discount.png'
import {motion} from 'framer-motion';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import {useNavigate} from 'react-router-dom';


export default function ProductInfo() {

    const [ product, setProduct ] = useState(); 
    //Used for when you are creating navigational components 
    const params = useParams();

    //import the cart items
    const {cartItems} = useSelector(state=>state.cartReducer)

    //To dispatch the redux action
    const dispatch = useDispatch();

    //state to put/set product data
    const [ products, setProducts ] = useState([]);
    //Use useNavigate from react-router-dom to navigate to the product info  
    const navigate = useNavigate();
    //Loader
    const [loading, setLoading] = useState(false);

    const [width, setWidth] = useState(0);
    const carousel = useRef();


    useEffect(() => {
        //Calling the function on component mount
        getAllData();    
    }, [])

    //FUNCTION: get data from firestore, grab that data and put it in a state setProducts
    async function getData(){
        setLoading(true);
        try {
            //This is how you get product info using productid through useparams
            const productTemp = await getDoc(doc(fireDB, "products", params.productid));
            //Putting the product data in the state, setProducts then we can use the product var to get the data
            console.log(productTemp)
            setProduct(productTemp.data());
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

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
        getData()  
    }, [])

    //Whenever the cartItems is changed, write to local storage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems]);
    
    

    const addToCart = (product) =>{
        dispatch({type:'ADD_TO_CART', payload:product});
    }

    return (
        <Layout loading={loading}>
            <div className='container-info'>
                {product && (<div className='product-wrap'>
                    <div>
                        <div className='product-info-container'>
                        <div>
                            <img src={productdiscountimg} className="product-discount-img" alt="" />
                            <div className='view-image'>
                                <img src={product.imageURL} alt='' className='product-info-img'/>
                            </div>
                            <div className='product-thumb'>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            
                        </div>
                        <div className='product-info-right-block'>
                            <div className='prod-name'>
                                <p>{product.name}</p>
                                <span className='prod-name-rating'><i class="fas fa-star prod-name-star"></i>{product.rating} <i className='stroke'>|</i> <a href="#">25 Reviews</a></span>
                                <p><a href="#">iStore ZA</a></p>
                            </div>
                            <div>
                                <p>Product code: 194252211533</p>
                            </div>
                                
                            <div>
                                <p>About product</p>
                                <p>attentionThe mobile phone does not support the telecom CDMA network. 
                                    (E.g. U.S., Sprint, and Verizon operators)Due to the difference in light, 
                                    the actual color of the phone may be slightly different from the screen and pictures. 
                                    The color name is only used to distinguish each SKU. Please understand that</p>
                            </div>
                            <div>
                                <div className='product-tag'>
                                    <p>About product</p>  
                                    <p>BRAND</p>   
                                    <p>PRODUCT NAME</p>   
                                    <p>COLOR</p>   
                                    <p>SKU</p>   
                                    <p>TAGS</p>   
                                </div>
                                <div className='product-info-price'>
                                    <span>
                                        <h1>R {product.price}</h1>
                                        <h3 className='crossed-out'>R48 999.99</h3>
                                    </span>
                                    <i class="far fa-heart fav"></i>
                                    <button className='add-cart'onClick={()=> addToCart(product)}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className='recomended-prod'>
                            <h1 className='recomended-header-text'>You might like these</h1>
                        <motion.div className='essentials carousel' ref={carousel} whileTap={{cursor:"grabbing"}}>
                                {/* <button onClick={addProductsData}>add data</button> */}
                                <motion.div className='inner-carousel recommended-carousel' drag="x" dragConstraints={{right : 0, left: - 825}}>
                                    {products.map((product, i) =>{
                                        return <motion.div key={i}  className='recomended-details'>
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
                    </div>
                    
                </div>)}
            </div>
        </Layout>
    )
}
