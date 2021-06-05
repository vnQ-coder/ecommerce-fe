import React from 'react';
import { useI18n } from '../context/i18nContext';

const CartModelComp = () => {
  const { _common, _cart } = useI18n();

  return (
    <div
      className="modal fade"
      id="addCartModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="addCartModal"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body add-cart-box text-center">
            <p dangerouslySetInnerHTML={{ __html: _cart.addedProductToCart() }} />
            <h4 id="productTitle"> </h4>
            <img src="#" id="productImage" width="100" height="100" alt="adding cart image" />
            <div className="btn-actions">
              <a href="cart">
                <button className="btn-primary">{_cart.goToCartPage()}</button>
              </a>
              <a href="# ">
                <button className="btn-primary" data-dismiss="modal">{_common.continue()}</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartModelComp;
