import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getDoc, doc } from "firebase/firestore"; 
import fireDB from '../fireConfig';
import { useParams } from 'react-router-dom';

export default function ProductInfo() {

    const [ product, setProduct ] = useState(); 
    //Used for when you are creating navigational components 
    const params = useParams();

    useEffect(() => {
        //Calling the function on component mount
        getData();    
    }, [])

    //FUNCTION: get data from firestore, grab that data and put it in a state setProducts
    async function getData(){
        try {
            //This is how you get product info using productid through useparams
            const productTemp = await getDoc(doc(fireDB, "products", params.productid));
            //Putting the product data in the state, setProducts then we can use the product var to get the data
            console.log(productTemp)
            setProduct(productTemp.data());
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            {product && (<div>
                <div className='product-info-container'>
                    <div>
                        <div className='view-image'>
                            <img src={product.imageURL} alt='' className='product-info-img'/>
                        </div>
                        <div className='product-thumb'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <hr  className='bottom-underline'/>
                        <div>
                            <span>
                                <h1>R45 999.99</h1>
                                <h3 className='crossed-out'>R48 999.99</h3>
                            </span>
                            <i class="far fa-heart fav"></i>
                            <button className='add-cart'>Add to cart</button>
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
                    </div>
                </div>
            </div>)}
        </Layout>
    )
}
