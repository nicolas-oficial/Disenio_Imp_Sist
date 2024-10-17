import React, { useState } from 'react';
import MostrarTickets from './mostrarTicket';

const CompraTicket = () => {
  const [ticket, setTicket] = useState({
    passengerName: '',
    scheduleId: '',
    paymentMethod: 'creditCard',
    selectedDate: '',
  });

  const [schedules] = useState([
    { id: 1, departure: '13:30', arrival: '16:30', destination: 'Mar del Plata' },
    { id: 2, departure: '1:45', arrival: '7:00', destination: 'Capital Federal' },
    { id: 3, departure: '11:15', arrival: '14:30', destination: 'Necochea' },
  ]);

  const [tickets, setTickets] = useState([]);
  const [confirmation, setConfirmation] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handlePurchase = (e) => {
    e.preventDefault();

    const selectedSchedule = schedules.find(schedule => schedule.id === parseInt(ticket.scheduleId));

    if (!selectedSchedule || !ticket.selectedDate) {
      setConfirmation('Por favor, selecciona un horario y una fecha para el pasaje.');
      return;
    }

    const newTicket = { ...ticket, schedule: selectedSchedule };

    if (editingIndex !== null) {
      const updatedTickets = [...tickets];
      updatedTickets[editingIndex] = newTicket;
      setTickets(updatedTickets);
      setConfirmation(`Pasaje modificado para DNI: ${ticket.passengerName}.`);
      setEditingIndex(null);
    } else {
      setTickets(prevTickets => [...prevTickets, newTicket]);
      setConfirmation(`Pasaje comprado para DNI: ${ticket.passengerName}.`);
    }

    setTicket({
      passengerName: '',
      scheduleId: '',
      paymentMethod: 'creditCard',
      selectedDate: '',
    });
  };

  const startEditing = (index) => {
    const ticketToEdit = tickets[index];
    setTicket({
      passengerName: ticketToEdit.passengerName,
      scheduleId: ticketToEdit.schedule.id,
      paymentMethod: ticketToEdit.paymentMethod,
      selectedDate: ticketToEdit.selectedDate,
    });
    setEditingIndex(index);
  };

  return (
    <div>
      <h1>Compra de Pasajes</h1>
      <form onSubmit={handlePurchase}>
        <div className="form-group">
          <label>DNI de pasajero:</label>
          <input
            type="text"
            name="passengerName"
            value={ticket.passengerName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Selecciona el destino y horario:</label>
          <select
            name="scheduleId"
            value={ticket.scheduleId}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Método de pago:</label>
          <select
            name="paymentMethod"
            value={ticket.paymentMethod}
            onChange={handleInputChange}
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

      {confirmation && <p>{confirmation}</p>}
      <MostrarTickets tickets={tickets} onModify={startEditing} onDelete={(index) => {
        setTickets(tickets.filter((_, i) => i !== index));
      }} />
    </div>
  );
};

export default CompraTicket;
