import React from 'react';
import { useI18n } from '../../../shared/context/i18nContext';

const FeatureInfoComp = () => {
  const { homepage: { _supportInfo } } = useI18n();

  return (
    <div className="row feature-boxes-container pt-2">
      <div className="col-sm-6 col-lg-3">
        <div className="feature-box feature-box-simple text-center">
          <i className="icon-earphones-alt" />
          <div className="feature-box-content">
            <h3 className="text-uppercase">{_supportInfo.customerSupport()}</h3>
            <h5>{_supportInfo.needAssistance()}</h5>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib.</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-3">
        <div className="feature-box feature-box-simple text-center">
          <i className="icon-credit-card" />

          <div className="feature-box-content">
            <h3 className="text-uppercase">{_supportInfo.securePayment()}</h3>
            <h5>{_supportInfo.safeFast()}</h5>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapibus
              lacus. Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-3">
        <div className="feature-box feature-box-simple text-center">
          <i className="icon-action-undo" />

          <div className="feature-box-content">
            <h3 className="text-uppercase">{_supportInfo.freeReturns()}</h3>
            <h5>{_supportInfo.easyFree()}</h5>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib.</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-3">
        <div className="feature-box feature-box-simple text-center">
          <i className="icon-shipping" />

          <div className="feature-box-content">
            <h3 className="text-uppercase">{_supportInfo.freeShipping()}</h3>
            <h5>
              {_supportInfo.orderOver()}

              $99
            </h5>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeatureInfoComp;
