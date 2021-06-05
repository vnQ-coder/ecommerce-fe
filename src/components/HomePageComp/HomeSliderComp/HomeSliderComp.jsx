import React from 'react';
import SliderComp from './SliderComp';

const HomeSliderComp = ({ bannerRes }) => {
  const banners = bannerRes.body;
  return (
    <div className="home-slider owl-carousel owl-theme show-nav-hover nav-big">
      {
        banners && banners.map((banner, index) => (
          <SliderComp
            key={index}
            firstHeading={banner.firstHeading}
            secondHeading={banner.secondHeading}
            thirdHeading={banner.thirdHeading}
            forthHeading={banner.forthHeading}
            price={banner.price}
            imagePath={banner.imagePath}
            imageNumber={banner.ImageNumber}
            index={index}
          />
        ))
      }
    </div>
  );
};
export default HomeSliderComp;
