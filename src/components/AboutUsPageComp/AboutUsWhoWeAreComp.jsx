import React from 'react';
import { useI18n } from '../../shared/context/i18nContext';

const AboutUsWhoWeAreComp = () => {
  const { _aboutUsPage } = useI18n();

  return (
    <div className="container">
      <h1 className="mb-4">{_aboutUsPage.whoWeAre()}</h1>
      <div className="row row-sparse">
        <div className="col-md-12">
          {_aboutUsPage.discription()}
        </div>

      </div>
      <div className="history-section" style={{ marginTop: '20px' }}>
        <div className="container">
          <h2>{_aboutUsPage.ourWork()}</h2>
          <div className="row">
            <div className="col-lg-12">
              {_aboutUsPage.ourWorkDescription()}
            </div>
          </div>
          <h2>{_aboutUsPage.whyUs()}</h2>
          <div className="row">
            <div className="col-lg-12">
              {_aboutUsPage.whyUsDescription()}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};
export default AboutUsWhoWeAreComp;
