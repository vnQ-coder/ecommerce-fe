import { render } from 'react-dom';
import React, { useState } from 'react';
import {
  Provider as AlertProvider, useAlert,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LayoutComp from '../../../shared/components/LayoutComp';
import { useI18n } from '../../../shared/context/i18nContext';
import useApiHook from '../../../shared/hooks/useApiHook';
import { changePassword } from '../../../shared/api/api';
import useFormStateHook from '../../../shared/hooks/useFormStateHook';

const RecoverPasswordComp = () => {
  const reqChangePassword = useApiHook({ apiDispatchCall: changePassword, initiateOnLoad: false });
  const { _forgotPwdPage, _common: { _labels } } = useI18n();
  const { formState, onUpdateState } = useFormStateHook({
    password: '',
    uuid: '',
  });
  const alert = useAlert();
  const [respMsg, setRespMsg] = useState({ error: false, msg: '' });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const url = (`${window.location.href}`).split('=');
    formState.uuid = url[1];
    reqChangePassword.dispatchCall(formState)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };
  return (
    <main className="main">
      {/* <BreadCrumbComp /> */}
      <div className="container">
        <form onSubmit={onSubmitHandler}>
          <div className="card shadow card-border">
            <div className="card-header bg-dark text-white card-header-border">{_forgotPwdPage.resetPwd()}</div>
            <div className="card-body p-5">
              <div className="d-flex">
                <span className="required">*</span>
                <p>{_labels.newPassword()}</p>
              </div>
              <div className="form-group required-field">
                <label htmlFor="reset-password">{_labels.password()}</label>
                <input
                  type="password"
                  className="form-control input-field-search shadow"
                  id="reset-password"
                  name="password"
                  placeholder="New Password"
                  value={formState.password}
                  required
                  onChange={onUpdateState}
                />
              </div>
            </div>
            <div className={`cst-form-${respMsg.error ? 'error' : 'success'}`}>{respMsg.msg}</div>
            <div className="card-footer">
              <div className="d-flex justify-content-center">
                <input
                  type="submit"
                  className="btn btn-sm btn-dark rounded"
                  value={_labels.changePassword()}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="mb-10" />
    </main>
  );
};
render(<AlertProvider template={AlertTemplate}>
  <LayoutComp waitFor><RecoverPasswordComp /></LayoutComp>
       </AlertProvider>,
document.getElementById('react-container'));
