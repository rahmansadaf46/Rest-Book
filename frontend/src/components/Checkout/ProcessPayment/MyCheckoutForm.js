import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const MyCheckoutForm = ({ handlePayment, restaurantData, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    // const [paymentError, setPaymentError] = useState(null);
    // const [paymentSuccess, setPaymentSuccess] = useState(null);

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            alert(error.message);
            // setPaymentError(error.message);
            // setPaymentSuccess(null);
            // console.log('[error]', error);
        } else {
            alert("Payment Succeeded");
            // setPaymentSuccess(paymentMethod.id);
            // setPaymentError(null);
            handlePayment(paymentMethod.id);
            // console.log('[PaymentMethod]', paymentMethod);
        }
    };
console.log(restaurantData?.paymentAmount)
    return (
        <div>
            <form onSubmit={handleSubmit}>
              
                <CardElement />
                <br />
                
                {parseInt(amount) >= parseInt(restaurantData?.paymentAmount || 0) && <button className="btn btn-danger" type="submit" disabled={!stripe}>
                    Pay
      </button>}
               
            </form>
            <br />
            {/* {
                paymentError && <h3 className="text-center" style={{ color: 'red' }}>{paymentError}</h3>
            } */}
            {/* {
                paymentSuccess && <h3 style={{ color: 'green' }}>Your payment was successful.</h3>
            } */}
        </div>
    );
};

export default MyCheckoutForm;