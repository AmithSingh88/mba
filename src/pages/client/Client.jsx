import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './Client.css';
import TheatreList from '../../components/theatre-list/TheatreList';
import MoviesList from '../../components/movies-list/MoviesList';
const Client = () => {

    // const navigate = useNavigate();
    // const logoutFn = () => {
    //   localStorage.clear();
    //   navigate('/login');
    // }

    const name = localStorage.getItem('name');
  return (

    <div>
      <Header hideSearch/>
        <div className='client--body  container bg-light text-dark'>
          {/* 1.see list of all movies
          2. see list of all theaters
          3. edit data of theaters
          4. edit movies maped to a theaters
          5. create a new movie
          6. map a movie theater
          7. delete theatre */}

          <h2>
            welcome {name}
          </h2>
          <TheatreList />
          <MoviesList/>
        </div>
      <Footer />
    </div>

  /*   <div>
      <h1 className='container'>
         CLIENT PAGE
      </h1>
       <button className='btn btn-primary' onClick={logoutFn}>Logout</button>
    </div> */
  )
}


export default Client; 