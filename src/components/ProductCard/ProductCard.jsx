import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getText } from '../../translate'; // Подключаем наш переводчик

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isClicking, setIsClicking] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 400);

    let favorites = JSON.parse(localStorage.getItem('cyber_favorites') || '[]');
    const isFav = favorites.some(fav => fav.id === product.id);

    if (isFav) {
      favorites = favorites.filter(fav => fav.id !== product.id);
    } else {
      favorites.push(product);
    }
    localStorage.setItem('cyber_favorites', JSON.stringify(favorites));
    window.dispatchEvent(new Event('favupdated'));
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('shop_cart') || '[]');
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('shop_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div 
      className="cyber-card"
      style={{
        cursor: 'pointer',
        background: 'rgba(20, 24, 33, 0.65)',
        backdropFilter: 'blur(12px)',
        border: product.issale ? '2px solid #ff0055' : '1px solid rgba(0, 243, 255, 0.2)',
        borderRadius: '12px',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '440px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: product.issale ? '0 0 15px rgba(255, 0, 85, 0.4)' : '0 4px 20px rgba(0, 0, 0, 0.4)'
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div style={{ position: 'relative' }}>
        <img 
          src={product.image || product.img} 
          alt="Product" 
          style={{ width: '100%', height: '190px', objectFit: 'contain', borderRadius: '8px' }} 
        />
        <button 
          onClick={toggleFavorite} 
          style={{ 
            position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', fontSize: '22px', cursor: 'pointer',
            transform: isClicking ? 'scale(1.4)' : 'scale(1)', transition: 'transform 0.1s ease'
          }}
        >
          💖
        </button>
      </div>

      <div style={{ marginTop: '10px' }}>
        <h3 style={{ color: '#00f3ff', margin: '0 0 8px 0', fontSize: '16px' }}>
          {getText(product.title)}
        </h3>
        <p style={{ color: '#8fa0b5', fontSize: '13px', margin: '0', height: '55px', overflow: 'hidden' }}>
          {getText(product.description)}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
        <span style={{ color: '#ff0055', fontWeight: 'bold', fontSize: '18px' }}>
          {product.price} сом
        </span>
        
        <button className="cyber-btn nav-btn-cart" onClick={handleAddToCart}>
          {getText("В КОРЗИНУ")}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;