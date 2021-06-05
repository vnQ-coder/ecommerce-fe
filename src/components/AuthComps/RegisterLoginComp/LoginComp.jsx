import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import useApiHook from '../../../shared/hooks/useApiHook';
import useFormStateHook from '../../../shared/hooks/useFormStateHook';
import { useI18n } from '../../../shared/context/i18nContext';
import { postLogin } from '../../../shared/api/api';

const LoginComp = () => {
  const { _common: { _labels } } = useI18n();
  const [respMsg, setRespMsg] = useState({ error: false, msg: '' });
  const { formState, onUpdateState } = useFormStateHook();
  const { dispatchCall } = useApiHook({ apiDispatchCall: postLogin, initiateOnLoad: false });
  const urlParams = new URLSearchParams(window.location.search);
  const alert = useAlert();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    e.persist();
    dispatchCall(formState).then(({ isSuccessResponse, body }) => {
      const msg = body.message;
      if (isSuccessResponse) {
        alert.success(msg);
        const refLocation = urlParams.get('ref');
        setTimeout(() => {
          window.location.replace(refLocation || '/dashboard');
        }, 500);
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
          <div className="card-header bg-dark text-white card-header-border">{_labels.login()}</div>
          <div className="card-body p-5">
            <label htmlFor="login-email">
              {_labels.emailAddress()}
              <span className="required">*</span>
            </label>
            <input
              name="email"
              type="email"
              className="form-control input-field-search shadow mb-2"
              placeholder="Email Address"
              id="login-email"
              required
              onChange={onUpdateState}
            />
            <label htmlFor="login-password">
              {_labels.password()}

              <span className="required">*</span>
            </label>
            <input
              name="password"
              type="password"
              className="form-control input-field-search shadow mb-2"
              id="login-password"
              required
              placeholder="Password"
              onChange={onUpdateState}
            />
            <br />
            <div className={`cst-form-${respMsg.error ? 'error' : 'success'}`}>{respMsg.msg}</div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="lost-password" />
              <label
                className="custom-control-label"
                htmlFor="lost-password"
              >
                {_labels.rememberMe()}
              </label>
            </div>
            <a href="forgot-password" className="forget-password">{_labels.forgotPwd()}</a>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center">
              <input
                id="login"
                type="submit"
                className="btn btn-sm btn-dark rounded"
                value={_labels.login()}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LoginComp;
