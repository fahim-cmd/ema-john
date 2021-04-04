import React from 'react';

const Cart = (props) => {
    const cart = props.cart;

    // const totalPrice = cart.reduce( (total, prd) => total + prd.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
    }

    let shipping = 0;
    if (total > 50) {
        shipping = 0;
    }
    else if (total > 10 && total < 50) {
        shipping = 8.89;
    }
    else if (total > 0 && total < 10) {
        shipping = 15.22;
    }

    const tax = total / 10;

    const grandTotal = total + shipping + tax;

    const formatNumber = num => {
        const number = num.toFixed(2);
        return Number(number);
    }

    return (
        <div>
            <h2>Order Summary</h2>
            <h4>Items order: {cart.length}</h4>
            <h4>Product Price: {formatNumber(total)}</h4>
            <h4><small>Shipping Cost: {shipping}</small></h4>
            <h4>Tax + Vat: {formatNumber(tax)}</h4>
            <h4>Total Price: {formatNumber(grandTotal)}</h4>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;