import React from 'react';
import { buildPathToImage } from '../../../base/utils/string';
import currency from '../../../base/utils/currency';

function RelatedProductsComp({
  title, price, image, id, ratings,
}) {
  const averageRatings = ratings * 20;
  return (
    <>
      <div className="product-default left-details product-widget">
        <figure>
          <a href={`product?productId=${id}`}>
            <img src={buildPathToImage(image)} />
          </a>
        </figure>
        <div className="product-details">
          <h5 className="product-title">
            <a href={`product?productId=${id}`}>{title}</a>
          </h5>
          <div className="ratings-container">
            <div className="product-ratings">
              {
                ratings === 0
                  ? <span className="ratings" style={{ width: '0%' }} />
                  : <span className="ratings" style={{ width: `${averageRatings}%` }} />
              }
              <span className="tooltiptext tooltip-top" />
            </div>
          </div>
          <div className="price-box">
            <span className="product-price">{currency.turkishLira() + price}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default RelatedProductsComp;
