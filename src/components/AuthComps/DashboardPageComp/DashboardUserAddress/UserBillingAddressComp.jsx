import React, { useState, useEffect, useCallback } from 'react';
import { useAlert } from 'react-alert';
import { useI18n } from '../../../../shared/context/i18nContext';
import useFormStateHook from '../../../../shared/hooks/useFormStateHook';
import AddressFormComp from '../AddressFormComp';
import useApiHook from '../../../../shared/hooks/useApiHook';
import AddressDisplayComp from '../AddressDisplayComp';
import { updateUserBillingAddressById } from '../../../../shared/api/api';

function UserBillingAddressComp({ address }) {
  const reqUpdateUserBillingAddress = useApiHook({
    apiDispatchCall: updateUserBillingAddressById,
    initiateOnLoad: false,
  });
  const [userBillingAddress, setUserBillingAddress] = useState({});
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
  const [respMsg, setRespMsg] = useState({ error: false, msg: '' });
  const [infoFormVisible, setInfoFormVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);

  const onUserBillingAddressChange = useCallback((body) => {
    setUserBillingAddress(body);
  }, []);

  useEffect(() => {
    setUserBillingAddress(address);
  }, [address]);

  useEffect(() => {
    setFormState(address);
  }, [address, setFormState]);

  const onHandleEdit = (e) => {
    e.preventDefault();
    setInfoVisible(false);
    setInfoFormVisible(true);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    reqUpdateUserBillingAddress
      .dispatchCall(formState)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          onUserBillingAddressChange(body);
          setInfoFormVisible(false);
          setInfoVisible(true);
          alert.success(msg || _dashboardPage.billingAddressUpdated());
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };

  const {
    _dashboardPage,
    _common: { _labels },
  } = useI18n();
  return (
    <>
      {infoVisible && (
        <>
          <div className="card shadow card-border">
            <div className="card-header bg-dark text-white card-header-border">
              {_dashboardPage.defaultBillingAddress()}
              <a
                id="editBillingAddress"
                href="# "
                onClick={onHandleEdit}
                className="card-edit text-white"
              >
                <i className="icon-edit" />
              </a>
            </div>
            <div className="card-body">
              <h5>{_labels.billingAddress()}</h5>
              <AddressDisplayComp address={userBillingAddress} />
            </div>
          </div>
        </>
      )}
      {infoFormVisible && (
        <form onSubmit={onHandleSubmit}>
          <div className="card shadow card-border">
            <div className="card-header bg-dark text-white card-header-border">
              {_labels.editBilling()}
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
            <div className={`cst-form-${respMsg.error ? 'error' : 'success'}`}>
              {respMsg.msg}
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center">
                <input
                  type="submit"
                  className="btn btn-sm btn-dark rounded"
                  value={_labels.updateBilling()}
                  onClick={onHandleSubmit}
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default UserBillingAddressComp;
