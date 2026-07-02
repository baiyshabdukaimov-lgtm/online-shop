import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavs = () => {
      setFavorites(JSON.parse(localStorage.getItem('cyber_favorites') || '[]'));
    };
    loadFavs();
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter(item => item.id !== id);
    setFavorites(updated);
    localStorage.setItem('cyber_favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('favorites-updated'));
  };

  if (favorites.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#fff' }}>
        <h2 style={{ color: '#ff0055' }}>💔 Лист Избранного пуст</h2>
        <p style={{ color: '#8fa0b5' }}>Вы еще не лайкнули ни одного кибер-девайса.</p>
        <Link to="/" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', border: '1px solid var(--primary-neon)', color: 'var(--primary-neon)', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          ВЕРНУТЬСЯ К КАТАЛОГУ
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px', color: '#fff' }}>
      <h1 style={{ color: '#ff0055', textShadow: '0 0 10px rgba(255,0,85,0.3)', marginBottom: '30px' }}>
        ❤️ ВАШИ ИЗБРАННЫЕ МОДИФИКАЦИИ
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
        {favorites.map(item => (
          <div key={item.id} style={{ background: 'rgba(20, 24, 33, 0.8)', border: '1px solid #ff0055', borderRadius: '12px', padding: '15px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            <button onClick={() => removeFavorite(item.id)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#ff0055', fontSize: '20px', cursor: 'pointer' }}>
              ❌
            </button>

            <img src={item.img} alt={item.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />
            
            <div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{item.name}</h3>
              <p style={{ color: '#8fa0b5', fontSize: '14px', margin: '0 0 15px 0' }}>{item.desc}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <span style={{ color: '#00f3ff', fontWeight: 'bold', fontSize: '18px' }}>
                {Number(item.price).toLocaleString()} сом
              </span>
              <Link to={`/product/${item.id}`} style={{ padding: '6px 12px', background: 'none', border: '1px solid #00f3ff', color: '#00f3ff', textDecoration: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                ОТКРЫТЬ
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;