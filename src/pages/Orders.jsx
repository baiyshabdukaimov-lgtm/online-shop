import React, { useState } from 'react';

const initialOrders = [
  { id: 1024, user: 'Иван Иванов', items: 'Игровые наушники x1', total: '4 500 ₽', status: 'Новый' },
  { id: 1025, user: 'Артем Смирнов', items: 'Клавиатура x1, Мышь x1', total: '9 700 ₽', status: 'В обработке' },
  { id: 1026, user: 'Мария Сидорова', items: 'Худи Черный x2', total: '6 400 ₽', status: 'Новый' },
  { id: 1027, user: 'Дмитрий Петров', items: 'Смарт-часы x1', total: '12 000 ₽', status: 'В обработке' },
  { id: 1028, user: 'Елена К.', items: 'Коврик для мыши x1', total: '1 500 ₽', status: 'Новый' },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);

  // Изменение статуса заказа
  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  return (
    <div>
      <h2>Управление поступающими заказами</h2>
      <p style={{ color: '#6b7280', marginBottom: '25px' }}>Всего заявок: {orders.length}</p>

      <div className="orders-grid">
        {orders.map((order) => {
          // Определяем класс для баджа в зависимости от статуса
          let statusClass = 'new';
          if (order.status === 'Принят') statusClass = 'accepted';
          if (order.status === 'Отклонен') statusClass = 'canceled';
          if (order.status === 'В обработке') statusClass = 'processing';

          return (
            <div key={order.id} className="order-card" style={{
              borderColor: order.status === 'Принят' ? 'rgba(34, 197, 94, 0.3)' : order.status === 'Отклонен' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255,255,255,0.05)'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ color: '#6b7280', fontWeight: '600' }}>ЗАКАЗ #{order.id}</span>
                  <span className={`status-badge ${statusClass}`}>
                    {order.status}
                  </span>
                </div>
                <h3>{order.user}</h3>
                <p style={{ color: '#9ca3af', fontSize: '14px', minHeight: '40px', margin: '0 0 10px 0' }}>
                  {order.items}
                </p>
              </div>
              
              <div>
                <div className="product-price" style={{ marginBottom: '10px' }}>{order.total}</div>
                
                {/* Кнопки управления клиентом/заказом */}
                <div className="order-actions">
                  <button 
                    className="admin-btn success" 
                    style={{flex: 1, fontSize: '13px', padding: '8px'}}
                    onClick={() => updateStatus(order.id, 'Принят')}
                  >
                    ✓ Принять
                  </button>
                  <button 
                    className="admin-btn danger" 
                    style={{flex: 1, fontSize: '13px', padding: '8px'}}
                    onClick={() => updateStatus(order.id, 'Отклонен')}
                  >
                    ✕ Отменить
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;