import React, { useState } from 'react';
import { render } from 'react-dom';
import { Provider as AlertProvider, useAlert } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LayoutComp from '../../shared/components/LayoutComp';
import OrderListComp from './OrderListComp/OrderListComp';
import OrderDetailStrip from './OrderListComp/OrderDetailStrip';

import useApiHook from '../../shared/hooks/useApiHook';
import {
  getAllProducts,
  getProductOrderDetails,
  updateCargoDetail,
} from '../../shared/api/api';
import ChangeOrderStatus from './ChangeOrderStatus';
import { useI18n } from '../../shared/context/i18nContext';
import RenderIfAuthenticated from '../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';
import BreadCrumbComp from '../../shared/components/BreadCrumbComp';

const OrderPageComp = () => {
  const {
    _common, _common: { _labels }, _productPage, header: { _menuItems }, _userOrdersPage,
  } = useI18n();
  const alert = useAlert();

  const reqUpdateCargo = useApiHook({ apiDispatchCall: updateCargoDetail, initiateOnLoad: false });
  const orderDetailsRes = useApiHook({ apiDispatchCall: getProductOrderDetails });
  const orderDetails = orderDetailsRes.body;
  const [orderStatus, setOrderStatus] = useState({
    products: [],
    status: 'shipped',
    cargoDetails: [],
  });

  const onItemSelectedHandler = (isChecked, id, cargoDetail) => {
    if (isChecked) {
      const checkId = orderStatus.products.filter((product) => product === id);
      if (checkId.length) { } else {
        setOrderStatus({
          ...orderStatus,
          products: [...orderStatus.products, id],
          cargoDetails: [...orderStatus.cargoDetails, cargoDetail],
        });
      }
    } else {
      alert.error(_userOrdersPage.itemNotSelected());
    }
  };

  const orderStatusHandler = (e) => {
    setOrderStatus({ ...orderStatus, status: e.target.value });
  };

  const onClickApplyChangeHandler = () => {
    if (orderStatus.products.length && orderStatus.cargoDetails.length) {
      reqUpdateCargo.dispatchCall(orderStatus)
        .then(({ isSuccessResponse, body }) => {
          const msg = body.message;
          if (isSuccessResponse) {
            setOrderStatus({
              products: [],
              status: '',
              cargoDetails: [],
            });
            alert.success(msg);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
          if (!isSuccessResponse) {
            alert.error(msg);
          }
        });
    } else {
      alert.error(_userOrdersPage.selectItem());
    }
  };

  return (
    <>
      <BreadCrumbComp items={[
        { text: _menuItems.admin() },
        { text: _menuItems.userOrders() },
        { text: _menuItems.userOrders() },
      ]}
      />

      <main className="main">
        {
          orderDetails && orderDetails.length ? orderDetails.map((detail) => (

            <div
              key={detail.id}
            >
              <OrderDetailStrip
                orderDate={detail.created_at}
                orderCode={detail.id}
                details={detail.orderDetail}
              />
              <OrderListComp
                details={detail.orderDetail}
                userId={detail.userId}
                onItemSelectedHandler={onItemSelectedHandler}
              />
            </div>
          ))
            : <h2 className="text-center mt-5">{_userOrdersPage.noOrders()}</h2>
        }
        <ChangeOrderStatus
          orderStatusHandler={orderStatusHandler}
          onClickApplyChangeHandler={onClickApplyChangeHandler}
          products={orderStatus.products}
          cargoDetails={orderStatus.cargoDetails}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </main>
    </>
  );
};

const OrderListWrapperPageComp = () => {
  const reqProductsList = useApiHook({ apiDispatchCall: getAllProducts });

  return (
    <AlertProvider template={AlertTemplate}>
      <LayoutComp waitFor={reqProductsList}>
        <RenderIfAuthenticated redirectToIfUnAuth="/">
          <OrderPageComp />
        </RenderIfAuthenticated>
      </LayoutComp>
    </AlertProvider>
  );
};

render(<OrderListWrapperPageComp />, document.getElementById('react-container'));
