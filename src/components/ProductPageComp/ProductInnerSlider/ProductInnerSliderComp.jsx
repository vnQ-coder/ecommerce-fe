import React from 'react';

const ProductInnerSliderComp = ({ image }) => (
  <>
    <div className="owl-dot active" style={{ maxWidth: '150px', height: 'auto' }}>
      <img src={image} alt="product" />
    </div>
  </>
);

export default ProductInnerSliderComp;
