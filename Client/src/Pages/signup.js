import * as React from 'react';
import {Button,CssBaseline ,TextField , Link,Grid ,Box,Typography,Container} from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import logo from '../logo.png';



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

export default function SignUp() {
  const navigate = useNavigate();
  let role = {};
  useEffect(() => {
    
    console.log("useEffect");
    

    //// temporary
    /*  axios.post('https://localhost:44373/api/Roles/', {
        "name": "instructor",
        "description": "at the gym"
      })
    .then(res => {
        console.log(res);
        
    }, (err) => {
        console.log(err.message);
    }).catch(err => {
        console.log('err:', err)
    });

      axios.post('https://localhost:44373/api/Roles/', {
        "name": "internaute",
        "description": "at the gym"
      })
    .then(res => {
        console.log(res);
        
    }, (err) => {
        console.log(err.message);
    }).catch(err => {
        console.log('err:', err)
    });*/


    //////

    axios.get("https://localhost:44373/api/Roles/1" ,)
    .then(res => {
        role = res.data;
        console.log(role);
        
    })
    .catch(err => {
        console.log("err")
        console.log(err);
    });
}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    
    const data1 = {
      login: data.get('login'),
      password: data.get('password'),
  }
  
  let finalData = {
    "login": data1.login,
    "password": data1.password,
    "roleId": role.roleId,
    "role": role
  }

  console.log(finalData);

  axios.post('https://localhost:44373/api/Accounts/', finalData)
  .then(res => {
      console.log(res);
      navigate('/SignIn');
      
  }, (err) => {
      console.log(err.message);
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

          <Typography component="h1" variant="h5" className={classes.header}>
            Join us !
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
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="cPassword"
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end" className={classes.buttonImage}>
              <Grid item>
                <Link href="/SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}