import React from 'react';
import '../sass/homestyle.css'; // Importa los estilos CSS
import Navbar from '../components/navbar';
import Products from '../components/products';

function Home() {
  return (
    <>
      <div>
        <h1 className="header">SuperUseful!</h1>
        <Products />
        <Navbar />
      </div>
    </>
  );
}

export default Home;
