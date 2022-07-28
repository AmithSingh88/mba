import React, {useState} from 'react';
import './login.css'


const Login = props => {
    const {onLoginSubmit, goToSignup, loginMessage,errorMessageLogin} = props;
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit =e =>{
        //1. create the data object
        const data = {userId, password}
        //2.call onLoginSubmit with data
        onLoginSubmit(data);
        //3.prevent defeault to prevent submit
        e.preventDefault();   
    }

    
  return (
        <div className=' d-flex justify-content-center align-items-center vh-100  '>
            <div className='login-wrapper col-4 container'>
                    <form onSubmit={ handleSubmit}>
                    <h1>LOGIN</h1>
                        <div className='input-group'>
                            <input className='form-control m-1' type='text'
                                placeholder='USER ID'
                                value={userId}
                                onChange={e => {
                                    setUserId(e.target.value)
                                }} required />
                        </div>
                        <div className='input-group'>
                            <input className='form-control m-1' type='password'
                                placeholder='PASSWORD'
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value)
                                }} required />
                        </div>
                        <div className='input-group'>
                            <input className='form-control m-1' type="submit" value='log-in' />
                        </div>
                        <div>
                            Don't have an account? 
                            <a href='#' onClick={goToSignup}>SIGN-UP</a>
                        </div>
                        <div className='errpr-msg text-danger'>{errorMessageLogin}</div>
                        <div className='errpr-msg text-success'>{loginMessage}</div>
                    </form>

                </div>
            </div>
        
    
  )
}

export default  Login;