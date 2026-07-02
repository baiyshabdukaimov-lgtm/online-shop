import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = () => {
  useEffect(() => {
    if (document.getElementById('cyber-cursor-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'cyber-cursor-canvas';
    
    Object.assign(canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: '999999',
    });

    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let points = [];
    const maxPoints = 20;

    const mouseMoveHandler = (e) => {
      points.push({ x: e.clientX, y: e.clientY });
      if (points.length > maxPoints) {
        points.shift();
      }
    };
    window.addEventListener('mousemove', mouseMoveHandler);

    // 🔥 ЗАМЕНА: Используем setInterval вместо requestAnimationFrame.
    // Он принудительно заставляет браузер рисовать 60 раз в секунду в любом режиме!
    const intervalId = setInterval(() => {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00f3ff';

        ctx.stroke();
      }

      if (points.length > 0) {
        points.shift();
      }
    }, 1000 / 60); // Ровно 60 кадров в секунду стабильно

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      clearInterval(intervalId);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Header />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;