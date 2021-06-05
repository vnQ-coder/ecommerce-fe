import React, { useContext } from 'react';
import { useI18n } from '../../../shared/context/i18nContext';
import useApiHook from '../../../shared/hooks/useApiHook';
import { getAllProductReviews, getProductImagesById, getProductDetailsById } from '../../../shared/api/api';
import { buildPathToImageThumb } from '../../../base/utils/string';
import AppStateContext from '../../../shared/context/AppStateContext';
import currency from '../../../base/utils/currency';

const FeatureProductItemComp = ({
  product, images, id, onSetQuickViewDetails,
}) => {
  const { Cart } = useContext(AppStateContext);
  const { _common } = useI18n();
  const productId = id;
  const productReviewsRes = useApiHook({ apiDispatchCall: getAllProductReviews, initiateOnLoadCallData: productId });
  const productImagesRes = useApiHook({ apiDispatchCall: getProductImagesById, initiateOnLoadCallData: productId });
  const productDetailsRes = useApiHook({ apiDispatchCall: getProductDetailsById, initiateOnLoadCallData: productId });
  const productImages = productImagesRes.body;
  const productDetails = productDetailsRes.body;
  const productReviews = productReviewsRes.body;

  const onAddCartItemHandler = ({
    id, title, price, productQty, image,
  }) => {
    Cart.onAddCartItem({
      id, title, price, stock: productQty, img: buildPathToImageThumb(image),
    });
  };

  return (
    <div className="col-6 col-sm-4 col-md-3 col-xl-2">
      <div className="product-default inner-quickview inner-icon">
        <figure>
          <a href={`product?productId=${id}`}>
            <img
              src={buildPathToImageThumb(images)}
              alt="product"
            />
          </a>
          <div className="label-group">
            {/* <span className="product-label label-sale">-{product.discount || 0}%</span> */}
          </div>
          {
            product.productQty === 0 ? ''
              : (
                <div className="btn-icon-group">
                  <button
                    className="btn-icon btn-add-cart"
                    data-toggle="modal"
                    data-target="#addCartModal"
                    onClick={() => onAddCartItemHandler(product)}
                  >
                    <i className="icon-shopping-cart" />
                  </button>
                </div>
              )
          }

          <button
            type="button"
            className="btn-quickview"
            data-toggle="modal"
            data-target="#myModal"
            onClick={() => onSetQuickViewDetails(productDetails, productImages, productReviews)}
          >
            Quick View
          </button>

        </figure>

        <div className="product-details">
          <div className="category-wrap">
            <div className="category-list">
              <a href="category" className="product-category">{product.category}</a>
            </div>
          </div>
          <h3 className="product-title">
            <a href={`product?productId=${id}`}>{product.title}</a>
          </h3>
          <div className="ratings-container">
            <div className="product-ratings">
              {
                product.averageRatings === 0 ? <span className="ratings" style={{ width: '0%' }} />
                  : <span className="ratings" style={{ width: `${product.averageRatings * 20}%` }} />
              }
              <span className="tooltiptext tooltip-top" />
            </div>
          </div>
          <div className="price-box">
            <span className="product-price">{currency.turkishLira() + product.price}</span>
          </div>
          <div className="price-box">
            <span className="product-price">
              {product.productQty === 0 && <font color="red">{_common.outOfStock()}</font>}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};
export default FeatureProductItemComp;
