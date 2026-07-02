import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCyberToast } from '../../context/ToastContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { showToast } = useCyberToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isClicking, setIsClicking] = useState(false); // Стейт для запуска "булька"

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('cyber_favorites') || '[]');
    setIsFavorite(favorites.some(fav => fav.id === product.id));
  }, [product.id]);

  const basePrice = Number(product.price) || 0;
  const discountPercent = Number(product.discount) || 0;
  
  const hasDiscount = discountPercent > 0;
  const finalPrice = hasDiscount 
    ? Math.round(basePrice * (1 - discountPercent / 100)) 
    : basePrice;

  const toggleFavorite = (e) => {
    e.stopPropagation();
    
    // Запускаем триггер анимации "бульк"
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 400); // Выключаем через 0.4 сек (время анимации)

    let favorites = JSON.parse(localStorage.getItem('cyber_favorites') || '[]');
    const isFav = favorites.some(fav => fav.id === product.id);

    if (isFav) {
      favorites = favorites.filter(fav => fav.id !== product.id);
      setIsFavorite(false);
      showToast(`💔 Удалено из избранного`);
    } else {
      favorites.push(product);
      setIsFavorite(true);
      showToast(`❤️ Добавлено в избранное`);
    }
    localStorage.setItem('cyber_favorites', JSON.stringify(favorites));
    window.dispatchEvent(new Event('favorites-updated'));
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('shop_cart') || '[]');
    cart.push({ ...product, finalPrice });
    localStorage.setItem('shop_cart', JSON.stringify(cart));
    showToast(`🛒 Добавлено в корзину!`);
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div 
      className="cyber-card"
      style={{ 
        cursor: 'pointer', background: 'rgba(20, 24, 33, 0.65)', backdropFilter: 'blur(12px)',
        border: product.isSale ? '2px solid #ff0055' : '1px solid rgba(0, 243, 255, 0.2)',
        borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', height: '430px', position: 'relative', overflow: 'hidden',
        boxShadow: product.isSale ? '0 0 15px rgba(255, 0, 85, 0.4)' : '0 4px 20px rgba(0, 0, 0, 0.4)'
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Внедряем CSS стили для анимации прямо сюда */}
      <style>{`
        @keyframes heartPop {
          0% { transform: scale(1); }
          30% { transform: scale(1.4); }
          60% { transform: scale(0.85); }
          100% { transform: scale(1); }
        }
        .cyber-heart-active {
          animation: heartPop 0.4s ease-in-out;
        }
      `}</style>

      {/* Стикер распродажи */}
      {(product.isSale || hasDiscount) && (
        <div style={{ position: 'absolute', top: '15px', left: '15px', background: '#ff0055', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', zIndex: 5, boxShadow: '0 0 10px #ff0055' }}>
          {product.isSale ? '🔥 SALE' : `📉 -${discountPercent}%`}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ width: '100%', height: '170px', overflow: 'hidden', borderRadius: '8px', marginBottom: '15px', background: '#000', position: 'relative' }}>
          <img src={product.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          
          {/* СТИЛЬНАЯ НЕОНОВАЯ КНОПКА ЛАЙКА */}
          <button 
            onClick={toggleFavorite} 
            className={isClicking ? 'cyber-heart-active' : ''}
            style={{ 
              position: 'absolute', top: '10px', right: '10px', 
              background: 'rgba(11, 12, 16, 0.75)', border: '1px solid rgba(255, 255, 255, 0.1)', 
              borderRadius: '50%', width: '38px', height: '38px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              cursor: 'pointer', zIndex: 10, transition: 'all 0.2s ease',
              boxShadow: isFavorite ? '0 0 12px rgba(255, 0, 85, 0.6)' : 'none'
            }}
          >
            {/* SVG Кибер-Сердце */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill={isFavorite ? '#ff0055' : 'none'} 
              stroke={isFavorite ? '#ff0055' : '#8fa0b5'} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{
                filter: isFavorite ? 'drop-shadow(0 0 4px #ff0055)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <h3 style={{ margin: '0 0 8px 0', color: '#00f3ff', fontSize: '16px', fontWeight: 'bold', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {product.name}
        </h3>
        <p style={{ color: '#8fa0b5', fontSize: '13px', margin: '0', height: '54px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {product.desc}
        </p>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {hasDiscount && (
            <span style={{ fontSize: '12px', color: '#8fa0b5', textDecoration: 'line-through' }}>
              {basePrice.toLocaleString()} c.
            </span>
          )}
          <span style={{ fontSize: '18px', fontWeight: '900', color: hasDiscount ? '#00f3ff' : '#ff0055' }}>
            {finalPrice.toLocaleString()} <span style={{ fontSize: '11px' }}>сом</span>
          </span>
        </div>
        
        <button onClick={handleAddToCart} style={{ padding: '10px 14px', background: product.isSale ? '#ff0055' : '#00f3ff', border: 'none', borderRadius: '6px', color: '#0b0c10', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px', textTransform: 'uppercase' }}>
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;