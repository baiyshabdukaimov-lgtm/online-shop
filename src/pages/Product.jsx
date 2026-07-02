
import React, { useState, useEffect } from 'react';
import { useCyberToast } from '../context/ToastContext';


const initialProducts = [
  // Твои прошлые товары:
  { id: 1, name: 'Игровые наушники Neon X', price: '4500', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Шумоподавление и басы.', specs: {} },
  { id: 2, name: 'Механическая клавиатура', price: '6800', img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Кастомный сочный тайпинг.', specs: {} },
  { id: 3, name: 'Смарт-часы CyberWatch', price: '12000', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'AMOLED экран.', specs: {} },
  { id: 4, name: 'Худи "OverSize" Черный', price: '3200', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Уютный оверсайз.', specs: {} },
  { id: 5, name: 'Беспроводная мышь RGB', price: '2900', img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'PixArt сенсор.', specs: {} },
  { id: 6, name: 'Рюкзак для ноутбука', price: '4100', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Защита от влаги.', specs: {} },
  { id: 7, name: 'Коврик для мыши XXL', price: '1500', img: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Speed покрытие.', specs: {} },
  { id: 8, name: 'Portable Speaker', price: '5400', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Плотный бас.', specs: {} },
  
  // 🔥 НОВЫЙ ПАКЕТ ТЕХНИКИ И ГАДЖЕТОВ (Добиваем до 25):
  { id: 9, name: 'Игровой ПК CyberPower RTX 4090', price: '280000', img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Монстр для 4К гейминга на ультрах.', specs: {} },
  { id: 10, name: 'Монитор 360Hz UltraWave', price: '42000', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Идеальный отклик для киберспорта.', specs: {} },
  { id: 11, name: 'Геймпад DualSense Edge', price: '19500', img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Про-контроллер с лепестками.', specs: {} },
  { id: 12, name: 'VR Шлем NeoQuest 3', price: '65000', img: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Полное погружение в виртуальную реальность.', specs: {} },
  { id: 13, name: 'Микрофон для стримов QuadCast', price: '13400', img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Кристально чистый звук без шумов.', specs: {} },
  { id: 14, name: 'Игровое кресло CyberThrone', price: '24900', img: 'https://avatars.mds.yandex.net/i?id=af8e3f32372e36af8f4efdd6ae2ac2ba22567611-9858823-images-thumbs&n=13', visible: true, desc: 'Ортопедическая поддержка спины.', specs: {} },
  { id: 15, name: 'Студийный свет LED Panel RGB', price: '5800', img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Яркий свет для сочной картинки.', specs: {} },
  { id: 16, name: 'Видеокарта RTX 4070 Ti Super', price: '94000', img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Трассировка лучей и высокая производительность.', specs: {} },
  { id: 17, name: 'Портативная консоль Steam Deck OLED', price: '72000', img: 'https://avatars.mds.yandex.net/i?id=954ebbe4a909211205439687cc4204bdbd4918ee-12623687-images-thumbs&n=13', visible: true, desc: 'Все ПК-игры прямо у тебя в кармане.', specs: {} },
  { id: 18, name: 'Веб-камера 4K StreamCam', price: '11200', img: 'https://images.unsplash.com/photo-1603184017968-953f59cd2e37?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Автофокус и сочные 60 кадров.', specs: {} },
  { id: 19, name: 'Внешний SSD M.2 2TB', price: '14500', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Молниеносная скорость передачи данных.', specs: {} },
  { id: 20, name: 'Оперативная память DDR5 32GB RGB', price: '12800', img: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Стильная подсветка и частота 6000 MHz.', specs: {} },
  { id: 21, name: 'Водяное охлаждение CPU RGB', price: '11000', img: 'https://images.unsplash.com/photo-1555617766-c94804975da3?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Эффективный отвод тепла от процессора.', specs: {} },
  { id: 22, name: 'Игровая приставка PS5 Slim', price: '56000', img: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Эксклюзивы и высокая скорость загрузки.', specs: {} },
  { id: 23, name: 'Звуковая карта Sound Blaster X', price: '8900', img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Позиционирование шагов в играх на 10/10.', specs: {} },
  { id: 24, name: 'Держатель для провода мыши (Банджи)', price: '1800', img: 'https://avatars.mds.yandex.net/i?id=67968cd598d25c49a558eea9586a12aed3ed8768-5247581-images-thumbs&n=13', visible: true, desc: 'Полная свобода движений проводной мыши.', specs: {} },
  { id: 25, name: 'Умная RGB лента Голограмма', price: '3400', img: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=500&q=80', visible: true, desc: 'Атмосфера твоей комнаты под музыку.', specs: {} }
];



const Admin = () => {
  const { showToast } = useCyberToast();
  const [products, setProducts] = useState([]);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    img: '',
    desc: '',
    longDesc: '',
    specs: '',
    discount: '0', // Скидка от 0 до 99
    isSale: false   // Флаг распродажи
  });

  const [isEditing, setIsEditing] = useState(false);

  const loadProducts = () => {
    const localData = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(localData);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const parseSpecs = (specsString) => {
    if (!specsString) return {};
    const specsObj = {};
    specsString.split(',').forEach(item => {
      const [key, val] = item.split(':');
      if (key && val) specsObj[key.trim()] = val.trim();
    });
    return specsObj;
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      showToast('❌ Заполните название и цену!');
      return;
    }

    let updatedProducts = [...products];
    const finalProduct = {
      ...formData,
      price: Number(formData.price),
      discount: Number(formData.discount),
      specs: typeof formData.specs === 'string' ? parseSpecs(formData.specs) : formData.specs
    };

    if (isEditing) {
      updatedProducts = updatedProducts.map(p => p.id === formData.id ? finalProduct : p);
      showToast(`💾 Товар "${formData.name}" обновлен!`);
    } else {
      finalProduct.id = Date.now().toString();
      finalProduct.visible = true;
      updatedProducts.push(finalProduct);
      showToast(`➕ Товар "${formData.name}" добавлен!`);
    }

    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    resetForm();
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Удалить товар "${name}"?`)) {
      const updated = products.filter(p => p.id !== id);
      localStorage.setItem('products', JSON.stringify(updated));
      setProducts(updated);
      showToast(`🗑️ Товар удален.`);
    }
  };

  const handleStartEdit = (product) => {
    setIsEditing(true);
    const specsString = product.specs && typeof product.specs === 'object'
      ? Object.entries(product.specs).map(([k, v]) => `${k}:${v}`).join(', ')
      : '';

    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      desc: product.desc,
      longDesc: product.longDesc || '',
      specs: specsString,
      discount: product.discount || '0',
      isSale: product.isSale || false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setIsEditing(false);
    setFormData({ id: '', name: '', price: '', img: '', desc: '', longDesc: '', specs: '', discount: '0', isSale: false });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px', color: '#fff' }}>
      <h1 style={{ color: '#00f3ff', textAlign: 'center', marginBottom: '30px' }}>⚙️ УПРАВЛЕНИЕ КИБЕР-СКЛАДОМ</h1>

      <div style={{ background: 'rgba(20, 24, 33, 0.8)', border: '1px solid rgba(0, 243, 255, 0.2)', padding: '25px', borderRadius: '12px', marginBottom: '40px' }}>
        <h2 style={{ color: '#ff0055', marginBottom: '20px' }}>{isEditing ? '📝 Редактировать девайс' : '✨ Добавить девайс'}</h2>
        
        <form onSubmit={handleSaveProduct} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label>Название: <input type="text" name="name" value={formData.name} onChange={handleInputChange} style={{ width: '100%', padding: '10px', background: '#0d1117', color: '#fff', border: '1px solid #30363d', borderRadius: '6px' }} /></label>
            <label>Цена (базовая): <input type="number" name="price" value={formData.price} onChange={handleInputChange} style={{ width: '100%', padding: '10px', background: '#0d1117', color: '#fff', border: '1px solid #30363d', borderRadius: '6px' }} /></label>
            <label>Ссылка на фото: <input type="text" name="img" value={formData.img} onChange={handleInputChange} style={{ width: '100%', padding: '10px', background: '#0d1117', color: '#fff', border: '1px solid #30363d', borderRadius: '6px' }} /></label>
            
            {/* МАРКЕТИНГОВЫЕ НАСТРОЙКИ */}
            <div style={{ display: 'flex', gap: '20px', background: 'rgba(255,0,85,0.05)', padding: '15px', borderRadius: '8px', border: '1px dashed #ff0055' }}>
              <label style={{ flex: 1 }}>Размер скидки (%): 
                <input type="number" name="discount" min="0" max="99" value={formData.discount} onChange={handleInputChange} style={{ width: '100%', padding: '10px', background: '#0d1117', color: '#fff', border: '1px solid #ff0055', borderRadius: '6px', marginTop: '5px' }} />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginTop: '20px' }}>
                <input type="checkbox" name="isSale" checked={formData.isSale} onChange={handleInputChange} style={{ width: '20px', height: '20px' }} />
                🔥 РАСПРОДАЖА (SALE)
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label>Короткое описание: <input type="text" name="desc" value={formData.desc} onChange={handleInputChange} style={{ width: '100%', padding: '10px', background: '#0d1117', color: '#fff', border: '1px solid #30363d', borderRadius: '6px' }} /></label>
            <label>Длинное описание: <textarea name="longDesc" value={formData.longDesc} onChange={handleInputChange} rows="3" style={{ width: '100%', padding: '10px', background: '#0d1117', color: '#fff', border: '1px solid #30363d', borderRadius: '6px', resize: 'none' }} /></label>
            <label>Характеристики (Ключ:Значение, ...): <input type="text" name="specs" value={formData.specs} onChange={handleInputChange} style={{ width: '100%', padding: '10px', background: '#0d1117', color: '#fff', border: '1px solid #30363d', borderRadius: '6px' }} /></label>
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '15px' }}>
            <button type="submit" style={{ flexGrow: 1, padding: '12px', background: isEditing ? '#ff0055' : '#00f3ff', border: 'none', color: '#000', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer', textTransform: 'uppercase' }}>💾 Сохранить</button>
            {isEditing && <button type="button" onClick={resetForm} style={{ padding: '12px 20px', background: '#30363d', color: '#fff', border: 'none', borderRadius: '6px' }}>Отмена</button>}
          </div>
        </form>
      </div>

      {/* ТАБЛИЦА */}
      <div style={{ background: 'rgba(20, 24, 33, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #00f3ff', color: '#8fa0b5', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Превью</th>
              <th style={{ padding: '12px' }}>Название</th>
              <th style={{ padding: '12px' }}>Статус</th>
              <th style={{ padding: '12px' }}>Цена</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px' }}><img src={p.img} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} /></td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{p.name}</td>
                <td style={{ padding: '12px' }}>
                  {p.isSale && <span style={{ background: '#ff0055', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', marginRight: '5px' }}>SALE</span>}
                  {p.discount > 0 && <span style={{ background: '#00f3ff', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>-{p.discount}%</span>}
                </td>
                <td style={{ padding: '12px', color: '#ff0055', fontWeight: 'bold' }}>{p.price.toLocaleString()} сом</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <button onClick={() => handleStartEdit(p)} style={{ background: 'none', border: '1px solid #00f3ff', color: '#00f3ff', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}>✏️</button>
                  <button onClick={() => handleDeleteProduct(p.id, p.name)} style={{ background: 'none', border: '1px solid #ff0055', color: '#ff0055', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;