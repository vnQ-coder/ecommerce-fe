import { render } from 'react-dom';
import React from 'react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LayoutComp from '../../../shared/components/LayoutComp';
import AccountSideMenu from '../../../shared/components/AccountSideMenu';
import EditAccountFormComp from './EditAccountFormComp';
import BreadCrumbComp from '../../../shared/components/BreadCrumbComp';

const EditAccountPageComp = () => (
  <main className="main">
    <BreadCrumbComp />
    <div className="container">
      <div className="row row-sparse">
        <EditAccountFormComp />
        <AccountSideMenu />
      </div>
    </div>
  </main>
);

render(<AlertProvider template={AlertTemplate}>
  <LayoutComp waitFor><EditAccountPageComp /></LayoutComp>
</AlertProvider>, document.getElementById('react-container'));
