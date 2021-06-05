import React from 'react';
import OrderItemsComp from '../../../OrderComp/OrderListComp/OrderItemsComp';

const DashboardListComp = ({ orderDetails }) => (
  <div className="row pb-4 ml-2">
    {
      orderDetails && orderDetails.map(
        (detail, index) => (
          <OrderItemsComp
            key={index}
            src={detail.image}
            storeName={detail.storeName}
            title={detail.title}
            status={detail.status}
            qty={detail.qty}
            price={detail.price}
            UserOrdersdashboardImageWidth
            UserOrdersdashboardImageHeight
            productId={detail.productId}
          />
        ),
      )
    }

  </div>
);

export default DashboardListComp;
