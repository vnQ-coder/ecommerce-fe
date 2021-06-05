import { render } from 'react-dom';
import React from 'react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LayoutComp from '../../shared/components/LayoutComp';
import ContactUsFormComp from './ContactUsFormComp';
import ContactUsMapComp from './ContactUsMapComp';
import { useI18n } from '../../shared/context/i18nContext';
import RenderIfAuthenticatedHoc from '../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';

const ContactUsPageComp = () => {
  const { _contactUsPage } = useI18n();
  return (
    <main className="main">
      {/* <BreadCrumbComp /> */}
      <div className="container">
        <h2 className="text-center mb-2">{_contactUsPage.contactUs()}</h2>
      </div>

      <div className="container">
        <ContactUsMapComp />
        <ContactUsFormComp />
      </div>
      <div className="mb-10" />
    </main>
  );
};

render(<AlertProvider template={AlertTemplate}>
  <LayoutComp waitFor>
    <RenderIfAuthenticatedHoc>
      <ContactUsPageComp />
    </RenderIfAuthenticatedHoc>
  </LayoutComp>
</AlertProvider>, document.getElementById('react-container'));
