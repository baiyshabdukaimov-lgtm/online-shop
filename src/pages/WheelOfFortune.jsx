import React, { useState } from 'react';
import { useCyberToast } from '../context/ToastContext';

const sectors = [
  { prize: 'Скидка 10%', code: 'CYBER10' },
  { prize: 'Скидка 25%', code: 'MEGA25' },
  { prize: 'Скидка 5%', code: 'GIFT5' },
  { prize: 'Скидка 50%', code: 'HALF50' },
  { prize: 'Скидка 15%', code: 'NEON15' },
  { prize: 'Скидка 99%', code: 'GOD99' },
];

const WheelOfFortune = () => {
  const { showToast } = useCyberToast();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonPrize(null);

    // Случайный сектор и дополнительные полные обороты
    const randomDegrees = Math.floor(Math.random() * 360);
    const totalSpin = rotation + 1800 + randomDegrees; 
    
    setRotation(totalSpin);

    setTimeout(() => {
      setIsSpinning(false);
      // Вычисляем сектор, на который указывает стрелка (сверху, т.е. 360 - остаток от деления)
      const actualDegrees = (360 - (totalSpin % 360)) % 360;
      const sectorIndex = Math.floor(actualDegrees / (360 / sectors.length));
      const result = sectors[sectorIndex];

      setWonPrize(result);
      showToast(`🎰 Вы выиграли: ${result.prize}!`);
    }, 4000); // 4 секунды кручения
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center', color: '#fff', padding: '0 20px' }}>
      <h1 style={{ color: '#00f3ff', marginBottom: '10px' }}>🎰 КВАНТОВОЕ КОЛЕСО УДАЧИ</h1>
      <p style={{ color: '#8fa0b5', marginBottom: '30px' }}>Испытай удачу и сорви куш до -99%! Промокоды скрыты квантовым шумом.</p>

      {/* Сама конструкция колеса */}
      <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto 40px auto' }}>
        {/* Стрелка */}
        <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderTop: '25px solid #ff0055', zIndex: 10 }} />
        
        {/* Крутящийся диск */}
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '8px solid #00f3ff', position: 'relative', overflow: 'hidden', transform: `rotate(${rotation}deg)`, transition: 'transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)', background: '#0d1117', boxShadow: '0 0 30px rgba(0, 243, 255, 0.4)' }}>
          {sectors.map((s, idx) => {
            const angle = (360 / sectors.length) * idx;
            return (
              <div key={idx} style={{ position: 'absolute', width: '50%', height: '50%', top: '0', right: '0', transformOrigin: '0% 100%', transform: `rotate(${angle}deg) skewY(-30deg)`, background: idx % 2 === 0 ? '#161b22' : '#0d1117', border: '1px solid rgba(0,243,255,0.1)' }}>
                {/* Текст внутри сектора */}
                <div style={{ position: 'absolute', left: '-20px', bottom: '30px', transform: 'skewY(30deg) rotate(30deg)', width: '120px', textAlign: 'center', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>
                  <div>{s.prize}</div>
                  {/* РАЗМЫТЫЙ ПРОМОКОД */}
                  <div style={{ filter: 'blur(5px)', color: '#ff0055', background: 'rgba(0,0,0,0.4)', padding: '2px', borderRadius: '3px', marginTop: '3px', fontSize: '9px', userSelect: 'none' }}>
                    XXXXXX
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={spinWheel} disabled={isSpinning} style={{ padding: '15px 40px', background: isSpinning ? '#30363d' : 'linear-gradient(90deg, #00f3ff, #ff0055)', color: '#000', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: isSpinning ? 'not-allowed' : 'pointer', textTransform: 'uppercase', boxShadow: '0 0 20px rgba(0,243,255,0.4)' }}>
        {isSpinning ? 'Считывание вероятностей...' : 'Запустить симуляцию'}
      </button>

      {/* ОКНО ВЫИГРЫША С ЧЁТКИМ ПРОМОКОДОМ */}
      {wonPrize && (
        <div style={{ marginTop: '30px', background: 'rgba(20,24,33,0.9)', border: '2px solid #00f3ff', padding: '20px', borderRadius: '12px', boxShadow: '0 0 25px rgba(0,243,255,0.3)', animation: 'pulse 1.5s infinite' }}>
          <h2 style={{ color: '#00f3ff', margin: '0 0 10px 0' }}>🎉 СИСТЕМА ВЗЛОМАНА!</h2>
          <p style={{ margin: '0 0 15px 0' }}>Вы открыли доступ к сектору: <strong style={{ color: '#ff0055' }}>{wonPrize.prize}</strong></p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#8fa0b5' }}>СКОПИРУЙТЕ И ВСТАВЬТЕ В КОРЗИНЕ:</span>
            <div style={{ background: '#000', border: '1px dashed #ff0055', padding: '12px 30px', borderRadius: '6px', fontSize: '22px', fontWeight: 'bold', color: '#fff', letterSpacing: '2px' }}>
              {wonPrize.code}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WheelOfFortune;