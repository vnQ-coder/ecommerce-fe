import React from 'react';
import { useAlert } from 'react-alert';
import AddressDisplayButtonComp from '../AddressDisplayButtonComp';
import AddressDisplayComp from '../AddressDisplayComp';
import { deleteUserShippingAddressById } from '../../../../shared/api/api';
import useApiHook from '../../../../shared/hooks/useApiHook';
import { useI18n } from '../../../../shared/context/i18nContext';

function UserShippingAddressInfoComp({
  infoVisible, onHandleEdit, shippingAddress, index, onDeleteUserShippingAddress,
}) {
  const reqDeleteUserShippingAddress = useApiHook({ apiDispatchCall: deleteUserShippingAddressById, initiateOnLoad: false });
  const { _common: { _labels }, _dashboardPage } = useI18n();
  const alert = useAlert();
  const onHandleDelete = (shippingAddressId) => {
    reqDeleteUserShippingAddress.dispatchCall(shippingAddressId)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          alert.success(msg || _dashboardPage.shippingAddressDeleted());
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };

  return (
    <>
      {infoVisible
        && (
          <>
            <h5>

              {`${_labels.shipping()} ${index + 1}`}
            </h5>
            <div className="card card-address">
              <div className="card-body">
                <AddressDisplayComp
                  address={shippingAddress}
                />
                <AddressDisplayButtonComp
                  onHandleEdit={onHandleEdit}
                  onHandleDelete={onHandleDelete}
                  id={shippingAddress.id}
                />
              </div>
            </div>
          </>
        )}
    </>
  );
}

export default UserShippingAddressInfoComp;
