import React from 'react';
import currency from '../../../base/utils/currency';
import { useI18n } from '../../../shared/context/i18nContext';

const OrderDetailStrip = ({ orderCode, orderDate, details }) => {
  const total = details.reduce((accum, item) => accum += item.price, 0);
  const { _common: { _labels } } = useI18n();
  return (
    <nav className="toolbox horizontal-filter">
      <div className="toolbox-left d-lg-block">
        <div className="toolbox-item flex-column">
          <span>
            {_labels.orderdate()}
            :

            <b>{new Date(orderDate).toDateString()}</b>
          </span>
          <span>
            {_labels.orderCode()}
            :

            <b>{orderCode}</b>
          </span>
        </div>
      </div>
      <div className="toolbox-item toolbox-sort ml-lg-auto">
        <span>
          {_labels.amountpaid()}
          :

          <b>{currency.turkishLira() + total}</b>
        </span>
      </div>
    </nav>
  );
};

export default OrderDetailStrip;
