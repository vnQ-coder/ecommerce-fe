import React from 'react';
import { pluralize } from '../../../base/utils/string';

const ShopCategoryItemComp = ({ category }) => (
  <div className="product-category">
    <a href={`search?productName=&category=${category.id}`}>
      <figure>
        <img src={category.image} className="product-img-size" />
      </figure>
      <div className="category-content">
        <h3>{category.title}</h3>
        <span>
          <mark>{category.productsCount}</mark>
          {pluralize(' product', category.productsCount)}
        </span>
      </div>
    </a>
  </div>
);
export default ShopCategoryItemComp;
