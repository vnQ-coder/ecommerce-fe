import React from 'react';
import { useI18n } from '../context/i18nContext';

const FooterComp = () => {
  const { _common, footer: { _section } } = useI18n();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container top-border d-flex align-items-center justify-content-between flex-wrap">
          {/* <div className="footer-left widget-newsletter d-md-flex align-items-center">
            <div className="widget-newsletter-info">
              <h5 className="widget-newsletter-title text-uppercase m-b-1">
              {_section.subscribeNewsLetter()}</h5>
              <p className="widget-newsletter-content mb-0">{_section.offerInfo1()}</p>
            </div>
            <form action="#">
              <div className="footer-submit-wrapper d-flex">
                <input type="email"
                className="form-control" placeholder={_common.emailAddress()} size="40" required />
                <button type="submit" className="btn btn-dark btn-sm">{_common.subscribe()}</button>
              </div>
            </form>
          </div> */}
          <div className="footer-right">
            <div className="social-icons">
              <a
                href="# "
                className="social-icon social-facebook icon-facebook"
                target="_blank"
              />
              <a href="# " className="social-icon social-twitter icon-twitter" target="_blank" />
              <a href="# " className="social-icon social-instagram icon-instagram" target="_blank" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xl-4">
              <div className="widget">
                <h4 className="widget-title">{_section.contactInfo()}</h4>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="contact-widget">
                      <h4 className="widget-title">{_common.address()}</h4>
                      <a href="# ">Lorem Ipsum Lorem Ipsum Lorem Ipsum</a>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="contact-widget email">
                      <h4 className="widget-title">{_common.email()}</h4>
                      <a href="mailto:mail@example.com">mail@example.com</a>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="contact-widget">
                      <h4 className="widget-title">{_common.phone()}</h4>
                      <a href="# ">Lorem Ipsum</a>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="contact-widget">
                      <h4 className="widget-title">WORKING DAYS/HOURS</h4>
                      <a href="# ">Mon - Sun / 9:00 AM - 8:00 PM</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 col-xl-4">
              <div className="widget">
                <h4 className="widget-title">Lorem Ipsum</h4>
                <ul className="links link-parts row">
                  <div className="link-part col-xl-4">
                    <li><a href="about">Lorem Ipsum</a></li>
                    <li><a href="contact">Lorem Ipsum</a></li>
                    <li><a href="my-account">Lorem Ipsum</a></li>
                  </div>
                  <div className="link-part col-xl-8">
                    <li><a href="# ">Lorem Ipsum</a></li>
                    <li><a href="# ">Lorem Ipsum Lorem Ipsum</a></li>
                  </div>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 col-xl-4">
              <div className="widget">
                <h4 className="widget-title">{_section.mainFeatures()}</h4>
                <ul className="links link-parts row">
                  <div className="link-part col-xl-6">
                    <li><a href="# ">Lorem Ipsum</a></li>
                    <li><a href="# ">Lorem Ipsum Lorem Ipsum Lorem Ipsum</a></li>
                    <li><a href="# ">Lorem Ipsum Lorem Ipsum</a></li>
                  </div>
                  <div className="link-part col-xl-6">
                    <li><a href="# ">Lorem Ipsum Lorem Ipsum</a></li>
                    <li><a href="# ">Lorem Ipsum Lorem Ipsum</a></li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container top-border d-flex align-items-center justify-content-between flex-wrap">
          <p className="footer-copyright mb-0 py-3 pr-3" dangerouslySetInnerHTML={{ __html: _section.copyright() }} />
          <img className="py-3" src="assets/images/payments.png" alt="payment image" />
        </div>
      </div>
    </footer>
  );
};
export default FooterComp;
