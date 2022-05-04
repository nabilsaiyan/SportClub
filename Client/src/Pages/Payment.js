import React from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";


let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51KvN1CFP14JlfJWO9Z58s2RPiagGBVwv2a4sk2jg3bTcFQS8l6OgiokqT6lCK3E76qvVIXxmJjPruxH0mRJkLAFn00amMznHYS");

  }

  return stripePromise;
};

const redirectToCheckout = async (session) => {
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(session);
    console.log("Stripe checkout error", error);

  };


const Payment = () => {
    //const stripe = Stripe("pk_test_51KvN1CFP14JlfJWO9Z58s2RPiagGBVwv2a4sk2jg3bTcFQS8l6OgiokqT6lCK3E76qvVIXxmJjPruxH0mRJkLAFn00amMznHYS");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit");
        let data = {
            "priceId" : "price_1KvNMlFP14JlfJWOaYa3Kbui"
        } 
        axios.post('https://localhost:44373/api/Payments/create-checkout-session', data,
               /*{   headers: {
                   Authorization: "Bearer " + localStorage.getItem("accessToken")
               } }  */)
           .then(res => {
               console.log(res.data.sessionId); 
               const session = {
                   "sessionId": res.data.sessionId
               }
               redirectToCheckout(session);
               
           }, (err) => {
               console.log(err.message);
           }).catch(err => {
               console.log('err:', err)
           })
    }
    return (
        <div>
          <button type="submit" onClick={handleSubmit}>Checkout</button>
          <form onSubmit={handleSubmit} method="POST">
             <input type="hidden" name="priceId" value="price_1KvNMlFP14JlfJWOaYa3Kbui" />
          </form>
        </div>
      );
    
}

export default Payment;