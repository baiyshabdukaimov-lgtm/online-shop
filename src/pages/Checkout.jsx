import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCyberToast } from '../context/ToastContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { showToast } = useCyberToast();
  const [cartItems, setCartItems] = useState([]);
  const [finalTotal, setFinalTotal] = useState(0);

  // Состояние для данных карты
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    holder: ''
  });

  useEffect(() => {
    // 1. Загружаем товары из корзины
    const items = JSON.parse(localStorage.getItem('shop_cart') || '[]');
    setCartItems(items);

    // 2. Достаем честную цену со всеми промокодами из Корзины
    const savedTotal = localStorage.getItem('cyber_order_total');
    if (savedTotal) {
      setFinalTotal(Number(savedTotal));
    } else {
      // Фолбек: если зашли напрямую, считаем скидки товаров из админки вручную
      const fallbackTotal = items.reduce((acc, item) => {
        const itemPrice = item.finalPrice !== undefined ? item.finalPrice : item.price;
        return acc + Number(itemPrice);
      }, 0);
      setFinalTotal(fallbackTotal);
    }
  }, []);

  // Красивое форматирование номера карты по 4 цифры (0000 0000 0000 0000)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Только цифры
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    setCardData({ ...cardData, number: formatted });
  };

  // Форматирование срока действия (ММ/ГГ)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardData({ ...cardData, expiry: value });
  };

  // Форматирование CVC (3 цифры)
  const handleCvcChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    setCardData({ ...cardData, cvc: value });
  };

  // Имя владельца карты (автоматически в верхний регистр)
  const handleHolderChange = (e) => {
    setCardData({ ...cardData, holder: e.target.value.toUpperCase() });
  };

  // Обработчик оплаты заказа
  const handlePay = (e) => {
    e.preventDefault();
    
    // Валидация полей
    if (cardData.number.length < 19 || cardData.expiry.length < 5 || cardData.cvc.length < 3 || !cardData.holder) {
      showToast('❌ Ошибка: Проверьте правильность заполнения данных карты!');
      return;
    }

    showToast('⚡ Авторизация карты в банковском шлюзе...');
    
    setTimeout(() => {
      showToast('🔒 Проверка транзакции 3D-Secure...');
      
      setTimeout(() => {
        showToast('🎉 ТРАНЗАКЦИЯ ОДОБРЕНА! Кредиты списаны.');
        
        // ======= ЗАПИСЬ В ИСТОРИЮ ТРАНЗАКЦИЙ =======
        const existingTransactions = JSON.parse(localStorage.getItem('cyber_transactions') || '[]');
        
        const newTransaction = {
          id: `TX-${Math.floor(100000 + Math.random() * 900000)}`, // Генерация ID
          date: new Date().toLocaleString('ru-RU'), // Текущая дата и время
          items: cartItems.map(item => ({ 
            name: item.name, 
            price: item.finalPrice !== undefined ? item.finalPrice : item.price 
          })),
          total: finalTotal,
          cardMask: `•••• •••• •••• ${cardData.number.slice(-4)}`, // Маскируем номер карты
          status: 'Оплачено'
        };
        
        existingTransactions.unshift(newTransaction); // Пушим в начало списка
        localStorage.setItem('cyber_transactions', JSON.stringify(existingTransactions));
        // ===========================================
        
        // Очищаем корзину и кэш стоимости
        localStorage.removeItem('shop_cart');
        localStorage.removeItem('cyber_order_total');
        window.dispatchEvent(new Event('cart-updated'));
        
        // Перенаправляем на страницу истории покупок
        navigate('/history');
      }, 1500);
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#fff' }}>
        <h2 style={{ color: '#ff0055', textShadow: '0 0 10px #ff0055' }}>Терминал транзакций пуст.</h2>
        <p style={{ color: '#8fa0b5', marginTop: '10px' }}>Нет активных модулей для списания средств.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '12px 24px', background: 'none', border: '1px solid #00f3ff', color: '#00f3ff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>На главную</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '0 20px', color: '#fff' }}>
      <h1 style={{ color: '#00f3ff', textAlign: 'center', marginBottom: '5px', textShadow: '0 0 10px rgba(0,243,255,0.3)', fontSize: '24px' }}>
        💳 БАНКОВСКИЙ ПРОЦЕССИНГ
      </h1>
      <p style={{ textAlign: 'center', color: '#8fa0b5', fontSize: '13px', marginBottom: '30px' }}>
        Шлюз защищен протоколом SSL-256. Введите данные карты.
      </p>

      {/* ВИЗУАЛЬНАЯ КИБЕР-КАРТА */}
      <div style={{ 
        width: '100%', height: '210px', 
        background: 'linear-gradient(135deg, #1f1f2e 0%, #0d0d13 100%)', 
        borderRadius: '16px', padding: '25px', marginBottom: '30px',
        position: 'relative', border: '1px solid rgba(0, 243, 255, 0.3)',
        boxShadow: '0 0 25px rgba(0, 243, 255, 0.15)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        overflow: 'hidden'
      }}>
        {/* Квантовый светящийся чип и логотип */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '45px', height: '35px', background: 'linear-gradient(90deg, #ffd700, #ffa500)', borderRadius: '6px', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)' }} />
          <span style={{ color: '#00f3ff', fontWeight: '900', fontSize: '16px', letterSpacing: '2px', textShadow: '0 0 5px #00f3ff' }}>CYBER PAY</span>
        </div>

        {/* Номер карты на визуале */}
        <div style={{ color: '#fff', fontSize: '22px', wordSpacing: '4px', fontFamily: 'monospace', letterSpacing: '2px', textAlign: 'center', margin: '15px 0' }}>
          {cardData.number || '•••• •••• •••• ••••'}
        </div>

        {/* Низ визуала (Холдер и Срок) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ maxWidth: '70%', overflow: 'hidden' }}>
            <div style={{ fontSize: '9px', color: '#8fa0b5', textTransform: 'uppercase', marginBottom: '4px' }}>Владелец карты</div>
            <div style={{ fontSize: '14px', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '1px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {cardData.holder || 'CARDHOLDER NAME'}
            </div>
          </div>
          <div style={{ textAlign: 'right', minWidth: '60px' }}>
            <div style={{ fontSize: '9px', color: '#8fa0b5', textTransform: 'uppercase', marginBottom: '4px' }}>Срок действия</div>
            <div style={{ fontSize: '14px', fontFamily: 'monospace', fontWeight: 'bold' }}>
              {cardData.expiry || 'ММ/ГГ'}
            </div>
          </div>
        </div>
      </div>

      {/* ФОРМА ВВОДА */}
      <form onSubmit={handlePay} style={{ background: 'rgba(20, 24, 33, 0.8)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Поле: Номер карты */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', color: '#8fa0b5' }}>Номер карты:</label>
          <input 
            type="text" 
            placeholder="0000 0000 0000 0000"
            value={cardData.number}
            onChange={handleCardNumberChange}
            style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', fontSize: '16px', fontFamily: 'monospace', letterSpacing: '1px' }} 
          />
        </div>

        {/* Поля: Срок действия и CVC */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', color: '#8fa0b5' }}>Срок действия:</label>
            <input 
              type="text" 
              placeholder="ММ/ГГ"
              value={cardData.expiry}
              onChange={handleExpiryChange}
              style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', fontSize: '16px', fontFamily: 'monospace', textAlign: 'center' }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', color: '#8fa0b5' }}>CVC / CVV:</label>
            <input 
              type="password" 
              placeholder="•••"
              value={cardData.cvc}
              onChange={handleCvcChange}
              style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', fontSize: '16px', fontFamily: 'monospace', textAlign: 'center' }} 
            />
          </div>
        </div>

        {/* Поле: Имя владельца */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', color: '#8fa0b5' }}>Имя на карте (латиницей):</label>
          <input 
            type="text" 
            placeholder="IVAN IVANOV"
            value={cardData.holder}
            onChange={handleHolderChange}
            style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', fontSize: '15px', textTransform: 'uppercase' }} 
          />
        </div>

        {/* Итоговый чек */}
        <div style={{ background: '#0d1117', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255, 0, 85, 0.2)', marginTop: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: '#8fa0b5' }}>Сумма к списанию:</span>
          <span style={{ color: '#ff0055', fontSize: '22px', fontWeight: '900', textShadow: '0 0 8px rgba(255,0,85,0.2)' }}>
            {finalTotal.toLocaleString()} сом
          </span>
        </div>

        {/* Кнопка отправки формы */}
        <button type="submit" style={{ width: '100%', padding: '16px', background: 'linear-gradient(90deg, #00f3ff, #0077ff)', color: '#000', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 0 15px rgba(0,243,255,0.3)', marginTop: '5px' }}>
          🔒 Списать {finalTotal.toLocaleString()} сом
        </button>
      </form>
    </div>
  );
};

export default Checkout;