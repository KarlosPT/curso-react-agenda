import moment from "moment";
import { types } from "../types/types";

const initialState = {
    events:[{
        title:'Cumpleaños de Nayeli',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgColor: "#fafafa",
        notes: 'Comprar el iphone',
        user:{
          _id: '123',
          name: 'Nayeli'
        }
      }],
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



        default:
            return state;
    }
}