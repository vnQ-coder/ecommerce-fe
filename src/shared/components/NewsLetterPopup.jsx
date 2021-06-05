import React from 'react';
import { useI18n } from '../context/i18nContext';

const NewsLetterPopup = () => {
  const {
    _common, _newsletterPopup:
    { beFirstToKnow, subsToSaglik, dontShowPopupAgain },
  } = useI18n();

  return (
    <div
      className="newsletter-popup mfp-hide"
      id="newsletter-popup-form"
      style={{
        background: '#f1f1f1 no-repeat center/cover url(assets/images/levi.jpg)',
      }}
    >
      <div className="newsletter-popup-content">
        <img src="assets/images/sitelogo.png" height="100" width="120" alt="Logo" className="logo-newsletter" />
        <h2>{beFirstToKnow()}</h2>
        <p className="mb-2">{subsToSaglik()}</p>
        {/* <form action="#">
          <div className="input-group">
            <input type="email" className="form-control"
            id="newsletter-email" name="newsletter-email"
             placeholder={_common.emailAddress()} required />
            <input type="submit" className="btn" value="Go!" />
          </div>
        </form> */}
        {/* <div className="newsletter-subscribe">
          <div className="checkbox">
            <label>
              <input type="checkbox" value="1" /> {dontShowPopupAgain()}
            </label>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default NewsLetterPopup;
