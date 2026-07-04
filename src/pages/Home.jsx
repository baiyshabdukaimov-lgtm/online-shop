import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import { getText } from '../translate'; // Наш простой и надежный переводчик


const Home = () => {
  const [products, setProducts] = useState([]);

  // Твой РОДНОЙ массив со всеми 25+ товарами из гугл дока
  const myOriginalProducts = [
    {
      id: 1,
      title: "Игровые наушники Neon X-200",
      description: "Премиальная киберспортивная гарнитура с пространственным звуком 7.1 и неоновой подсветкой.",
      price: 4500,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      issale: false
    },
    {
      id: 2,
      title: "Механическая клавиатура CyberClick",
      description: "Кастомная оптико-механическая клавиатура (75%) на смазанных линейных свитчах.",
      price: 6800,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
      issale: true
    },
    {
      id: 3,
      title: "Игровая мышь Quantum Glide",
      description: "Ультралегкая беспроводная мышь с топовым сенсором PixArt и RGB подсветкой.",
      price: 3200,
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
      issale: false
    },
    {
      id: 4,
      title: "Игровой монитор Horizon 2K",
      description: "27-дюймовый IPS монитор с частотой обновления 165 Гц и минимальным откликом.",
      price: 14500,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
      issale: false
    },
    {
      id: 5,
      title: "Киберспортивный коврик NeonGrid",
      description: "Огромный игровой коврик с гладким тканевым покрытием Speed и влагозащитой.",
      price: 1200,
      image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=500",
      issale: false
    },
    {
      id: 6,
      title: "Игровое кресло CyberThrone X",
      description: "Эргономичное геймерское кресло с 4D-подлокотниками и стальной рамой.",
      price: 18500,
      image: "https://avatars.mds.yandex.net/i?id=af8e3f32372e36af8f4efdd6ae2ac2ba22567611-9858823-images-thumbs&n=13",
      issale: true
    },
    {
      id: 7,
      title: "Микрофон для стримов WaveStream",
      description: "Конденсаторный USB-микрофон с кардиоидной диаграммой и поп-фильтром.",
      price: 5400,
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500",
      issale: false
    },
    {
      id: 8,
      title: "Веб-камера CyberEye 4K",
      description: "Стримерская веб-камера с автофокусом и встроенным кольцевым светом.",
      price: 7200,
      image: "https://images.unsplash.com/photo-1603184017968-953f59cd2e37?auto=format&fit=crop&w=500&q=80",
      issale: false
    },
    {
      id: 9,
      title: "Сборка ПК: Начальный уровень (Cyber Start)",
      description: "Надежный ПК для учебы и киберспортивных дисциплин (CS2, Dota 2) на средне-высоких настройках.",
      price: 45000,
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500",
      issale: false,
      isPcAssembly: true
    },
    {
      id: 10,
      title: "Сборка ПК: Оптимальный выбор (Cyber Game)",
      description: "Мощный игровой компьютер для современных AAA-игр в 1080p/2K разрешении на ультра-настройках.",
      price: 85000,
      image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500",
      issale: false,
      isPcAssembly: true
    },
    {
      id: 11,
      title: "Сборка ПК: Максимальный заряд (Cyber Ultra 4K)",
      description: "Топовая станция для гейминга в 4K, стриминга и тяжелого рендеринга видео с водяным охлаждением.",
      price: 165000,
      image: "https://images.unsplash.com/photo-1600541519463-fcd0c2d9e8e4?w=500",
      issale: true,
      isPcAssembly: true
    },
    {
      id: 12,
      title: "Оперативная память DDR5 RGB 32GB",
      description: "Высокоскоростная память с частотой 6000 МГц и настраиваемой подсветкой.",
      price: 11500,
      image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500",
      issale: false
    },
    {
      id: 13,
      title: "Видеокарта RTX 4070 Super",
      description: "Мощный графический чип с поддержкой DLSS 3.0 и трассировки лучей.",
      price: 69000,
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500",
      issale: false
    },
    {
      id: 14,
      title: "Процессор Intel Core i7-14700K",
      description: "20-ядерный процессор нового поколения для экстремальной производительности.",
      price: 38000,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
      issale: false
    },
    {
      id: 15,
      title: "SSD M.2 NVMe 1TB Kingston",
      description: "Сверхбыстрый накопитель со скоростью чтения до 7000 МБ/с.",
      price: 7900,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
      issale: false
    },
    {
      id: 16,
      title: "Блок питания 850W Gold",
      description: "Полностью модульный блок питания с сертификатом 80 Plus Gold.",
      price: 9500,
      image: "https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?w=500",
      issale: false
    },
    {
      id: 17,
      title: "Водяное охлаждение CyberLiquid 360",
      description: "Трехсекционная СЖО с ARGB вентиляторами и дисплеем на помпе.",
      price: 12500,
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=500",
      issale: false
    },
    {
      id: 18,
      title: "Корпус CyberCase Neon-One",
      description: "Корпус-аквариум из закаленного стекла с предустановленными кулерами.",
      price: 6400,
      image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500",
      issale: false
    },
    {
      id: 19,
      title: "Звуковая карта SoundBlaster Pro",
      description: "Внешняя звуковая карта высокого разрешения для идеального позиционирования в играх.",
      price: 8200,
      image: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=500",
      issale: false
    },
    {
      id: 20,
      title: "Дискретная сетевая карта 10 Gbps",
      description: "Высокоскоростной сетевой адаптер для игры без пинга и задержек.",
      price: 3400,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
      issale: false
    },
    {
      id: 21,
      title: "VR-Шлем CyberVerse VR",
      description: "Автономный шлем виртуальной реальности с разрешением 4K и контроллерами движения.",
      price: 49000,
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500",
      issale: true
    },
    {
      id: 22,
      title: "Руль со стандартными педалями CyberDrive",
      description: "Игровой руль с обратной связью (900 градусов) для автосимуляторов.",
      price: 24500,
      image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=500",
      issale: false
    },
    {
      id: 23,
      title: "Стримерский свет CyberLight Panel",
      description: "Светодиодная панель с регулировкой яркости и температуры для стримов.",
      price: 4800,
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500",
      issale: false
    },
    {
      id: 24,
      title: "Кибер-кабель Type-C Luminous 2m",
      description: "Прочный кабель в тканевой оплетке с неоновой подсветкой по всей длине.",
      price: 850,
      image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500",
      issale: false
    },
    {
      id: 25,
      title: "Внешний жесткий диск 2TB CyberVault",
      description: "Портативный ударопрочный накопитель во внешнем киберпанк-дизайне.",
      price: 6700,
      image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=500",
      issale: false
    }
  ];

  useEffect(() => {
    // Безопасная инициализация твоих 25 товаров
    setProducts(myOriginalProducts);
  }, []);

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#030508', minHeight: '100vh' }}>
      
      {/* Главный Баннер с нашим текстовым переводом */}
      <div style={{ textAlign: 'center', marginBottom: '50px', color: '#fff' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#00f3ff', 
          textShadow: '0 0 10px rgba(0, 243, 255, 0.5)',
          marginBottom: '15px'
        }}>
          {getText("🚀 КВАНТОВАЯ КИБЕР-ВИТРИНА")}
        </h1>
        <p style={{ color: '#8fa0b5', fontSize: '1.1rem' }}>
          {getText("Официальный дистрибьютор технологий будущего в Бишкеке")}
        </p>
      </div>

      {/* Сетка со всеми твоими 25+ товарами */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '25px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};

export default Home;