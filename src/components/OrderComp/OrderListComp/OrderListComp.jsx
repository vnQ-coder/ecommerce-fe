import React from 'react';
import OrderItemListComp from './OrderItemListComp';
import { useI18n } from '../../../shared/context/i18nContext';

const OrderListComp = ({ details, userId, onItemSelectedHandler }) => {
  const { _common: { _labels } } = useI18n();
  return (

    <div className="row pb-4 ml-2">
      {
        details && details.map(
          (detail, index) => (
            <OrderItemListComp
              dashbaordImagedHeight={false}
              UserOrdersdashboardfigureWidth
              key={index}
              src={detail.image}
              storeName={detail.storeName}
              title={detail.title}
              status={detail.status}
              qty={detail.qty}
              price={detail.price}
              cargoTitle={detail.cargoTitle}
              link={detail.link}
              userId={userId}
              shipmentNumber={detail.shipmentNumber}
              orderItemId={detail.orderItemId}
              productId={detail.productId}
              onItemSelected={onItemSelectedHandler}
            />
          ),
        )
      }

    </div>

  );
};

export default OrderListComp;
