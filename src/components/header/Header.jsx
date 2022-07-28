import React from 'react';

import { useNavigate } from 'react-router-dom';
import { CButton } from '@coreui/react';
import "./header.css";

const Header = () =>{
    const navigate = useNavigate() ;

    const loginFn = () => navigate('/login');

    const logoutFn = () => {
        localStorage.clear();
        navigate('/login?referrer=home');
    }

    const isUserLoggedIn = localStorage.getItem('accessToken');


    return(
        <div>
            <div>
                <div className='bg-dark p-4 d-flex justify-content-between'>
                     <div ><a className='logo-style display-6 text-danger py-1'
                            href='#'
                            onclick= {()=>{
                                navigate('/')
                            }}>
                            SHOW TIME
                            </a>
                     </div>
                     {
                        isUserLoggedIn ?(
                     <CButton 
                        type='submit'
                        color='danger'
                        className='px-3'
                        onClick={logoutFn}>
                        Logout
                     </CButton>) :
                     (<CButton 
                        type='submit'
                        color='danger'
                        className='px-3'
                        onClick={loginFn}>
                        Login
                     </CButton> )
                     }
                </div>
            </div>
            
        </div>
    )
}


export default Header ;