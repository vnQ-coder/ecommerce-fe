import React, { useContext } from 'react';
import { useI18n } from '../context/i18nContext';
import AppStateContext from '../context/AppStateContext';
import currency from '../../base/utils/currency';

const CartComp = () => {
  const { _cart, _common } = useI18n();
  const { user, Cart } = useContext(AppStateContext);

  return (
    <div className="dropdown-menu">
      <div className="dropdownmenu-wrapper">
        <div className="dropdown-cart-header">
          <span>
            {Cart.Cart.totalItems}

            {_common.items()}
          </span>
          <a href="cart" className="float-right">{_cart.viewCart()}</a>
        </div>
        <div className="dropdown-cart-products">
          {
            Cart.Cart.items.map((item) => (
              <div className="product" key={`${item.id}`}>
                <div className="product-details">
                  <h4 className="product-title">
                    <a href={`product?productId=${item.id}`}>{item.title}</a>
                  </h4>
                  <span className="cart-product-info">
                    <span className="cart-product-qty">{item.qty}</span>

                    x
                    {item.price}
                  </span>
                </div>
                <figure className="product-image-container">
                  <a href={`product?productId=${item.id}`} className="product-image">
                    {/* TODO: This is the suspicious link which was shown on console */}
                    <img src={item.img} alt="product" width="80" height="80" />
                  </a>
                  <a
                    href="# "
                    className="btn-remove icon-cancel"
                    title="Remove Product"
                    onClick={(e) => {
                      Cart.onRemoveCartItem(item.id); e.preventDefault();
                    }}
                  />
                </figure>
              </div>
            ))
          }
        </div>
        <div className="dropdown-cart-total">
          <span>{_common.total()}</span>
          <span className="cart-total-price float-right">{currency.turkishLira() + Cart.Cart.totalAmount}</span>
        </div>
        <div id="cartAction" className="dropdown-cart-action">
          {Cart.Cart.totalItems <= 0 && <h6 className="title mb-2 text-center w-100">{_cart.yourCartIsEmpty()}</h6>}
          {Cart.Cart.totalItems > 0 && user.isLoggedIn()
            && <a href="checkout" id="checkout" className="btn btn-primary btn-block">{_common.checkout()}</a>}
          {Cart.Cart.totalItems > 0 && !user.isLoggedIn()
            && <a href="login?ref=checkout" className="btn btn-primary btn-block">{_cart.loginToCheckout()}</a>}
        </div>
      </div>
    </div>
  );
};
export default CartComp;
