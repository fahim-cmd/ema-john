import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import '../Shipment/Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shippingData, setShippingData] = useState(null)

  const onSubmit = data => {
    setShippingData(data)
  };


  const handlePaymentSuccess = paymentId => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: shippingData,
      paymentId,
      orderTime: new Date()
    }


    fetch('http://localhost:5000/addOrder', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder()
          alert('your order placed successfully')
        }

      })
  }
  return (
    <div className="row">
      <div style={{display: shippingData ? 'none' : 'block'}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          {/* <input name="example" defaultValue="test" ref={register} />       */}
          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="write your name" />
          {errors.name && <span className="error">Name is required</span>}

          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
          {errors.email && <span className="error">Email is required</span>}

          <input name="address" ref={register({ required: true })} placeholder="address" />
          {errors.address && <span className="error">Address is required</span>}

          <input name="Phone" ref={register({ required: true })} placeholder="PHone number" />
          {errors.phone && <span className="error">Phone Number is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div style={{display: shippingData ? 'block' : 'none'}} className="col-md-6">
        <h2>pay for me</h2>
        <ProcessPayment handlePayment = {handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;