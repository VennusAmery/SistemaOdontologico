import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendario.css";
import { useNavigate } from "react-router-dom";

export default function CalendarComponent() {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    time: "",
    repetition: "ninguno",
    reminder: false,
  });

  // Configuración de pestañas
  const tabConfig = [
    { id: 'calendario', label: 'Calendario', path: '/calendario' },
  ];
  const [tabActiva, setTabActiva] = useState(tabConfig[0].id);
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setShowModal(true);
    setNewEvent({ title: "", time: "", repetition: "ninguno", reminder: false });
  };

  const handleSaveEvent = () => {
    if (!newEvent.title) return;
    setEvents([...events, { id: Date.now(), date: selectedDate.toDateString(), ...newEvent }]);
    setShowModal(false);
  };

  const handleDeleteEvent = (eventToDelete) => {
    setEvents(events.filter(evt => evt.id !== eventToDelete.id));
    setShowEventDetail(false);
    setDeleteMessage("Eliminado correctamente");
    setTimeout(() => setDeleteMessage(""), 1000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSaveEvent();
  };

  const renderDot = (date) =>
    events.some(e => e.date === date.toDateString()) ? (
      <div className="event-dot-wrapper">
        <div className="event-dot" />
      </div>
    ) : null;

  const todayEvents = events.filter(e => e.date === value.toDateString());

  return (
    <main className="calendar-content">
      <h1>Calendario</h1>
      <hr />
      <h3 className="NombreComponente">Calendario</h3>
      <hr className="LineaCalendario"/>


      <div className="calendar-wrapper">
        <div className="calendar-layout">
          {/* Calendario */}
          <div className="calendar-container">
            <Calendar
              onChange={setValue}
              value={value}
              onClickDay={openModal}
              tileContent={({ date }) => renderDot(date)}
            />
          </div>

          {/* Lista eventos del día */}
          <div className="day-events">
            <h3>
              Eventos del {value.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}:
            </h3>
            {todayEvents.length === 0 ? (
              <p>No hay eventos.</p>
            ) : (
              <ul>
                {todayEvents.map(event => (
                  <li key={event.id}>
                    <button className="event-button" onClick={() => { setSelectedEvent(event); setShowEventDetail(true); }}>
                      {event.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Modal agregar evento */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Agregar evento</h2>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Nombre:
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </label>
                <label>
                  Hora:
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </label>
                <label>
                  Repetir:
                  <select
                    value={newEvent.repetition}
                    onChange={e => setNewEvent({ ...newEvent, repetition: e.target.value })}
                  >
                    <option value="ninguno">Ninguno</option>
                    <option value="diario">Diario</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensual">Mensual</option>
                    <option value="anual">Anual</option>
                  </select>
                </label>
                {/* Solo checkbox y etiqueta Recordatorio */}
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newEvent.reminder}
                    onChange={e => setNewEvent({ ...newEvent, reminder: e.target.checked })}
                  />
                  Recordatorio
                </label>
                <div className="modal-buttons">
                  <button type="submit">Guardar</button>
                  <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast de eliminación */}
        {deleteMessage && (
          <div style={{
            position: "fixed",
            bottom: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#D3D3D3",
            color: "black",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}>
            {deleteMessage}
          </div>
        )}


        {/* Modal detalle evento */}
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
                <button onClick={() => handleDeleteEvent(selectedEvent)}>Eliminar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
