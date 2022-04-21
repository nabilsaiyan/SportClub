import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './Components/NotFound';
import AddMaterial from './Pages/AddMaterial';
import ListMaterial from './Pages/ListMaterial';
import ModifyMaterial from './Pages/ModifyMaterial';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import AddInstructor from './Pages/AddInstructor';
import {createBrowserHistory} from 'history';
//import {useHistory} from 'react-router-dom';



function App() {
  const historyInstance = createBrowserHistory();
  //const history = useHistory();

  return (
   
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={ <Home  />} /> 
            <Route path="/AddMaterial" element={<AddMaterial  />} />
            <Route exact path="/ListMaterial/" element={ <ListMaterial  />} />
            <Route path="/ModifyMaterial" element={ <ModifyMaterial  />} />
            <Route path="/SignUp" element={SignUp}/>
            <Route path="/SignIn" element={SignIn}/>
            <Route path="/AddInstructor" element={AddInstructor}/>
            <Route path="*" element={NotFound} />
          </Routes>
        </div>
      </div>
  </BrowserRouter>
  );
}

export default App;
