import { render } from 'react-dom';
import React, { useState } from 'react';
import {
  Provider as AlertProvider, useAlert,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LayoutComp from '../../../shared/components/LayoutComp';
import { useI18n } from '../../../shared/context/i18nContext';
import useApiHook from '../../../shared/hooks/useApiHook';
import { verifyEmail } from '../../../shared/api/api';
import useFormStateHook from '../../../shared/hooks/useFormStateHook';

const ForgotPasswordPageComp = () => {
  const reqVerifyEmail = useApiHook({ apiDispatchCall: verifyEmail, initiateOnLoad: false });
  const { _forgotPwdPage, _common } = useI18n();
  const { formState, onUpdateState } = useFormStateHook();
  const [respMsg, setRespMsg] = useState({ error: false, msg: '' });
  const alert = useAlert();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    reqVerifyEmail.dispatchCall(formState)
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
                <p>{_forgotPwdPage.enterEmailAddr()}</p>
              </div>
              <div className="form-group required-field">
                <label htmlFor="reset-email">{_common.email()}</label>
                <input
                  type="email"
                  className="form-control input-field-search shadow"
                  id="reset-email"
                  name="email"
                  placeholder="Email Address"
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
                  value={_forgotPwdPage.resetMyPwd()}
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
  <LayoutComp waitFor>
    <ForgotPasswordPageComp />
  </LayoutComp>
       </AlertProvider>, document.getElementById('react-container'));
