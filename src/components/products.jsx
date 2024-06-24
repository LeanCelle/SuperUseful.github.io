// Products.js

import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import StarRating from './stars';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { app } from '../data/firebase';
import '../sass/homestyle.css';

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
      console.error('Error fetching products:', error);
    });
  }, []);

  return (
    <div className="product-section" ref={containerRef}>
      {products.map((product, index) => (
        <div key={product.key} className={`product`} style={{ scrollSnapAlign: 'start' }}>
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
            <StarRating rating={product.rating} />
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
