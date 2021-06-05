import React, { useState } from 'react';
import { render } from 'react-dom';
import {
  Provider as AlertProvider, useAlert,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import useApiHook from '../../../../shared/hooks/useApiHook';
import useFormStateHook from '../../../../shared/hooks/useFormStateHook';
import { useI18n } from '../../../../shared/context/i18nContext';
import { postRegisterVendor } from '../../../../shared/api/api';
import BreadCrumbComp from '../../../../shared/components/BreadCrumbComp';
import LayoutComp from '../../../../shared/components/LayoutComp';
import appConfigs from '../../../../base/config/appConfig';
import FileUploadInputComp from '../../../../shared/components/UI/FileUploadInputComp';

const VendorRegisterComp = () => {
  const { _common: { _labels }, _registerPage } = useI18n();
  const [respMsg, setRespMsg] = useState({ error: false, msg: '' });
  const { formState, onUpdateState, onClearState } = useFormStateHook();
  const { dispatchCall } = useApiHook({ apiDispatchCall: postRegisterVendor, initiateOnLoad: false });
  const [files, setFiles] = useState(null);
  const alert = useAlert();
  const onSetSingleFile = (files, name) => {
    setFiles((prevState) => ({ ...prevState, [name]: files[0] }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    e.persist();
    const formData = new FormData();
    Object.keys(formState).forEach((k) => formData.append(k, formState[k]));
    if (files) {
      Object.keys(files).forEach((filename) => formData.append(filename, files[filename]));
    }
    dispatchCall(formData).then(({ isSuccessResponse, body }) => {
      const msg = body.message;
      if (isSuccessResponse) {
        e.target.reset();
        setFiles(null);
        onClearState();
        alert.success(msg);
      }
      if (!isSuccessResponse) {
        alert.error(msg);
      }
    });
  };

  return (
    <main className="main">
      <BreadCrumbComp />
      <div className="container">
        <form onSubmit={onSubmitHandler}>
          <div className="card shadow card-border">
            <div className="card-header bg-dark text-white card-header-border">{_registerPage.registerAsVendor()}</div>
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

              <div className="form-group">
                <div className="form-control-tooltip">
                  <a
                    href={`${appConfigs.bkPublicDir}/docs/vendor-contract.txt`}
                    download
                    target="_blank"
                    className="btn-link"
                  >
                    {_registerPage.readAndSignAgreement()}
                  </a>
                </div>
              </div>

              <div className="form-group w-50">
                <div className="form-control-tooltip">
                  <FileUploadInputComp
                    reset={!files}
                    name="upload1"
                    buttonText={`${_labels.uploadFile()} 1`}
                    onChange={onSetSingleFile}
                  />
                </div>
              </div>

              <div className="form-group w-50">
                <div className="form-control-tooltip">
                  <FileUploadInputComp
                    reset={!files}
                    name="upload2"
                    buttonText={`${_labels.uploadFile()} 2`}
                    onChange={onSetSingleFile}
                  />
                </div>
              </div>

              <div className="form-group w-50">
                <div className="form-control-tooltip">
                  <FileUploadInputComp
                    reset={!files}
                    name="upload3"
                    buttonText={`${_labels.uploadFile()} 3`}
                    onChange={onSetSingleFile}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-control-tooltip">
                  <div className="custom-control custom-checkbox">
                    <input
                      name="agreeTerms"
                      onChange={onUpdateState}
                      type="checkbox"
                      className="custom-control-input"
                      id="terms-conditions"
                      required
                    />
                    <label className="custom-control-label" htmlFor="terms-conditions">
                      <a
                        href={`${appConfigs.bkPublicDir}/docs/terms-conditions.txt`}
                        download
                        target="_blank"
                        className="btn-link"
                      >
                        {_labels.agreeTermsCond()}
                      </a>
                    </label>
                  </div>
                </div>
              </div>

              <div className={`cst-form-${respMsg.error ? 'error' : 'success'}`}>{respMsg.msg}</div>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center">
                <input
                  type="submit"
                  className="btn btn-sm btn-dark rounded"
                  value={_labels.register()}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

render(
  <AlertProvider template={AlertTemplate}>
    <LayoutComp waitFor><VendorRegisterComp /></LayoutComp>
  </AlertProvider>,
  document.getElementById('react-container'),
);
