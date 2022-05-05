import moment from "moment";
import { types } from "../types/types";

// {
//     id: new Date().getTime(),
//     title:'Cumpleaños de Nayeli',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgColor: "#fafafa",
//     notes: 'Comprar el iphone',
//     user:{
//       _id: '123',
//       name: 'Nayeli'
//     }
//   }

const initialState = {
    events:[],
    activeEvent: null,
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            }
        
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
        
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                        event => event.id === action.payload.id ? action.payload : event
                    )
            }
        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter(
                        event => event.id !== state.activeEvent.id
                    ),
                activeEvent: null
            }
        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }

        case types.eventLogout:
            return {
                ...initialState,
                
            }

        default:
            return state;
    }
}