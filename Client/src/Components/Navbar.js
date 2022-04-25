import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import logo from '../logo.png';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { loginContext } from "../App";
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    button: {
      position: "absolute",
      right: 25,
      top : 20,
      width: '100px',
      backgroundColor: '#cb3434',
      color: 'white',
    
    },
    logo: {
      marginLeft: '50px',
    
    }
});




const NavbarBS = () => {
    let classes = useStyles();
    let navigate = useNavigate();
    let contextData = useContext(loginContext);
    
    return (
        <Navbar bg="light" variant="light"
        sticky="top" expand="sm" collapseOnSelect>
        <Navbar.Brand  className={classes.logo} href = '/'>
          <img src={logo} width="60px" height="50px" />{' '}
          Gym Life
        </Navbar.Brand>

        <Navbar.Toggle className="coloring" />
        <Navbar.Collapse>
          <Nav>
            <NavDropdown title="Services">
              <NavDropdown.Item href="" style={{color : 'grey'}} >NewsLetters</NavDropdown.Item>
              <NavDropdown.Item href="" style={{color : 'grey'}}>Blogs</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
            {contextData.isLoggedin ? <Button variant="contained"  className={classes.button} onClick={() => {
                
                localStorage.removeItem('accessToken');
                //appel fonction logout
                //contextData.setLoggedIn(true);
                navigate('/SignIn');
                 
                } }>
                  Logout
              </Button> : <Button  variant="contained" className={classes.button}  onClick={() => {
              navigate('/SignIn');
            } }>
                Login
            </Button> 
            
            
            /*<Button  variant="contained"  onClick={() => {
                    if(contextData.isLoggedin){
                        //localStorage.removeItem('accessToken');
                        //appel fonction logout
                        contextData.setLoggedIn(!contextData.isLoggedin);
                        navigate('/SignIn');
                    }
                    else {
                        navigate('/SignIn');
                    }
                } }>
                    {contextData.isLoggedin ? "Logout" : "Login"}
                </Button>*/}
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );
}

export default NavbarBS;