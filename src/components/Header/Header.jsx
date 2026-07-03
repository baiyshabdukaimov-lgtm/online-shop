// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Header = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [favCount, setFavCount] = useState(0);
  
//   // Состояние текущего скина (по умолчанию SPACE)
//   const [currentSkin, setCurrentSkin] = useState(() => localStorage.getItem('cyber_skin') || 'SPACE');

//   const updateCounts = () => {
//     const cart = JSON.parse(localStorage.getItem('shop_cart') || '[]');
//     const favs = JSON.parse(localStorage.getItem('cyber_favorites') || '[]');
//     setCartCount(cart.length);
//     setFavCount(favs.length);
//   };

//   useEffect(() => {
//     updateCounts();
//     window.addEventListener('cart-updated', updateCounts);
//     window.addEventListener('favorites-updated', updateCounts);
//     return () => {
//       window.removeEventListener('cart-updated', updateCounts);
//       window.removeEventListener('favorites-updated', updateCounts);
//     };
//   }, []);

//   // Функция переключения скинов
//   const toggleSkin = () => {
//     const nextSkin = currentSkin === 'SPACE' ? 'NEON' : 'SPACE';
//     setCurrentSkin(nextSkin);
//     localStorage.setItem('cyber_skin', nextSkin);
    
//     // Переключаем класс на body, чтобы стили менялись глобально по всему сайту!
//     document.body.className = `skin-${nextSkin.toLowerCase()}`;
    
//     // Вызываем кастомное событие, если другие компоненты должны узнать о смене скина
//     window.dispatchEvent(new Event('skin-changed'));
//   };

//   return (
//     <header className="cyber-header">
//       <style>{`
//         .cyber-header {
//           background: rgba(10, 11, 16, 0.75);
//           backdrop-filter: blur(15px) saturate(180%);
//           -webkit-backdrop-filter: blur(15px) saturate(180%);
//           border-bottom: 2px solid #00f3ff;
//           box-shadow: 0 4px 30px rgba(0, 243, 255, 0.15), inset 0 -1px 10px rgba(0, 243, 255, 0.1);
//           position: sticky; top: 0; z-index: 1000; padding: 15px 25px;
//           font-family: 'Segoe UI', Roboto, sans-serif;
//         }
//         .header-container { display: flex; justify-content: space-between; align-items: center; max-width: 1300px; margin: 0 auto; }
        
//         .cyber-logo { cursor: pointer; font-size: 24px; font-weight: 900; color: #fff; letter-spacing: 2px; }
//         .logo-accent { color: #ff0055; text-shadow: 0 0 12px #ff0055; }

//         .nav-links { display: flex; gap: 12px; align-items: center; }

//         .nav-item {
//           color: #8fa0b5; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(0, 243, 255, 0.15);
//           padding: 8px 16px; font-size: 13px; font-weight: 600; text-transform: uppercase;
//           letter-spacing: 1px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 6px;
//           transition: all 0.3s ease;
//         }
//         .nav-item:hover { color: #00f3ff; border-color: #00f3ff; box-shadow: 0 0 15px rgba(0, 243, 255, 0.2); }

//         /* Ультра-стильная кнопка Скина */
//         .skin-btn {
//           background: linear-gradient(135deg, rgba(255, 165, 0, 0.15) 0%, rgba(255, 69, 0, 0.05) 100%) !important;
//           border: 1px solid #ffa500 !important; color: #ffa500 !important;
//           text-shadow: 0 0 5px rgba(255, 165, 0, 0.5);
//         }
//         .skin-btn:hover {
//           box-shadow: 0 0 15px #ffa500 !important;
//           background: linear-gradient(135deg, rgba(255, 165, 0, 0.3) 0%, rgba(255, 69, 0, 0.1) 100%) !important;
//         }

//         .cart-btn { background: linear-gradient(135deg, rgba(255, 0, 85, 0.2) 0%, rgba(255, 0, 85, 0.05) 100%) !important; border: 1px solid #ff0055 !important; color: #fff !important; }
//         .cart-btn:hover { box-shadow: 0 0 20px #ff0055 !important; }

//         .badge { background: #ff0055; color: #fff; padding: 2px 6px; border-radius: 20px; font-size: 11px; box-shadow: 0 0 8px #ff0055; }
//         .cart-badge { background: #00f3ff; color: #000; box-shadow: 0 0 8px #00f3ff; }

//         .burger-btn { display: flex; flex-direction: column; justify-content: space-around; width: 30px; height: 20px; background: transparent; border: none; cursor: pointer; padding: 0; z-index: 101; }
//         .burger-line { width: 30px; height: 3px; background: #00f3ff; border-radius: 4px; transition: all 0.3s ease; box-shadow: 0 0 8px rgba(0, 243, 255, 0.5); }
//         .open .line1 { transform: translateY(7px) rotate(45deg); background: #ff0055; }
//         .open .line2 { opacity: 0; }
//         .open .line3 { transform: translateY(-6px) rotate(-45deg); background: #ff0055; }

