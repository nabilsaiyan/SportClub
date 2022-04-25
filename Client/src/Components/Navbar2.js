import { Button, makeStyles } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { loginContext } from "../App";
import { Link } from "@material-ui/core";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
    login: {
        position: "absolute",
        right: 20,
        top : 12,

    },
    head: {

    } 
});

const Navbar2 = () => {
    //const [isLoggedin, setLoggedIn] = useState(loginContext);
    const contextData = useContext(loginContext);
    const navigate = useNavigate();
    const classes = useStyles();

    useEffect(() => {

    })

    return ( 
        <nav className="navbar">
            <h1 className={classes.head}>Gym</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Button  variant="contained" className={classes.login} onClick={() => {
                    if(contextData.isLoggedin){
                        localStorage.removeItem('accessToken');
                        //appel fonction logout
                        contextData.setLoggedIn(!contextData.isLoggedin);
                        navigate('/SignIn');
                    }
                    else {
                        navigate('/SignIn');
                    }
                } }>
                    {contextData.isLoggedin ? "Logout" : "Login"}
                </Button>
            </div>
        </nav>
     );
}
 
export default Navbar2;