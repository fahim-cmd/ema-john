import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitCardForm from './SplitCardForm';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_51IeAsqKJm4gUepzARmrGvj5XTB0qOfgBftYwLeaY8xv2kYWWS4gb14vmaTCYEZ9uzWnAyJ2PNG7fhGAmxdz8JxS700KHwzW1Uv');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;