import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import Cart from '../Cart/Cart';
import Product from '../../components/Product/Product';
import './Shop.css';
import {addToDatabaseCart} from '../../utilities/databaseManager';

const Shop = () => {
    const first10 = fakeData.slice(0, 10)
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (eachProduct) => {
        const newCart = [...cart, eachProduct];       
        setCart(newCart);
        const sameProduct = newCart.filter(pd => pd.key === eachProduct.key )
        const count = sameProduct.length;
       
        addToDatabaseCart( eachProduct.key, count)
        // console.log(eachProduct.key, count);
    }
   
    return (
        <div className="shop-container"> 
            <div className="product-container">                
                {
                    products.map(product => <Product handleAddProduct = {handleAddProduct} showAddToCart = {true } key={product.key} product={product}></Product>)
                }                
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;