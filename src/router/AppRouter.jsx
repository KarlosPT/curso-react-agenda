import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from 'react'
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { LoginScreen } from "../components/auth/LoginScreen";

export const AppRouter = () => {
  return (
    <BrowserRouter>
        
        <Routes>

            {/* <Route path="/login" element={<LoginScreen />} /> */}
            {/* //Rutas publicas4 */}
            <Route  path="/login"
                    element={<LoginScreen/>}

            />
            {/* Rutas privadas */}
            <Route path="/*" 
                element={ <CalendarScreen/>}
            />
            {/* <Route path="/*" element={ <DashboardRoutes/>} /> */}
        </Routes>
    </BrowserRouter>
  )
}
