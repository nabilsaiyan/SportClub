import '../Css/Home.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import yoga from '../Images/yoga.jpg';
import cardio from '../Images/cardio.jpg';
import swimming from '../Images/swim.jpg';
import lifting from '../Images/lifting.jpg';
import { makeStyles } from '@material-ui/core';
import Notification from '../Components/Notification';


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

const Home = () => {
    document.title = "Daily Gym - HomePage"
    
    let classes = useStyles();
    let navigate = useNavigate();
    return (
        
        <div className='test'>
            <Notification/>
            <section className="main">
                <div className="div1" >
                    <h3>IT’S ALL ABOUT WHAT YOU CAN ACHIEVE</h3>
                    
                    <p>
                    Empower yourself to make the changes you need to make
                    </p>
                    <button className='button1' onClick={() => navigate('/SignIn')}>
                        Join NOW!
                    </button>
                </div>
                
            </section>
            <section className="main3">
                <h2>Available Classes</h2>
                <div className="grid-div">
                    <div>
                        <img className={classes.buttonImage} src={yoga}  /> 
                        <h1>Yoga</h1>
                    </div>
                    <div>
                        <img className={classes.buttonImage} src={cardio}  /> 
                        <h1>Cardio</h1>

                    </div>
                    <div>
                        <img className={classes.buttonImage} src={swimming}  /> 
                        <h1>Swimming</h1>
                    </div>
                    <div>
                        <img className={classes.buttonImage} src={lifting} /> 
                        <h1>Lifting</h1>
                    </div>
                </div>
                
            </section>
            <section className="main2">
                <div className="div2" >
                    <h2>ABOUT GYM LIFE</h2>
                    <p> We’re not here to carry you to fitness, we’re here to motivate you to carry yourself to your goals. 
                  </p>
                  <br/>
                  <p>
                     If you’re not sure what your goals are, or don’t know where to start on your fitness journey, come in and speak to one of our qualified trainers who can help you develop a plan.
                    </p>
                    <Button className='button2' onClick={() => navigate('/SignIn')}>
                        Start Training
                    </Button>
                </div>
                
            </section>
        </div>
     );
}
 
export default Home;