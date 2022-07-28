import React from 'react'
import {useNavigate} from 'react-router-dom';


function Admin() {

  const navigate = useNavigate();

  const logoutFn = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div>
      <h1>Admin</h1>
      <button className='btn btn-primary' omClick={logoutFn}>Logout</button>
    </div>

  )
}

export default Admin;