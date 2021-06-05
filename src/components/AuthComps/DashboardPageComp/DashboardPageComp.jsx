import { render } from 'react-dom';
import React from 'react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LayoutComp from '../../../shared/components/LayoutComp';
import DashboardContentComp from './DashboardContentComp';

const DashboardPageComp = () => (
  <main className="main">
    {/* <BreadCrumbComp/> */}
    <div className="container">
      <div className="row row-sparse">
        <DashboardContentComp />
        {/* <AccountSideMenu /> */}
      </div>
    </div>
    <div className="mb-5" />
  </main>
);

render(<AlertProvider template={AlertTemplate}><LayoutComp waitFor><DashboardPageComp /></LayoutComp></AlertProvider>, document.getElementById('react-container'));
