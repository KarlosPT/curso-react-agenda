

import {  useSelector } from "react-redux";
import { Navigate } from "react-router-dom";




export const PrivateRoute = () =>{
    

    const { uid } = useSelector(state => state.auth);




    console.log(!uid);

 
    

    return (!uid
    ? <><Navigate to="/*"/></>
    : <><Navigate to="/login"/></>);

}