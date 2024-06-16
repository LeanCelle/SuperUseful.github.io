import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../src/sass/homestyle.css'; // Importa el archivo de estilos CSS global
import Home from './pages/home'; // Ajustado para seguir convenciones de nombres
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  useEffect(() => {
    // Al montar el componente, desactiva el scroll del body
    document.body.style.overflow = 'hidden';

    // Al desmontar el componente, restaura el scroll del body
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;



