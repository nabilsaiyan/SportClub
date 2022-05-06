import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import logo from '../logo.png';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { loginContext } from "../App";
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import { BellFill } from 'react-bootstrap-icons';


const useStyles = makeStyles({
    button: {
      position: "absolute",
      right: 25,
      top : 20,
      width: '100px',
      backgroundColor: '#cb3434',
      color: 'white',
    
    },
    button2: {
      backgroundColor: '#1ebb69'
    
    },
    logo: {
      marginLeft: '50px',
      fontSize: '25px',
      fontWeight: '500',
    }
});




const NavbarBS = () => {
    let classes = useStyles();
    let navigate = useNavigate();
    let contextData = useContext(loginContext);
    
    console.log("navbar" + localStorage.getItem('accessToken'));
    return (
        <Navbar bg="light" variant="light"
        sticky="top" expand="sm" collapseOnSelect>
        <Navbar.Brand  className="logo" href = '/'>
          <img src={logo} width="60px" height="50px" />{' '}
          Daily Gym
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
            <BellFill className="bell" onClick={() => navigate('/Notifications')} />
            {localStorage.getItem('accessToken') ? <Button variant="contained"  className={classes.button} onClick={() => {
                
                //localStorage.setItem('accessToken', null);
                localStorage.removeItem('accessToken');
                //appel fonction logout
                //contextData.setLoggedIn(true);
                navigate('/SignIn');
                 
                } }>
                  Logout
              </Button> : <Button  variant="contained" className={[classes.button, classes.button2]}  onClick={() => {
              navigate('/SignIn');
            } }>
                Login
            </Button> 
            }
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );
}

export default NavbarBS;