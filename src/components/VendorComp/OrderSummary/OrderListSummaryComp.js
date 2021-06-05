import React from 'react';
import { useI18n } from '../../../shared/context/i18nContext';

function OrderListSummaryComp({
  newOrders, processing, shipped, cancelled,
}) {
  const { _orderListSummary } = useI18n();
  return (
    <div className="container">
      <div className="card">
        <div className="card-header bg-dark text-white">{_orderListSummary.orderListSummary()}</div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-3 p-5 d-flex justify-content-center flex-column text-center">
              {_orderListSummary.newOrder()}
              <h4 className="text-info">{ newOrders || 0}</h4>
            </div>
            <div className="col-lg-3 border-left p-5 d-flex justify-content-center flex-column text-center">
              {_orderListSummary.processing()}
              <h4 className="text-info">{ processing || 0}</h4>
            </div>
            <div className="col-lg-3 border-left p-5 d-flex justify-content-center flex-column text-center">
              {_orderListSummary.shipped()}
              <h4 className="text-info">{ shipped || 0}</h4>
            </div>
            <div className="col-lg-3 border-left p-5 d-flex justify-content-center flex-column text-center">
              {_orderListSummary.cancelled()}
              <h4 className="text-info">{ cancelled || 0}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderListSummaryComp;
