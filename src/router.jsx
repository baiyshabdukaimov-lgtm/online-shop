// import { createBrowserRouter } from "react-router-dom";
// import Layout from "./components/Layout/Layout";
// import AdminLayout from "./components/AdminLayout/AdminLayout";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Product from "./pages/Product";
// import Admin from "./pages/Admin";

// export const router = createBrowserRouter([
//   // Маршруты для обычных пользователей (с обычной шапкой)
//   {
//     path: "/",
//     element: <Layout />, 
//     children: [
//       {
//         path: "/",
//         element: <Home />
//       },
//       {
//         path: "/about",
//         element: <About />
//       },
//       {
//         path: "/product",
//         element: <Product />
//       }
//     ]
//   },
//   // Маршруты для админ-панели (с боковым меню)
//   {
//     path: "/admin",
//     element: <AdminLayout />,
//     children: [
//       {
//         path: "/admin", // Главная страница админки
//         element: <Admin />
//       },
//       {
//         path: "/admin/products", // Категория "Товары" в админке
//         element: <div><h2>Страница управления товарами</h2></div>
//       },
//       {
//         path: "/admin/orders", // Категория "Заказы" в админке
//         element: <div><h2>Страница управления заказами</h2></div>
//       }
//     ]
//   }
// ]);
// import { createBrowserRouter } from "react-router-dom";
// import Layout from "./components/Layout/Layout";
// import AdminLayout from "./components/AdminLayout/AdminLayout";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Product from "./pages/Product";
// import Admin from "./pages/Admin";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />, 
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/about", element: <About /> },
//       { path: "/product", element: <Product /> }
//     ]
//   },
//   {
//     path: "/admin",
//     element: <AdminLayout />,
//     children: [
//       { path: "/admin", element: <Admin /> },
//       { path: "/admin/products", element: <div><h2>Товары</h2></div> },
//       { path: "/admin/orders", element: <div><h2>Заказы</h2></div> }
//     ]
//   }
// ]);
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product"; // Наша страница товаров
import Admin from "./pages/Admin";
import Orders from "./pages/Orders"; // Импортируем созданную страницу заказов
import Contacts from "./pages/Contacts";
import Favorites from "./pages/Favorites"; // Добавь импорт вверх
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminChats from "./pages/AdminChats";
import AdminReviews from "./pages/AdminReviews";
import PcBuilder from "./pages/PcBuilder"; // Наш калькулятор
import WheelOfFortune from "./pages/WheelOfFortune";
import ProductPage from "./pages/ProductPage"
import TransactionHistory from './pages/TransactionHistory';

// const AdminChats = () => <div style={{color: '#fff', padding: '20px'}}><h2>💬 Переписки с клиентами</h2><p>Тут будут отображаться активные диалоги.</p></div>;
// const AdminReviews = () => <div style={{color: '#fff', padding: '20px'}}><h2>⭐ Отзывы и оценки</h2><p>Клиент оставил 5 звёзд на Нашу Клавиатуру!</p></div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/product", element: <Product /> },
      { path: "/contacts",element: <Contacts />},
      { path: "/favorites",element: <Favorites />},
      { path: "/cart",element: <Cart />},
      { path: "/checkout",element: <Checkout />},
      { path: "/admin/chats",element: <AdminChats />},
      { path: "/admin/reviews",element: <AdminReviews />},
      { path: "/adminchats",element: <AdminChats />},
      { path: "/adminreviews",element: <AdminReviews />},
      { path: "/pc-builder", element: <PcBuilder /> },
      { path: "/wheel", element: <WheelOfFortune /> },
      { path: "/product/:id", element: <ProductPage /> },
      { path: "/history", element: <TransactionHistory /> }
     
      
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <Admin />
      },
      {
        path: "/admin/products", // Категория Товары
        element: <Product /> // Подставляем страницу товаров
      },
      {
        path: "/admin/orders", // Категория Заказы
        element: <Orders /> // Подставляем страницу заказов
      }
    ]
  }
]);