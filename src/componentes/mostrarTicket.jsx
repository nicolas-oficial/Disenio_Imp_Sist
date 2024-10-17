import React from 'react';

const MostrarTickets = ({ tickets, onModify, onDelete }) => {
  return (
    <div>
      <h2>Pasajes Comprados</h2>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Horario</th>
            <th>Destino</th>
            <th>Fecha</th>
            <th>Medio de Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan="6">No hay pasajes comprados aún.</td>
            </tr>
          ) : (
            tickets.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket.passengerName}</td>
                <td>{`${ticket.schedule.departure} - ${ticket.schedule.arrival}`}</td>
                <td>{ticket.schedule.destination}</td>
                <td>{ticket.selectedDate}</td>
                <td>{ticket.paymentMethod}</td>
                <td>
                  <div className="acciones-container">
                    <button className="modificar" onClick={() => onModify(index)}>Modificar</button>
                    <button className="eliminar" onClick={() => onDelete(index)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MostrarTickets;
