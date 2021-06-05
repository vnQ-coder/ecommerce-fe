import React, { useContext } from 'react';
import AppStateContext from '../../shared/context/AppStateContext';

function ChangeOrderStatus({
  orderStatusHandler, onClickApplyChangeHandler, products, orderDetails,
}) {
  const { user } = useContext(AppStateContext);

  return (
    <>
      {
        (user.isVendor() || user.isAdmin())
        && (
        <div className="row mb-2">

          <div className="col-lg-12">
            <div className=" change-status-body">
              <select
                name="status"
                className="dropdown-changeStatus"
                onChange={orderStatusHandler}
              >
                <option value="shipped">Shipped</option>
                <option value="cancelled">Canceled</option>
                <option value="dispute">Dispute</option>
                <option value="refund">Refund</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
              </select>

              <button
                className="btn btn-dark btn-sm rounded"
                onClick={onClickApplyChangeHandler}
              >
                Apply Change
              </button>
            </div>
          </div>
        </div>
        )
      }
    </>

  );
}

export default ChangeOrderStatus;
