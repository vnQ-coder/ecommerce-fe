import React from 'react';
import appConfigs from '../../../../../base/config/appConfig';

function QuickViewLowerSliderComp({ image }) {
  const baseURL = appConfigs.bkUrl;
  return (
    <>
      <div className="owl-dot">
        <img
          src={baseURL + image}
        />
      </div>

    </>
  );
}

export default QuickViewLowerSliderComp;
