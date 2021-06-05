import React from 'react';
import { useI18n } from '../../../../shared/context/i18nContext';

const VendorListItemComp = ({
  vendor, onHandleOneApprove, onVendorSelected, check,
}) => {
  const { id } = vendor;
  const { _common: { _labels } } = useI18n();
  return (
    <tr className="product-row">
      <td>
        {check === true
          ? (
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id={id}
                checked={check}
                onChange={(e) => onVendorSelected(e.target.checked, id)}
              />
              <label className="custom-control-label" htmlFor={id}>&nbsp;</label>
            </div>
          )
          : (
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id={id}
                onChange={(e) => onVendorSelected(e.target.checked, id)}
              />
              <label className="custom-control-label" htmlFor={id}>&nbsp;</label>
            </div>
          )}
      </td>
      <td>{vendor.firstName}</td>
      <td>{vendor.lastName}</td>
      <td>{vendor.email}</td>
      <td>
        <button type="button" className="btn btn-dark btn-sm rounded" onClick={() => onHandleOneApprove(id)}>

          {_labels.approve()}
        </button>
      </td>
    </tr>
  );
};

export default VendorListItemComp;
