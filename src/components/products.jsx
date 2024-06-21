import React, { useState, useEffect, useRef } from 'react';
import '../sass/homestyle.css';
import Carousel from 'react-bootstrap/Carousel';
import Rating from '@mui/material/Rating';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { app } from '../data/firebase';

function Products() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
          rating: productsData[key].rating,
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
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

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
    if (container) {
      container.addEventListener('scroll', handleScroll);

      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [currentIndex, products]);

  return (
    <div className="product-section" ref={containerRef}>
      {products.map((product, index) => (
        <div
          key={product.key}
          className={`product ${index === currentIndex ? 'current' : ''}`}
          style={{ scrollSnapAlign: 'start' }}
        >
          <div className='cardd'>
            <h3 className="productName">{product.name}</h3>
            <div className="">
              <Carousel prevIcon={null} nextIcon={null} interval={null}>
                {product.images.map((image, imgIndex) => (
                  <Carousel.Item key={imgIndex} className='carousel'>
                    <img className='productImg' src={image} alt={`Product ${product.key}`} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <p className="productPrice">{product.price}</p>
            <Rating name={`product-rating-${index}`} value={product.rating} precision={0.5} readOnly className="productRating" size="small"/>
            <p className="productOpinion">"{product.description}"</p>
            <div className='buttonContainer'>
              <p className='invisibleP'></p>
              <a href={product.url} className="buyButton" target='blank'>Buy Now</a>
              <img src="/img/compras.png" alt="amazon." className='amazonIcon'/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
