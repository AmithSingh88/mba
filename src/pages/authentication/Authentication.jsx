
import React, { useState } from 'react';
import Login from '../../components/login/Login';
import Signup from '../../components/signup/Signup';
import {useNavigate} from 'react-router-dom';
import './authentication.css';


const Authentication = () => {
    const[showSignup, setShowSignup] = useState(false);
    const[loginMessage, setloginMessage] = useState("");
    const [errorMessageLogin, setErrorMessageLogin] = useState('');
    const [errorMessageSignup, setErrorMessageSignup] = useState('');
    const navigate = useNavigate();



    const handleLoginSubmit = (data) => { 
        console.log(data)
        //1.Make an api call and POST the data
        //2.if api call success, redirect to the concerned user 
        //3.if api call is not Successfull, show the error message

        //if login is faulure
        setErrorMessageLogin('the error');

        navigate('/customer')
    };
    const goToSignup = () => {setShowSignup(true)};
    const handleSignupSubmit = (data) => {
        console.log(data)

        //1.Make an api call and POST the data
        //2.if api call success, redirect to the user to login
        //3.if api call is not Successfull, show the error message

        //4.on successfull signup redirect to login page
        setShowSignup(false);
        setloginMessage('Signup successfull! please Login');

        //if signup is not successfull 
        setErrorMessageSignup('THE ERROR');
        };
    const goToLogin = () => {setShowSignup(false)};
    return (
        <div className='main'>
            {showSignup ?(
                <Signup 
                onSignupSubmit={handleSignupSubmit} 
                goToLogin= {goToLogin}
                errorMessageSignup={errorMessageSignup}/>
                ):(
                    <Login 
                    onLoginSubmit={handleLoginSubmit} 
                    goToSignup = {goToSignup}
                    loginMessage ={loginMessage}
                    errorMessageLogin={errorMessageLogin}/>
                )}
        </div>
    )
}

export default Authentication;