import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './Components/NotFound';
import AddMaterial from './Pages/AddMaterial';
import ListMaterial from './Pages/ListMaterial';
import ModifyMaterial from './Pages/ModifyMaterial';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import {createBrowserHistory} from 'history';
import {useHistory} from 'react-router-dom';



function App() {
  const historyInstance = createBrowserHistory();
  const history = useHistory();

  return (
    
    <Router history={historyInstance}>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} /> 
            <Route path="/AddMaterial" render={(props) => <AddMaterial {...props} />} />
            <Route exact path="/ListMaterial/" render={(props) => <ListMaterial {...props} />} />
            <Route path="/ModifyMaterial" render={(props) => <ModifyMaterial {...props} />} />
            <Route path="/SignUp" component={SignUp}/>
            <Route path="/SignIn" component={SignIn}/>
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
  </Router>
  );
}

export default App;
