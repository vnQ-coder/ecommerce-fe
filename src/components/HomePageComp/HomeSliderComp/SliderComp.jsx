import React from 'react';
import { useI18n } from '../../../shared/context/i18nContext';
import appConfigs from '../../../base/config/appConfig';

const SliderComp = ({
  imageNumber, index, firstHeading, imagePath, secondHeading, thirdHeading, forthHeading, price,
}) => {
  const { _common } = useI18n();
  const baseURL = appConfigs.bkUrl;
  return (
    <div className={index === 0 ? 'home-slide home-slide1 banner' : 'home-slide home-slide2 banner'}>
      <img className="slide-bg owl-lazy" src={baseURL + imagePath} data-src={baseURL + imagePath} alt={imageNumber} />
      <div className="banner-layer banner-layer-middle">
        <h2>{firstHeading}</h2>
        <h3
          className={index === 0 ? 'text-uppercase mb-0' : 'text-uppercase rotated-upto-text mb-0'}
        >
          {secondHeading}
        </h3>
        <h4 className={index === 0 ? 'm-b-4' : 'short-thick-divider'}>{thirdHeading}</h4>

        <h5 className={index === 0 ? 'text-uppercase' : 'text-uppercase d-inline-block mb-0'}>
          {forthHeading}
          <span
            className="coupon-sale-text"
          >
            <sup>$</sup>
            {price}
            <sup>{price}</sup>
          </span>
        </h5>
        <a
          href="category"
          className={index === 0 ? 'btn btn-dark btn-xl' : 'btn btn-dark btn-xl btn-icon-right'}
          role="button"
        >
          {_common.shopNow()}
        </a>
      </div>
    </div>
  );
};
export default SliderComp;
