import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
//import StarIcon from '@material-ui/core/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link1 from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router';


const useStyles = makeStyles({
    ul: {   },
    anime : {
        padding: 0,
        '&:hover': {
            transform : 'scale(1.3)',
            transition: 'transform 0.3s ease-out',
            boxShadow : '0px 0px 10px rgb(23, 104, 244 ,0.5)'
        }
        
    }
});


const tiersInit = [
    {   
        subscriptionId : 1,
        title: 'Basic Plan',
        price: '150',
        description: [
            'Access to the Gym',
            'Monitoring (1 session/week)',
        ],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        subscriptionId : 2,
        title: 'Premuim Plan',
        subheader: 'Most popular',
        price: '350',
        description: [
            'Access to the Gym',
            'Swimming Pool Access',
            'Monitoring (3 sessions/week)',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        subscriptionId : 3,
        title: 'Full-Pack Plan',
        price: '750',
        description: [
            'Acces to the Gym',
            'Swimming Pool Access',
            'Access to the Sauna',
            'Monitoring (unlimited)'
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];





function PricingContent() {
    const [tiers, setTiers] = useState([])
    const navigate = useNavigate();

    const handleSubmit = (id) => {
        console.log(id)
        console.log("Submitted");
        if(localStorage.getItem("login") != "admin")
            navigate("/Payment/" + id);
    }

    useEffect(() => {
        axios.get("https://localhost:44373/api/Subscriptions",)
            .then(res => {
                if(res.data.length > 0)
                    setTiers(res.data);
                else 
                    setTiers(tiersInit);
            })
            .catch(err => {
                console.log("err")
                console.log(err);
            });
    }, []);

    const classes = useStyles();
    return (
        <React.Fragment className={classes.ul}>
           
            <Container >
            <h1>Subscriptions</h1>
                <Grid container spacing={5} alignItems="flex-end" >
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                        
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'Enterprise' ? 12 : 6}
                            md={4}
                        >
                            <Card
                            className={classes.anime}>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    //action={tier.title === 'Pro' ? <StarIcon /> : null}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography component="h2" variant="h3" color="text.primary">
                                            {tier.price}DH
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            /mo
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    {localStorage.getItem("login") != "admin" ? <button id={tier.subscriptionId} className="button continue" onClick={(e) => {
                                        handleSubmit(e.target.id)
                                        
                                    }}>
                                        Get Started
                                    </button> : '' }
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            
        </React.Fragment>
    );
}

export default function Pricing() {
    return <PricingContent />;
}