import React, {
  useContext, useEffect, useState, useCallback,
} from 'react';
import { render } from 'react-dom';
import I18nContext, { useI18n } from '../../shared/context/i18nContext';

import LayoutComp from '../../shared/components/LayoutComp';
import useApiHook from '../../shared/hooks/useApiHook';
import { getContentPageByPageName } from '../../shared/api/api';

const AboutUsPageComp = () => {
  const { _aboutUsPage } = useI18n();
  const { locale } = useContext(I18nContext);
  const [aboutUs, setAboutUs] = useState({});
  const pageName = 'About Us';
  const reqAboutUs = useApiHook({ apiDispatchCall: getContentPageByPageName, initiateOnLoad: false });

  const onLangChange = useCallback((body) => {
    setAboutUs(body);
  }, []);

  useEffect(() => {
    if (locale) {
      const onHandleLanguage = () => {
        reqAboutUs.dispatchCall({ pageName, locale })
          .then(({ isSuccessResponse, body }) => {
            if (isSuccessResponse) {
              onLangChange(body);
            }
          });
      };
      onHandleLanguage();
    }
  }, [locale, onLangChange]);

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <h1>{_aboutUsPage.aboutUs()}</h1>
        </div>
      </div>
      <div className="container ckeditor-list">
        <span dangerouslySetInnerHTML={{ __html: aboutUs && aboutUs.content }} />
      </div>
      <div className="mb-10" />
    </main>
  );
};

render(<LayoutComp waitFor><AboutUsPageComp /></LayoutComp>, document.getElementById('react-container'));
