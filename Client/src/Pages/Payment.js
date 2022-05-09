import React, { useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useParams } from 'react-router-dom';
import {Button, CircularProgress} from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import '../index.css'
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

  const useStyles = makeStyles({
    button :{
      width : '100%',
      padding: "10px",
      margin: '10px',
      borderRadius: '10px',
      border: 'none',
      color : '#fff',
      fontFamily: 'Rubik',
      backgroundColor : '#1768f4',
        '&:hover': {
          backgroundColor: "#104db6",
        }
    
    },
    cont : {
      display : 'flex',
      justifyContent : 'center',
      alignItems : 'center',

    }
  })

const Payment = () => {
  let classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [sub, setSub] = React.useState({"title":"Basic Plan", "price":0, "priceId":"price_1KwVoxFP14JlfJWO2nxHCHXZ"});
  const { id } = useParams();
  useEffect(() => {
    if(Number(id) == 1) {
      setSub({"title":"Basic Plan", "price":150, "priceId":"price_1KwVoxFP14JlfJWO2nxHCHXZ"});
    }
    else if(Number(id) == 2) {
      setSub({"title":"Premuim Plan", "price":350, "priceId":"price_1KwVq5FP14JlfJWODTmfWsV5"});
    }
    else{
      setSub({"title":"Full-Pack Plan", "price":750, "priceId":"price_1KwVqgFP14JlfJWO7CZtZ2Eg"});
    }

  }, []);


    //const stripe = Stripe("pk_test_51KvN1CFP14JlfJWO9Z58s2RPiagGBVwv2a4sk2jg3bTcFQS8l6OgiokqT6lCK3E76qvVIXxmJjPruxH0mRJkLAFn00amMznHYS");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("submit");
        let data = {
            "priceId" : sub.priceId
        } 
        axios.post('https://localhost:44373/api/Payments/create-checkout-session', data,
               /*{   headers: {
                   Authorization: "Bearer " + localStorage.getItem("accessToken")
               } }  */)
           .then(res => {
               console.log(res.data.sessionId); 
               setLoading(false);
               const session = {
                   "sessionId": res.data.sessionId
               }
               redirectToCheckout(session);
               
           }, (err) => {
                setLoading(false);
               console.log(err.message);
           }).catch(err => {
               console.log('err:', err)
           })
    }
    return (
      <div className="my-container">
        <div className="membership">
          <h1>Review Membership</h1>
          <div className="membership-info">
            <h2>{sub.title}</h2>
            <p>{sub.price}DH</p>
            <h2> Total in MAD </h2>
            <p className="strong">{sub.price}DH</p>
          </div>
            <Button className={classes.button}
              type="submit"
              onClick={handleSubmit}
            >
              Continue to Checkout
              <CircularProgress size={20} style={{color: '#fff', marginLeft: '5px', display: loading ? 'block' : 'none' }} />
              {/*loading ? <CircularProgress /> : null*/}
            </Button>
            {/*<button className="button continue" type="submit" onClick={handleSubmit}>Continue to Checkout</button>*/}
            <button className="button cancel" onClick={()=> {navigate("/PricingContent")}}>Cancel</button>
        </div>
      
      </div>
        );
        /*
        <div>
          <form onSubmit={handleSubmit} method="POST">
            <input type="hidden" name="priceId" value="price_1KvNMlFP14JlfJWOaYa3Kbui" />
          </form>
        </div>*/
    
    
}

export default Payment;