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
    { id: 1, departure: '10:00 AM', arrival: '2:00 PM', destination: 'City A', date: '2024-10-04' },
    { id: 2, departure: '3:00 PM', arrival: '7:00 PM', destination: 'City B', date: '2024-10-05' },
  ]);

  const [tickets, setTickets] = useState([]); // Estado para los tickets comprados
  const [confirmation, setConfirmation] = useState('');

  const handleInputChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handlePurchase = (e) => {
    e.preventDefault(); // Evitar la recarga de la página

    // Obtener el horario seleccionado
    const selectedSchedule = schedules.find(schedule => schedule.id === parseInt(ticket.scheduleId));

    // Validar que se haya seleccionado un horario y una fecha
    if (!selectedSchedule || !ticket.selectedDate) {
      setConfirmation('Por favor, selecciona un horario y una fecha para el pasaje.');
      return;
    }

    // Crear el nuevo ticket
    const newTicket = { ...ticket, schedule: selectedSchedule };
    
    // Agregar el nuevo ticket al estado
    setTickets([...tickets, newTicket]);

    // Mensaje de confirmación
    setConfirmation(
      `Ticket comprado con éxito para ${ticket.passengerName} en el horario ${selectedSchedule.departure} - ${selectedSchedule.arrival} para la fecha ${ticket.selectedDate}.`
    );

    // Reiniciar el formulario
    setTicket({
      passengerName: '',
      scheduleId: '',
      paymentMethod: 'creditCard',
      selectedDate: '',
    });
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
          <label>Selecciona el horario:</label>
          <select
            name="scheduleId"
            value={ticket.scheduleId}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Seleccionar --</option>
            {schedules.map((schedule) => (
              <option key={schedule.id} value={schedule.id}>
                {`${schedule.departure} - ${schedule.arrival} | Destino: ${schedule.destination} | Fecha: ${schedule.date}`}
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
          Comprar Pasaje
        </button>
      </form>

      {/* Mostrar mensaje de confirmación si existe */}
      {confirmation && <p>{confirmation}</p>}

      {/* Mostrar los tickets comprados */}
      <MostrarTickets tickets={tickets} /> {/* Pasar los tickets comprados al componente */}
    </div>
  );
};

export default CompraTicket;
