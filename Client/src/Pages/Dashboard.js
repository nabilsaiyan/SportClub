import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <div className="not-found">
      <h2>Payment done successfully</h2>
      <p>Thank you for you subscription</p>
      <Link to="/">Back to the homepage...</Link>
    </div>
  );
}
 
export default Dashboard;