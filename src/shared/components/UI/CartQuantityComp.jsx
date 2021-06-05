import React, { useContext, useEffect, useState } from 'react';
import AppStateContext from '../../context/AppStateContext';
import { useI18n } from '../../context/i18nContext';

const CartQuantityComp = ({ productDetails }) => {
  const { _common: { _labels } } = useI18n();
  const { Cart } = useContext(AppStateContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productDetails) {
      const cartItem = Cart.getItemById(productDetails.id);
      if (cartItem) {
        setQuantity(cartItem.qty);
        setIsAddedToCart(true);
      } else {
        setIsAddedToCart(false);
      }
    }
  }, [Cart, Cart.Cart, productDetails]);

  const onAddCartItemHandler = () => {
    if (!isAddedToCart) {
      const {
        id, title, price, productQty, img,
      } = productDetails;
      const product = {
        id, qty: quantity, title, price, stock: productQty, img,
      };
      setIsAddedToCart(Cart.onAddCartItem(product));
    }
  };

  const updateQuantity = (positive) => {
    if (positive) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      setQuantity((prevQuantity) => ((prevQuantity - 1 > 0) ? prevQuantity - 1 : prevQuantity));
    }
  };

  return (
    <div className={`product-action ${isAddedToCart ? 'no-pointer-event' : ''}`}>
      <div className="product-single-qty">
        <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
          <button
            type="button"
            className="cart__btn"
            onClick={() => updateQuantity(false)}
          >
            -
          </button>
          <input
            className="form-control type-field-number"
            type="number"
            min={1}
            value={quantity || ''}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            type="button"
            className="cart__btn"
            onClick={() => updateQuantity(true)}
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={onAddCartItemHandler}
        id="addToCart"
        className={!isAddedToCart ? 'btn btn-dark add-cart' : 'btn btn-success add-cart'}
        title="Add to Cart"
      >
        {!isAddedToCart ? _labels.addToCart() : _labels.addedCart()}
      </button>
    </div>
  );
};

export default CartQuantityComp;
