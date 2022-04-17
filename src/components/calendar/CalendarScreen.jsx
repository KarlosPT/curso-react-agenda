import React, { useState } from 'react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';


import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/dist/locale/es-mx';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es-mx');

const localizer = momentLocalizer(moment); // or globalizeLocalizer
 
// const myEventsList = [{
//   title:'Cumpleaños de Nayeli',
//   start: moment().toDate(),
//   end: moment().add(2, 'hours').toDate(),
//   bgColor: "#fafafa",
//   notes: 'Comprar el iphone',
//   user:{
//     _id: '123',
//     name: 'Nayeli'
//   }
// }]

export const CalendarScreen = () => {

  const dispatch = useDispatch();

  const {events, activeEvent } = useSelector( state => state.calendar );

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const onDoubleClick = (e) => {
    dispatch( uiOpenModal() );
  }
  
  const onSelectEvent= (e) => {
    
    dispatch( eventSetActive(e) );
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }


  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };
    return {
      style: style
    };
  }
  const onSelectSlot = (e) => {
    dispatch( eventClearActiveEvent() );
  }
  return (
    <div className='calendar-screen'>

        <Navbar />

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          onSelectEvent={onSelectEvent}
          onDoubleClickEvent={onDoubleClick}
          onView={ onViewChange}
          onSelectSlot={onSelectSlot}
          selectable={true}
          view={lastView}
          eventPropGetter={eventStyleGetter}
        
          components={{
            event: CalendarEvent
          }}
        />

          <AddNewFab/>
          {
            activeEvent && <DeleteEventFab/>
          
          }
        <CalendarModal />
    </div>
  )
}
