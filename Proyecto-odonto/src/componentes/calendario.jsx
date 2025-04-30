import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendario.css";
import { useNavigate } from "react-router-dom";


export default function CalendarComponent() {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    time: "",
    repetition: "ninguno",
    reminder: false,
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  const openModal = (date) => {
    setSelectedDate(date);
    setShowModal(true);
    setNewEvent({
      title: "",
      time: "",
      repetition: "ninguno",
      reminder: false,
    });
  };

  const handleSaveEvent = () => {
    if (newEvent.title) {
      setEvents([
        ...events,
        {
          date: selectedDate.toDateString(),
          ...newEvent,
        },
      ]);
      setShowModal(false);
    }
  };

  const renderDot = (date) => {
    const hasEvent = events.some((e) => e.date === date.toDateString());
  
    return hasEvent ? (
      <div className="event-dot-wrapper">
        <div className="event-dot" />
      </div>
    ) : null;
  };

  const todayEvents = events.filter((e) => e.date === value.toDateString());
  
  return (
    <main className="calendar-content">
      <h1>Calendario</h1>

    <div className="calendar-wrapper">   
      <div className="calendar-layout">    
       <div className="calendar-container">
          <Calendar
            onChange={setValue}
            value={value}
            onClickDay={openModal}
            tileContent={({ date }) => renderDot(date)}
          />
        </div>

        <div className="day-events">
  <h3>
    Eventos del{" "}
    {value.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
    :
  </h3>
  {todayEvents.length === 0 ? (
    <p>No hay eventos.</p>
  ) : (
    <ul>
      {todayEvents.map((event, idx) => (
        <li key={idx}>
          <button
            className="event-button"
            onClick={() => {
              setSelectedEvent(event);
              setShowEventDetail(true);
            }}
          >
            {event.title}
          </button>
        </li>
      ))}
    </ul>
  )}
</div>

</div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Agregar evento</h2>
            <label>
              Nombre:
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </label>
            <label>
              Hora:
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              />
            </label>
            <label>
              Repetir:
              <select
                value={newEvent.repetition}
                onChange={(e) => setNewEvent({ ...newEvent, repetition: e.target.value })}
              >
                <option value="ninguno">Ninguno</option>
                <option value="diario">Diario</option>
                <option value="semanal">Semanal</option>
                <option value="mensual">Mensual</option>
                <option value="anual">Anual</option>
              </select>
            </label>
            <label>
              <input
                type="checkbox"
                checked={newEvent.reminder}
                onChange={(e) => setNewEvent({ ...newEvent, reminder: e.target.checked })}
              />
              Recordatorio
            </label>
            <div className="modal-buttons">
              <button onClick={handleSaveEvent}>Guardar</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}


{showEventDetail && selectedEvent && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Detalles del evento</h2>
      <p><strong>Nombre:</strong> {selectedEvent.title}</p>
      <p><strong>Hora:</strong> {selectedEvent.time || "No definida"}</p>
      <p><strong>Repetición:</strong> {selectedEvent.repetition}</p>
      <p><strong>Recordatorio:</strong> {selectedEvent.reminder ? "Sí" : "No"}</p>
      <div className="modal-buttons">
        <button onClick={() => setShowEventDetail(false)}>Cerrar</button>
      </div>
      
    </div>
    <div className="back-button-container">
      <button className="btn-regresar" onClick={() => navigate("/home")}> Regresar </button>
    </div>
  </div>
)}
    </div>

    </main>
  );
}