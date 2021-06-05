import React, { useContext } from 'react';
import DashboardListComp from './DashboardListComp';
import { useI18n } from '../../../../shared/context/i18nContext';
import AppStateContext from '../../../../shared/context/AppStateContext';
import OrderDetailStrip from '../../../OrderComp/OrderListComp/OrderDetailStrip';

const DashboardUserOrdersComp = ({
  orderDetails, UserOrdersdashboardImageHeight, productId, UserOrdersdashboardImageWidth,
}) => {
  const { user } = useContext(AppStateContext);
  const { _common: { _labels } } = useI18n();
  return (
    <>
      {
        (!user.isAdmin() && !user.isVendor())
        && (
          <div className="card ab shadow card-border UserOrderDashboardHeight">
            <div className="card-header bg-dark text-white card-header-border UserOrderDashboardPadding">

              <div className="row ml-2 dashboardheaderheight">
                <span>{_labels.latestOrders()}</span>
              </div>
            </div>
            <div className="card-body overflow-auto UserOrderDashboardScrollBar">
              {
                orderDetails && orderDetails.length ? orderDetails.map((detail) => (
                  <div>

                    <OrderDetailStrip
                      orderDate={detail.created_at}
                      orderCode={detail.id}
                      details={detail.orderDetail}
                    />
                    <div className="col-sm-12">
                      <DashboardListComp
                        productId={productId}
                        UserOrdersdashboardImageWidth={UserOrdersdashboardImageWidth}
                        UserOrdersdashboardImageHeight={UserOrdersdashboardImageHeight}
                        orderDetails={detail.orderDetail}
                      />

                    </div>
                  </div>
                ))
                  : <h2 className="text-center mt-5">There are no orders in this page</h2>
              }
            </div>
          </div>
        )
      }
    </>
  );
};

export default DashboardUserOrdersComp;
