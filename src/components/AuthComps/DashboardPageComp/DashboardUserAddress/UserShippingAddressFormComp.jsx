import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useI18n } from '../../../../shared/context/i18nContext';
import AddressFormComp from '../AddressFormComp';
import useFormStateHook from '../../../../shared/hooks/useFormStateHook';
import useApiHook from '../../../../shared/hooks/useApiHook';
import { updateUserShippingAddressById } from '../../../../shared/api/api';

function UserShippingAddressFormComp({
  editable, index, infoFormVisible, onUserShippingAddressChange, shippingAddress, setInfoFormVisible, setInfoVisible,
}) {
  const { _common: { _labels }, _dashboardPage } = useI18n();
  const reqUpdateUserShippingAddress = useApiHook({ apiDispatchCall: updateUserShippingAddressById, initiateOnLoad: false });
  const alert = useAlert();
  const { formState, onUpdateState, setFormState } = useFormStateHook({
    id: '',
    city: '',
    state: '',
    country: '',
    address: '',
    zip: '',
    phone: '',
    type: '',
    userId: '',
  });

  const onHandleSubmit = () => {
    reqUpdateUserShippingAddress.dispatchCall(formState)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          onUserShippingAddressChange(body);
          alert.success(msg || _dashboardPage.shippingAddressUpdated());
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
        setInfoFormVisible(false);
        setInfoVisible(true);
      });
  };

  useEffect(() => {
    setFormState(shippingAddress);
  }, [setFormState, shippingAddress]);
  return (
    <>
      { (editable === shippingAddress.id && infoFormVisible)
        && (
          <>
            <h5>{`${_labels.editShipping()} ${index + 1}`}</h5>
            <div className="card card-address">
              <div className="card-body p-5">
                <AddressFormComp
                  phone={formState.phone}
                  zip={formState.zip}
                  city={formState.city}
                  country={formState.country}
                  state={formState.state}
                  address={formState.address}
                  onUpdateState={onUpdateState}
                />
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-center">
                  <input
                    type="submit"
                    className="btn btn-sm btn-dark rounded"
                    value={_labels.updateShipping()}
                    onClick={onHandleSubmit}
                  />
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
}

export default UserShippingAddressFormComp;
