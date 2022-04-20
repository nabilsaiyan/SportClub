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


function App() {
  return (
  <Router>
  <div className="App">
    <Navbar />
    <div className="content">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/AddMaterial">
          <AddMaterial />
        </Route>
        <Route path="/ListMaterial">
          <ListMaterial />
        </Route>
        <Route path="/ModifyMaterial">
          <ModifyMaterial />
        </Route>
        <Route path="/SignUp">
          <SignUp />
        </Route>
        <Route path="/SignIn">
          <SignIn />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  </div>
  </Router>
  );
}

export default App;
