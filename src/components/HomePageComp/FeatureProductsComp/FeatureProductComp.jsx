import React, { useState } from 'react';
import FeatureProductItemComp from './FeatureProductItemComp';
import { useI18n } from '../../../shared/context/i18nContext';
import FeatureProductQuickView from './FeatureProductQuickView';

const FeatureProductComp = ({ products }) => {
  const { homepage: { _featureProduct } } = useI18n();
  const [quickViewDetails, setQuickViewDetails] = useState(null);

  const onSetQuickViewHandler = (details, images, reviews, productCode) => {
    setQuickViewDetails({
      details, images, reviews, productCode,
    });
  };

  const onCloseHandler = () => {
    setQuickViewDetails(null);
  };

  return (
    <section className="container pb-3 mb-1">
      <h2 className="section-title ls-n-10 text-center pb-2 m-b-4">{_featureProduct.featureProduct()}</h2>
      <div className="row py-4">
        {products && products.map((product) => (
          <FeatureProductItemComp
            key={product.id}
            product={product}
            images={product.image || {}}
            id={product.id}
            onSetQuickViewDetails={onSetQuickViewHandler}
          />
        ))}
        <FeatureProductQuickView
          quickViewDetails={quickViewDetails}
          onClose={onCloseHandler}
        />
      </div>
    </section>
  );
};

export default FeatureProductComp;
