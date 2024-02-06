import { Link } from 'react-router-dom';
import Button from '../../UI/Button';
import { PiShoppingCartThin } from 'react-icons/pi';
import { FaBookReader } from 'react-icons/fa';
import { makePrice } from '../../helper';

const itemType = {
  id: 30,
  title: 'Key Holder',
  description: 'Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality',
  price: 30,
  discountPercentage: 2.92,
  rating: 4.92,
  stock: 54,
  brand: 'Golden',
  category: 'home-decoration',
  thumbnail: 'https://cdn.dummyjson.com/product-images/30/thumbnail.jpg',
  images: [
    'https://cdn.dummyjson.com/product-images/30/1.jpg',
    'https://cdn.dummyjson.com/product-images/30/2.jpg',
    'https://cdn.dummyjson.com/product-images/30/3.jpg',
    'https://cdn.dummyjson.com/product-images/30/thumbnail.jpg',
  ],
};

export default function ShopListItem({ item, onAddToCart }) {
  // console.log('JSON.stringify(item) ===', JSON.stringify(item));
  return (
    <div className='pt-0 pb-10 px-4 border flex flex-col '>
      <Link className='flex items-center justify-center mt-5 ' to={`/shop/${item.id}`}>
        <img
          className='h-48 w-48 py-9 object-cover self-center'
          src={item.thumbnail}
          alt={item.title}
        />
      </Link>
      <div className='text-sm text-slate-700'>
        <h3 className=''>{item.title}</h3>
        <p className='text-gray-400 my-3'>{makePrice(item.price)}</p>
        <p>
          Category: <span className='font-semibold'>{item.category}</span>
        </p>
        {/* eina SingleItemPage  */}
        <div className='flex gap-2 mt-5 place-items-start'>
          <Link className=' inline-block' to={`/shop/${item.id}`}>
            <Button className='inline-flex'>
              <FaBookReader className='mr-2' size={'20px'} /> Read more
            </Button>
          </Link>
          <Button onClick={() => onAddToCart(item.id)} className='inline-flex' outline>
            <span>Add to</span> <PiShoppingCartThin className='ml-2' size={'20px'} />
          </Button>
        </div>
      </div>
    </div>
  );
}
