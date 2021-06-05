import React, { useContext, useEffect, useState } from 'react';
import { useI18n } from '../../../shared/context/i18nContext';
import AddProductReviewsComp from '../ProductReviewsComp/AddProductReviewsComp';
import ProductReviewsListingComp from '../ProductReviewsComp/ProductReviewsListingComp';
import AppStateContext from '../../../shared/context/AppStateContext';
import ProductDetailsComp from '../ProductDetails/ProductDetailsComp';
import {
  buildPathToImage,
  buildPathToImageThumb,
} from '../../../base/utils/string';
import CartQuantityComp from '../../../shared/components/UI/CartQuantityComp';
import AskQuestionComp from './AskQuestionComp/AskQuestionComp';
import RelatedProductsComp from './RelatedProductsComp';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom'

const ProductDetailComp = ({
  productId,
  productReviewsRes,
  productImagesRes,
  productDetailsRes,
  askedQuestions,
  relatedProductsRes,
  otherProductsRes,
  checkUserRes,
}) => {
  const tabHash = window.location.hash;
  const {
    _common,
    _common: { _labels },
  } = useI18n();
  const productReviews = productReviewsRes.body;
  const productImages = productImagesRes.body;
  const productDetails = productDetailsRes.body;
  const relatedProducts = relatedProductsRes.body;
  const otherProducts = otherProductsRes.body;
  const checkUser = checkUserRes.body;
  const [userExists, setUserExists] = useState(null);
  const { user } = useContext(AppStateContext);
  const userId = user.user ? user.user.id : '';
  const userIds = productReviews ? productReviews.map((dp) => dp.userId) : '';
  const filterUserId = userIds ? userIds.filter((uid) => uid === userId) : '';
  const [imageSrc, setImageSrc] = useState("");

  const onImageHandler = (e) => {
    e.preventDefault();
    setImageSrc(e.target.src);
  }

  useEffect(() => {
    if (checkUser) {
      setUserExists({ userId: checkUser.userId });
    }
  }, [checkUser]);

  useEffect(() => {
    if (productImages) {
      setImageSrc(buildPathToImage(productImages[0]).href);
    }
  }, [productImages])

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9 main-content">
          <div className="product-single-container product-single-default">
            <div className="row">
              <div className="col-lg-4 col-md-3 product-single-gallery">
                <div className="product-slider-container">
                  <InnerImageZoom src={imageSrc} height={300} width={500} zoomScale={7} />
                </div>
                <div
                  className="prod-thumbnail owl-dots"
                  id="carousel-custom-dots"
                  style={{ display: "none" }}
                />
                <div
                  className="prod-thumbnail owl-dots"
                  id="carousel-custom-dots"
                >
                  {productImages
                    && productImages.map((image) => (
                      <div className="owl-dot active product-list-box-image" onClick={(e) => onImageHandler(e)} >
                        <img src={buildPathToImage(image)} alt="product" />
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-lg-5 col-md-6 product-single-details">
                <ProductDetailsComp
                  productReviewsLength={productReviews && productReviews.length}
                  productReviews={productReviews && productReviews}
                  title={productDetails && productDetails.title}
                  description={productDetails && productDetails.description}
                  productCode={productDetails && productDetails.productCode}
                  price={productDetails && productDetails.price}
                  productQty={productDetails && productDetails.productQty}
                />

                <hr className="divider" />
                {productDetails &&
                  productImages &&
                  productDetails.productQty > 0 && (
                    <CartQuantityComp
                      productDetails={{
                        ...productDetails,
                        img: buildPathToImageThumb(productImages[0]),
                      }}
                    />
                  )}
              </div>
            </div>
          </div>
          <div className="product-single-tabs">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="product-tab-desc"
                  data-toggle="tab"
                  href="#product-desc-content"
                  role="tab"
                  aria-controls="product-desc-content"
                  aria-selected="true"
                >
                  {_labels.description()}
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${tabHash === "#product-tab-reviews" ? "active show" : ""
                    }`}
                  id="product-tab-reviews"
                  data-toggle="tab"
                  href="#product-reviews-content"
                  role="tab"
                  aria-controls="product-reviews-content"
                  aria-selected="false"
                >
                  {_common.reviews()}({productReviews && productReviews.length})
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${tabHash === "#product-tab-ask-question" ? "active show" : ""
                    }`}
                  id="product-tab-ask-question"
                  data-toggle="tab"
                  href="#ask-question-content"
                  role="tab"
                  aria-controls="product-reviews-content"
                  aria-selected="false"
                >
                  {_common.askQuestion()}(
                  {askedQuestions && askedQuestions.length})
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="product-desc-content"
                role="tabpanel"
                aria-labelledby="product-tab-desc"
              >
                <div className="product-desc-content ckeditor-list">
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        productDetails && productDetails.detailDescription,
                    }}
                  />
                </div>
              </div>
              <div
                className={`tab-pane fade  ${tabHash === "#product-tab-reviews" ? "active show" : ""
                  }`}
                id="product-reviews-content"
                role="tabpanel"
                aria-labelledby="product-tab-reviews"
              >
                <div className="product-reviews-content">
                  <div className="row">
                    <div className="col-xl-7">
                      <h2 className="reviews-title">
                        {productReviews && productReviews.length}

                        {_common.reviews()}
                      </h2>

                      {productReviews &&
                        productReviews.map((pr, index) => (
                          <ProductReviewsListingComp
                            key={index}
                            firstName={pr.firstName}
                            lastName={pr.lastName}
                            rating={pr.rating}
                            comments={pr.comments}
                            created_at={pr.created_at}
                          />
                        ))}
                    </div>
                    <div className="col-xl-5">
                      {user.isLoggedIn() &&
                        filterUserId.length !== 1 &&
                        !user.isVendor() &&
                        !user.isAdmin() &&
                        userExists ? (
                        <AddProductReviewsComp productId={productId} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {user.isLoggedIn() ? (
                <AskQuestionComp
                  elementId="ask-question-content"
                  tabHash={tabHash}
                  productId={productId}
                  askedQuestions={askedQuestions}
                />
              ) : (
                <div className="row justify-content-center">
                  <a
                    href={`/login?ref=/product?productId=${productId}`}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Login To Ask Question
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="sidebar-overlay" />
        <div className="sidebar-toggle">
          <i className="fas fa-sliders-h" />
        </div>
        <aside className="sidebar-product col-lg-3 mobile-sidebar">
          <div className="pin-wrapper" style={{ height: "1197.34px" }}>
            <div
              className="sidebar-wrapper"
              style={{
                borderBottom: "0px none rgb(119, 119, 119)",
                width: "287.391px",
                top: "17.99px",
                position: "absolute",
              }}
            >
              <div
                className={
                  relatedProducts && relatedProducts.length
                    ? "widget widget-featured"
                    : "d-none"
                }
              >
                <h3 className="widget-title">{_labels.related()}</h3>
                <div className="widget-body">
                  <div className="owl-carousel widget-featured-products owl-loaded owl-drag">
                    <div
                      className="owl-stage-outer owl-height"
                      style={{ height: "297px" }}
                    >
                      <div
                        className="owl-stage"
                        style={{
                          transform: "translate3d(-862px, 0px, 0px)",
                          transition: "all 0.25s ease 0s",
                          width: "1725px",
                        }}
                      >
                        <div
                          className="owl-item cloned"
                          style={{ width: "287.391px" }}
                        >
                          <div className="featured-col">
                            {relatedProducts &&
                              relatedProducts.map((rp) => (
                                <RelatedProductsComp
                                  key={rp.productId}
                                  title={rp.title}
                                  price={rp.price}
                                  image={rp.image}
                                  id={rp.id}
                                  ratings={rp.averageRatings}
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="owl-nav">
                      <button
                        type="button"
                        role="presentation"
                        className="owl-prev"
                      >
                        <i className="icon-angle-left" />
                      </button>
                      <button
                        type="button"
                        role="presentation"
                        className="owl-next"
                      >
                        <i className="icon-angle-right" />
                      </button>
                    </div>
                    <div className="owl-dots disabled" />
                  </div>
                </div>
              </div>
              <div
                className={
                  otherProducts && otherProducts.length
                    ? "widget widget-featured"
                    : "d-none"
                }
              >
                <h3 className="widget-title">{_labels.others()}</h3>
                <div className="widget-body">
                  <div className="owl-carousel widget-featured-products owl-loaded owl-drag">
                    <div
                      className="owl-stage-outer owl-height"
                      style={{ height: "297px" }}
                    >
                      <div
                        className="owl-stage"
                        style={{
                          transform: "translate3d(-862px, 0px, 0px)",
                          transition: "all 0.25s ease 0s",
                          width: "1725px",
                        }}
                      >
                        <div
                          className="owl-item cloned"
                          style={{ width: "287.391px" }}
                        >
                          <div className="featured-col">
                            {otherProducts &&
                              otherProducts.map((rp) => (
                                <RelatedProductsComp
                                  key={rp.productId}
                                  title={rp.title}
                                  price={rp.price}
                                  image={rp.image}
                                  id={rp.id}
                                  ratings={rp.averageRatings}
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="owl-nav">
                      <button
                        type="button"
                        role="presentation"
                        className="owl-prev"
                      >
                        <i className="icon-angle-left" />
                      </button>
                      <button
                        type="button"
                        role="presentation"
                        className="owl-next"
                      >
                        <i className="icon-angle-right" />
                      </button>
                    </div>
                    <div className="owl-dots disabled" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
export default ProductDetailComp;
