
import React, { useReducer } from 'react'
import { Provider } from 'react-redux'




import { store } from './store/store'
import { AppRouter } from './router/AppRouter'
//import { AuthContext } from './reducers/authContext'

export const CalendarApp = () => {

  const reducer = useReducer(store)

  console.log(reducer);
  return (
    <Provider store={ store }>
        <AppRouter />
    </Provider>
  )
}
