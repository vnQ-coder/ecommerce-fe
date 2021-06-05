import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

const CART_KEY = 'sag_cart';

/**
 * @typedef {{id:string,title:string|undefined,
 * price:string|undefined,qty:string|undefined,
 * img:string|undefined,stock:number|undefined }} CartItemType
 * @typedef {{totalAmount: number, totalItems: number, items: CartItemType }} CartType
 * @typedef {{totalAmount: number, totalItems: number, items: CartItemType[]}} CartItemsType
 */

const defaultCart = {
  items: {},
  totalAmount: 0,
  totalItems: 0,
};

/**
 * @param {CartItemType} item
 * @return {boolean}
 */
const isInStock = (item) => !item.stock || !((+item.qty) > item.stock);

/**
 * @param {CartItemType} cartItems
 * @return {number}
 */
const calculateCartTotal = (cartItems) => Object.keys(cartItems)
  .reduce((accum, itemId) => accum + cartItems[itemId].qty
    * cartItems[itemId].price, 0);

/**
 * @param {CartItemType} cartItem
 */
const isValidCartItem = (cartItem) => {
  const { qty, price } = cartItem;
  if (!cartItem || typeof cartItem !== 'object') return false;
  if (qty && (isNaN(+qty) || qty <= 0)) return false;
  if (price && (isNaN(+price) || price <= 0)) return false;
  return true;
};

/**
 * @return {{onRemoveCartItem: onRemoveCartItem,
 * cart:CartItemsType, onAddCartItem: function(item: CartItemType),
 * onClearCartHandler: onClearCart}}
 */
const useCartHook = () => {
  const [cart, setCart] = useState(defaultCart);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem(CART_KEY)) || defaultCart);
  }, []);

  /**
   * @param {CartItemType} item
   */
  const onAddCartItem = useCallback((item) => {
    let isAddedToCart = false;
    if (isValidCartItem(item)) {
      setCart(
        /**
         * @param {CartType} prevCartState
         * @return {CartType}
         */
        (prevCartState) => {
          let cartItem = null; // hold updated cart item value
          const {
            id, qty, title, price, img, stock,
          } = item; // user provided product
          const existingItem = prevCartState.items[id]; // getting existing product from cart if exist
          if (existingItem) {
            const newQty = qty || (existingItem.qty + 1);
            cartItem = { ...existingItem, qty: +newQty };
          } else {
            cartItem = {
              qty: +(qty || 1), title, img, price: +price, stock,
            };
          }
          if (isInStock(cartItem)) {
            const updatedCart = {
              ...prevCartState,
              items: { ...prevCartState.items, [id]: cartItem },
            };
            updatedCart.totalItems = Object.keys(updatedCart.items).length;
            updatedCart.totalAmount = calculateCartTotal(updatedCart.items);
            localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
            isAddedToCart = true;
            return updatedCart;
          }
          alert(`Available in stock only ${cartItem.stock} items`);
          isAddedToCart = false;
          return prevCartState;
        },
      );
    } else {
      alert('Invalid cart item');
    }
    return isAddedToCart;
  }, [setCart]);

  /**
   *
   * @param {string} id
   * @return
   */
  const onRemoveCartItem = useCallback((id) => {
    if (id) {
      setCart(
        /**
         * @param {CartType} prevCartState
         * @return {CartType}
         */
        (prevCartState) => {
          const existingItem = prevCartState.items[id];
          if (existingItem) {
            const updatedItems = { ...prevCartState.items };
            delete updatedItems[id];
            const updatedCart = {
              items: updatedItems,
              totalAmount: calculateCartTotal(updatedItems),
              totalItems: Object.keys(updatedItems).length,
            };
            localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
            return updatedCart;
          }
        },
      );
    }
  }, [setCart]);

  const onClearCart = useCallback(() => {
    setCart(defaultCart);
    localStorage.setItem(CART_KEY, null);
  }, [setCart]);

  /**
   *
   * @return {CartItemType[]}
   */
  const Cart = useMemo(() => ({
    ...cart,
    items: Object.keys(cart.items).map((id) => ({
      id, ...cart.items[id],
    })),
  }), [cart]);

  const getItemById = useCallback((id) => cart.items[id], [cart]);

  return {
    Cart,
    onAddCartItem,
    onRemoveCartItem,
    onClearCart,
    getItemById,
  };
};

export default useCartHook;
