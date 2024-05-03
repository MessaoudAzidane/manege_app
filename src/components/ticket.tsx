import React from 'react';
import logo from '../assets/logo.png';

const JurassicParkTicket = (product: any) => {
  return (
    `<div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'inline-block', marginRight: '20px' }}>
        <img src={logo} alt="Jurassic Park Logo" style={{ maxWidth: '200px' }} />
      </div>
      <div style={{ display: 'inline-block' }}>
        <h1 style={{ margin: 0 }}>ARDIS-ALGER</h1>
        <h2 style={{ margin: 0, fontWeight: 'normal' }}>SOYEZ LES BIENVENUS</h2>
        <ul style={{ listStyleType: 'none', padding: 0, margin: '10px 0' }}>
          <li>01 TICKET 200 DA</li>
          <li>TICKET NON REMBOURSABLE</li>
          <li>01 TICKET BON POUR 01 PERSONNE/ 01 JEU</li>
          <li>TICKET VALABLE POUR LA JOURNÉE EN COURS</li>
        </ul>
      </div>
    </div>`
  );
};

export default JurassicParkTicket;