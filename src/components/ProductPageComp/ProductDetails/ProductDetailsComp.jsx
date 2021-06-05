import React from 'react';
import PropTypes from 'prop-types';
import { useI18n } from '../../../shared/context/i18nContext';
import currency from '../../../base/utils/currency';

function ProductDetails({
  productReviews, productReviewsLength, productQty, productCode, title, price, description,
}) {
  const { _common, _common: { _labels } } = useI18n();
  const rating = productReviews ? (productReviews.map((dp) => dp.rating)) : '';
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const sumOfRating = rating ? (rating.reduce(reducer, 0)) : '';
  const totalUsers = rating ? (rating.length) : '';
  const averageRating = sumOfRating / totalUsers;
  const ratings = averageRating * 20;
  return (
    <div>
      <h1 className="product-title">{title}</h1>
      <div className="ratings-container">
        <div className="product-ratings">
          {
            !ratings ? (
              <span
                className="ratings"
                style={{ width: '0%' }}
              />
            ) : (
              <span
                className="ratings"
                style={{ width: `${ratings}%` }}
              />
            )
          }
        </div>
        <a href="# " className="rating-link">
          (
          {productReviewsLength}

          {_common.reviews()}
          )
        </a>
      </div>
      <hr className="short-divider" />
      <div className="price-box">
        <span className="product-price">{currency.turkishLira() + price}</span>
      </div>
      <div className="product-desc">
        <p className="textBreak">{description}</p>
        <p>{`${_labels.productCode()}: ${productCode}`}</p>
      </div>
      <ul className="single-info-list">
        <li>
          {_common.availability()}
          :
          <strong>{productQty >= 1 ? _common.available() : <font color="red">{_common.outOfStock()}</font>}</strong>
        </li>
      </ul>
    </div>
  );
}

ProductDetails.propTypes = {
  productReviews: PropTypes.string.isRequired,
  productReviewsLength: PropTypes.number.isRequired,
  productQty: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProductDetails;
