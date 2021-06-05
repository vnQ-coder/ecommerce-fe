import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import useApiHook from '../../../shared/hooks/useApiHook';
import useFormStateHook from '../../../shared/hooks/useFormStateHook';
import { useI18n } from '../../../shared/context/i18nContext';
import { postRegister } from '../../../shared/api/api';
import AddressModelComp from '../../CheckoutPageComp/AddressModelComp';

const RegisterComp = () => {
  const { _common: { _labels } } = useI18n();
  const billingAddressState = useFormStateHook();
  const shippingAddressState = useFormStateHook();
  const [respMsg, setRespMsg] = useState({ error: false, msg: '' });
  const { formState, onUpdateState, onClearState } = useFormStateHook({ sameAsBilling: true });
  const { dispatchCall } = useApiHook({ apiDispatchCall: postRegister, initiateOnLoad: false });
  const alert = useAlert();
  const onCheckShippingSame = (e) => {
    onUpdateState(e);
    if (e.target.checked) {
      shippingAddressState.onClearState();
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    e.persist();
    dispatchCall({
      ...formState,
      billingAddress: billingAddressState.formState,
      shippingAddress: shippingAddressState.formState,
    }).then(({ isSuccessResponse, body }) => {
      const msg = body.message;
      if (isSuccessResponse) {
        alert.success(msg);
        e.target.reset();
        onClearState();
        billingAddressState.onClearState();
        shippingAddressState.onClearState();
      }
      if (!isSuccessResponse) {
        alert.error(msg);
      }
    });
  };

  return (
    <div className="col-md-6">
      <form onSubmit={onSubmitHandler}>
        <div className="card shadow card-border">
          <div className="card-header bg-dark text-white card-header-border">{_labels.register()}</div>
          <div className="card-body p-5">

            <label htmlFor="register-firstName">
              {_labels.firstName()}

              <span className="required">*</span>
            </label>
            <input
              name="firstName"
              type="text"
              className="form-control input-field-search shadow mb-2"
              id="register-firstName"
              required
              placeholder="First Name"
              onChange={onUpdateState}
            />

            <label htmlFor="register-lastName">
              {_labels.lastName()}

              <span className="required">*</span>
            </label>
            <input
              name="lastName"
              type="text"
              className="form-control input-field-search shadow mb-2"
              id="register-lastName"
              required
              placeholder="Last Name"
              onChange={onUpdateState}
            />

            <label htmlFor="register-email">
              {_labels.emailAddress()}

              <span className="required">*</span>
            </label>
            <input
              name="email"
              type="email"
              className="form-control input-field-search shadow mb-2"
              id="register-email"
              required
              placeholder="Email Address"
              onChange={onUpdateState}
            />

            <label htmlFor="register-password">
              {_labels.password()}

              <span className="required">*</span>
            </label>
            <input
              name="password"
              type="password"
              className="form-control input-field-search shadow mb-2"
              id="register-password"
              required
              placeholder="Password"
              onChange={onUpdateState}
            />

            <div className={`cst-form-${respMsg.error ? 'error' : 'success'}`}>{respMsg.msg}</div>
            <div className="form-group-custom-control">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  name="sameAsBilling"
                  checked={formState.sameAsBilling}
                  onChange={onCheckShippingSame}
                  className="custom-control-input"
                  id="change-bill-address"
                />
                <label className="custom-control-label" htmlFor="change-bill-address">
                  {_labels.billingShippingAreSame()}
                </label>
              </div>
            </div>
            <a
              href="# "
              className="btn btn-sm full-width btn-outline-secondary btn-new-address rounded shadow"
              data-toggle="modal"
              data-target="#billingAddressModel"
              id="billingAddress"
            >
              {billingAddressState.isStateEmpty() ? <i className="icon-edit" /> : <i className="icon-check" />}
              {_labels.billingAddress()}
            </a>
            {!formState.sameAsBilling
              && (
                <a
                  href="# "
                  className="btn btn-sm full-width btn-outline-secondary btn-new-address"
                  data-toggle="modal"
                  data-target="#shippingAddressModel"
                  id="shippingAddress"
                >
                  {shippingAddressState.isStateEmpty() ? <i className="icon-edit" /> : <i className="icon-check" />}
                  {_labels.shippingAddress()}
                </a>
              )}
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="newsletter-signup" />
              <label className="custom-control-label" htmlFor="newsletter-signup">{_labels.signUpNewsLetter()}</label>
            </div>

          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center">
              <input
                id="register"
                type="submit"
                className="btn btn-sm btn-dark rounded"
                value={_labels.register()}
              />
            </div>
          </div>
        </div>
      </form>
      <AddressModelComp id="billingAddressModel" title="Billing Address" addressState={billingAddressState} />
      <AddressModelComp id="shippingAddressModel" title="Shipping Address" addressState={shippingAddressState} />
    </div>
  );
};
export default RegisterComp;
