import React, { useState } from 'react';
import SalidasLlegadas from './componentes/salidas_llegadas.jsx';
import CompraTicket from './componentes/compraTicket.jsx';
import './styles/styles.css';


const App = () => {
  const [view, setView] = useState('horarios');

  return (
    <div className="container">
      <h1>Gestión de Ómnibus</h1>
      <nav>
        <button onClick={() => setView('horarios')}>Ver Horarios</button>
        <button className="btn-comprar" onClick={() => setView('comprar')}>Comprar Pasaje</button>
      </nav>


      {view === 'horarios' && <SalidasLlegadas />}
      {view === 'comprar' && <CompraTicket />}
    </div>
  );
};

export default App;
