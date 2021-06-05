import React from 'react';
import { useI18n } from '../../../shared/context/i18nContext';

const EditAccountFormComp = () => {
  const { _editAccountPage, _common, _common: { _labels } } = useI18n();

  return (
    <div className="col-lg-9 order-lg-last dashboard-content">
      <h2 className="text-primary">{_editAccountPage.editAccountInfo()}</h2>
      <form action="#">
        <div className="row row-sparse">
          <div className="col-sm-11">
            <div className="row row-sparse">
              <div className="col-md-6">
                <div className="form-group required-field">
                  <label htmlFor="acc-name">{_labels.firstName()}</label>
                  <input type="text" className="form-control" id="acc-name" name="acc-name" required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group required-field">
                  <label htmlFor="acc-lastname">{_labels.lastName()}</label>
                  <input type="text" className="form-control" id="acc-lastname" name="acc-lastname" required />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group required-field">
          <label htmlFor="acc-email">{_common.email()}</label>
          <input type="email" className="form-control" id="acc-email" name="acc-email" required />
        </div>
        <div className="form-group required-field">
          <label htmlFor="acc-password">{_labels.password()}</label>
          <input type="password" className="form-control" id="acc-password" name="acc-password" required />
        </div>
        <div className="mb-2" />
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="change-pass-checkbox" defaultValue={1} />
          <label className="custom-control-label" htmlFor="change-pass-checkbox">{_labels.changePwd()}</label>
        </div>
        <div id="account-chage-pass">
          <h3 className="mb-2">{_labels.changePwd()}</h3>
          <div className="row row-sparse">
            <div className="col-md-6">
              <div className="form-group required-field">
                <label htmlFor="acc-pass2">{_labels.password()}</label>
                <input type="password" className="form-control" id="acc-pass2" name="acc-pass2" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group required-field">
                <label htmlFor="acc-pass3">{_labels.confirmPwd()}</label>
                <input type="password" className="form-control" id="acc-pass3" name="acc-pass3" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="required text-right">* Required Field</div> */}
        <div className="form-footer">
          <a href="# ">
            <i className="icon-angle-double-left" />
            {_labels.back()}
          </a>
          <div className="form-footer-right">
            <button type="submit" className="btn btn-primary">{_labels.save()}</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditAccountFormComp;
