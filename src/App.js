import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Authentication from './pages/authentication/Authentication';
// import Login from './components/login/Login';
import Customer from './pages/customer/Customer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  return (
    <div className="App">
      {/* <h1>MY App</h1> */}

      <Routes>
        <Route path='/login' element={<Authentication />} />
        <Route path='/customer' element={<Customer />} />
      </Routes>

      <Authentication />
    </div>
  );
}

export default App;
