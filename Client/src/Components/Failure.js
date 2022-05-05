import { Link } from "react-router-dom"

const Failure = () => {
  return (
    <div className="not-found">
      <h2>Payment Failed :(</h2>
      <p>Please Try again!</p>
      <Link to="/">Back to the homepage...</Link>
    </div>
  );
}
 
export default Failure;