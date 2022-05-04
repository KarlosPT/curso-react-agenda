import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import React, { useEffect } from 'react'
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { LoginScreen } from "../components/auth/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../actions/auth";
import { PrivateRoute } from "../router/PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

  const dispatch = useDispatch();

  const { checking, uid } = useSelector(state => state.auth);

  useEffect(() => {
    
    dispatch( startChecking());
    
  }, [dispatch]);

  if( checking ){
    return <div>Cargando...</div>
  }
  

  console.log("valor de uid:", !!uid);
  console.log("valor de uid2:", !uid);

  return (
    <BrowserRouter>
        
        <Routes>

            {/* <Route path="/login" element={<LoginScreen />} /> */}
            {/* //Rutas publicas4 */}
            <Route  path="/login"
                    element={
                      //!uid ? <Navigate to="/*"/> : <Navigate to="/login"/>
                      !!uid ? <CalendarScreen/> : <LoginScreen/>
                      // <PublicRoute>
                      //   <LoginScreen/>
                      // </PublicRoute>
                  }

            />
            {/* Rutas privadas */}
            <Route path="/*" 
                   element={ 
                    //uid ? <Navigate to="/*"/> : <Navigate to="/login"/>
                    !!uid ? <CalendarScreen/> : <LoginScreen/>
                    // <PrivateRoute>
                    //    <CalendarScreen/>
                    // </PrivateRoute>
                  }
            />
            {/* <Route path="/*" element={ <CalendarScreen/>} /> */}
        </Routes>
    </BrowserRouter>
  )
}
