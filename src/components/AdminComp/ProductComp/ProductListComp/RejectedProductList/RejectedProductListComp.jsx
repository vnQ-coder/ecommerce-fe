import React from 'react';
import { useI18n } from '../../../../../shared/context/i18nContext';
import RejectedProductListItemComp from './RejectedProductListItems/RejectedProductListItemComp';

const RejectedProductListComp = ({ rejectedProducts , title }) => {
  const {
    _common,
    _common: { _labels },
    _productPage,
  } = useI18n();
  
  return (
    <div>
      <table className="table table-cart">
        <thead>
          <tr>
            <th>{_labels.image()}</th>
            <th>{_labels.title()}</th>
            <th>{_common.price()}</th>
            <th>{ title === "rejectedProducts" ? _labels.reason() : _labels.description() }</th>
          </tr>
        </thead>
        <tbody>
          {rejectedProducts && rejectedProducts.length ? (
            rejectedProducts.map((rejectedProduct) => (
              <RejectedProductListItemComp
                key={rejectedProduct.id}
                id={rejectedProduct.id}
                images={rejectedProduct.image}
                price={rejectedProduct.price}
                title={rejectedProduct.title}
                rejectReason={title === "rejectedProducts" ? rejectedProduct.rejectReason : rejectedProduct.description}
              />
            ))
          ) : (
            <tr className="text-center">
              <td colSpan="4">{title === "rejectedProducts" ? _productPage.noRejectedProducts() : _productPage.noPendingProducts()}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RejectedProductListComp;
