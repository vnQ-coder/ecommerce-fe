import React, { useEffect } from 'react';
import { useI18n } from '../../../shared/context/i18nContext';
import { buildPathToImage, buildPathToImageThumb } from '../../../base/utils/string';
import CartQuantityComp from '../../../shared/components/UI/CartQuantityComp';
import currency from '../../../base/utils/currency';

function FeatureProductQuickView({
  quickViewDetails, onClose,
}) {
  const { details, images, reviews } = quickViewDetails || {};
  const { _common, _common: { _labels } } = useI18n();
  const rating = reviews ? (reviews.map((dp) => dp.rating)) : '';
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const sumOfRating = rating ? (rating.reduce(reducer, 0)) : '';
  const totalUsers = rating ? (rating.length) : '';
  const averageRating = sumOfRating / totalUsers;
  const ratings = averageRating * 20;

  useEffect(() => {
    if (quickViewDetails) {
      BootstrapActions.owlCarousels();
      BootstrapActions.quantityInputs();
    }
  }, [quickViewDetails]);

  return (
    <div>
      <div
        className="modal"
        id="myModal"
        onClick={(e) => {
          if (e.target.id === 'myModal') onClose();
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              {quickViewDetails && (
                <div className="product-single-container product-single-default product-quick-view">
                  <div className="row row-sparse">
                    <div className="col-lg-6 product-single-gallery">
                      <div className="product-slider-container">
                        <div className="product-single-carousel owl-carousel owl-theme">
                          {images && images.map((pi) => (
                            <div className="product-item" key={`${pi.id}.${pi.ext}`}>
                              <img
                                alt={pi.id}
                                className="product-single-image"
                                src={buildPathToImage(pi)}
                                data-zoom-image={buildPathToImage(pi)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="prod-thumbnail owl-dots" id="carousel-custom-dots">
                        {images && images.map((pi) => (
                          <div className="owl-dot" key={pi.id}>
                            <img src={buildPathToImageThumb(pi)} alt={pi.id} style={{ maxWidth: '150px' }} height="auto" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6 product-single-details">
                      <h1 className="product-title">{details && details.title}</h1>
                      <div className="ratings-container">
                        <div className="product-ratings">
                          {
                            !ratings ? <span className="ratings" style={{ width: '0%' }} />
                              : <span className="ratings" style={{ width: `${ratings}%` }} />
                          }
                        </div>
                        <a href="# " className="rating-link">
                          (
                          {reviews && reviews.length}

                          {_common.reviews()}
                          )
                        </a>
                      </div>
                      <div className="price-box">
                        <span className="product-price">
                          {currency.turkishLira()}
                          {details && details.price}
                        </span>
                      </div>
                      <div className="product-desc">
                        <p>
                          {details && details.description}
                        </p>
                      </div>
                      <div className="product-desc">
                        <p>
                          {_labels.productCode()}
                          :
                          {details && details.productCode}
                        </p>
                      </div>
                      <ul className="single-info-list">
                        <li>
                          {_common.availability()}
                          :

                          <strong>
                            {details && details.productQty >= 1 ? _common.available()
                              : <font color="red">{_common.outOfStock()}</font>}
                          </strong>
                        </li>
                      </ul>
                      {
                        details && details.productQty === 0 ? ''
                          : (
                            <>
                              <hr className="divider" />
                              {details && images && (
                                <CartQuantityComp
                                  productDetails={{ ...details, img: buildPathToImageThumb(images[0]) }}
                                />
                              )}
                            </>
                          )
                      }
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProductQuickView;
