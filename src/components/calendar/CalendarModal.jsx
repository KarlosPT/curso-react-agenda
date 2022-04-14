import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
//import DateTimePicker from 'react-datetime-picker';
 import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
 import 'react-datetime-picker/dist/DateTimePicker.css';
 import 'react-calendar/dist/Calendar.css';
 import 'react-clock/dist/Clock.css';
 import Swal from 'sweetalert2/dist/sweetalert2.js'
 import 'sweetalert2/src/sweetalert2.scss'
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew } from '../../actions/events';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

  const now = moment().minute(0).second(0).add(1, 'hours');
  const endDate = now.clone().add(1, 'hours');

export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(endDate.toDate());
    const [titleValid, setTitleValid] = useState(true);


    const dispatch = useDispatch();
    const {modalOpen} = useSelector( state => state.ui );

    const [formValues, setFormValues] = useState({
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: endDate.toDate(),
    });

    const { title, notes, start, end  } = formValues;

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    }

    const closeModal = () => {
        //ToDo: close modal

        dispatch( uiCloseModal() );
        
    }

    const handleStartDateChange = (e) => {        
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e,
        });
    }

    const handleEndDateChange = (e) => {
        console.log(e);
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e,
        });



    }


    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);


        if(momentStart.isSameOrAfter(momentEnd)){
            Swal.fire('Error', 'La fecha de inicio debe ser menor a la fecha de fin', 'error');
            return;
        }

        if(title.trim().length < 2 ){
            
            return setTitleValid(false);
        }

        //Todo: Realizar la grabación
        dispatch(eventAddNew({
            ...formValues,
            id: new Date().getTime(),
            user:{
                _id: '123',
                name: 'Carlos',
            }
        }));

        setTitleValid(true);
        closeModal();
    }
  return (
      <Modal
        isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >

            <h1> Nuevo evento </h1>
            <hr />
            <form   className="container"
                    onSubmit={ handleSubmitForm }>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker onChange={handleStartDateChange} 
                                    value={dateStart}
                                    className="form-control" />
                </div>

                <div className="form-group mt-3">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker onChange={handleEndDateChange} 
                                    value={dateEnd}
                                    minDate={dateStart}
                                    className="form-control" />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mt-3">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>
                <div className='d-grid gap-2 mt-3'>
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </div>

            </form>
      </Modal>    
  )
}
