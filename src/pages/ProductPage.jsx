import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCyberToast } from '../context/ToastContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useCyberToast();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Подгружаем актуальную базу товаров из localStorage
    const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
    // Ищем товар, проверяя и строки, и числа
    const found = localProducts.find(p => p.id === id || p.id === Number(id));
    setProduct(found);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('shop_cart') || '[]');
    cart.push(product);
    localStorage.setItem('shop_cart', JSON.stringify(cart));
    
    // Показываем неоновый тост и обновляем цифру в шапке
    showToast(`⚡ Товар "${product.name}" успешно добавлен в корзину!`);
    window.dispatchEvent(new Event('cart-updated'));
  };

  if (!product) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--secondary-neon)' }}>📡 Сканирование квантовых баз...</h2>
        <p style={{ color: 'var(--text-muted)' }}>Товар не найден или удален администратором.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px', background: 'var(--primary-neon)', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          НА ГЛАВНУЮ
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      {/* Кнопка "Назад", которую требовал учитель */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ background: 'none', border: '1px solid var(--primary-neon)', color: 'var(--primary-neon)', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', boxShadow: '0 0 10px var(--shadow-color)' }}
        >
          ✕ Вернуться к витрине
        </button>
      </div>

      {/* Основная панель карточки товара */}
      <div className="cyber-panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', padding: '30px' }}>
        
        {/* Левая колонка: Изображение */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={product.img} 
            alt={product.name} 
            style={{ width: '100%', maxHeight: '450px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }} 
          />
        </div>
        
        {/* Правая колонка: Информация */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ color: 'var(--primary-neon)', margin: '0 0 15px 0', fontSize: '32px' }}>{product.name}</h1>
          
          {/* Длинное детальное описание */}
          <p style={{ fontSize: '16px', color: 'var(--text-color)', lineHeight: '1.6', marginBottom: '25px' }}>
            {product.longDesc || product.desc}
          </p>
          
          {/* Рендеринг технических характеристик */}
          <div style={{ marginTop: 'auto' }}>
            <h3 style={{ color: 'var(--secondary-neon)', margin: '0 0 12px 0' }}>⚙️ Спецификации модуля:</h3>
            
            {product.specs ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.07)', paddingBottom: '6px', fontSize: '14px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{key}</span>
                    <span style={{ color: '#fff', fontWeight: '500' }}>{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Стандартная комплектация Cyber-Shop Edition. Локализовано для Кыргызстана.</p>
            )}
          </div>

          {/* Блок покупки */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '35px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '8px', borderTop: '1px solid var(--primary-neon)' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--primary-neon)' }}>
              {Number(product.price).toLocaleString()} сом
            </span>
            <button 
              onClick={handleAddToCart} 
              style={{ padding: '14px 28px', background: 'var(--primary-neon)', border: 'none', borderRadius: '4px', color: '#000', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', boxShadow: '0 0 15px var(--shadow-color)', textTransform: 'uppercase' }}
            >
              Добавить в корзину
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;