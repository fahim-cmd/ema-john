import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart]= useState([]);

    const removeItem = productKey => {
        const newCart = cart.filter( pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    //cart er data load kortesi, and fakedata er getdatabasecart theke load kortesi;
    useEffect(() =>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart)

        const cartProduct = productKeys.map(key => {
            const product = fakeData.find( pd => pd.key === key)
            product.quantity = saveCart.key
            return product;
        })
        setCart(cartProduct)
    }, [])

  

    return (
        <div>
                <h2>Order Item: {cart.length}</h2>
                {
                    cart.map(pd => <ReviewItem removeItem={removeItem} product={pd}></ReviewItem>)
                }
        </div>
    );
};

export default Review;