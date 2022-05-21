import Home from './Components/Home';
import './index.css' 
import React from 'react';
import { useState } from 'react';
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
import Notifications from './Pages/Notifications';
import Payment from './Pages/Payment';
import Success from './Components/Success';
import Failure from './Components/Failure';
import Dashboard from './Pages/Dashboard';
import PricingContent from './Pages/PricingContent';
import Init from './Components/Init';
import AddService from './Pages/AddService';
import ListService from './Pages/ListService';
import ShowCalendar from './Pages/ShowCalendar';
import ModifyService from './Pages/ModifyService';
import AddCalendar from './Pages/AddCalendar';
import Admin from './Pages/Admin';
import PackCalendar from './Pages/PackCalendar';
import DashInstructor from './Pages/DashInstructor';
import './App.css';



export const loginContext = React.createContext()

function App() {
  const [isLoggedin, setLoggedIn] = useState('false');

  return (
    <loginContext.Provider value={{ isLoggedin, setLoggedIn }} >
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={ <Home  />} /> 
              <Route path="/Admin" element={<Admin  />} />
              <Route path="/AddMaterial" element={<AddMaterial  />} />
              <Route exact path="/ListMaterial/" element={ <ListMaterial  />} />
              <Route exact path="/AddService/" element={ <AddService  />} />
              <Route exact path="/AddCalendar/:id" element={ <AddCalendar  />} />
              <Route exact path="/ListService/" element={ <ListService  />} />
              <Route exact path="/ModifyService/:id" element={ <ModifyService  />} />
              <Route exact path="/ShowCalendar/:id" element={ <ShowCalendar  />} />
              <Route exact path="/PackCalendar/:id" element={ <PackCalendar  />} />
              <Route path="/ModifyMaterial/:id" element={ <ModifyMaterial  />} />
              <Route path="/SignUp" element={<SignUp  />}/>
              <Route path="/SignIn" element={<SignIn  />}/>
              <Route path="/AddInstructor" element={<AddInstructor  />}/>
              <Route exact path="/ListInstructor/" element={ <ListInstructor  />} />
              <Route exact path="/DashInstructor/" element={ <DashInstructor  />} />
              <Route exact path="/ModifyInstructor/:id" element={ <ModifyInstructor  />} />
              <Route exact path="/Notifications/" element={ <Notifications  />} />
              <Route exact path="/Payment/:id" element={ <Payment  />} />
              <Route exact path="/Success/:id" element={ <Success  />} />
              <Route exact path="/Failure" element={ <Failure  />} />
              <Route exact path="/Dashboard" element={ <Dashboard  />} />
              <Route exact path="/PricingContent" element={ <PricingContent  />} />
              <Route exact path="/Init" element={ <Init  />} />
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
