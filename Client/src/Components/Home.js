import '../Css/Home.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Home = () => {
    let navigate = useNavigate();
    return ( 
        <section className="main">
            <div className="div1" >
                <h1>IT’S ALL ABOUT WHAT YOU CAN ACHIEVE</h1>
                <p>
                Empower yourself to make the changes you need to make
                </p>
                <Button className='button1' onClick={() => navigate('/SignIn')}>
                    Join NOW!
                </Button>
            </div>
            
        </section>
     );
}
 
export default Home;