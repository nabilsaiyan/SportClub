import * as React from 'react';
import {Button,CssBaseline ,TextField , Link,Grid ,Box,Typography,Container} from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../App';
import { useEffect, useContext } from 'react';



const useStyles = makeStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block'
    }
  })


const theme = createTheme();

export default function SignIn() {
  const contextData = useContext(loginContext);
  useEffect(() => {
    contextData.setLoggedIn(false)
  });

  let navigate = useNavigate();
  const handleSubmit = (event) => {
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
      localStorage.setItem('accessToken', res.data)
      navigate('/');  
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
          
          <Typography component="h1" variant="h5">
            Sign in
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
            <Button className={classes.field}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end" >
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