import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NotFound from './Components/NotFound';
import AddMaterial from './Pages/AddMaterial';
import ListMaterial from './Pages/ListMaterial';
import ModifyMaterial from './Pages/ModifyMaterial';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import AddInstructor from './Pages/AddInstructor';
import ListInstructor from './Pages/ListInstructor';
import ModifyInstructor from './Pages/ModifyInstructor';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Notifications from './Pages/Notifications';
import Payment from './Pages/Payment';
import Success from './Components/Success';
import Failure from './Components/Failure';
import Dashboard from './Pages/Dashboard';
import Pricing from './Pages/PricingContent';



function App() {
  return (
    <loginContext.Provider value={{ isLoggedin, setLoggedIn }} >
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={ <Home  />} /> 
              <Route path="/AddMaterial" element={<AddMaterial  />} />
              <Route exact path="/ListMaterial/" element={ <ListMaterial  />} />
              <Route path="/ModifyMaterial/:id" element={ <ModifyMaterial  />} />
              <Route path="/SignUp" element={<SignUp  />}/>
              <Route path="/SignIn" element={<SignIn  />}/>
              <Route path="/AddInstructor" element={<AddInstructor  />}/>
              <Route exact path="/ListInstructor/" element={ <ListInstructor  />} />
              <Route exact path="/ModifyInstructor/" element={ <ModifyInstructor  />} />
              <Route exact path="/Notifications/" element={ <Notifications  />} />
              <Route exact path="/Payment/" element={ <Payment  />} />
              <Route exact path="/Success" element={ <Success  />} />
              <Route exact path="/Failure" element={ <Failure  />} />
              <Route exact path="/Dashboard" element={ <Dashboard  />} />
              <Route path="*" element={<NotFound  />} />
              <Route path="*/*" element={<NotFound  />} />
            </Routes>
          </div>
        </div>
    </BrowserRouter>
    </loginContext.Provider>
  );
}

export default App;
