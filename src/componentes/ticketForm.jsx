import React from 'react';

const TicketForm = ({ ticket, schedules, editingIndex, onInputChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>DNI de pasajero:</label>
        <input
          type="text"
          name="passengerName"
          value={ticket.passengerName}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Selecciona el destino y horario:</label>
        <select
          name="scheduleId"
          value={ticket.scheduleId}
          onChange={onInputChange}
          required
        >
          <option value="">-- Seleccionar --</option>
          {schedules.map((schedule) => (
            <option key={schedule.id} value={schedule.id}>
              {`${schedule.departure} - ${schedule.arrival} | Destino: ${schedule.destination}`}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Selecciona la fecha del pasaje:</label>
        <input
          type="date"
          name="selectedDate"
          value={ticket.selectedDate}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Método de pago:</label>
        <select
          name="paymentMethod"
          value={ticket.paymentMethod}
          onChange={onInputChange}
        >
          <option value="creditCard">Tarjeta de crédito</option>
          <option value="debitCard">Tarjeta de débito</option>
          <option value="cash">Efectivo</option>
        </select>
      </div>
      <button type="submit" className="btn-comprar">
        {editingIndex !== null ? 'Modificar Pasaje' : 'Comprar Pasaje'}
      </button>
    </form>
  );
};

export default TicketForm;
