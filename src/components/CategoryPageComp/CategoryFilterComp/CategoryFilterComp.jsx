import React from 'react';
import { useI18n } from '../../../shared/context/i18nContext';

const CategoryFilterComp = ({ respCategoryProducts }) => {
  const { _common, _common: { _labels } } = useI18n();
  console.log(respCategoryProducts.body);
  return (
    <aside className="sidebar-shop col-lg-3 order-lg-first mobile-sidebar">
      <div className="pin-wrapper" style={{ height: '1096px' }}>
        <div
          className="sidebar-wrapper"
          style={{
            borderBottom: '0px none rgb(119, 119, 119)',
            width: '311.516px',
            position: 'absolute',
            top: '329.266px',
          }}
        >
          <div className="widget">
            <h3 className="widget-title">
              <a
                data-toggle="collapse"
                href="#widget-body-2"
                role="button"
                aria-expanded="true"
                aria-controls="widget-body-2"
              >
                {_labels.categories()}
              </a>
            </h3>
            <div className="collapse show" id="widget-body-2">
              <div className="widget-body">
                <ul className="cat-list">

                  {/* {!categoryCall.isLoadingResponse &&
                    categoryCall.isSuccessResponse ?
                    categoryCall.body.map(({ id, title }) =>
                    <li key={id}><input className="" type="checkbox" id={id} name={id}
                     value={id} onChange={onChangeCategoryCheckboxHandler} />{"  " + title}</li>) :
                    <li><a href="# "> value={1} {_common.loading()} {_labels.categories()}...</a></li>
                  } */}
                </ul>
              </div>
            </div>
          </div>
          <div className="widget">
            <h3 className="widget-title">
              <a
                data-toggle="collapse"
                href="#widget-body-3"
                role="button"
                aria-expanded="true"
                aria-controls="widget-body-3"
              >
                {_common.price()}
              </a>
            </h3>
            <div className="collapse show" id="widget-body-3">
              <div className="widget-body">
                <form action="#">
                  <div className="price-slider-wrapper">
                    <div id="price-slider" className="noUi-target noUi-ltr noUi-horizontal">
                      <div className="noUi-base">
                        <div className="noUi-connects">
                          <div className="noUi-connect" style={{ transform: 'translate(20%, 0px) scale(0.4, 1)' }} />
                        </div>
                        <div className="noUi-origin" style={{ transform: 'translate(-80%, 0px)', zIndex: 5 }}>
                          <div
                            className="noUi-handle noUi-handle-lower"
                            data-handle="0"
                            tabIndex="0"
                            role="slider"
                            aria-orientation="horizontal"
                            aria-valuemin="0.0"
                            aria-valuemax="50.0"
                            aria-valuenow="20.0"
                            aria-valuetext="200.00"
                          />
                        </div>
                        <div className="noUi-origin" style={{ transform: 'translate(-40%, 0px)', zIndex: 4 }}>
                          <div
                            className="noUi-handle noUi-handle-upper"
                            data-handle="1"
                            tabIndex="0"
                            role="slider"
                            aria-orientation="horizontal"
                            aria-valuemin="30.0"
                            aria-valuemax="100.0"
                            aria-valuenow="60.0"
                            aria-valuetext="600.00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="filter-price-action d-flex align-items-center justify-content-between flex-wrap">
                    <button type="submit" className="btn btn-primary">{_labels.filter()}</button>
                    <div className="filter-price-text">
                      {_common.price()}
                      :
                      <span id="filter-price-range"> $200.00 - $600.00</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="widget">
            <h3 className="widget-title">
              <a
                data-toggle="collapse"
                href="#widget-body-4"
                role="button"
                aria-expanded="true"
                aria-controls="widget-body-4"
              >
                {_labels.size()}
              </a>
            </h3>
            <div className="collapse show" id="widget-body-4">
              <div className="widget-body">
                <ul className="cat-list">
                  <li><a href="# ">{_common.small()}</a></li>
                  <li><a href="# ">{_common.medium()}</a></li>
                  <li><a href="# ">{_common.large()}</a></li>
                  <li><a href="# ">{_common.extraLarge()}</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="widget">
            <h3 className="widget-title">
              <a
                data-toggle="collapse"
                href="#widget-body-5"
                role="button"
                aria-expanded="true"
                aria-controls="widget-body-5"
              >
                {_common.brand()}
              </a>
            </h3>
            <div className="collapse show" id="widget-body-5">
              <div className="widget-body">
                <ul className="cat-list">
                  <li><a href="# ">Lorem Ipsum</a></li>
                  <li><a href="# ">Lorem Ipsum</a></li>
                  <li><a href="# ">Lorem Ipsum</a></li>
                  <li><a href="# ">Lorem Ipsum</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default CategoryFilterComp;
