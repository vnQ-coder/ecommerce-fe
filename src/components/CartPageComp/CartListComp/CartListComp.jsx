import React, { Fragment, useContext } from 'react';
import { useI18n } from '../../../shared/context/i18nContext';
import AppStateContext from '../../../shared/context/AppStateContext';

const CartListComp = () => {
  const { _common, _shoppingCartPage } = useI18n();
  const { Cart } = useContext(AppStateContext);

  return (
    <div className="col-lg-8 padding-right-lg">
      <div className="cart-table-container">
        <table className="table table-cart">
          <thead>
            <tr>
              <th className="product-col">{_common.product()}</th>
              <th className="price-col">{_common.price()}</th>
              <th className="qty-col">{_common.qty()}</th>
              <th>{_common.subtotal()}</th>
            </tr>
          </thead>
          <tbody>
            {
              Cart.Cart.items.map((item) => (
                <Fragment key={item.id}>
                  <tr className="product-row">
                    <td className="product-col">
                      <figure className="product-image-container">

                        <a href={`product?productId=${item.id}`} className="product-image">
                          <img src={item.img} alt="product" />
                        </a>
                      </figure>
                      <h2 className="product-title">
                        <a href={`product?productId=${item.id}`}>{item.title}</a>
                      </h2>
                    </td>
                    <td>{item.price}</td>
                    <td>
                      <input
                        className="form-control cart-qty-input"
                        type="number"
                        value={item.qty}
                        min={1}
                        name="quantity"
                        onChange={(e) => Cart.onAddCartItem({ ...item, qty: e.target.value })}
                      />
                      <span className="input-group-btn-vertical" />
                    </td>
                    <td>{item.price * item.qty}</td>
                  </tr>
                  <tr className="product-action-row">
                    <td colSpan="4" className="clearfix">
                      <div className="float-right">
                        <button
                          className="btn btn-sm btn-remove icon-cancel rounded"
                          title="Remove Product"
                          onClick={(e) => Cart.onRemoveCartItem(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                </Fragment>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="clearfix">
                <div className="float-left">
                  <a href="" className="btn btn-outline-secondary btn-sm rounded">{_shoppingCartPage.continueShopping()}</a>
                </div>
                <div className="float-right">
                  <button
                    className="btn btn-outline-secondary btn-sm  btn-clear-cart rounded"
                    onClick={() => { Cart.onClearCart(); }}
                  >
                    {_shoppingCartPage.clearCart()}
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>

      </div>
      {/* <div className="cart-discount">
        <h4>{_shoppingCartPage.applyDiscountCode()}</h4>
        <form action="#">
          <div className="input-group">
            <input type="text" className="form-control form-control-sm"
              placeholder={_shoppingCartPage.enterDiscountCode()} required="" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary rounded" type="submit">{_shoppingCartPage.applyDiscount()}</button>
            </div>
          </div>
        </form>
      </div> */}
    </div>
  );
};
export default CartListComp;
