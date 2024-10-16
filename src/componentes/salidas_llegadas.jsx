// src/componentes/salidas_llegadas.jsx

import React from 'react';

const fakeSchedules = [
    { id: 1, departure: '13:30', arrival: '16:30', destination: 'Mar del Plata', date: new Date().toISOString().split('T')[0] }, // Fecha actual
    { id: 2, departure: '1:45', arrival: '7:00', destination: 'Capital Federal', date: new Date().toISOString().split('T')[0] },
];

const SalidasLlegadas = () => {
    return (
        <div className="schedule-container">
            <h2>Horarios de Salida y Llegada</h2>
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Destino</th>
                        <th>Fecha</th>
                        <th>Salida</th>
                        <th>Llegada</th>
                    </tr>
                </thead>
                <tbody>
                    {fakeSchedules.map(schedule => (
                        <tr key={schedule.id}>
                            <td>{schedule.id}</td>
                            <td>{schedule.destination}</td>
                            <td>{schedule.date}</td>
                            <td>{schedule.departure}</td>
                            <td>{schedule.arrival}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalidasLlegadas;

