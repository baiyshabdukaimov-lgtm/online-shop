import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      {/* Боковая панель */}
      <aside className="admin-sidebar">
        <div className="sidebar-title">Управление</div>

        {/* 1 категория: В Главную */}
        <Link to="/" className="admin-menu-item">
          <span style={{ marginRight: '12px' }}>🏠</span> В Главную
        </Link>

        {/* 2 категория: Заказы */}
        <Link to="/admin/orders" className="admin-menu-item">
          <span style={{ marginRight: '12px' }}>📦</span> Заказы
        </Link>

        {/* 3 категория: Товары */}
        <Link to="/admin/products" className="admin-menu-item">
          <span style={{ marginRight: '12px' }}>🛍️</span> Товары
        </Link>

        {/* 4 категория: Чаты */}
        <Link to="/admin/chats" className="admin-menu-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', color: '#fff', textDecoration: 'none' }}>
          <span>💬</span> Чаты
        </Link>

        {/* 5 категория: Отзывы */}
        <Link to="/admin/reviews" className="admin-menu-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', color: '#fff', textDecoration: 'none' }}>
          <span>⭐</span> Отзывы
        </Link>
      </aside>

      {/* Контент справа */}
      <main className="admin-content">
        {/* Выводим children, если компонент обернут напрямую, или Outlet, если через дочерние роуты */}
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default AdminLayout;