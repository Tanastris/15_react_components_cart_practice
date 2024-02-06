import { createContext, useContext, useReducer } from 'react';
import { v4 as genId } from 'uuid';

const CartContext = createContext({
  cart: [],
  add(prodObj) {},
  remove() {},
  update() {},
  updateUp(id) {},
  updateDown(id) {},
});

CartContext.displayName = 'MaCart';

const cartObj = {
  cItemId: genId(),
  prodId: 1,
  title: 'Iphone',
  qty: 1,
  priceUnit: 799,
  img: 'blabla.jpg',
  priceTotal: 799,
};

const cartReducer = (cartState, action) => {
  switch (action.type) {
    case 'ADD':
      console.log('add to cart in reducer', action.payload);
      const prodItemToAdd = action.payload;
      // ar yra karte toks obj ant kurio paspausta add to cart
      const isInCart = cartState.some((cObj) => cObj.prodId === prodItemToAdd.id);
      console.log('isInCart ===', isInCart);

      if (isInCart === true) {
        // jei jau yra toksai objektas carte - padidinti quantity ir kaina
        return cartState.map((cObj) => {
          if (cObj.prodId === prodItemToAdd.id) {
            // grazinti pakeista kopija
            return { ...cObj, qty: cObj.qty + 1, priceTotal: (cObj.qty + 1) * cObj.priceUnit };
          }
          return cObj;
        });
      } else {
        // Tokio produkto krepselyje kol kas nera tai sukuriam ir idedam
        // suformuoti objekta (cartObj)
        const madeObj = {
          cItemId: genId(),
          prodId: prodItemToAdd.id,
          title: prodItemToAdd.title,
          qty: 1,
          priceUnit: prodItemToAdd.price,
          img: prodItemToAdd.thumbnail,
          priceTotal: prodItemToAdd.price,
        };
        return [...cartState, madeObj];
      }
    case 'RM':
      const idToRemove = action.payload;
      return cartState.filter((cObj) => cObj.cItemId !== idToRemove);
    case 'UPDATE_UP':
      return cartState.map((cObj) => {
        if (cObj.cItemId === action.payload) {
          // grazinti pakeista
          return { ...cObj, qty: cObj.qty + 1, priceTotal: (cObj.qty + 1) * cObj.priceUnit };
        } else {
          return cObj;
        }
      });
    case 'UPDATE_DOWN':
      // patikrinti ar qty yra 0
      const currentQty = cartState.find((cObj) => cObj.cItemId === action.payload).qty;
      console.log('currentQty ===', currentQty);
      // jei yra tai remove
      if (currentQty === 0) {
        return cartState.filter((cObj) => cObj.cItemId !== action.payload);
      }
      return cartState.map((cObj) => {
        if (cObj.cItemId === action.payload) {
          // grazinti pakeista
          return { ...cObj, qty: cObj.qty - 1, priceTotal: (cObj.qty - 1) * cObj.priceUnit };
        } else {
          return cObj;
        }
      });
    default:
      console.warn('no action found', action);
      return cartState;
  }
};
export default function CartProvider({ children }) {
  const [cartState, dispach] = useReducer(cartReducer, []);
  const itemsInCart = cartState.length;
  console.log('itemsInCart ===', itemsInCart);
  console.table(cartState);
  const add = (prodObj) => {
    // console.log('adding to cart', prodObj);
    dispach({ type: 'ADD', payload: prodObj });
  };
  const remove = (idToRemove) => {
    console.log('removing from cart CartProvider', idToRemove);
    dispach({ type: 'RM', payload: idToRemove });
  };
  const update = (idToUpdate, direction) => {
    console.log('updateting cart CartProvider', idToUpdate);
    dispach({ type: 'UPDATE', payload: { id: idToUpdate, direcion: direction } });
  };
  // arba su dviem fn
  const updateUp = (idToUpdate) => {
    console.log('updateting cart CartProvider', idToUpdate);
    dispach({ type: 'UPDATE_UP', payload: idToUpdate });
  };
  const updateDown = (idToUpdate) => {
    console.log('UPDATE_DOWN', idToUpdate);
    dispach({ type: 'UPDATE_DOWN', payload: idToUpdate });
  };

  const cartCtxValue = {
    cart: cartState,
    add,
    remove,
    updateUp,
    updateDown,
  };
  return <CartContext.Provider value={cartCtxValue}>{children}</CartContext.Provider>;
}

export function useCartCtx() {
  return useContext(CartContext);
}
