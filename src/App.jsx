import React, { useState } from 'react';
import SalidasLlegadas from './componentes/salidas_llegadas.jsx';
import CompraTicket from './componentes/compraTicket.jsx';
import './styles/styles.css'; // Asegúrate de que esta ruta sea correcta

const App = () => {
  const [view, setView] = useState('horarios'); // Control de vista

  const handleNavigation = (view) => {
    setView(view); // Cambia la vista cuando el usuario selecciona una opción
  };

  return (
    <div className="container"> {/* Contenedor principal para la página */}
      <h1>Gestión de Ómnibus</h1>
      <nav>
        <button className="btn-horarios" onClick={() => handleNavigation('horarios')}>Ver Horarios</button>
        <button className="btn-comprar" onClick={() => handleNavigation('comprar')}>Comprar Pasaje</button>
      </nav>

      {view === 'horarios' && <SalidasLlegadas />} {/* Mostrar horarios */}
      {view === 'comprar' && <CompraTicket />}    {/* Mostrar compra de tickets */}
    </div>
  );
};

export default App;
