import { render } from 'react-dom';
import React from 'react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LayoutComp from '../../../shared/components/LayoutComp';
import { useI18n } from '../../../shared/context/i18nContext';
import RegisterComp from './RegisterComp';
import LoginComp from './LoginComp';

const RegisterLoginPageComp = () => {
  const { _registerPage } = useI18n();
  return (
    <main className="main">
      {/* <BreadCrumbComp /> */}
      <div className="login-popup">
        <div className="modal-wrapper">
          <div className="container">
            <div className="row row-sparse">
              <LoginComp />
              <RegisterComp />
            </div>
          </div>
          <div className="mb-10" />
          <div className="social-login-wrapper">
            <p>{_registerPage.accessViaSocialNetwork()}</p>
            <div className="btn-group">
              <a className="btn btn-social-login btn-sm btn-gplus mb-1 rounded">
                <i
                  className="fab fa-google pt-1"
                />
                <span>Google</span>
              </a>
              <a className="btn btn-social-login btn-sm btn-facebook mb-1 rounded">
                <i
                  className="icon-facebook"
                />
                <span>Facebook</span>
              </a>
              <a className="btn btn-social-login btn-sm btn-twitter mb-1 rounded">
                <i
                  className="icon-twitter"
                />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

render(
  <AlertProvider template={AlertTemplate}>
    <LayoutComp waitFor>
      <RegisterLoginPageComp />

    </LayoutComp>
  </AlertProvider>, document.getElementById('react-container'),
);
