import React from 'react';

const mockReviews = [
  { id: 1, user: "Бакыт А.", product: "Механическая клавиатура", rating: 5, comment: "Клавиатура просто пушка! Тайпинг невероятно сочный, клики четкие. Подсветка яркая, режимов куча. Рекомендую всем геймерам!", date: "01.07.2026" },
  { id: 2, user: "Асан О.", product: "Игровые наушники Neon X", rating: 2, comment: "Звук хороший, но микрофон слабоват, друзья в Дискорде жалуются, что меня плохо слышно. И амбушюры давят на уши после 3 часов каток.", date: "30.06.2026" },
  { id: 3, user: "Камила В.", product: "Худи 'OverSize' Черный", rating: 5, comment: "Прекрасное худи! Очень плотное, теплое, материал качественный. Сидит идеально оверсайз, после стирки не село и не полиняло.", date: "28.06.2026" },
  { id: 4, user: "Жоробек К.", product: "Беспроводная мышь RGB", rating: 4, comment: "Сенсор топовый, сорвать невозможно. Заряд держит долго. Снял одну звезду за то, что софт для настройки подсветки только на английском.", date: "25.06.2026" },
  { id: 5, user: "Актан П.", product: "Коврик для мыши XXL", rating: 1, comment: "Приехал с сильным химическим запахом, который не выветривается уже два дня. Края прошиты криво, нитки торчат. Буду оформлять возврат.", date: "22.06.2026" },
];

const AdminReviews = () => {
  return (
    <div style={{ color: '#fff', padding: '20px', maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '10px' }}>⭐ Отзывы и оценки покупателей</h2>
      <p style={{ color: '#6b7280', marginBottom: '25px', fontSize: '14px' }}>Модерация отзывов, оставленных пользователями после получения заказов.</p>

      <div>
        {mockReviews.map((review) => (
          <div key={review.id} className="review-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <strong style={{ fontSize: '16px' }}>{review.user}</strong>
                <span style={{ color: '#6b7280', fontSize: '13px', marginLeft: '10px' }}>{review.date}</span>
              </div>
              <div className="stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
            </div>
            
            <div style={{ fontSize: '13px', color: '#00f3ff', marginBottom: '8px', fontWeight: '500' }}>
              Товар: {review.product}
            </div>
            
            <p style={{ color: '#d1d5db', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
              {review.comment}
            </p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '12px', justifyContent: 'flex-end' }}>
              <button className="admin-btn" style={{ padding: '5px 12px', fontSize: '12px', background: '#1f222a' }}>Одобрить</button>
              <button className="admin-btn danger" style={{ padding: '5px 12px', fontSize: '12px' }}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;