const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('No se pudo conectar a MongoDB:', err));

// Definir el esquema y modelo de Ticket
const ticketSchema = new mongoose.Schema({
  passengerName: String,
  scheduleId: Number,
  paymentMethod: String,
  selectedDate: String,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// Rutas CRUD
app.get('/tickets', async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

app.post('/tickets', async (req, res) => {
  const newTicket = new Ticket(req.body);
  await newTicket.save();
  res.status(201).json(newTicket);
});

app.put('/tickets/:id', async (req, res) => {
  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTicket);
});

app.delete('/tickets/:id', async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
