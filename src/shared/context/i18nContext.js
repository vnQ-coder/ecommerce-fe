import { createContext, useContext } from 'react';
import appConfigs from '../../base/config/appConfig';

const I18nContext = createContext({
  locale: appConfigs.locale,
  onChangeLocale: (lang) => { },
  lang: {},
});

export const useI18n = () => {
  const ui18n = useContext(I18nContext);
  return ui18n.locale === 'tr' ? ui18n.lang.tr : ui18n.lang.en;
};

export default I18nContext;
