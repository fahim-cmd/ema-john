import React from 'react';

const ReviewItem = (props) => {
console.log(props.product.quantity)
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '6px',
        marginLeft: '70px',
        paddingBottom: '6px',
        paddingLeft: '10px',
    }

    // console.log(props)
    return (
        <div style={reviewItemStyle}>
            <h4>{name}</h4>
            <p>quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <button className="mainButton" onClick={() => props.removeItem(key)}>Remove Item</button>
        </div>
    );
};

export default ReviewItem;