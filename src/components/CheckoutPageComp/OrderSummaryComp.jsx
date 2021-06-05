import React, { useContext } from 'react';
import AppStateContext from '../../shared/context/AppStateContext';
import currency from '../../base/utils/currency';

const OrderSummaryComp = () => {
  const { Cart } = useContext(AppStateContext);
  return (
    <div className="col-lg-4">
      <div className="order-summary">
        <h3>Summary</h3>

        <h4>
          <a
            data-toggle="collapse"
            href="#order-cart-section"
            className=""
            role="button"
            aria-expanded="true"
            aria-controls="order-cart-section"
          >
            {Cart.Cart.totalItems}

            products in Cart
          </a>
        </h4>

        <div className="collapse show" id="order-cart-section">
          <table className="table table-mini-cart">
            <tbody>
              {Cart.Cart.items.map((item) => (
                <tr key={item.id}>
                  <td className="product-col">
                    <figure className="product-image-container">
                      <a href="product" className="product-image">
                        <img src={item.img} alt="product" />
                      </a>
                    </figure>
                    <div>
                      <h2 className="product-title">
                        <a href="product">{item.title}</a>
                      </h2>

                      <span className="product-qty">
                        Qty:
                        {item.qty}
                      </span>
                    </div>
                  </td>
                  <td className="price-col">{currency.turkishLira() + item.qty * item.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td><b>Total Amount:</b></td>
                <td><b>{currency.turkishLira() + Cart.Cart.totalAmount}</b></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
export default OrderSummaryComp;
