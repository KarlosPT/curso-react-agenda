import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import moment from 'moment';

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
  const end = now.clone().add(1, 'hours');

export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(end.toDate());

    const [formValues, setFormValues] = useState({
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: end.toDate(),
    });

    const { title, notes } = formValues;

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    }

    const closeModal = () => {
        console.log('closing....');
        
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
        console.log(formValues);
    }
  return (
      <Modal
        isOpen={true}
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
                        className="form-control"
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
