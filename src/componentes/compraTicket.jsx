import React, { useState } from 'react';
import TicketForm from './ticketForm';
import TicketList from './ticketList';
import ConfirmationMessage from './confirmationMessage';

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

    const existingTicket = tickets.find(t => 
      t.passengerName === ticket.passengerName &&
      t.selectedDate === ticket.selectedDate &&
      t.schedule.id === selectedSchedule.id
    );

    if (existingTicket) {
      setConfirmation('Ya existe un pasaje para este DNI en la misma fecha y destino.');
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
      <TicketForm
        ticket={ticket}
        schedules={schedules}
        editingIndex={editingIndex}
        onInputChange={handleInputChange}
        onSubmit={handlePurchase}
      />
      <ConfirmationMessage message={confirmation} />
      <TicketList
        tickets={tickets}
        onModify={startEditing}
        onDelete={(index) => setTickets(tickets.filter((_, i) => i !== index))}
      />
    </div>
  );
};

export default CompraTicket;
