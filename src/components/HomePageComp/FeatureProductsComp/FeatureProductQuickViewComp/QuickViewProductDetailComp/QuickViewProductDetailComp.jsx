import React from 'react';

function QuickViewProductDetailComp({ productDetails }) {
  return (
    <>
      <h1 className="product-title">{productDetails && productDetails.title}</h1>
      <div className="ratings-container">
        <div className="product-ratings">
          <span className="ratings" style={{ width: '60%' }} />
          {/* End .ratings */}
        </div>
        {/* End .product-ratings */}
        <a href="# " className="rating-link">( 6 Reviews )</a>
      </div>
      {/* End .product-container */}
      <div className="price-box">
        <span className="old-price">$81.00</span>
        <span className="product-price">
          $
          {productDetails && productDetails.price}
        </span>
      </div>
      {/* End .price-box */}
      <div className="product-desc">
        <p>
          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
          Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        </p>
      </div>
      <hr className="divider" />
      <div className="product-action">
        <div className="product-single-qty">
          <input className="horizontal-quantity form-control" type="text" />
        </div>
        {/* End .product-single-qty */}
        <a href="cart.html" className="btn btn-dark add-cart" title="Add to Cart">Add to Cart</a>
      </div>
      {/* End .product-action */}

      {/* <div className="product-single-share">
        <label className="sr-only">Share:</label>
        <div className="addthis_inline_share_toolbox" />
        <a href="# " className="add-wishlist" title="Add to Wishlist">Add to Wishlist</a>
      </div> */}
    </>
  );
}

export default QuickViewProductDetailComp;
