import { combineReducers } from "redux";
import { authReducer } from "./autReducer";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer

    //TODO: Auth Reducer
    //TODO: CALENDAR Reducer
});