import React from 'react';
import PropTypes from 'prop-types';

const ProductOuterSliderComp = ({ image }) => (
  <>
    <div className="owl-item" style={{ width: '492.344px' }}>
      <div className="product-item">
        <img
          alt="slider"
          className="product-single-image"
          src={image}
          data-zoom-image={image}
        />
        <div className="zoomContainer">
          <div className="zoomWindowContainer">
            <div
              style={{
                backgroundImage: `url(${image})`,
              }}
              className="zoomWindow"
            >
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

ProductOuterSliderComp.propTypes = {
  image: PropTypes.string.isRequired,
};

export default ProductOuterSliderComp;
