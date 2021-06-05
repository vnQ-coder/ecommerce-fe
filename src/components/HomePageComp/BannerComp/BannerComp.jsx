import React from 'react';
import { useI18n } from '../../../shared/context/i18nContext';

const BannerComp = () => {
  const { homepage: { _banner }, _common: { _labels } } = useI18n();

  return (
    <section className="bg-gray banners-section text-center">
      <div className="container py-2">
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <div className="home-banner banner banner-sm-vw mb-2">
              <img src="/assets/images/banners/1.jpg" />
              <div className="banner-layer banner-layer-bottom text-left">
                <h3 className="text-white m-b-2">Lorem Ipsum</h3>
                <h4 className="text-white m-b-3">{_banner.seeAllFindYours()}</h4>
                <a href="category" className="btn  btn-primary" role="button">
                  {_labels.shopBy()}

                  Lorem
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="home-banner banner banner-sm-vw mb-2">
              <img src="/assets/images/banners/2.jpg" />
              <div className="banner-layer banner-layer-top ">
                <h3 className="text-white mb-0">Lorem Ipsum</h3>
                <h4 className=" text-white m-b-4">{_banner.browserInAllCategories()}</h4>
                <a href="category" className="btn  btn-primary" role="button">
                  {_labels.shopBy()}

                  Ipsum
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="home-banner banner banner-sm-vw mb-2">
              <img src="/assets/images/banners/3.jpg" />
              <div className="banner-layer banner-layer-middle">
                <h3 className="text-white m-b-1">Lorem Ipsum</h3>
                <h4 className="text-white m-b-4">Lorem Ipsum Lorem Ipsum</h4>
                <a href="category" className="btn btn-light bg-white" role="button">Lorem Ipsum</a>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="home-banner banner banner-sm-vw mb-2">
              <img src="/assets/images/banners/4.jpg" />
              <div className="banner-layer banner-layer-bottom banner-layer-boxed">
                <h3 className="m-b-2">Lorem Ipsum</h3>
                <h4 className="mb-0">
                  {_labels.startingAt()}

                  $99
                </h4>
                <a href="category" className="btn  btn-primary" role="button">Lorem Ipsum</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BannerComp;
