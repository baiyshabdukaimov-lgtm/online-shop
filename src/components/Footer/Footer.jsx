import React from 'react';

const Footer = () => {
  return (
    <footer className="neon-footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>🌌 CYBER-SHOP</h3>
          <p>Магазин будущего доступный уже сегодня. Топовые игровые девайсы, кастомные комплектующие и неоновый стиль для твоей игровой зоны.</p>
          <div className="footer-socials">
            <a href="#" className="social-icon">✈️</a>
            <a href="#" className="social-icon">💬</a>
            <a href="#" className="social-icon">🎮</a>
            <a href="#" className="social-icon">📺</a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Навигация</h3>
          <ul>
            <li>Главная страница</li>
            <li>Каталог товаров</li>
            <li>Политика конфиденциальности</li>
            <li>Публичная оферта</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Поддержка</h3>
          <ul>
            <li>Часто задаваемые вопросы (FAQ)</li>
            <li>Условия доставки</li>
            <li>Возврат товара</li>
            <li>Связаться с Кибер-Админом</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Контакты</h3>
          <p>📞 Тел: +996 436 331</p>
          <p>📧 Email: support@cybershop.neo</p>
          <p>📍 Адрес: Нео-Сити, Сектор 7, Ул. Электриков, д. 404</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Cyber-Shop. Все права защищены. Разработано Братьями для Геймеров.
      </div>
    </footer>
  );
};

export default Footer;