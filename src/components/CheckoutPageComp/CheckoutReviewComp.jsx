import React from 'react';

const CheckoutReviewComp = ({ onClickPlaceOrder }) => (
  <div className="col-lg-8 order-lg-first padding-right-lg">
    <div className="checkout-payment">
      <h2 className="step-title">Credit Card Info:</h2>
      <div id="new-checkout-address" className="show">
        <form action="#">
          <div className="form-group required-field">
            <label>Card No:</label>
            <input id="cardNo" type="text" className="form-control" required />
          </div>
        </form>
      </div>
      <div className="clearfix">
        <button className="btn btn-primary float-right" id="placeOrder" onClick={onClickPlaceOrder}>Place Order</button>
      </div>
    </div>
  </div>
);
export default CheckoutReviewComp;
