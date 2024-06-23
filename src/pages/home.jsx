import React, { useState } from 'react';
import '../sass/homestyle.css'; // Importa los estilos CSS
import Navbar from '../components/navbar';
import Products from '../components/products';
import Header from '../components/header';
import StaticExample from '../components/modal';

function Home() {
  const [showModal, setShowModal] = useState(true); // Estado para controlar la visibilidad del modal

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className='body'>
        <Header />
        <Products />
        <Navbar />
      </div>
      {showModal && <StaticExample onClose={closeModal} />} {/* Renderiza el modal si showModal es true */}
    </>
  );
}

export default Home;
