import React from 'react';

const MostrarTickets = ({ tickets }) => {
  return (
    <div>
      <h2>Pasajes Comprados</h2>
      {tickets.length === 0 ? (
        <p>No hay pasajes comprados aún.</p>
      ) : (
        <ul>
          {tickets.map((ticket, index) => (
            <li key={index}>
              {`Nombre: ${ticket.passengerName}, Horario: ${ticket.schedule.departure} - ${ticket.schedule.arrival}, Destino: ${ticket.schedule.destination}, Fecha: ${ticket.selectedDate}, Método de Pago: ${ticket.paymentMethod}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MostrarTickets;
