import React, { useState, useEffect, useRef } from 'react';
import '../sass/homestyle.css';
import Carousel from 'react-bootstrap/Carousel';
import Rating from '@mui/material/Rating';

function Products() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Función para generar productos ficticios
    const generateFakeProducts = () => {
      const newProducts = [];
      for (let i = 1; i <= 10; i++) {
        newProducts.push({
          id: i,
          name: `Product ${i}`,
          price: `$${Math.floor(Math.random() * 100) + 1}`,
          rating: 4.5,
          image: `${process.env.PUBLIC_URL}/img/favicon.ico`
        });
      }
      return newProducts;
    };

    // Genera productos ficticios iniciales
    setProducts(generateFakeProducts());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const productHeight = container.scrollHeight / products.length;

      if (scrollTop > currentIndex * productHeight + containerHeight / 2) {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, products.length - 1));
      } else if (scrollTop < currentIndex * productHeight - containerHeight / 2) {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
      }
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [currentIndex, products]);

  const handleBuy = (product) => {
    alert(`Compraste ${product.name} por ${product.price}`);
  };

  return (
    <>
    <div className="product-section" ref={containerRef}>
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`product ${index === currentIndex ? 'current' : ''}`}
          style={{ scrollSnapAlign: 'start' }}
        >
          <div className='cardd'>
            <h3 className="productName">{product.name}</h3>
            <Carousel prevIcon={null} nextIcon={null} interval={null}>
              <Carousel.Item className='carousel'>
                <img className='productImg' src="https://m.media-amazon.com/images/I/81cONOek27L._AC_SL1500_.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={product.image} alt={product.name} className='productImg'/>
              </Carousel.Item>
              <Carousel.Item>
                <img src={product.image} alt={product.name} className='productImg'/>
              </Carousel.Item>
            </Carousel>
            <p className="productPrice">Price: {product.price}</p>
            <Rating name={`product-rating-${index}`} value={product.rating} precision={0.5} readOnly className="productRating"/>
            {/* Rating de Material-UI con clase productRating */}
            <p className="productOpinion">"The product I use changed my life"</p>
            <div className='buttonContainer'>
              <p className='invisibleP'></p>
              <p className="buyButton" onClick={() => handleBuy(product)}>Buy Now</p>
              <img src="/img/compras.png" alt="amazon." className='amazonIcon'/>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Products;
