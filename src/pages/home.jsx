import React, { useState } from 'react';
import '../css/homestyle.css';
import Navbar from '../components/navbar';
import Products from '../components/products';
import Header from '../components/header';
import StaticExample from '../components/modal';

function Home() {
  const [showModal, setShowModal] = useState(true); // State to control the visibility of the modal

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
      {showModal && <StaticExample onClose={closeModal}/>}
    </>
  );
}

export default Home;
