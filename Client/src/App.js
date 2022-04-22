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
import Pricing from './Pages/PricingContent';



function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Navbar />
        {/* <div className="content"> */}
        <Routes>
          <Route path="/Pricing" element={<Pricing />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/AddMaterial" element={<AddMaterial />} />
          <Route exact path="/ListMaterial/" element={<ListMaterial />} />
          <Route path="/ModifyMaterial/:id" element={<ModifyMaterial />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/AddInstructor" element={<AddInstructor />} />
          <Route exact path="/ListInstructor/" element={<ListInstructor />} />
          <Route exact path="/ModifyInstructor/" element={<ModifyInstructor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* </div> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