//         .mobile-menu {
//           position: fixed; top: 0; right: -100%; width: 290px; height: 100vh; background: rgba(10, 11, 16, 0.96);
//           backdrop-filter: blur(20px); border-left: 2px solid #00f3ff; padding: 90px 25px;
//           display: flex; flex-direction: column; gap: 15px; transition: right 0.4s ease; z-index: 100;
//         }
//         .mobile-menu.active { right: 0; box-shadow: -5px 0 25px rgba(0, 243, 255, 0.2); }

//         @media (max-width: 900px) {
//           .desktop-nav { display: none !important; }
//           .burger-btn { display: flex !important; }
//         }
//         @media (min-width: 901px) {
//           .burger-btn { display: none !important; }
//           .mobile-menu { display: none !important; }
//         }
//       `}</style>

//       <div className="header-container">
//         <div className="cyber-logo" onClick={() => navigate('/')}>
//           CYBER<span className="logo-accent">SHOP</span>
//         </div>

//         {/* НАВИГАЦИЯ ДЛЯ ПК */}
//         <nav className="nav-links desktop-nav">
//           {/* Наша сочная кнопка скина */}
//           <button className="nav-item skin-btn" onClick={toggleSkin}>
//             🎨 СКИН: {currentSkin}
//           </button>
          
//           <button className="nav-item" onClick={() => navigate('/admin')}>⚙️ Админка</button>
//           <button className="nav-item" onClick={() => navigate('/history')}>📜 История</button>
//           <button className="nav-item" onClick={() => navigate('/favorites')}>
//             ❤️ Избранное {favCount > 0 && <span className="badge">{favCount}</span>}
//           </button>
//           <button className="nav-item cart-btn" onClick={() => navigate('/cart')}>
//             🛒 Корзина {cartCount > 0 && <span className="badge cart-badge">{cartCount}</span>}
//           </button>
//         </nav>

//         {/* БУРГЕР */}
//         <button className={`burger-btn ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
//           <div className="burger-line line1"></div>
//           <div className="burger-line line2"></div>
//           <div className="burger-line line3"></div>
//         </button>
//       </div>

//       {/* МОБИЛЬНОЕ МЕНЮ */}
//       <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
//         <button className="nav-item skin-btn" style={{ justifyContent: 'center' }} onClick={() => { toggleSkin(); setIsOpen(false); }}>
//           🎨 СКИН: {currentSkin}
//         </button>
//         <button className="nav-item" onClick={() => { navigate('/admin'); setIsOpen(false); }}>⚙️ Админ Панель</button>
//         <button className="nav-item" onClick={() => { navigate('/history'); setIsOpen(false); }}>📜 История</button>
//         <button className="nav-item" onClick={() => { navigate('/favorites'); setIsOpen(false); }}>
//           ❤️ Избранное {favCount > 0 && <span className="badge">{favCount}</span>}
//         </button>
//         <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '10px 0' }} />
//         <button className="nav-item cart-btn" style={{ justifyContent: 'center', padding: '14px' }} onClick={() => { navigate('/cart'); setIsOpen(false); }}>
//           🛒 КОРЗИНА ({cartCount})
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);

  // Функция строго читает те ключи, которые у тебя в ProductCard.jsx!
  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem('shop_cart') || '[]');
    const favorites = JSON.parse(localStorage.getItem('cyber_favorites') || '[]');
    
    // Считаем общее количество вещей в корзине
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    setCartCount(totalItems);
    setFavCount(favorites.length);
  };

  useEffect(() => {
    updateCounts();

    // Слушаем кастомные триггеры из ProductCard.jsx
    window.addEventListener('storage', updateCounts);
    window.addEventListener('favupdated', updateCounts); // Буква 'u' теперь маленькая!
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
        
        {/* ЛЕВАЯ ЧАСТЬ */}
        <div className="cyber-menu-wrapper">
          <button 
            className="cyber-btn menu-trigger-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ⚡ КИБЕР-МЕНЮ
          </button>
          
          
          {menuOpen && (
            <div className="cyber-dropdown dropdown-animated">
              <Link to="/" onClick={() => setMenuOpen(false)}>🏠 На Главную</Link>
              <Link to="/pc-build" onClick={() => setMenuOpen(false)}>🖥️ Сборка ПК</Link>
              <Link to="/wheel" onClick={() => setMenuOpen(false)}>🎡 Колесо фортуны</Link>
              <Link to="/history" onClick={() => setMenuOpen(false)}>📜 История покупок</Link>
              <Link to="/admin" onClick={() => setMenuOpen(false)}>⚙️ Admin</Link>
            </div>
          )}
        </div>

        {/* СРЕДНЯЯ ЧАСТЬ */}
        <div className="logo-center">
          <span className="logo-white">CYBER</span>
          <span className="logo-pink">SHOP</span>
        </div>

        {/* ПРАВАЯ ЧАСТЬ */}
        <div className="desktop-nav-right">
          <Link to="/favorites" className="cyber-btn nav-btn-favorites">
            💖 ИЗБРАННОЕ {favCount > 0 && <span className="cyber-badge fav-badge">{favCount}</span>}
          </Link>
          <Link to="/cart" className="cyber-btn nav-btn-cart">
            🛒 КОРЗИНА {cartCount > 0 && <span className="cyber-badge cart-badge">{cartCount}</span>}
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;