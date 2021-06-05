import React from 'react';
import { useI18n } from '../../../../shared/context/i18nContext';
import VendorListItemComp from './VendorListItemComp';

const VendorsListComp = ({
  vendors, check, onHandleOneApprove, onVendorSelected, onHandleSelectedApproval, onSelectAllHandler,
}) => {
  const { _common, _common: { _labels } } = useI18n();
  return (
    <div className="cart-table-container">
      <table className="table table-cart">
        <thead>
          <tr>
            <th>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="selectAll"
                  checked={check}
                  onChange={(e) => onSelectAllHandler(e.target.checked)}
                />
                <label className="custom-control-label" htmlFor="selectAll">&nbsp;</label>
                {_labels.select()}
              </div>
            </th>
            <th>{_labels.firstName()}</th>
            <th>{_labels.lastName()}</th>
            <th>{_common.email()}</th>
            <th>{_labels.approve()}</th>
          </tr>
        </thead>
        <tbody>
          {
            vendors && vendors.length
              ? vendors.map((vendor) => (
                <VendorListItemComp
                  key={vendor.id}
                  vendor={vendor}
                  onHandleOneApprove={onHandleOneApprove}
                  onVendorSelected={onVendorSelected}
                  check={check}
                />
              ))
              : (
                <tr>
                  <td colSpan="6"><h3 className="mt-2">{_labels.emptyVendorList()}</h3></td>
                </tr>
              )
          }
        </tbody>
      </table>
      {
        vendors && vendors.length
          ? (
            <button
              id="approveSelected"
              className="btn btn-dark btn-sm rounded approveButton "
              onClick={() => onHandleSelectedApproval()}
            >
              { _labels.approveSelected()}
            </button>
          )
          : <div> </div>
      }
    </div>
  );
};

export default VendorsListComp;
