import React, { useCallback, useEffect, useState } from 'react';
import User from '../service/User';
import useApiHook from '../hooks/useApiHook';
import HeaderComp from './HeaderComp';
import En18n from '../i18n/en';
import Tr18n from '../i18n/tr';
import AppStateContext from '../context/AppStateContext';
import I18nContext from '../context/i18nContext';
import MenuMobileComp from './MenuMobileComp';
import { getLogout, getSessionUser } from '../api/api';
import appConfigs from '../../base/config/appConfig';
import useCartHook from '../hooks/useCartHook';
import AlertComp from '../alertComp/AlertComp.jsx';

const localStorageLocaleKey = 'saglik_locale';

const LayoutComp = ({ children, waitFor }) => {
  const Cart = useCartHook();
  const [locale, setLocale] = useState(appConfigs.locale);
  const [user, setUser] = useState(null);
  const userReq = useApiHook({ apiDispatchCall: getSessionUser });
  const { dispatchCall } = useApiHook({ apiDispatchCall: getLogout, initiateOnLoad: false });

  const onChangeLocale = useCallback((locale) => {
    localStorage.setItem(localStorageLocaleKey, locale);
    setLocale(locale);
  }, [setLocale]);

  useEffect(() => {
    if (user && waitFor) {
      setTimeout(() => {
        document.body.classList.add('loaded');
        BootstrapActions.init();
      }, 300);
    }
  }, [user, waitFor]);

  useEffect(() => {
    setLocale(localStorage.getItem(localStorageLocaleKey) || appConfigs.locale);
  }, []);

  const logoutUser = () => {
    dispatchCall().then(({ isSuccessResponse }) => {
      if (isSuccessResponse) {
        userReq.onClearResponse();
        setUser({});
        window.location.href = '/login';
      }
    });
  };

  useEffect(() => {
    if (!userReq.isLoadingResponse && userReq.isSuccessResponse) {
      setUser(userReq.body);
    }
  }, [userReq]);

  return (
    user && (
      <AppStateContext.Provider value={
        {
          user: new User(userReq.body ? userReq.body.user : null),
          logoutUser,
          Cart,
        }
      }
      >
        <I18nContext.Provider value={{ locale, onChangeLocale, lang: { en: En18n, tr: Tr18n } }}>
          <AlertComp>
            <div className="full-screen-slider">
              <div className="page-wrapper">
                <HeaderComp />
                {children}
              </div>
              <MenuMobileComp />
            </div>
          </AlertComp>
        </I18nContext.Provider>
      </AppStateContext.Provider>
    )
  );
};
export default LayoutComp;
