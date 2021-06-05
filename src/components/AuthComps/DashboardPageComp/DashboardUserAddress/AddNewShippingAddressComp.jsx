import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import AddressFormComp from '../AddressFormComp';
import useApiHook from '../../../../shared/hooks/useApiHook';
import { addUserShippingAddress } from '../../../../shared/api/api';
import { useI18n } from '../../../../shared/context/i18nContext';
import useFormStateHook from '../../../../shared/hooks/useFormStateHook';

function AddNewShippingAddressComp({ setInfoShippingVisible, setInfoShippingFormVisible, onNewUserShippingAddressAdd }) {
  const { _common: { _labels } } = useI18n();
  const reqAddUserShippingAddress = useApiHook({ apiDispatchCall: addUserShippingAddress, initiateOnLoad: false });
  const [respMsg, setRespMsg] = useState({ error: false, msg: '' });
  const alert = useAlert();
  const { formState, onUpdateState, onClearState } = useFormStateHook({
    city: '',
    state: '',
    country: '',
    address: '',
    zip: '',
    phone: '',
    type: 'shipping',
  });
  const onHandleAddFormSubmit = (e) => {
    e.preventDefault();
    reqAddUserShippingAddress.dispatchCall(formState)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          onNewUserShippingAddressAdd(body.shippingAddress);
          onClearState();
          setInfoShippingFormVisible(false);
          setInfoShippingVisible(true);
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          onClearState();
          setInfoShippingFormVisible(false);
          setInfoShippingVisible(true);
          alert.error(msg);
        }
      });
  };
  return (
    <div className="card shadow card-border">
      <div className="card-header bg-dark text-white card-header-border">
        Add New Shipping Address
      </div>
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
      <div className={`cst-form-${respMsg.error ? 'error' : 'success'}`}>{respMsg.msg}</div>
      <div className="card-footer">
        <div className="d-flex justify-content-center">
          <input
            type="submit"
            className="btn btn-sm btn-dark rounded"
            value={_labels.addNew()}
            onClick={onHandleAddFormSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default AddNewShippingAddressComp;
