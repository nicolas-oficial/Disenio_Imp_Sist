import React from 'react';

const TicketList = ({ tickets, onModify, onDelete }) => {
  return (
    <div>
      <h2>Pasajes Comprados</h2>
      {tickets.length === 0 ? (
        <p>No hay pasajes comprados.</p>
      ) : (
        <ul>
          {tickets.map((ticket, index) => (
            <li key={index}>
              <p>DNI: {ticket.passengerName}</p>
              <p>Destino: {ticket.schedule.destination}</p>
              <p>Horario: {`${ticket.schedule.departure} - ${ticket.schedule.arrival}`}</p>
              <p>Fecha: {ticket.selectedDate}</p>
              <p>Método de pago: {ticket.paymentMethod}</p>
              <button onClick={() => onModify(index)}>Modificar</button>
              <button onClick={() => onDelete(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketList;
