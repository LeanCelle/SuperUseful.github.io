import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Rating from '@mui/material/Rating';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { app } from '../data/firebase';
import '../sass/homestyle.css'; // Asegúrate de que este archivo esté importando correctamente

function Products() {
  const [products, setProducts] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const db = getDatabase(app);
    const productsRef = dbRef(db, 'products');
  
    onValue(productsRef, (snapshot) => {
      const productsData = snapshot.val();
      if (productsData) {
        const productsArray = Object.keys(productsData).map(key => ({
          key,
          id: productsData[key].product_id,
          name: productsData[key].product_name,
          price: productsData[key].price,
          rating: parseFloat(productsData[key].rating), // Asegúrate de convertir a número flotante si es necesario
          images: productsData[key].image_urls || [],
          description: productsData[key].quoted_review || '',
          url: productsData[key].url || ''
        }));
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    }, (error) => {
      // Handle Firebase fetch error
      console.error('Error fetching products:', error);
      // Optionally setProducts([]) or handle error state
    });

    const handleScroll = (event) => {
      if (containerRef.current) {
        event.preventDefault(); // Previene el comportamiento por defecto del scroll
        containerRef.current.scrollTop += event.deltaY * 0.01; // Ajusta el factor multiplicador según la sensibilidad deseada
      }
    };

    if (containerRef.current) {
      // Agregar el evento de scroll personalizado aquí
      containerRef.current.addEventListener('wheel', handleScroll, { passive: true });
    }

    // Copia containerRef.current a una variable local
    const currentContainer = containerRef.current;

    return () => {
      // Usar la variable local en la función de limpieza
      if (currentContainer) {
        currentContainer.removeEventListener('wheel', handleScroll);
      }
    };
  }, []);

  return (
    <div className="product-section" ref={containerRef}>
      {products.map((product, index) => (
        <div
          key={product.key}
          className={`product`}
          style={{ scrollSnapAlign: 'start' }}
        >
          <div className='cardd'>
            <h3 className="productName">{product.name}</h3>
            <div>
              <Carousel prevIcon={null} nextIcon={null} interval={null}>
                {product.images.map((image, imgIndex) => (
                  <Carousel.Item key={imgIndex} className='carousel'>
                    <img className='productImg' src={image} alt={`Product ${product.key}`} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <p className="productPrice">{product.price}</p>
            <Rating
              name={`product-rating-${index}`}
              value={product.rating}
              precision={0.1} // Ajusta según sea necesario (0.1 para mostrar décimas de estrella)
              readOnly
              size="small"
              className="productRating"
            />
            <p className="productOpinion">"{product.description}"</p>
            <div className='buttonContainer'>
              <p className='invisibleP'></p>
              <a href={product.url} className="buyButton" target='_blank' rel='noopener noreferrer'>Buy Now</a>
              <img src="/img/compras.png" alt="amazon." className='amazonIcon'/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
