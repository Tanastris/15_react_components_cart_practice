import { v4 as genId } from 'uuid';
import { useState } from 'react';
import CartItem from '../components/cart/CartItem';
import { useCartCtx } from '../store/CartProvider';
import { makePrice } from '../helper';
import Button from '../UI/Button';

const cartObj = {
  cItemId: genId(),
  prodId: 1,
  title: 'Iphone',
  qty: 1,
  priceUnit: 799,
  img: 'blabla.jpg',
  priceTotal: 799,
};
export default function CartPage() {
  const { remove, cart } = useCartCtx();

  const totalItems = () => {
    let count = 0;
    cart.forEach((cObj) => {
      console.log('cObj.qty ===', cObj.qty);
      count += cObj.qty;
    });
    // reduce
    console.log('count ===', count);
    return count;
  };

  const totalItem2 = cart.reduce((total, cObj) => total + cObj.qty, 0);
  console.log('totalItem2 ===', totalItem2);

  const totalPrice = cart.map((cObj) => cObj.priceTotal).reduce((total, suma) => total + suma, 0);

  const totals = cart.reduce(
    (totalObj, cObj) => {
      totalObj.totalCount += cObj.qty;
      totalObj.totalSum += cObj.priceTotal;
      return totalObj;
    },
    { totalCount: 0, totalSum: 0 },
  );
  console.log('totals ===', totals);

  console.log('totalPrice ===', totalPrice);
  return (
    <div className='container'>
      <h1 className='about-heading text-4xl font-bold text-center mt-10'>CartPage</h1>
      <p className='text-lg text-center mt-4'>Thank for buying</p>

      {cart.length > 0 && (
        <ul className='my-10'>
          <li className='mb-5'>
            <div className='grid grid-cols-5'>
              <h3 className='uppercase text-xl'>Product Image</h3>
              <h3 className='uppercase text-xl'>Product</h3>
              <h3 className='uppercase text-xl'>Quantity</h3>
              <h3 className='uppercase text-xl'>Price</h3>
              <h3 className='uppercase text-xl'>Total</h3>
            </div>
          </li>
          {cart.map((cObj) => (
            <li key={cObj.cItemId}>
              <CartItem onRemove={remove} item={cObj} />
            </li>
          ))}
          <li className='mb-5'>
            <div className='grid grid-cols-5'>
              <h3 className='font-semibold text-lg'></h3>
              <h3 className='font-semibold text-lg'></h3>
              <h3 className='font-semibold text-lg'>Total items: {totalItem2}</h3>
              <h3 className='font-semibold text-lg'></h3>
              <h3 className='font-semibold text-lg'>Total Price: {makePrice(totalPrice)}</h3>
            </div>
          </li>
        </ul>
      )}

      {cart.length > 0 && (
        <div className='bg-slate-200 p-5  inline-block'>
          <h3 className='uppercase text-xl'>Checkout</h3>
          <div className='border-b border-slate-900 my-4' />
          <div className='grid grid-cols-2 gap-10 mb-9'>
            <p>Total items: {totalItem2}</p>
            <p>Total price: {makePrice(totalPrice)}</p>
          </div>
          <Button>Checkout</Button>
        </div>
      )}
    </div>
  );
}
