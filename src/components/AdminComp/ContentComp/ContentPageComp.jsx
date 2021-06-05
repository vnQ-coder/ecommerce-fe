import { render } from 'react-dom';
import React, { useState, useCallback, useEffect } from 'react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LayoutComp from '../../../shared/components/LayoutComp';
import { getAllContentPages } from '../../../shared/api/api';
import useApiHook from '../../../shared/hooks/useApiHook';
import { useI18n } from '../../../shared/context/i18nContext';
import RenderIfAuthenticated from '../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';
import CreateContentComp from './CreateContentComp/CreateContentComp';
import BreadCrumbComp from '../../../shared/components/BreadCrumbComp';

const ContentWrapperComp = ({ contentPagesRes }) => {
  const contentPages = contentPagesRes.body;
  const [contentPage, setContentPage] = useState(contentPages || []);
  const { _common: { _labels }, header: { _menuItems } } = useI18n();

  useEffect(() => {
    if (contentPages) {
      setContentPage(contentPages);
    }
  }, [contentPages]);

  const onContentPageCreated = useCallback((contentPageObj) => {
    setContentPage((prevState) => [...prevState, contentPageObj]);
  }, []);

  return (
    <main className="main">
      <BreadCrumbComp items={[
        { text: _menuItems.admin() },
        { text: _menuItems.contentPages() },
        { text: _menuItems.createContentPages() },
      ]}
      />
      <h2 className="text-center">{contentPage.length > 3 ? _labels.updateContentPage() : _labels.createContentPage()}</h2>
      <div className="container">
        {
          contentPage && contentPage.length === 8
            ? contentPage.map((cp) => (
              <CreateContentComp
                key={cp.id}
                content={cp.content}
                pageName={cp.pageName}
                id={cp.id}
                lang={cp.lang}
              />
            ))

            : (
              <CreateContentComp
                onContentPageCreated={onContentPageCreated}
              />
            )
        }
      </div>
      <br />
    </main>
  );
};
const ContentPageComp = () => {
  const contentPagesRes = useApiHook({ apiDispatchCall: getAllContentPages });

  return (
    <AlertProvider template={AlertTemplate}>
      <LayoutComp waitFor={contentPagesRes}>
        <RenderIfAuthenticated redirectToIfUnAuth="/" hasRoles={['admin']}>
          <ContentWrapperComp contentPagesRes={contentPagesRes} />
        </RenderIfAuthenticated>
      </LayoutComp>
    </AlertProvider>
  );
};

render(<ContentPageComp />, document.getElementById('react-container'));
