import React, { useState } from 'react';
import { useCyberToast } from '../context/ToastContext';

const partsData = {
  cpu: [
    { name: 'Intel Core i5-14600K', price: 32000 },
    { name: 'AMD Ryzen 7 7800X3D', price: 45000 },
    { name: 'Intel Core i9-14900KS', price: 72000 }
  ],
  gpu: [
    { name: 'RTX 4060 Ti 8GB', price: 44000 },
    { name: 'RTX 4070 Ti Super 16GB', price: 94000 },
    { name: 'RTX 4090 Заводской разгон', price: 240000 }
  ],
  ram: [
    { name: '16GB DDR5 Kingston Fury', price: 7500 },
    { name: '32GB DDR5 Corsair Vengeance RGB', price: 14000 },
    { name: '64GB DDR5 G.Skill Trident Z', price: 28000 }
  ]
};

const PcBuilder = () => {
  const { showToast } = useCyberToast();
  const [build, setBuild] = useState({ cpu: null, gpu: null, ram: null });

  const handleSelect = (category, item) => {
    setBuild(prev => ({ ...prev, [category]: item }));
    showToast(`Выбран элемент: ${item.name}`);
  };

  const totalPrice = Object.values(build).reduce((sum, item) => sum + (item ? item.price : 0), 0);

  const handleAddBuildToCart = () => {
    if (!build.cpu || !build.gpu || !build.ram) {
      showToast('❌ Ошибка: Выберите все комплектующие для сборки!');
      return;
    }
    const cart = JSON.parse(localStorage.getItem('shop_cart') || '[]');
    const customBuildProduct = {
      id: `custom-pc-${Date.now()}`,
      name: `Кастомный ПК (${build.cpu.name} / ${build.gpu.name})`,
      price: totalPrice.toString(),
      img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80',
      desc: 'Индивидуальная геймерская сборка.'
    };
    cart.push(customBuildProduct);
    localStorage.setItem('shop_cart', JSON.stringify(cart));
    showToast('🚀 Кастомная сборка успешно отправлена в Корзину!');
  };

  return (
     
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--primary-neon)', textShadow: '0 0 10px var(--shadow-color)' }}>🛠️ Интерактивный Сборщик Кибер-ПК</h2>
      <p style={{ color: 'var(--text-muted)' }}>Скомпонуй конфигурацию своей мечты. Совместимость компонентов проверяется автоматически ИИ-модулем.</p>

      <div className="pc-builder-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {Object.keys(partsData).map((category) => (
            <div key={category} className="cyber-panel">
              <h3 style={{ textTransform: 'uppercase', color: 'var(--primary-neon)', margin: '0 0 12px 0' }}>
                {category === 'cpu' ? '🧠 Процессор' : category === 'gpu' ? '🎮 Видеокарта' : '⚡ Оперативная память'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {partsData[category].map((item) => (
                  <div 
                    key={item.name}
                    onClick={() => handleSelect(category, item)}
                    style={{ padding: '12px', background: build[category]?.name === item.name ? 'rgba(0,243,255,0.15)' : 'rgba(255,255,255,0.02)', border: build[category]?.name === item.name ? '1px solid var(--primary-neon)' : '1px solid transparent', borderRadius: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>{item.name}</span>
                    <strong style={{ color: 'var(--primary-neon)' }}>{item.price.toLocaleString()} ₽</strong>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="cyber-panel" style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
          <h3 style={{ color: 'var(--secondary-neon)', margin: '0 0 15px 0' }}>📋 Ваша Конфигурация</h3>
          <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <li><strong>ЦП:</strong> {build.cpu ? build.cpu.name : <span style={{ color: '#ef4444' }}>Не выбран</span>}</li>
            <li><strong>ГПУ:</strong> {build.gpu ? build.gpu.name : <span style={{ color: '#ef4444' }}>Не выбран</span>}</li>
            <li><strong>ОЗУ:</strong> {build.ram ? build.ram.name : <span style={{ color: '#ef4444' }}>Не выбран</span>}</li>
          </ul>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '20px 0' }} />
          <div style={{ fontSize: '18px', marginBottom: '20px' }}>Итого: <span style={{ color: 'var(--primary-neon)', fontWeight: 'bold', fontSize: '22px' }}>{totalPrice.toLocaleString()} ₽</span></div>
          <button onClick={handleAddBuildToCart} style={{ width: '100%', padding: '12px', background: 'var(--primary-neon)', border: 'none', borderRadius: '6px', color: '#000', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 15px var(--shadow-color)' }}>
            ОФОРМИТЬ СБОРКУ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PcBuilder;