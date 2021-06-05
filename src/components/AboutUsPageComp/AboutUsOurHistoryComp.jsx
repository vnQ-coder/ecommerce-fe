import React from 'react';
import { useI18n } from '../../shared/context/i18nContext';

const AboutUsOurHistoryComp = () => {
  const { _aboutUsPage } = useI18n();
  return (
    <div className="history-section">
      <div className="container">
        <h3 className="page-title">{_aboutUsPage.ourWork()}</h3>
        <div className="row row-sparse">
          {/* <div className="col-lg-5">
            <div className="about-slider owl-carousel owl-theme owl-loaded owl-drag">
              <div className="owl-stage-outer">
                <div className="owl-stage" style={{
                  transform: 'translate3d(-1746px, 0px, 0px)',
                  transition: 'all 0.25s ease 0s',
                  width: '4074px'
                }}>
                  <div className="owl-item cloned" style={{width: '580px', marginRight: '2px'}}>
                    <div className="about-slider-item loaded">
                      <img className="owl-lazy" data-src="assets/images/banners/3.jpg"
                           src="assets/images/banners/3.jpg" alt="About image description" style={{opacity: 1}}/>
                    </div>
                  </div>
                  <div className="owl-item cloned" style={{width: '580px', marginRight: '2px'}}>
                    <div className="about-slider-item loaded">
                      <img className="owl-lazy" data-src="assets/images/banners/2.jpg"
                           src="assets/images/banners/2.jpg" alt="About image description" style={{opacity: 1}}/>
                    </div>
                  </div>
                  <div className="owl-item" style={{width: '580px', marginRight: '2px'}}>
                    <div className="about-slider-item loaded">
                      <img className="owl-lazy" data-src="assets/images/banners/1.jpg"
                           src="assets/images/banners/1.jpg" alt="About image description" style={{opacity: 1}}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-nav disabled">
                <button type="button" role="presentation" className="owl-prev"><i className="icon-angle-left"/>
                </button>
                <button type="button" role="presentation" className="owl-next"><i className="icon-angle-right"/>
                </button>
              </div>
            </div>
          </div> */}
          <div className="col-lg-12">
            {/* <h2 className="mb-4">2014</h2>
            <p> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum</p>
            <p> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum</p> */}
            {_aboutUsPage.ourWorkDescription()}
          </div>
        </div>
        <h3 className="page-title">{_aboutUsPage.whyUs()}</h3>
        <div className="row row-sparse">
          {/* <div className="col-lg-5">
            <div className="about-slider owl-carousel owl-theme owl-loaded owl-drag">
              <div className="owl-stage-outer">
                <div className="owl-stage" style={{
                  transform: 'translate3d(-1746px, 0px, 0px)',
                  transition: 'all 0.25s ease 0s',
                  width: '4074px'
                }}>
                  <div className="owl-item cloned" style={{width: '580px', marginRight: '2px'}}>
                    <div className="about-slider-item loaded">
                      <img className="owl-lazy" data-src="assets/images/banners/3.jpg"
                           src="assets/images/banners/3.jpg" alt="About image description" style={{opacity: 1}}/>
                    </div>
                  </div>
                  <div className="owl-item cloned" style={{width: '580px', marginRight: '2px'}}>
                    <div className="about-slider-item loaded">
                      <img className="owl-lazy" data-src="assets/images/banners/2.jpg"
                           src="assets/images/banners/2.jpg" alt="About image description" style={{opacity: 1}}/>
                    </div>
                  </div>
                  <div className="owl-item" style={{width: '580px', marginRight: '2px'}}>
                    <div className="about-slider-item loaded">
                      <img className="owl-lazy" data-src="assets/images/banners/1.jpg"
                           src="assets/images/banners/1.jpg" alt="About image description" style={{opacity: 1}}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-nav disabled">
                <button type="button" role="presentation" className="owl-prev"><i className="icon-angle-left"/>
                </button>
                <button type="button" role="presentation" className="owl-next"><i className="icon-angle-right"/>
                </button>
              </div>
            </div>
          </div> */}
          <div className="col-lg-12">
            {/* <h2 className="mb-4">2014</h2>
            <p> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum</p>
            <p> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              Ipsum</p> */}
            {_aboutUsPage.whyUsDescription()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUsOurHistoryComp;
