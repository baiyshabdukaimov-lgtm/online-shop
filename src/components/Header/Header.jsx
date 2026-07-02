import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('cyber-theme') || 'cyberpunk');
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0); // Состояние для количества лайков
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Функция обновления корзины
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('shop_cart') || '[]');
      setCartCount(cart.length);
    };

    // Функция обновления избранного
    const updateFavCount = () => {
      const favs = JSON.parse(localStorage.getItem('cyber_favorites') || '[]');
      setFavCount(favs.length);
    };

    updateCartCount();
    updateFavCount();

    // Слушатели событий для синхронизации
    window.addEventListener('storage', () => { updateCartCount(); updateFavCount(); });
    window.addEventListener('cart-updated', updateCartCount); 
    window.addEventListener('favorites-updated', updateFavCount); 

    return () => {
      window.removeEventListener('storage', () => { updateCartCount(); updateFavCount(); });
      window.removeEventListener('cart-updated', updateCartCount);
      window.removeEventListener('favorites-updated', updateFavCount);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cyber-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const themes = ['cyberpunk', 'matrix', 'space'];
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
  };

  return (
    <header className="cyber-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', position: 'sticky', top: 0, zIndex: 1000, background: 'var(--panel-bg)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--primary-neon)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {location.pathname !== '/' ? (
          <button onClick={() => navigate('/')} style={{ padding: '8px 16px', background: 'none', border: '1px solid var(--secondary-neon)', color: 'var(--secondary-neon)', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
            🔙 НА ГЛАВНУЮ
          </button>
        ) : (
          <button className="burger-btn" onClick={() => setIsOpen(!isOpen)} style={{ padding: '8px 16px', background: 'none', border: '1px solid var(--primary-neon)', color: 'var(--primary-neon)', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
            {isOpen ? '✕ ЗАКРЫТЬ' : '⚡ КИБЕР-МЕНЮ'}
          </button>
        )}
        
        <Link to="/" style={{ color: 'var(--primary-neon)', fontSize: '22px', fontWeight: 'bold', textDecoration: 'none', textShadow: '0 0 10px var(--shadow-color)' }}>
          CYBER-SHOP
        </Link>
      </div>

      {isOpen && location.pathname === '/' && (
        <div className="dropdown-menu" style={{ position: 'absolute', top: '70px', left: '30px', background: 'rgba(11,12,16,0.95)', border: '1px solid var(--primary-neon)', padding: '20px', borderRadius: '8px', zIndex: 2000, display: 'flex', flexDirection: 'column', gap: '15px', width: '250px' }}>
          <div>
            <h4 style={{ color: 'var(--secondary-neon)', margin: '0px 0px 8px 0px' }}>Навигация</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>Главная витрина</Link></li>
              <li><Link to="/favorites" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>❤️ Избранное</Link></li>
              <li><Link to="/pc-builder" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>🛠️ Сборщик ПК</Link></li>
              <li><Link to="/wheel" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>🎰 Колесо Фортуны</Link></li>
              <li><Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>Панель Админа</Link></li>
            </ul>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <button onClick={toggleTheme} style={{ background: 'none', border: '1px solid var(--secondary-neon)', color: 'var(--secondary-neon)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          🎨 СКИН: {theme.toUpperCase()}
        </button>

        {/* Кнопка "Избранное" со счетчиком лайков */}
        <Link to="/favorites" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          ❤️ Избранное
          {favCount > 0 && (
            <span style={{ background: '#ff0055', color: '#fff', borderRadius: '50%', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 0 8px #ff0055' }}>
              {favCount}
            </span>
          )}
        </Link>

        {/* Кнопка "Корзина" */}
        <Link to="/cart" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px', position: 'relative', display: 'flex', alignItems: 'center', gap: '5px' }}>
          🛒 Корзина
          {cartCount > 0 && (
            <span style={{ background: 'var(--primary-neon)', color: '#000', borderRadius: '50%', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 0 8px var(--primary-neon)' }}>
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;