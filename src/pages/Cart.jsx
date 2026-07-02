import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCyberToast } from '../context/ToastContext';

const promoCodesBase = {
  'GIFT5': 5,
  'CYBER10': 10,
  'NEON15': 15,
  'MEGA25': 25,
  'HALF50': 50,
  'GOD99': 99
};

const Cart = () => {
  const navigate = useNavigate();
  const { showToast } = useCyberToast();
  const [cartItems, setCartItems] = useState([]);
  const [promoInput, setPromoInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const loadCart = () => {
    setCartItems(JSON.parse(localStorage.getItem('shop_cart') || '[]'));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    localStorage.setItem('shop_cart', JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event('cart-updated'));
    showToast('Модуль удален из корзины');
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();

    if (promoCodesBase[code]) {
      setDiscountPercent(promoCodesBase[code]);
      showToast(`✅ Промокод активирован! Скидка -${promoCodesBase[code]}%`);
    } else {
      showToast('❌ Квантовый код не найден в реестре!');
    }
  };

  // Расчет стоимости
  const subTotal = cartItems.reduce((acc, item) => {
    // Если finalPrice нет (товар добавили до скидок), берем обычную цену
    const currentPrice = item.finalPrice !== undefined ? item.finalPrice : item.price;
    return acc + Number(currentPrice);
  }, 0);

  const discountAmount = Math.round(subTotal * (discountPercent / 100));
  const finalTotal = subTotal - discountAmount;

  // Функция при клике на КУПИТЬ
  const handleCheckout = () => {
    showToast('🚀 Перенаправление в шлюз оплаты...');
    
    // Сохраняем финальную сумму заказа, чтобы страница оплаты её видела
    localStorage.setItem('cyber_order_total', finalTotal);
    
    // Перенаправляем на страницу оплаты (замени на свой роут, если он называется иначе)
    setTimeout(() => {
      navigate('/checkout'); 
    }, 1000);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#fff' }}>
        <h2 style={{ color: '#ff0055', fontSize: '28px', textShadow: '0 0 10px #ff0055' }}>🛒 ТВОЙ КИБЕР-АНГАР ПУСТ</h2>
        <p style={{ color: '#8fa0b5', marginTop: '10px' }}>Добавь модификации на главной витрине, чтобы начать прокачку.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '12px 24px', background: 'none', border: '1px solid #00f3ff', color: '#00f3ff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          ВЕРНУТЬСЯ К КАТАЛОГУ
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '0 20px', color: '#fff' }}>
      <h1 style={{ color: '#00f3ff', marginBottom: '30px', textShadow: '0 0 10px rgba(0,243,255,0.2)' }}>🛒 ТВОЙ КИБЕР-ЗАКАЗ</h1>

      {/* Список товаров */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {cartItems.map((item, idx) => {
          const itemPrice = item.finalPrice !== undefined ? item.finalPrice : item.price;
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(20,24,33,0.8)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <img src={item.img} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(0,243,255,0.2)' }} />
              <div style={{ flex: 1, marginLeft: '20px' }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{item.name}</h3>
                <span style={{ color: '#00f3ff', fontWeight: 'bold' }}>{Number(itemPrice).toLocaleString()} сом</span>
              </div>
              <button onClick={() => handleRemove(idx)} style={{ background: 'none', border: 'none', color: '#ff0055', fontSize: '18px', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                🗑️
              </button>
            </div>
          );
        })}
      </div>

      {/* Поле промокода */}
      <div style={{ background: 'rgba(20,24,33,0.5)', padding: '20px', borderRadius: '12px', border: '1px dashed #ff0055', marginBottom: '30px' }}>
        <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="ВВЕДИТЕ ПРОМОКОД С КОЛЕСА" 
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            style={{ flex: 1, padding: '12px', background: '#000', border: '1px solid rgba(255,0,85,0.3)', color: '#fff', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', textAlign: 'center' }} 
          />
          <button type="submit" style={{ padding: '12px 25px', background: '#ff0055', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', boxShadow: '0 0 10px rgba(255,0,85,0.3)' }}>
            ПРИМЕНИТЬ
          </button>
        </form>
      </div>

      {/* Блок итогов + КНОПКА ОПЛАТЫ */}
      <div style={{ background: 'rgba(20,24,33,0.9)', padding: '25px', borderRadius: '12px', border: '1px solid #00f3ff', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'flex-end' }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: '0 0 6px 0', color: '#8fa0b5' }}>Сумма брутто: {subTotal.toLocaleString()} сом</p>
          {discountPercent > 0 && <p style={{ margin: '0 0 6px 0', color: '#00f3ff', fontWeight: 'bold' }}>Протокол скидки ({discountPercent}%): -{discountAmount.toLocaleString()} сом</p>}
          <h2 style={{ margin: '0', color: '#ff0055', fontSize: '32px', textShadow: '0 0 10px rgba(255,0,85,0.2)' }}>
            ИТОГО: {finalTotal.toLocaleString()} сом
          </h2>
        </div>

        {/* КНОПКА ОФОРМЛЕНИЯ (ВОТ ОНА РОДНАЯ!) */}
        <button 
          onClick={handleCheckout}
          style={{ 
            width: '100%', 
            maxWidth: '300px', 
            padding: '16px 20px', 
            background: 'linear-gradient(90deg, #00f3ff, #0077ff)', 
            color: '#000', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '16px', 
            fontWeight: '900', 
            cursor: 'pointer', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            boxShadow: '0 0 20px rgba(0, 243, 255, 0.4)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { e.target.style.transform = 'scale(1.02)'; e.target.style.boxShadow = '0 0 25px #00f3ff'; }}
          onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.4)'; }}
        >
          💳 ОПЛАТИТЬ ЗАКАЗ
        </button>
      </div>
    </div>
  );
};

export default Cart;