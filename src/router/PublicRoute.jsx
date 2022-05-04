
import {  useSelector } from "react-redux";
import { Navigate } from "react-router-dom";




export const PublicRoute = () =>{

    console.log("Entra al publicRoute");

    const { uid } = useSelector(state => state.auth);






    console.log(!!uid);

    return (!uid
        ? <><Navigate to="/login"/></>
        : <><Navigate to="/*"/></>);;

}

