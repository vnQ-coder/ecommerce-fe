import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import { useI18n } from '../../../shared/context/i18nContext';
import useApiHook from '../../../shared/hooks/useApiHook';
import {
  getProductCountByVendorId,
  getOrdersCountByVendorId,
  getUserInfoById,
  getProductOrderDetailsLimited,
} from '../../../shared/api/api';
import ProductListSummaryComp from '../../VendorComp/ProductListSummary/ProductListSummaryComp';
import OrderListSummaryComp from '../../VendorComp/OrderSummary/OrderListSummaryComp';
import AppStateContext from '../../../shared/context/AppStateContext';
import UserInfoComp from './DashboardUserInfo/UserInfoComp';
import UserInfoFormComp from './DashboardUserInfo/UserInfoFormComp';
import DashboardUserAddressComp from './DashboardUserAddress/DashboardUserAddressComp';
import DashboardUserOrdersComp from './DashboardUserOrder/DashboardUserOrdersComp';

const DashboardContentComp = () => {
  const {
    _dashboardPage,
    _common,
    _common: { _labels },
  } = useI18n();
  const productsCountRes = useApiHook({
    apiDispatchCall: getProductCountByVendorId,
  });
  const orderCountRes = useApiHook({
    apiDispatchCall: getOrdersCountByVendorId,
  });
  const userInfoRes = useApiHook({ apiDispatchCall: getUserInfoById });
  const userOrderDetailsRes = useApiHook({ apiDispatchCall: getProductOrderDetailsLimited });
  const userInfo = userInfoRes.body;
  const productCount = productsCountRes.body;
  const orderCount = orderCountRes.body;
  const userOrderDetails = userOrderDetailsRes.body;
  const { user } = useContext(AppStateContext);
  const [infoFormVisible, setInfoFormVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
  const [userRecord, setUserRecord] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  const onHandleEdit = (e) => {
    e.preventDefault();
    setInfoVisible(false);
    setInfoFormVisible(true);
  };

  console.log(orderDetails);

  const onUserRecordChange = useCallback((body) => {
    setUserRecord(body);
  }, []);

  useEffect(() => {
    setUserRecord(userInfo);
  }, [userInfo]);

  useEffect(() => {
    if (userOrderDetails) {
      setOrderDetails(userOrderDetails);
    }
  }, [userOrderDetails]);

  return (
    <div className="col-lg-12 order-lg-last dashboard-content">
      <h2 className="text-primary">{_labels.dashboard()}</h2>
      {(user.isVendor() || user.isAdmin()) && (
        <>
          <ProductListSummaryComp
            allProducts={productCount && productCount.allproducts}
            approved={productCount && productCount.approved}
            pending={productCount && productCount.pending}
            denied={productCount && productCount.denied}
          />
          <span className="mt-3" />
          <OrderListSummaryComp
            newOrders={orderCount && orderCount.neworders}
            processing={orderCount && orderCount.processing}
            shipped={orderCount && orderCount.shipping}
            cancelled={orderCount && orderCount.cancelled}
          />
        </>
      )}

      {/* <div className="alert alert-success alert-intro" role="alert">
        {_common.thankYou()} for Lorem Ipsum Lorem Ipsum Lorem Ipsum....
      </div>
      <div className="alert alert-success" role="alert">
        Lorem Ipsum <b>Lorem Ipsum</b> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
        Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum
      </div> */}
      <div className="mb-4" />
      <h3>{_common.accountInfo()}</h3>
      <div className="row row-sparse">
        <div className="col-md-6">
          {infoVisible && (
            <UserInfoComp userRecord={userRecord} onHandleEdit={onHandleEdit} />
          )}
          {infoFormVisible && (
            <UserInfoFormComp
              userInfo={userRecord}
              setInfoVisible={setInfoVisible}
              setInfoFormVisible={setInfoFormVisible}
              onUserRecordChange={onUserRecordChange}
            />
          )}
        </div>
        <div className="col-md-6"><DashboardUserOrdersComp orderDetails={userOrderDetails} /></div>
      </div>
      <DashboardUserAddressComp />
    </div>
  );
};
export default DashboardContentComp;
