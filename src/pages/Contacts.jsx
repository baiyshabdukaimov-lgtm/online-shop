import React from 'react';

const Contacts = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', color: '#fff' }}>
      <h1>Контакты для связи</h1>
      <p style={{ color: '#9ca3af', marginTop: '10px' }}>Свяжитесь с нами по любым вопросам работы магазина.</p>
      <div style={{ background: '#13151a', padding: '20px', borderRadius: '12px', marginTop: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <p>📧 Email: <strong>support@cyberstore.com</strong></p>
        <p>📞 Телефон: <strong>+996 708 436 331</strong></p>
        <p>💬 Telegram: <strong>@cyber_store_support</strong></p>
      </div>
    </div>
  );
};

export default Contacts;