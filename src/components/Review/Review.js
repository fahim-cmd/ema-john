import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory()
    
    const handleProceedCheckout = () => {
        history.push('/shipment')
    }

    const removeItem = productKey => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    //cart er data load kortesi, and fakedata er getdatabasecart theke load kortesi;
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart)

        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

     
    }, [])

    let thankYou;
    if(orderPlaced) {
        thankYou = <img src={happyImg} alt=""/>
    }
    

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem removeItem={removeItem} product={pd} key={pd.key}></ReviewItem>)
                }

                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="mainButton">Proceed Checkout</button>
                </Cart>
            </div>

        </div>
    );
};

export default Review;