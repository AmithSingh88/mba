import React,{useState} from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import {ROLES} from '../../constants/userRoles';
import './signup.css';


const Signup= props => {
    const {onSignupSubmit, goToLogin,errorMessageSignup} = props;
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState(ROLES.CUSTOMER);
    

    const handleSubmit =e =>{
        //1. create the data object
        const data = {userId, password,name:username, email, userType}
        //2.call onLoginSubmit with data
        onSignupSubmit(data);
        //3.prevent defeault to prevent submit
        e.preventDefault();   
    }


  return (
      
      <div className=' d-flex justify-content-center align-items-center vh-100'>
        <div className='signup-wrapper col-4 container'>
                <form onSubmit={handleSubmit}>
                <h1>SIGN-UP</h1>
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
                        <input className='form-control m-1' type='text'
                            placeholder='USERNAME'
                            value={username}
                            onChange={e => {
                                setUsername(e.target.value)
                            }} required />
                    </div>
                    <div className='input-group'>
                        <input className='form-control m-1' type='text'
                            placeholder='EMAIL'
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                            }} required />
                    </div>
                    <div className='input-group col d-flex justify-content-center align-items-center'>
                       <label>Usertype:</label> 
                       <DropdownButton
                            align='end'
                            title={userType}
                            id='userType'
                            onSelect={val => {
                                setUserType(val)
                            }}
                            variant='Light' 
                             >
                            <Dropdown.Item eventKey={ROLES.CUSTOMER}>
                                {ROLES.CUSTOMER}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey={ROLES.CLIENT}>
                                {ROLES.CLIENT}
                            </Dropdown.Item>
                    
                        </DropdownButton>    
                    </div>
                    <div className='input-group'>
                        <input className='form-control m-1' type="submit" value='signup' />
                    </div>
                    <div>
                        Have an account? 
                        <a href='#' onClick={goToLogin}>Login</a>
                    </div>
                <div className='errpr-msg text-danger'>
                    {errorMessageSignup}
                </div>
                </form>
            </div>
     </div>
  )
}

export default Signup;