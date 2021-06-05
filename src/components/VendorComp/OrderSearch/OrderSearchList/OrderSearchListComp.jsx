import React, { useContext } from 'react';
import { buildPathToImage } from '../../../../base/utils/string';
import { useI18n } from '../../../../shared/context/i18nContext';
import AppStateContext from '../../../../shared/context/AppStateContext';

function OrderSearchListComp({ results, noResults }) {
  const { _common: { _labels } } = useI18n();
  const { user } = useContext(AppStateContext);

  return (
    <div className="container">
      <table className="shadow table table-lg table-bordered table-responsive-lg
      table-responsive-md table-responsive-sm table-responsive-xs text-center"
      >
        <thead>
          <tr className="bg-dark text-white">
            <th className="p-4">{_labels.image()}</th>
            <th className="p-4">{_labels.productName()}</th>
            <th className="p-4">{_labels.price()}</th>
            <th className="p-4">{_labels.quantity()}</th>
            <th className="p-4">{_labels.totalPrice()}</th>
            <th className="p-4">Delivery Acknowledged/Silent Since 7 days</th>
            <th className="p-4">Commission Amount</th>
            <th className={user.isAdmin() ? 'd-none' : 'p-4'}>{_labels.customerName()}</th>
            <th className={user.isVendor() ? 'd-none' : 'p-4'}>Store Name</th>
            <th className="p-4">{_labels.orderStatus()}</th>

          </tr>
        </thead>
        <tbody>
          {
            !noResults ? results.map((r) => (

              <tr key={r.orderItemId}>
                <td className="d-flex justify-content-center">
                  <img
                    src={buildPathToImage(r.image)}
                    alt={r.productTitle}
                    style={{
                      height: '150px',
                      width: '150px',
                    }}
                  />
                </td>
                <td className="cell-padding-search-product">{r.productTitle}</td>
                <td className="cell-padding-search-product">{r.productPrice}</td>
                <td className="cell-padding-search-product">{r.productQty}</td>
                <td className="cell-padding-search-product">{r.productPrice * r.productQty}</td>
                <td className="cell-padding-search-product">
                  {r.commissionStatus || 'not Yet'}

                </td>
                <td className="cell-padding-search-product">{r.commissionAmount || 0}</td>
                <td className={user.isAdmin() ? 'd-none' : 'cell-padding-search-product'}>{r.customerName}</td>
                <td className={user.isVendor() ? 'd-none' : 'cell-padding-search-product'}>{r.username}</td>
                <td className="cell-padding-search-product">{r.orderStatus}</td>
              </tr>

            ))
              : (
                <tr>
                  <td colSpan={10} className="p-5"><h4 className="text-center">{noResults}</h4></td>
                </tr>
              )

          }
        </tbody>

      </table>
    </div>
  );
}

export default OrderSearchListComp;
