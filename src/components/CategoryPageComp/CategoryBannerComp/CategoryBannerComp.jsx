import React from 'react';
import { useI18n } from '../../../shared/context/i18nContext';

const CategoryBannerComp = () => {
  const { _common, _common: { _labels } } = useI18n();

  return (
    <div className="category-banner">
      <img
        className="slide-bg"
        src="/assets/images/banners/3.jpg"
        alt="banner"
        width="1500"
        height="320"
        style={{ maxHeight: '400px' }}
      />
      <div className="category-slide-content">
        <h2 className="m-b-3">Lorem Ipsum de</h2>
        <h3 className="text-uppercase m-b-4">
          {_common.upToNPercentOff(30)}

          on Lorem Ipsum
        </h3>
        <h5 className="text-uppercase d-inline-block mb-0">
          {_labels.startingAt()}
          <span
            className="coupon-sale-text"
          >
            <sup>$</sup>
            199
            <sup>99</sup>
          </span>
        </h5>
        <a href="category" className="btn btn-dark btn-xl" role="button">{_common.shopNow()}</a>
      </div>
    </div>
  );
};
export default CategoryBannerComp;
