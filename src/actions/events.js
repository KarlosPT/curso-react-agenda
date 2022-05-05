import  Swal from "sweetalert2/dist/sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'


import { fechtConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async(dispatch, getState) => {

        const { uid, name } = getState().auth;

            
        try{

            const resp = await fechtConToken('events', event, 'POST');
            const body = await resp.json();

            if(body.ok){

                event.id = body.evento.id;
                event.user = {
                    id: uid,
                    name:name
                }
                dispatch(eventAddNew(event));
            }


        }
        catch(error){
            console.log(error);
        }

    }
}


const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type:types.eventClearActiveEvent
})

export const eventstartUpdate = (event) => {
    return async(dispatch, getState) => {
        try {

            
            const resp = await fechtConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();

            console.log(body);

            if(body.ok){
                dispatch(eventUpdate(event));
            }
            else{
                console.log(body.msg);
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            
        }
    }
}

const eventUpdate = (event) => ({
    type: types.eventUpdated,
    payload: event
})

export const eventStartDelete = () => {
    return async(dispatch, getState) => {

        const { id } = getState().calendar.activeEvent;
        const resp = await fechtConToken(`events/${id}`, {}, 'DELETE');
        const body = await resp.json();

        console.log(body);

        if(body.ok){
            dispatch(eventDelete(id));
        }
        else{
            console.log(body.msg);
            Swal.fire('Error', body.msg, 'error');
        }
    }
}


const eventDelete = (id) => ({
    type: types.eventDelete,
})

export const eventStartLoading = () => {
    return async(dispatch) => {
        try {
            const resp = await fechtConToken('events');
            const body = await resp.json();

            const events =prepareEvents( body.eventos);

            dispatch(eventLoaded(events));
        } catch (error) {
            console.log(error);
        }
    }
};

const eventLoaded = (events) => ({    
        type: types.eventLoaded,
        payload: events
})

export const eventLogout = () => ({
    type: types.eventLogout
});