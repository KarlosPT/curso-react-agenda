import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import { fechtConToken, fechtSinToken } from "../helpers/fetch"
import { types } from "../types/types";



export const startLogin = (email, password) => {
    return async(dispatch) => {
        const resp = await fechtSinToken('auth', {email, password}, 'POST');
        
        const body = await resp.json();

        if(body.ok)
        {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name,
            }));


            return true;
        }
        else{
            Swal.fire('Error', body.message, 'error');
        }
    }
}


export const startRegister = (name, email, password) => {
    return async(dispatch) => {

        const resp = await fechtSinToken('auth/new', {name, email, password}, 'POST');
        
        const body = await resp.json();

        if(body.ok)
        {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name,
            }));
        }
        else{
            Swal.fire('Error', body.message, 'error');
        }
    }
}

export const startChecking= () => {
    return async(dispatch) => {

        const resp = await fechtConToken('auth/renew');
        
        const body = await resp.json();

        console.log(body);

        if(body.ok)
        {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name,
            }));
        }
        else{
            dispatch(authCheckingFinish());
        }
    }
}

const authCheckingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => {
    return {
        type: types.authLogin,
        payload: user
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
        dispatch(logout());
    }
}

const logout = () => ({ type: types.authLogout });

