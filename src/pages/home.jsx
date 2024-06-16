import React from 'react';
import '../sass/homestyle.css'; // Importa los estilos CSS
import Navbar from '../components/navbar';
import Products from '../components/products';
import Header from '../components/header';

function Home() {
  return (
    <>
      <div className='body'>
        <Header />
        <Products />
        <Navbar />
      </div>
    </>
  );
}

export default Home;
