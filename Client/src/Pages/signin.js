import * as React from 'react';
import {Button,CssBaseline ,TextField , Link,Grid ,Box,Typography,Container, Icon} from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../App';
import { useEffect, useContext } from 'react';
import logo from '../logo.png';
import { CircularProgress } from '@material-ui/core';



const useStyles = makeStyles({
    field: {
      marginBottom: 20,
      display: 'block'
    },
    buttonImage: {
      marginTop: 20,
    },
    header : {
      fontFamily : 'Rubik',
      fontSize : '30px',
      fontWeight : 'bold',
      color : '#2a80cd'
    }
  })


const theme = createTheme();

export default function SignIn() {
  const contextData = useContext(loginContext);
  const [login, setLogin] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    contextData.setLoggedIn(false)
  });

  let navigate = useNavigate();
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      login: data.get('login'),
      password: data.get('password'),
    });
    
    const data1 = {
      login: data.get('login'),
      password: data.get('password'),
    }
  
  axios.post('https://localhost:44373/api/Accounts/Login', data1)
  .then(res => {
    console.log(res);
    contextData.setLoggedIn(true)
    localStorage.setItem('accessToken', res.data);
    //console.log("testlogin", login +  login.includes('admin'));
    if(data1.login.includes('admin')){
      setTimeout(() => {
        setLoading(false);
        navigate('/Dashboard');
      }, 2000);
      }
      else 
        navigate('/');  
  }, (err) => {
      console.log(err.message);
      setLoading(false);
  }).catch(err => {
      console.log('err:', err)
  })
  };

let classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img className={classes.buttonImage} src={logo} width="150px" height="140px" />
          <Typography component="h1" className={classes.header} variant="h5">
            Welcome Back !
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12} className={classes.field}>
                <TextField
                  required
                  fullWidth
                  id="login"
                  label="Login"
                  name="login"
                  autoComplete="login"
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button className={classes.buttonImage}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
              <CircularProgress size={20} style={{marginLeft: '5px', display: loading ? 'block' : 'none' }} />
              {/*loading ? <CircularProgress /> : null*/}
            </Button>
            <Grid container justifyContent="flex-end" className={classes.buttonImage}>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  Don't have Account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}