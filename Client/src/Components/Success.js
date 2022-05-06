import { Link } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const Success = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  return (
    <div className="not-found">
      <h2>Payment done successfully</h2>
      <p>Thank you for you subscription</p>
      <Link to="/">Back to the homepage...</Link>
    </div>
  );
}
 
export default Success;