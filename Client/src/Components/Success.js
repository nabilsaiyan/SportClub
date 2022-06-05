import { Link } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const Success = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    document.title = "Success";
    if(id == "1"){
      localStorage.setItem("plan", "Basic");
      localStorage.setItem("planCalendar", "1");
    }
    else if(id == "2"){
      localStorage.setItem("plan", "Premuim");
      localStorage.setItem("planCalendar", "2");
}
    else if(id == "3"){
      localStorage.setItem("plan", "Full");
      localStorage.setItem("planCalendar", "3");
    }
    /*else {
      localStorage.setItem("plan", "Basic Plan");
      localStorage.setItem("planCalendar", "1");
    }*/
    axios.get("https://localhost:44373/api/Accounts/" + localStorage.getItem("login")).then(res => {
      let account = res.data;
      console.log(account);
      axios.get("https://localhost:44373/api/Subscriptions/" + localStorage.getItem("plan")).then(res => {
        let subscription = res.data;
        console.log(subscription);
        let t = {
          "accountId": account.accountId,
          //"account" : account,
          "subscriptionId": subscription.subscriptionId,
          //"subscription" : subscription,
          "payment": "Credit",
          "expirationDate": "2022-06-04T20:54:42.445Z"
        };
        console.log(t);
        axios.post("https://localhost:44373/api/Subscribers/", t).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      }
      ).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });


  }, []);

  console.log(id);
  return (
    <div className="my-container">
      <h2>Payment done successfully</h2>
      <p>Thank you for you subscription</p>
      <Link to="/Dashboard">Back to the Dashboard...</Link>
    </div>
  );
}
 
export default Success;