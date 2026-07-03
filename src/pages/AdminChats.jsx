import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout/AdminLayout';

const mockChats = [
  {
    id: 1,
    user: "Асан (id: 4012)",
    product: "Игровые наушники Neon X",
    topic: "⚙️ Неисправность",
    messages: [
      { sender: 'user', text: 'Здравствуйте! Правое ухо наушников стало играть тише и периодически пропадает подсветка. Что делать?' },
      { sender: 'admin', text: 'Приветствую, Асан! Попробуйте полностью сбросить подключение в настройках Bluetooth или обновить драйвера. Если не помогло — оформим возврат по гарантии.' },
      { sender: 'user', text: 'Хорошо, сейчас попробую переподключить.' }
    ]
  },
  {
    id: 2,
    user: "Ислам (id: 7721)",
    product: "Механическая клавиатура",
    topic: "📦 Доставка",
    messages: [
      { sender: 'user', text: 'Здорово! А когда курьер привезет клавиатуру? Статус заказа стоит "В пути".' },
      { sender: 'admin', text: 'Привет, Ислам! Кибер-курьер уже вылетел в твой сектор, ориентировочное время прибытия — в течение 40 минут. Ожидай звонка!' },
    ]
  },
  {
    id: 3,
    user: "Камила (id: 1094)",
    product: "Смарт-часы CyberWatch",
    topic: "❓ Вопрос по товару",
    messages: [
      { sender: 'user', text: 'Подскажите, а эти часы поддерживают управление музыкой на телефонах iPhone?' },
      { sender: 'admin', text: 'Да, Камила! Часы полностью совместимы как с iOS, так и с Android. Управление плеером работает идеально.' },
    ]
  }
];

const AdminChats = () => {
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [inputText, setInputText] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newMsg = { sender: 'admin', text: inputText };
    activeChat.messages.push(newMsg); // Добавляем сообщение
    setInputText('');
  };

  return (
    <AdminLayout>
    <div style={{ color: '#fff', padding: '20px', maxWidth: '1000px' }}>
      <h2 style={{ marginBottom: '25px' }}>💬 Служба поддержки и Чаты с клиентами</h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Список чатов слева */}
        <div style={{ flex: '1', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {mockChats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChat(chat)}
              style={{ 
                padding: '15px', 
                background: activeChat.id === chat.id ? '#1f222a' : '#13151a', 
                borderRadius: '12px', 
                cursor: 'pointer',
                border: activeChat.id === chat.id ? '1px solid #00f3ff' : '1px solid transparent'
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{chat.user}</div>
              <div style={{ fontSize: '12px', color: '#00f3ff', margin: '4px 0' }}>{chat.product}</div>
              <div style={{ fontSize: '13px', color: '#9ca3af' }}>Тема: {chat.topic}</div>
            </div>
          ))}
        </div>

        {/* Окно открытого чата справа */}
        <div style={{ flex: '2', minWidth: '320px', background: '#13151a', borderRadius: '12px', display: 'flex', flexDirection: 'column', height: '450px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 'bold' }}>
            Чат с: {activeChat.user} ({activeChat.topic})
          </div>
          
          {/* Сообщения */}
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activeChat.messages.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'admin' ? '#00f3ff' : '#242834',
                color: msg.sender === 'admin' ? '#000' : '#fff',
                padding: '10px 14px',
                borderRadius: '12px',
                maxWidth: '80%',
                fontSize: '14px',
                fontWeight: msg.sender === 'admin' ? '500' : 'normal'
              }}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Форма отправки ответа */}
          <form onSubmit={sendMessage} style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Напишите ответ клиенту..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ flex: 1, padding: '10px', background: '#1f222a', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }}
            />
            <button type="submit" className="buy-btn" style={{ padding: '10px 20px' }}>Отправить</button>
          </form>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminChats;