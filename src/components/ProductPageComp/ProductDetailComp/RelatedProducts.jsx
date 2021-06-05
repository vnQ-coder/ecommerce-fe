import React from 'react';
import { useI18n } from '../../../shared/context/i18nContext';

const RelatedProducts = () => {
  const { _productPage, _common } = useI18n();

  return (
    <div className="products-section">
      <div className="container">
        <h2>
          {_productPage.relatedProducts()}

          (Dummy Products)
        </h2>
        <div className="products-slider owl-carousel owl-theme dots-top owl-loaded owl-drag">
          <div className="owl-stage-outer">
            <div
              className="owl-stage"
              style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '2152px' }}
            >
              <div className="owl-item active" style={{ width: '287.39px', marginRight: '20px' }}>
                <div className="product-default inner-quickview inner-icon">
                  <figure>
                    <a href="product">
                      <img src="assets/images/products/home/p10.jpg" />
                    </a>
                    <div className="label-group">
                      <span className="product-label label-sale">-20%</span>
                    </div>
                    <div className="btn-icon-group">
                      <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">
                        <i
                          className="icon-shopping-cart"
                        />
                      </button>
                    </div>
                    <a
                      href="ajax/product-quick-view.html"
                      className="btn-quickview"
                      title="Quick View"
                    >
                      {_common.quickView()}
                    </a>
                  </figure>
                  <div className="product-details">
                    <div className="category-wrap">
                      <div className="category-list">
                        <a href="category" className="product-category">{_common.category()}</a>
                      </div>
                    </div>
                    <h3 className="product-title">
                      <a href="product">{_common.productShortName()}</a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: '100%' }} />
                        <span className="tooltiptext tooltip-top" />
                      </div>
                    </div>
                    <div className="price-box">
                      <span className="old-price">$59.00</span>
                      <span className="product-price">$49.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-item active" style={{ width: '287.39px', marginRight: '20px' }}>
                <div className="product-default inner-quickview inner-icon">
                  <figure>
                    <a href="product">
                      <img src="assets/images/products/home/p2.jpg" />
                    </a>
                    <div className="btn-icon-group">
                      <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">
                        <i
                          className="icon-shopping-cart"
                        />
                      </button>
                    </div>
                    <a
                      href="ajax/product-quick-view.html"
                      className="btn-quickview"
                      title="Quick View"
                    >
                      {_common.quickView()}
                    </a>
                  </figure>
                  <div className="product-details">
                    <div className="category-wrap">
                      <div className="category-list">
                        <a href="category" className="product-category">{_common.category()}</a>
                      </div>
                    </div>
                    <h3 className="product-title">
                      <a href="product">{_common.productShortName()}</a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: '100%' }} />
                        <span className="tooltiptext tooltip-top" />
                      </div>
                    </div>
                    <div className="price-box">
                      <span className="old-price">$59.00</span>
                      <span className="product-price">$49.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-item active" style={{ width: '287.39px', marginRight: '20px' }}>
                <div className="product-default inner-quickview inner-icon">
                  <figure>
                    <a href="product">
                      <img src="assets/images/products/home/p3.jpg" />
                    </a>
                    <div className="btn-icon-group">
                      <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">
                        <i
                          className="icon-shopping-cart"
                        />
                      </button>
                    </div>
                    <a
                      href="ajax/product-quick-view.html"
                      className="btn-quickview"
                      title="Quick View"
                    >
                      {_common.quickView()}
                    </a>
                  </figure>
                  <div className="product-details">
                    <div className="category-wrap">
                      <div className="category-list">
                        <a href="category" className="product-category">{_common.category()}</a>
                      </div>
                    </div>
                    <h3 className="product-title">
                      <a href="product">{_common.productShortName()}</a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: '100%' }} />
                        <span className="tooltiptext tooltip-top" />
                      </div>
                    </div>
                    <div className="price-box">
                      <span className="old-price">$59.00</span>
                      <span className="product-price">$49.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-item active" style={{ width: '287.39px', marginRight: '20px' }}>
                <div className="product-default inner-quickview inner-icon">
                  <figure>
                    <a href="product">
                      <img src="assets/images/products/home/p12.jpg" />
                    </a>
                    <div className="label-group">
                      <span className="product-label label-hot">{_common.hot()}</span>
                    </div>
                    <div className="btn-icon-group">
                      <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">
                        <i
                          className="icon-shopping-cart"
                        />
                      </button>
                    </div>
                    <a
                      href="ajax/product-quick-view.html"
                      className="btn-quickview"
                      title="Quick View"
                    >
                      {_common.quickView()}
                    </a>
                  </figure>
                  <div className="product-details">
                    <div className="category-wrap">
                      <div className="category-list">
                        <a href="category" className="product-category">{_common.category()}</a>
                      </div>
                    </div>
                    <h3 className="product-title">
                      <a href="product">{_common.productShortName()}</a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: '100%' }} />
                        <span className="tooltiptext tooltip-top" />
                      </div>
                    </div>
                    <div className="price-box">
                      <span className="old-price">$59.00</span>
                      <span className="product-price">$49.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-item" style={{ width: '287.39px', marginRight: '20px' }}>
                <div className="product-default inner-quickview inner-icon">
                  <figure>
                    <a href="product">
                      <img src="assets/images/products/home/p7.jpg" />
                    </a>
                    <div className="label-group">
                      <span className="product-label label-hot">{_common.hot()}</span>
                    </div>
                    <div className="btn-icon-group">
                      <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">
                        <i
                          className="icon-shopping-cart"
                        />
                      </button>
                    </div>
                    <a
                      href="ajax/product-quick-view.html"
                      className="btn-quickview"
                      title="Quick View"
                    >
                      {_common.quickView()}
                    </a>
                  </figure>
                  <div className="product-details">
                    <div className="category-wrap">
                      <div className="category-list">
                        <a href="category" className="product-category">{_common.category()}</a>
                      </div>
                    </div>
                    <h3 className="product-title">
                      <a href="product">{_common.productShortName()}</a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: '100%' }} />
                        <span className="tooltiptext tooltip-top" />
                      </div>
                    </div>
                    <div className="price-box">
                      <span className="old-price">$59.00</span>
                      <span className="product-price">$49.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-item" style={{ width: '287.39px', marginRight: '20px' }}>
                <div className="product-default inner-quickview inner-icon">
                  <figure>
                    <a href="product">
                      <img src="assets/images/products/home/p13.jpg" />
                    </a>
                    <div className="label-group">
                      <span className="product-label label-sale">-30%</span>
                    </div>
                    <div className="btn-icon-group">
                      <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">
                        <i
                          className="icon-shopping-cart"
                        />
                      </button>
                    </div>
                    <a
                      href="ajax/product-quick-view.html"
                      className="btn-quickview"
                      title="Quick View"
                    >
                      {_common.quickView()}
                    </a>
                  </figure>
                  <div className="product-details">
                    <div className="category-wrap">
                      <div className="category-list">
                        <a href="category" className="product-category">{_common.category()}</a>
                      </div>
                    </div>
                    <h3 className="product-title">
                      <a href="product">{_common.productShortName()}</a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: '100%' }} />
                        <span className="tooltiptext tooltip-top" />
                      </div>
                    </div>
                    <div className="price-box">
                      <span className="old-price">$59.00</span>
                      <span className="product-price">$49.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-item" style={{ width: '287.39px', marginRight: '20px' }}>
                <div className="product-default inner-quickview inner-icon">
                  <figure>
                    <a href="product">
                      <img src="assets/images/products/home/p4.jpg" />
                    </a>
                    <div className="label-group">
                      <span className="product-label label-sale">-20%</span>
                    </div>
                    <div className="btn-icon-group">
                      <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">
                        <i
                          className="icon-shopping-cart"
                        />
                      </button>
                    </div>
                    <a
                      href="ajax/product-quick-view.html"
                      className="btn-quickview"
                      title="Quick View"
                    >
                      {_common.quickView()}
                    </a>
                  </figure>
                  <div className="product-details">
                    <div className="category-wrap">
                      <div className="category-list">
                        <a href="category" className="product-category">{_common.category()}</a>
                      </div>
                    </div>
                    <h3 className="product-title">
                      <a href="product">{_common.productShortName()}</a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: '100%' }} />
                        <span className="tooltiptext tooltip-top" />
                      </div>
                    </div>
                    <div className="price-box">
                      <span className="old-price">$59.00</span>
                      <span className="product-price">$49.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="owl-nav disabled">
            <button type="button" role="presentation" className="owl-prev"><i className="icon-angle-left" /></button>
            <button type="button" role="presentation" className="owl-next"><i className="icon-angle-right" /></button>
          </div>
          <div className="owl-dots">
            <button role="button" className="owl-dot active"><span /></button>
            <button role="button" className="owl-dot"><span /></button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RelatedProducts;
