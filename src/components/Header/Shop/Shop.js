import React, { useEffect, useState } from 'react';
import fakeData from '../../../fakeData'
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0, 10)
    const [products, setProducts] = useState(first10)

    const handleAddProduct = (eachProduct) => {
        console.log("clicked me", eachProduct)
    }
   
    return (
        <div className="shop-container"> 
            <div className="product-container">                
                {
                    products.map(product => <Product handleAddProduct = {handleAddProduct} product={product}></Product>)
                }                
            </div>
            <div className="cart-container">
                <h1>this is cart</h1>
            </div>
        </div>
    );
};

export default Shop;