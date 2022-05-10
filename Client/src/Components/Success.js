import { Link } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const Success = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    document.title = "Success";
    if(id === "1")
      localStorage.setItem("plan", "Basic Plan");
    if(id === "2")
      localStorage.setItem("plan", "Premium Plan");
    if(id === "3")
      localStorage.setItem("plan", "Full Plan");
    else 
      localStorage.setItem("plan", "Basic Plan");
  });
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