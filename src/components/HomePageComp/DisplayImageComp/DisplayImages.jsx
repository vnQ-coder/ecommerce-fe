import React, { useEffect } from 'react';
import appConfigs from '../../../base/config/appConfig';
import DisplayImagesForm from '../../AdminComp/DisplayImageComp/DisplayComp/DisplayImageFormComp';

const DisplayImage = ({ displayImagesRes }) => {
  const displayImages = displayImagesRes.body;
  const baseURL = appConfigs.bkUrl;

  return (
    <section className="bg-gray banners-section text-center">
      <div className="container py-2">
        <div className="row">
          {displayImages
            && displayImages.map((dp, index) => (
              <div className="col-sm-6 col-lg-3" key={index}>
                <div className="home-banner banner banner-sm-vw mb-2">
                  <img src={baseURL + dp.imagePath} alt={dp.title} />
                  <div className={`
                         ${index === 1 ? 'banner-layer banner-layer-top'
                    : (index === 2 ? 'banner-layer banner-layer-middle'
                      : (index === 3 ? 'banner-layer banner-layer-bottom banner-layer-boxed'
                        : 'banner-layer banner-layer-bottom text-left')

                    )}
                        `}
                  >
                    <h3
                      className={`${index === 1 ? 'text-white mb-0'
                        : (index === 3 ? 'text-black m-b-2' : 'text-white mb-1')}`}
                    >
                      {dp.title}
                    </h3>
                    <h4
                      className={`${index === 1
                        ? 'text-white mb-3' : (index === 3 ? 'text-secondary m-b-2' : 'text-white mb-2')}`}
                    >
                      {dp.description}
                    </h4>

                    <a
                      href={`${dp.btnLink}`}
                      className={`  ${index === 2 ? 'btn btn-light bg-white' : 'btn btn-primary'}`}
                      role="button"
                    >
                      {dp.btnText}
                    </a>

                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>

  );
};
export default DisplayImage;
