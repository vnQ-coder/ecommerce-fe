import React from 'react';
import QuickViewLowerSliderComp from './QuickViewLowerSliderComp/QuickViewLowerSliderComp';
import QuickViewUperSliderComp from './QuickViewUperSliderComp/QuickViewUperSliderComp';

function FeatureProductQuickViewComp({ productImage, productDetails, productReviews }) {
  const rating = productReviews ? (productReviews.map((dp) => dp.rating)) : '';
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const sumOfRating = rating ? (rating.reduce(reducer, 0)) : '';
  const totalUsers = rating ? (rating.length) : '';
  const averageRating = sumOfRating / totalUsers;
  const ratings = averageRating * 20;

  return (
    <>
      <div className="product-single-container product-single-default product-quick-view">
        <div className="row row-sparse">
          <div className="col-lg-6 product-single-gallery">
            <div className="product-slider-container">
              <div className="product-single-carousel owl-carousel owl-theme">
                {
                  productImage && productImage.map((pi, index) => (
                    <QuickViewUperSliderComp
                      key={index}
                      image={pi.image}
                    />
                  ))
                }
              </div>
              {/* End .product-single-carousel */}
            </div>
            <div className="prod-thumbnail owl-dots" id="carousel-custom-dots">
              {
                productImage && productImage.map((pi, index) => (
                  <QuickViewLowerSliderComp
                    key={index}
                    image={pi.image}
                  />
                ))
              }
            </div>
          </div>
          {/* End .product-single-gallery */}
          <div className="col-lg-6 product-single-details">
            <h1 className="product-title">{productDetails && productDetails.title}</h1>
            <div className="ratings-container">
              <div className="product-ratings">
                <span className="ratings" style={{ width: `${ratings}%` }} />
                {/* End .ratings */}
              </div>
              {/* End .product-ratings */}
              <a href="# " className="rating-link">
                (
                {productReviews && productReviews.length}

                Reviews )
              </a>
            </div>
            {/* End .product-container */}
            <div className="price-box">
              {/* <span className="old-price">$81.00</span> */}
              <span className="product-price">
                $
                {productDetails && productDetails.price}
              </span>
            </div>
            {/* End .price-box */}
            <div className="product-desc">
              <p>{productDetails && productDetails.description}</p>
            </div>
            {/* End .product-desc */}
            <hr className="divider" />
            <div className="product-action">
              <div className="product-single-qty">
                <input className="horizontal-quantity form-control" type="text" />
              </div>
              {/* End .product-single-qty */}
              <a href="cart.html" className="btn btn-dark add-cart text-white" title="Add to Cart">Add to Cart</a>
            </div>
            {/* End .product-action */}
            <hr className="divider" />
            <div className="product-single-share">
              <label className="sr-only">Share:</label>
              {/* www.addthis.com share plugin */}
              <div className="addthis_inline_share_toolbox" />
              <a href="# " className="add-wishlist" title="Add to Wishlist">Add to Wishlist</a>
            </div>
            {/* End .product single-share */}
          </div>
          {/* End .product-single-details */}
        </div>
        {/* End .row */}
      </div>
    </>

  );
}

export default FeatureProductQuickViewComp;
