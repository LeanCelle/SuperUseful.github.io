import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../src/sass/homestyle.css'; // Importa el archivo de estilos CSS global
import Home from './pages/home';// Cambiado 'home' a 'Home' para seguir las convenciones de nombres
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

