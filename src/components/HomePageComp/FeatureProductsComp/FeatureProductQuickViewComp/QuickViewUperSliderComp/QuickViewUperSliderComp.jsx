import React from 'react';
import appConfigs from '../../../../../base/config/appConfig';

function QuickViewUperSliderComp({ image }) {
  const baseURL = appConfigs.bkUrl;

  return (

    <div className="product-item">
      <img
        className="product-single-image"
        src={baseURL + image}
        data-zoom-image={baseURL + image}
      />
    </div>

  );
}

export default QuickViewUperSliderComp;
