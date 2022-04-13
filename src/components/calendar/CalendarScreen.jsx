import React, { useState } from 'react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';


import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es-mx';

moment.locale('es-mx');

const localizer = momentLocalizer(moment); // or globalizeLocalizer
 
const myEventsList = [{
  title:'Cumpleaños de Nayeli',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgColor: "#fafafa",
  notes: 'Comprar el iphone',
  user:{
    _id: '123',
    name: 'Nayeli'
  }
}]

export const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const onDoubleClick = (e) => {
    console.log(e);
  }
  
  const onSelectEvent= (e) => {
    console.log(e);
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

  return (
    <div className='calendar-screen'>

        <Navbar />

        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          onSelectEvent={onSelectEvent}
          onDoubleClickEvent={onDoubleClick}
          onView={ onViewChange}
          view={lastView}
          eventPropGetter={eventStyleGetter}
        
          components={{
            event: CalendarEvent
          }}
        />
        <CalendarModal />
    </div>
  )
}
