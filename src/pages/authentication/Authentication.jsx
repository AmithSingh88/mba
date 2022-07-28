
import React, { useState, useEffect } from 'react';
import Login from '../../components/login/Login';
import Signup from '../../components/signup/Signup';
import {useNavigate} from 'react-router-dom';
import { userSignin, newUserSignup} from '../../api/auth';
import { storeUserData } from '../../utils/userData';
import { ROLES } from '../../constants/userRoles';
import './authentication.css';


const Authentication = () => {
    const [showSignup, setShowSignup] = useState(false);
    const [loginMessage, setloginMessage] = useState("");
    const [errorMessageLogin, setErrorMessageLogin] = useState('');
    const [errorMessageSignup, setErrorMessageSignup] = useState('');

    const navigate = useNavigate();
    
    const goToSignup = () => {setShowSignup(true)};       
    
    const goToLogin = () => {setShowSignup(false)};

    
    const redirectTopage = (userType) =>{
        if(userType === ROLES.CUSTOMER){ 
            navigate ('/customer')
        }else if(userType === ROLES.ADMIN){
            navigate('/admin');  
        } else {
            navigate("/client")
        };
    }

    useEffect (()=>{
        // if(){

            //if there is a query param that referrer = home
            //navigate("/home")
        // }
        if(localStorage.getItem("accessToken")){
            const userType = localStorage.getItem("userTypes");
            redirectTopage(userType);
        }
    },[]);

    const handleLoginSubmit = (data) => { 
        console.log(data)
        //1.Make an api call and POST the data
        userSignin(data)
        .then(res=> {
            // console.log(res);
            const{status, message, data} = res;
            if(status === 200){
                //if login is faulure
                if(message){
                    //3.if api call is not Successfull, show the error message
                    setErrorMessageLogin(message);
                }else{
                    //2.if api call success, redirect to the concerned user 
                    // navigate('/customer');
                    //store user data in localstorage
                    storeUserData(data);
                    //navigate to the correct page on login based on user type
                    const userType = data.userTypes;
                    redirectTopage(userType);
                }
            }
        })
        .catch(err => {
            setErrorMessageLogin(
                err?.response?.data?.message || err?.message
                )
        })
    };

    const handleSignupSubmit = (data) => {
        // console.log(data)

        newUserSignup(data)
        .then(res => {
            const{status, message} = res;
            if(status === 201){
                setShowSignup(false);
                setloginMessage('Signup successfull! please Login');
            }else if(message){
                setErrorMessageSignup(message); 
            }
        }).catch(err =>{
            setErrorMessageSignup(
                err?.response?.data?.message || err?.message
            );
        });
        //1.Make an api call and POST the data
        //2.if api call success, redirect to the user to login
        //3.if api call is not Successfull, show the error message

        //4.on successfull signup redirect to login page

        //if signup is not successfull 
        };

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