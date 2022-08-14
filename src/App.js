import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route } from 'react-router-dom';
import Authentication from './pages/authentication/Authentication';
import Customer from './pages/customer/Customer';
import Admin from './pages/admin/Admin';
import Client from './pages/client/Client';
import Home from './pages/home/Home';
import MovieDetail from './pages/movieDetails/MovieDetails';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Authentication />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='/client' element={<Client />} />
        <Route path='/admin' element={<Admin />} />
        <Route
          path='/movie-detail/:movieId'
          element={<MovieDetail />}
        />
      </Routes>

    </div>
  );
}

export default App;
