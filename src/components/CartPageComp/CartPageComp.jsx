import React from 'react';
import { render } from 'react-dom';
import { useI18n } from '../../shared/context/i18nContext';
import LayoutComp from '../../shared/components/LayoutComp';
import CartSummaryComp from './CartSummaryComp/CartSummaryComp';
import CartListComp from './CartListComp/CartListComp';

const CartPageComp = () => {
  const { _common } = useI18n();
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <h1>{_common.shoppingCart()}</h1>
        </div>
      </div>
      <div className="container">
        <div className="row row-sparse">
          <CartListComp />
          <CartSummaryComp />
        </div>
      </div>
    </main>
  );
};

render(<LayoutComp waitFor><CartPageComp /></LayoutComp>, document.getElementById('react-container'));
export default CartPageComp;
