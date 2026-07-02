import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="admin-container">
      {/* Боковая панель */}
      <aside className="admin-sidebar">
        <div className="sidebar-title">Управление</div>
        
        {/* 1 категория: В Главную */}
        <Link to="/">
          <span style={{ marginRight: '12px' }}>🏠</span> В Главную
        </Link>
        
        {/* 2 категория: Заказы (теперь вторая) */}
        <Link to="/admin/orders">
          <span style={{ marginRight: '12px' }}>📦</span> Заказы
        </Link>
        
        {/* 3 категория: Товары (теперь третья) */}
        <Link to="/admin/products">
          <span style={{ marginRight: '12px' }}>🛍️</span> Товары
        </Link>
        <Link to="/admin/chats" className="admin-menu-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', color: '#fff', textDecoration: 'none' }}>
  💬 Чаты
</Link>
<Link to="/admin/reviews" className="admin-menu-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', color: '#fff', textDecoration: 'none' }}>
  ⭐ Отзывы
</Link>
      </aside>

      {/* Контент справа */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;