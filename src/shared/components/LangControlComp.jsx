import React, { useContext } from 'react';
import I18nContext from '../context/i18nContext';

const LangControlComp = () => {
  const i18nContext = useContext(I18nContext);

  return (
    <nav className="toolbox p-3">
      <div className="toolbox-right">
        <div className="toolbox-item toolbox-show">
          <label>Lang:</label>
          <div className="select-custom">
            <select
              name="count"
              className="form-control"
              value={i18nContext.locale}
              onChange={(e) => i18nContext.onChangeLocale(e.target.value)}
            >
              {
                i18nContext.lang
                && typeof i18nContext.lang === 'object'
                && Object.keys(i18nContext.lang).map((lang) => (
                  <option
                    key={lang}
                    value={lang}
                  >
                    {lang}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default LangControlComp;
