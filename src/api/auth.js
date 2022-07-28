import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

/* 
CRUD         REST
-----------------------
CREATE	|  POST/PUT
READ	|  GET
UPDATE	|  PUT/POST/PATCH
DELETE	|  DELETE
*/
//login
export const userSignin = async data => {
    const postUrl = `${BASE_URL}/mba/api/v1/auth/signin`;
    return await axios.post(postUrl, data);
};


//signup
export const newUserSignup = async data => {
    const postUrl = `${BASE_URL}/mba/api/v1/auth/signup`;
    return await axios.post(postUrl, data);
}