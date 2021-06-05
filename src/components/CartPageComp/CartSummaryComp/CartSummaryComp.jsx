import React, { useContext } from 'react';
import AppStateContext from '../../../shared/context/AppStateContext';
import currency from '../../../base/utils/currency';
import { useI18n } from '../../../shared/context/i18nContext';

const CartSummaryComp = () => {
  const { Cart } = useContext(AppStateContext);
  const { _common: { _labels } } = useI18n();

  return (
    <div className="col-lg-4">
      <div className="cart-summary">
        <h3>{_labels.summary()}</h3>
        {/* <h4>
          <a data-toggle="collapse" href="#total-estimate-section" className="collapsed" role="button"
            aria-expanded="false" aria-controls="total-estimate-section">{_labels.estimate()}</a>
        </h4> */}
        <div className="collapse" id="total-estimate-section">
          <form action="#">
            <div className="form-group form-group-sm">
              <label>Country</label>
              <div className="select-custom">
                <select className="form-control form-control-sm">
                  <option value="USA">United States</option>
                  <option value="Turkey">Turkey</option>
                  <option value="China">China</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>

            </div>
            <div className="form-group form-group-sm">
              <label>State/Province</label>
              <div className="select-custom">
                <select className="form-control form-control-sm">
                  <option value="CA">California</option>
                  <option value="TX">Texas</option>
                </select>
              </div>
            </div>
            <div className="form-group form-group-sm">
              <label>Zip/Postal Code</label>
              <input type="text" className="form-control form-control-sm" />
            </div>
            <div className="form-group form-group-custom-control">
              <label>Flat Way</label>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="flat-rate" />
                <label className="custom-control-label" htmlFor="flat-rate">Fixed $5.00</label>
              </div>
            </div>
            <div className="form-group form-group-custom-control">
              <label>Best Rate</label>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="best-rate" />
                <label className="custom-control-label" htmlFor="best-rate">Table Rate $15.00</label>
              </div>
            </div>
          </form>
        </div>
        <table className="table table-totals">
          <tbody>
            <tr>
              <td>{_labels.subTotal()}</td>
              <td>{currency.turkishLira() + Cart.Cart.totalAmount}</td>
            </tr>
            <tr>
              <td>{_labels.tax()}</td>
              <td>$0.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>{_labels.orderTotal()}</td>
              <td>{currency.turkishLira() + Cart.Cart.totalAmount}</td>
            </tr>
          </tfoot>
        </table>
        <div className="checkout-methods">
          <a href="/checkout" className="btn btn-block btn-sm btn-primary rounded">{_labels.checkout()}</a>
        </div>
      </div>
    </div>
  );
};
export default CartSummaryComp;
