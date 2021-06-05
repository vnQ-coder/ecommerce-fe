import React, { useContext, useState } from 'react';
import { render } from 'react-dom';
import {
  Provider as AlertProvider, useAlert,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import useApiHook from '../../shared/hooks/useApiHook';
import useFormStateHook from '../../shared/hooks/useFormStateHook';
import LayoutComp from '../../shared/components/LayoutComp';
import AddressModelComp from './AddressModelComp';
import OrderSummaryComp from './OrderSummaryComp';
import CheckoutReviewComp from './CheckoutReviewComp';
import CheckoutShippingAddressComp from './CheckoutShippingAddressComp';
import { addUserShippingAddress, getUserAddress, postPlaceOrder } from '../../shared/api/api';
import AppStateContext from '../../shared/context/AppStateContext';
import RenderIfAuthenticated from '../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';

const CheckoutWrapperComp = ({ reqUserAddress }) => {
  const { Cart } = useContext(AppStateContext);
  const shippingAddressState = useFormStateHook();
  const [currentIdx, setCurrentIdx] = useState(0);
  const reqAddUserShippingAddress = useApiHook({ apiDispatchCall: addUserShippingAddress, initiateOnLoad: false });
  const reqPlaceOrder = useApiHook({ apiDispatchCall: postPlaceOrder, initiateOnLoad: false });
  const shippingAddressId = useState(null);
  const alert = useAlert();

  const onToggleViews = () => {
    setCurrentIdx((prevIdx) => (prevIdx === 0 ? 1 : 0));
  };

  const onAddNewAddressHandler = (address) => {
    reqAddUserShippingAddress.dispatchCall(address)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          reqUserAddress.setBody((prevState) => ({
            ...(prevState || {}),
            shippingAddress: [...(prevState.shippingAddress || []), body],
          }));
          shippingAddressState.onClearState();
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };

  const onClickPlaceOrderHandler = () => {
    const orders = Cart.Cart.items.map(({ id, qty }) => ({ id, qty }));
    const orderState = {
      cartItems: orders,
      shippingAddressId: shippingAddressId[0],
    };

    reqPlaceOrder.dispatchCall(orderState)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          Cart.onClearCart();
          setTimeout(() => {
            window.location.replace('/');
          }, 1000);
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };

  return (
    <>
      <main className="main">
        {/* <BreadCrumbComp /> */}
        <div className="page-header">
          <div className="container">
            <h1>CHECKOUT</h1>
          </div>
        </div>
        <div className="container">
          <ul className="checkout-progress-bar">
            <li className={currentIdx === 0 ? 'active' : ''}>
              <span>Shipping</span>
            </li>
            <li className={currentIdx === 1 ? 'active' : ''}>
              <span>Review &amp; Payments</span>
            </li>
          </ul>
          <div className="row row-sparse">
            {currentIdx === 0
              && <CheckoutShippingAddressComp addresses={reqUserAddress.body || {}} shippingAddressId={shippingAddressId} />}
            {currentIdx === 1 && <CheckoutReviewComp onClickPlaceOrder={onClickPlaceOrderHandler} />}
            <OrderSummaryComp />
          </div>
          <div className="row row-sparse">
            <div className="col-lg-8">
              <div className="checkout-steps-action">
                <button className="btn btn-primary float-right" id="next" onClick={onToggleViews}>
                  {currentIdx === 0 ? 'NEXT' : 'BACK'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10" />
      </main>
      <AddressModelComp
        id="shipping-address-modal"
        title="Shipping Address"
        addressState={shippingAddressState}
        onSubmit={onAddNewAddressHandler}
      />
    </>
  );
};
const CheckoutPageComp = () => {
  const reqUserAddress = useApiHook({ apiDispatchCall: getUserAddress });

  return (
    <AlertProvider template={AlertTemplate}>
      <LayoutComp waitFor={reqUserAddress}>
        <RenderIfAuthenticated>
          <CheckoutWrapperComp reqUserAddress={reqUserAddress} />
        </RenderIfAuthenticated>
      </LayoutComp>
    </AlertProvider>
  );
};

render(<CheckoutPageComp />, document.getElementById('react-container'));
