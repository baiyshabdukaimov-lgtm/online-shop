import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getText } from '../../translate'; // Подключаем переводчик
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);

  const currentLang = localStorage.getItem('lang') || 'ru';

  const changeLanguage = (lang) => {
    localStorage.setItem('lang', lang);
    window.location.reload(); // Перезагружаем страницу для применения языка
  };

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem('shop_cart') || '[]');
    const favorites = JSON.parse(localStorage.getItem('cyber_favorites') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(totalItems);
    setFavCount(favorites.length);
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener('storage', updateCounts);
    window.addEventListener('favupdated', updateCounts);
    window.addEventListener('cartUpdated', updateCounts);
    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('favupdated', updateCounts);
      window.removeEventListener('cartUpdated', updateCounts);
    };
  }, []);

  return (
    <header className="cyber-header">
      <div className="header-container">
        
        <div className="cyber-menu-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button className="cyber-btn menu-trigger-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {getText("⚡ КИБЕР-МЕНЮ")}
          </button>
          
          <select 
            className="cyber-lang-select" 
            value={currentLang} 
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="ru">🇷🇺 RU</option>
            <option value="kg">🇰🇬 KG</option>
            <option value="en">🇬🇧 EN</option>
          </select>
          
          {menuOpen && (
            <div className="cyber-dropdown dropdown-animated">
              <Link to="/" onClick={() => setMenuOpen(false)}>{getText("🏠 На Главную")}</Link>
              <Link to="/pc-build" onClick={() => setMenuOpen(false)}>{getText("🖥️ Сборка ПК")}</Link>
              <Link to="/wheel" onClick={() => setMenuOpen(false)}>{getText("🎡 Колесо фортуны")}</Link>
              <Link to="/history" onClick={() => setMenuOpen(false)}>{getText("📜 История покупок")}</Link>
              <Link to="/admin" onClick={() => setMenuOpen(false)}>{getText("⚙️ Admin")}</Link>
            </div>
          )}
        </div>

        <div className="logo-center">
          <span className="logo-white">CYBER</span>
          <span className="logo-pink">SHOP</span>
        </div>

        <div className="desktop-nav-right">
          <Link to="/favorites" className="cyber-btn nav-btn-favorites">
            {getText("💖 ИЗБРАННОЕ")} {favCount > 0 && <span className="cyber-badge fav-badge">{favCount}</span>}
          </Link>
          <Link to="/cart" className="cyber-btn nav-btn-cart">
            {getText("🛒 КОРЗИНА")} {cartCount > 0 && <span className="cyber-badge cart-badge">{cartCount}</span>}
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;