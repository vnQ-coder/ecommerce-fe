import React from 'react';
import { useI18n } from '../../../shared/context/i18nContext';

const CategoryToolbarComp = () => {
  const { _common, _common: { _labels } } = useI18n();

  return (
    <nav className="toolbox">
      <div className="toolbox-left">
        <div className="toolbox-item toolbox-sort">
          <label>
            {_common.sortBy()}
            :
          </label>
          <div className="select-custom">
            <select name="orderby" className="form-control">
              <option value="menu_order" defaultValue="menu_order">{_labels.defaultSorting()}</option>
              <option value="popularity">{_labels.sortByPopularity()}</option>
              <option value="rating">{_labels.sortByAverageRating()}</option>
              <option value="date">{_labels.sortByNewness()}</option>
              <option value="price">{_labels.sortByPriceLowToHigh()}</option>
              <option value="price-desc">{_labels.sortByPriceHighToLow()}</option>
            </select>
          </div>
        </div>
      </div>
      <div className="toolbox-right">
        <div className="toolbox-item toolbox-show">
          <label>
            {_common.show()}
            :
          </label>
          <div className="select-custom">
            <select name="count" className="form-control">
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <div className="toolbox-item layout-modes">
          <a href="category" className="layout-btn btn-grid active" title="Grid">
            <i className="icon-mode-grid" />
          </a>
          <a href="category-list" className="layout-btn btn-list" title="List">
            <i className="icon-mode-list" />
          </a>
        </div>
      </div>
    </nav>
  );
};
export default CategoryToolbarComp;
