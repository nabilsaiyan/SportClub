import React from 'react';
import { useState } from 'react';
import './App.css';
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
              <Route path="/AddMaterial" element={<AddMaterial  />} />
              <Route exact path="/ListMaterial/" element={ <ListMaterial  />} />
              <Route path="/ModifyMaterial/:id" element={ <ModifyMaterial  />} />
              <Route path="/SignUp" element={<SignUp  />}/>
              <Route path="/SignIn" element={<SignIn  />}/>
              <Route path="/AddInstructor" element={<AddInstructor  />}/>
              <Route exact path="/ListInstructor/" element={ <ListInstructor  />} />
              <Route exact path="/ModifyInstructor/" element={ <ModifyInstructor  />} />
              <Route exact path="/Notifications/" element={ <Notifications  />} />
              <Route path="*" element={<NotFound  />} />
            </Routes>
          </div>
        </div>
    </BrowserRouter>
  </loginContext.Provider>
  );
}

export default App;
