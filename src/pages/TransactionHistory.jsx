import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCyberToast } from '../context/ToastContext';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { showToast } = useCyberToast();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Загружаем транзакции из локальной базы
    setTransactions(JSON.parse(localStorage.getItem('cyber_transactions') || '[]'));
  }, []);

  // Функция изменения статуса (Возврат / Отмена)
  const updateStatus = (txId, newStatus) => {
    const updated = transactions.map(tx => {
      if (tx.id === txId) {
        return { ...tx, status: newStatus };
      }
      return tx;
    });

    localStorage.setItem('cyber_transactions', JSON.stringify(updated));
    setTransactions(updated);

    if (newStatus === 'Возвращено') {
      showToast(`💸 Средства по транзакции ${txId} возвращены на карту!`);
    } else if (newStatus === 'Отменено') {
      showToast(`❌ Транзакция ${txId} успешно аннулирована.`);
    }
  };

  // Цвет статуса для красоты
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Оплачено': return { color: '#00f3ff', textShadow: '0 0 8px rgba(0,243,255,0.4)' };
      case 'Возвращено': return { color: '#ffd700', textShadow: '0 0 8px rgba(255,215,0,0.4)' };
      case 'Отменено': return { color: '#ff0055', textShadow: '0 0 8px rgba(255,0,85,0.4)' };
      default: return { color: '#fff' };
    }
  };

  if (transactions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#fff' }}>
        <h2 style={{ color: '#8fa0b5' }}>📜 ЛОГ ТРАНЗАКЦИЙ ПУСТ</h2>
        <p style={{ color: '#4f5d73', marginTop: '10px' }}>Вы еще не совершали никаких квантовых переводов.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '12px 24px', background: 'none', border: '1px solid #00f3ff', color: '#00f3ff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          В МАГАЗИН
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', color: '#fff' }}>
      <h1 style={{ color: '#00f3ff', marginBottom: '10px', textShadow: '0 0 10px rgba(0,243,255,0.2)' }}>
        📜 ДЕЦЕНТРАЛИЗОВАННЫЙ РЕЕСТР ОПЛАТ
      </h1>
      <p style={{ color: '#8fa0b5', fontSize: '14px', marginBottom: '30px' }}>
        История всех транзакций, списаний и возвратов по вашему терминалу.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {transactions.map((tx) => (
          <div key={tx.id} style={{ background: 'rgba(20, 24, 33, 0.8)', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* Шапка транзакции */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingBottom: '12px', borderBottom: '1px dashed rgba(255,255,255,0.08)' }}>
              <div>
                <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>ID: {tx.id}</span>
                <span style={{ marginLeft: '15px', color: '#8fa0b5', fontSize: '13px' }}>{tx.date}</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', ...getStatusStyle(tx.status) }}>
                ● {tx.status.toUpperCase()}
              </div>
            </div>

            {/* Содержимое чека */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '12px', color: '#8fa0b5', display: 'block', marginBottom: '5px' }}>Купленные модификации:</span>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#c9d1d9', fontSize: '14px' }}>
                  {tx.items.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>
                      {item.name} — <span style={{ color: '#00f3ff' }}>{Number(item.price).toLocaleString()} сом</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ textAlign: 'right', minWidth: '150px' }}>
                <span style={{ fontSize: '12px', color: '#8fa0b5', display: 'block' }}>Метод оплаты:</span>
                <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#fff' }}>{tx.cardMask}</span>
                
                <span style={{ fontSize: '12px', color: '#8fa0b5', display: 'block', marginTop: '10px' }}>Итоговая сумма:</span>
                <span style={{ fontSize: '22px', fontWeight: '900', color: '#ff0055' }}>
                  {tx.total.toLocaleString()} сом
                </span>
              </div>
            </div>

            {/* Кнопки управления (активны только если статус "Оплачено") */}
            {tx.status === 'Оплачено' && (
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '5px' }}>
                <button 
                  onClick={() => updateStatus(tx.id, 'Возвращено')}
                  style={{ padding: '8px 16px', background: 'rgba(255, 215, 0, 0.1)', border: '1px solid #ffd700', color: '#ffd700', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255, 215, 0, 0.2)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(255, 215, 0, 0.1)'}
                >
                  💸 Сделать Возврат
                </button>
                <button 
                  onClick={() => updateStatus(tx.id, 'Отменено')}
                  style={{ padding: '8px 16px', background: 'rgba(255, 0, 85, 0.1)', border: '1px solid #ff0055', color: '#ff0055', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255, 0, 85, 0.2)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(255, 0, 85, 0.1)'}
                >
                  ❌ Отменить операцию
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;