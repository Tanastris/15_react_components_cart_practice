import { NavLink, Link } from 'react-router-dom';
import { useCartCtx } from '../../store/CartProvider';

export default function Header() {
  const { cart } = useCartCtx();

  return (
    <header className='bg-gray-900 text-white'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/'>
          <h2 className='font-bold text-2xl p-4 tracking-wider'>
            Shop<span className='font-normal uppercase'>Till</span>you
            <span className='font-normal'>Drop</span>
          </h2>
        </Link>
        <nav className='flex'>
          <NavLink className='block p-4 hover:bg-gray-800' to='/'>
            Home
          </NavLink>
          <NavLink className='block p-4 hover:bg-gray-800' to='/about'>
            About
          </NavLink>
          <NavLink className='block p-4 hover:bg-gray-800' to='/shop'>
            Shop
          </NavLink>
          <NavLink className='block p-4 hover:bg-gray-800' to='/cart'>
            Cart {cart.length ? `(${cart.length})` : ''}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
