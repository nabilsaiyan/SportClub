import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>
                <Link to="/">
                    Home
                </Link>
            </h1>
            <div className="links">
                <Link to="Pricing">
                    Subscriptions
                </Link>
            </div>
            <div className="links">
                <Link to="SignIn">
                    Sign In
                </Link>
                <Link to="SignUp">
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;