import React from 'react';
import { useNavigate } from 'react-router-dom';


const Customer = () => {

  const navigate = useNavigate();

  const logoutFn = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div>
      <h1 className='container'>
        CUSTOMER PAGE
      </h1>

      <button className='btn btn-primary' onClick={logoutFn}>Logout</button>
    </div>
  )
}


export default Customer; 