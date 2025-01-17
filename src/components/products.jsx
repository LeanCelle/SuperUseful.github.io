import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Rating from '@mui/material/Rating';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { app } from '../data/firebase';
import '../css/homestyle.css';

function Products() {
  // State to store products fetched from Firebase
  const [products, setProducts] = useState([]);
  
  // Reference for the container to handle custom scrolling
  const containerRef = useRef(null);

  useEffect(() => {
    const db = getDatabase(app);
    const productsRef = dbRef(db, 'products');
    
    // Fetch products data from Firebase
    onValue(productsRef, (snapshot) => {
      const productsData = snapshot.val();
      if (productsData) {
        const productsArray = Object.keys(productsData).map(key => ({
          key,
          id: productsData[key].product_id,
          name: productsData[key].product_name,
          price: productsData[key].price,
          rating: parseFloat(productsData[key].rating),
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
    });

    // Handle custom scrolling
    const handleScroll = (event) => {
      if (containerRef.current) {
        event.preventDefault(); // Prevent default scroll behavior
        containerRef.current.scrollTop += event.deltaY * 0.01; // Adjust the multiplier for sensitivity
      }
    };

    if (containerRef.current) {
      // Add custom scroll event
      containerRef.current.addEventListener('wheel', handleScroll, { passive: true });
    }

    // Copy containerRef.current to a local variable
    const currentContainer = containerRef.current;

    return () => {
      // Use the local variable in the cleanup function
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
          className="product"
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
              precision={0.1} // Adjust as needed (0.1 to show tenths of a star)
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
