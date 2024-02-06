import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Header from './components/layout/Header';
import ShopPage from './pages/shop/ShopPage';
import SingleItemPage from './pages/shop/SingleItemPage';
import CartPage from './pages/CartPage';

export default function App() {
  return (
    <div className=''>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/shop/:itemId' element={<SingleItemPage />} />
        {/* <Route path='*' element={<NoMatch />} /> */}
      </Routes>
    </div>
  );
}
