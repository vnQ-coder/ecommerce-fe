// @TODO: Remove ref and reimplement page logic
import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { useI18n } from '../../../shared/context/i18nContext';
import useApiHook from '../../../shared/hooks/useApiHook';
import { postAllProductsByFilter } from '../../../shared/api/api';
import FeatureProductItemComp from '../../HomePageComp/FeatureProductsComp/FeatureProductItemComp';
import FeatureProductQuickView from '../../HomePageComp/FeatureProductsComp/FeatureProductQuickView';

const SearchFilterComp = ({ categoryCall }) => {
  const formRef = useRef();
  const [quickViewDetails, setQuickViewDetails] = useState(null);
  const [products, setProduct] = useState();
  const [searchProductName] = useState();
  const [searchProductCategories] = useState([new URLSearchParams(window.location.search).get('category')]);
  const [totalPages, setTotalPages] = useState();
  const [selected, setSelected] = useState(1);
  let [allRatedProducts, setAllRatedProducts] = useState([0, 0, 0, 0, 0, 0]);
  const [filterQuery, setFilterQuery] = useState({
    searchProductName: '',
    searchCategories: [],
    singleCatagory: '',
    productPrices: [100, 200000],
    pageNumber: 1,
    productsPerPage: 12,
    userRating: 6,
    getAll: false,
  });

  let PagesToShow = [];
  if (totalPages < 6) {
    for (let i = 1; i <= totalPages; i++) {
      PagesToShow.push(i);
    }
  } else {
    PagesToShow = [1, 2, 3, 4, 5];
  }

  const { _common, _common: { _labels } } = useI18n();
  const { dispatchCall } = useApiHook({ apiDispatchCall: postAllProductsByFilter, initiateOnLoad: false });
  const categoryId = new URLSearchParams(window.location.search).get('category');

  const fetchProductsOnFilter = useCallback(() => {
    let tempFilterQuery = filterQuery;
    tempFilterQuery.getAll = true;
    setFilterQuery(tempFilterQuery);

    dispatchCall(filterQuery).then(({ isSuccessResponse, body }) => {
      // setRespMsg({error: !isSuccessResponse, msg: body.message});
      if (isSuccessResponse) {
        allRatedProducts = [0, 0, 0, 0, 0, 0];
        body && body.map((product) => {
          if (product.averageRatings >= 0 && product.averageRatings < 1) {
            const tempArray = allRatedProducts;
            tempArray[0] += 1;
            setAllRatedProducts(tempArray);
          } else if (product.averageRatings >= 1 && product.averageRatings < 2) {
            const tempArray = allRatedProducts;
            tempArray[1] += 1;
            setAllRatedProducts(tempArray);
          } else if (product.averageRatings >= 2 && product.averageRatings < 3) {
            const tempArray = allRatedProducts;
            tempArray[2] += 1;
            setAllRatedProducts(tempArray);
          } else if (product.averageRatings >= 3 && product.averageRatings < 4) {
            const tempArray = allRatedProducts;
            tempArray[3] += 1;
            setAllRatedProducts(tempArray);
          } else if (product.averageRatings >= 4 && product.averageRatings < 5) {
            const tempArray = allRatedProducts;
            tempArray[4] += 1;
            setAllRatedProducts(tempArray);
          } else if (product.averageRatings === 5) {
            const tempArray = allRatedProducts;
            tempArray[5] += 1;
            setAllRatedProducts(tempArray);
          }
        });

        let tempNoOfPages = parseInt(body.length / filterQuery.productsPerPage);
        if (tempNoOfPages === 0) {
          tempNoOfPages = 1;
        }
        setTotalPages(tempNoOfPages);
      }
    });

    tempFilterQuery = filterQuery;
    tempFilterQuery.getAll = false;
    setFilterQuery(tempFilterQuery);

    dispatchCall(filterQuery).then(({ isSuccessResponse, body }) => {
      if (isSuccessResponse) {
        setProduct(body);
      }
    });
  });

  useEffect(() => {
    if (categoryId) {
      const tempFilterQuery = filterQuery;
      tempFilterQuery.searchCategories.push(categoryId);
      setFilterQuery(tempFilterQuery);
    }
    fetchProductsOnFilter();
  }, [categoryId, filterQuery]);

  useEffect(() => {
    const productName = new URLSearchParams(window.location.search).get('productName');
    if (productName) {
      const tempFilterQuery = filterQuery;
      tempFilterQuery.searchProductName = productName;
      setFilterQuery(tempFilterQuery);
    }

    fetchProductsOnFilter();
  }, [filterQuery, searchProductName, searchProductCategories]);

  const fetchProductsOnPagination = (tempPageNumber) => {
    dispatchCall(filterQuery).then(({ isSuccessResponse, body }) => {
      if (isSuccessResponse) {
        if (body.length > 0) {
          setProduct(body);
        } else {
          const tempFilterQuery = filterQuery;
          tempFilterQuery.pageNumber = tempPageNumber;
          setFilterQuery(tempFilterQuery);
          fetchProductsOnFilter();
        }
      }
    });
  };

  const onChangeCategoryCheckboxHandler = (e) => {
    const tempFilterQuery = filterQuery;
    if (e.target.checked) {
      tempFilterQuery.searchCategories.push(e.target.value);
    } else {
      tempFilterQuery.searchCategories.splice(tempFilterQuery.searchCategories.indexOf(e.target.value), 1);
    }
    setFilterQuery(tempFilterQuery);
  };

  const onChangePriceFilterHandler = (e) => {
    const tempFilterQuery = filterQuery;
    if (e.target.id === 'lowerPriceLimit') {
      tempFilterQuery.productPrices[0] = parseInt(e.target.value);
    } else if (e.target.id === 'upperPriceLimit') {
      tempFilterQuery.productPrices[1] = parseInt(e.target.value);
    }
    setFilterQuery(tempFilterQuery);
    fetchProductsOnFilter();
  };

  const onNextPageHandler = (e) => {
    setSelected(parseInt(selected) + 1);

    const tempFilterQuery = filterQuery;
    const tempPageNumber = tempFilterQuery.pageNumber;
    if (tempFilterQuery.pageNumber < totalPages) {
      tempFilterQuery.pageNumber += 1;
    }
    setFilterQuery(tempFilterQuery);
    fetchProductsOnPagination(tempPageNumber);
  };

  const onPreviousPageHandler = (e) => {
    setSelected(parseInt(selected) - 1);

    const tempFilterQuery = filterQuery;
    const tempPageNumber = tempFilterQuery.pageNumber;
    tempFilterQuery.pageNumber -= 1;
    setFilterQuery(tempFilterQuery);
    fetchProductsOnPagination(tempPageNumber);
  };

  const onSpecificPageHandler = (e) => {
    setSelected(e.target.value);

    const tempFilterQuery = filterQuery;
    const tempPageNumber = tempFilterQuery.pageNumber;
    tempFilterQuery.pageNumber = parseInt(e.target.value);
    setFilterQuery(tempFilterQuery);
    fetchProductsOnPagination(tempPageNumber);
  };

  const reset = (e) => {
    e.preventDefault();
    console.log(formRef, '[formRef]');
    console.log('pressed');

    const tempFilterQuery = filterQuery;
    tempFilterQuery.searchCategories = [];
    tempFilterQuery.productPrices = [100, 200000];
    tempFilterQuery.userRating = 6;
    setFilterQuery(tempFilterQuery);
    fetchProductsOnFilter();
  };

  const onChangeShowProductsPerPageHandler = (e) => {
    const tempFilterQuery = filterQuery;
    tempFilterQuery.productsPerPage = parseInt(e.target.value);
    tempFilterQuery.pageNumber = 1;
    setFilterQuery(tempFilterQuery);
    fetchProductsOnFilter();
  };

  const onUserRatingHandler = (e) => {
    const tempFilterQuery = filterQuery;
    tempFilterQuery.userRating = parseInt(e.target.value);
    setFilterQuery(tempFilterQuery);
    fetchProductsOnFilter();
  };

  const onSetQuickViewHandler = (details, images, reviews) => {
    setQuickViewDetails({ details, images, reviews });
  };

  const onCloseHandler = () => {
    setQuickViewDetails(null);
  };

  let paginationComponent;

  if (filterQuery.pageNumber <= 3) {
    paginationComponent = (
      <ul className="pagination toolbox-item">
        {PagesToShow.map((totalProduct) => (
          <li
            className={`page-item ${selected === totalProduct ? 'active' : 'page-link'}`}
            key={totalProduct}
            value={totalProduct}
            onClick={onSpecificPageHandler}
          >
            {totalProduct}
          </li>
        ))}

        <li className="page-item"><span className="page-link">...</span></li>
        <li className="page-item page-link page-link-btn" onClick={onNextPageHandler}><i className="icon-angle-right" /></li>
      </ul>
    );
  } else {
    if ((filterQuery.pageNumber + 1) < totalPages) {
      PagesToShow = [filterQuery.pageNumber - 2, filterQuery.pageNumber - 1,
      filterQuery.pageNumber, filterQuery.pageNumber + 1, filterQuery.pageNumber + 2];
    } else if ((filterQuery.pageNumber) < totalPages) {
      PagesToShow = [filterQuery.pageNumber - 3, filterQuery.pageNumber - 2,
      filterQuery.pageNumber - 1, filterQuery.pageNumber, filterQuery.pageNumber + 1];
    } else if ((filterQuery.pageNumber - 1) < totalPages) {
      PagesToShow = [filterQuery.pageNumber - 4, filterQuery.pageNumber - 3,
      filterQuery.pageNumber - 2, filterQuery.pageNumber - 1, filterQuery.pageNumber];
    }

    paginationComponent = (
      <ul className="pagination toolbox-item">
        <li className="page-item page-link page-link-btn" onClick={onPreviousPageHandler}>
          <i className="icon-angle-left" />
        </li>
        <li className="page-item"><span className="page-link">...</span></li>
        {PagesToShow.map((totalProduct) => (
          <li
            className={`page-item ${selected === totalProduct ? 'active' : 'page-link'}`}
            key={totalProduct}
            value={totalProduct}
            onClick={onSpecificPageHandler}
          >
            {totalProduct}
          </li>
        ))}

        <li className="page-item"><span className="page-link">...</span></li>
        <li className="page-item page-link page-link-btn" onClick={onNextPageHandler}><i className="icon-angle-right" /></li>
      </ul>
    );
  }

  return (
    <form ref={formRef} action="#">
      <main className="main">

        <div className="container mb-3">
          <div className="row row-sparse">
            <div className="col-lg-9 main-content">
              <div className="row">
                {
                  products && products.map((product) => (
                    <FeatureProductItemComp
                      key={product.id}
                      product={product}
                      images={product.image}
                      id={product.id}
                      onSetQuickViewDetails={onSetQuickViewHandler}
                    />
                  ))
                }
              </div>
              <nav className="toolbox toolbox-pagination">
                <div className="toolbox-item toolbox-show">
                  <label>Show:</label>
                  <div className="select-custom">
                    <select name="count" className="form-control" onChange={onChangeShowProductsPerPageHandler}>
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                      <option value={36}>36</option>
                    </select>
                  </div>
                </div>
                {paginationComponent}
              </nav>
            </div>
            <div className="sidebar-overlay" />
            <div className="sidebar-toggle"><i className="fas fa-sliders-h" /></div>

            <aside className="sidebar-shop col-lg-3 order-lg-first mobile-sidebar">

              <div className="pin-wrapper" style={{ height: '863px' }}>
                <div className="sidebar-wrapper" style={{ borderBottom: '0px none rgb(119, 119, 119)', width: '209.438px' }}>

                  <button onClick={reset}>reset</button>
                  <div className="widget">
                    <h3 className="widget-title">
                      <a
                        data-toggle="collapse"
                        href="#widget-body-2"
                        role="button"
                        aria-expanded="true"
                        aria-controls="widget-body-2"
                      >
                        Categories
                      </a>
                    </h3>
                    <div className="collapse show" id="widget-body-2">
                      <div className="widget-body">
                        <ul className="cat-list">

                          {categoryId
                            ? !categoryCall.isLoadingResponse
                              && categoryCall.isSuccessResponse
                              ? categoryCall.body.map(({ id, title }) => (
                                <li key={id}>
                                  <input
                                    type="checkbox"
                                    id={id}
                                    // defaultChecked={id === categoryId ? true : false}
                                    value={id === categoryId}
                                    onChange={onChangeCategoryCheckboxHandler}
                                    name="category"
                                  />
                                  {`  ${title}`}
                                </li>
                              ))
                              : (
                                <li>
                                  <a href="# ">

                                    value=
                                    {1}

                                    {_common.loading()}

                                    {_labels.categories()}
                                    ...
                                  </a>
                                </li>
                              )
                            : !categoryCall.isLoadingResponse
                              && categoryCall.isSuccessResponse
                              ? categoryCall.body.map(({ id, title }) => (
                                <li key={id}>
                                  <input
                                    className=""
                                    type="checkbox"
                                    id={id}
                                    name={id}
                                    value={id}
                                    onChange={onChangeCategoryCheckboxHandler}
                                  />
                                  {`  ${title}`}
                                </li>
                              ))
                              : (
                                <li>
                                  <a href="# ">

                                    value=
                                    {1}

                                    {_common.loading()}

                                    {_labels.categories()}
                                    ...
                                  </a>
                                </li>
                              )}

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
                        Price
                      </a>
                    </h3>
                    <div className="collapse show" id="widget-body-3">
                      <div className="widget-body">
                        <form action="#">
                          <div className="filter-price-action d-flex align-items-center justify-content-between flex-wrap">
                            <div className="filter-price-text">
                              Price:
                              <span id="filter-price-range"> TL </span>
                              <input
                                className="search-filter-price-input"
                                type="number"
                                id="lowerPriceLimit"
                                value={filterQuery.productPrices[0]}
                                onChange={onChangePriceFilterHandler}
                              />
                              <span id="filter-price-range"> - TL </span>
                              <input
                                className="search-filter-price-input"
                                type="number"
                                id="upperPriceLimit"
                                value={filterQuery.productPrices[1]}
                                onChange={onChangePriceFilterHandler}
                              />
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
                        href="#widget-body-5"
                        role="button"
                        aria-expanded="true"
                        aria-controls="widget-body-5"
                      >
                        Product Note
                      </a>
                    </h3>
                    <div className="collapse show" id="widget-body-5">
                      <div className="widget-body">
                        <ul className="cat-list" onChange={onUserRatingHandler}>

                          <div className="ratings-container">
                            <input className="" type="radio" value="5" name="averageUserRating" />
                            <div className="product-ratings">

                              <span className="ratings" style={{ width: `${100}%` }} />
                            </div>
                            <a href="# " className="rating-link">
                              (
                              {allRatedProducts[5]}

                              {'Products'}
                              )
                            </a>
                          </div>

                          <div className="ratings-container">
                            <input className="" type="radio" value="4" name="averageUserRating" />
                            <div className="product-ratings">
                              <span className="ratings" style={{ width: `${80}%` }} />
                            </div>
                            <a href="# " className="rating-link">
                              (
                              {allRatedProducts[4]}

                              {'Products'}
                              )
                            </a>
                          </div>

                          <div className="ratings-container">
                            <input className="" type="radio" value="3" name="averageUserRating" />
                            <div className="product-ratings">
                              <span className="ratings" style={{ width: `${60}%` }} />
                            </div>
                            <a href="# " className="rating-link">
                              (
                              {allRatedProducts[3]}

                              {'Products'}
                              )
                            </a>
                          </div>

                          <div className="ratings-container">
                            <input className="" type="radio" value="2" name="averageUserRating" />
                            <div className="product-ratings">
                              <span className="ratings" style={{ width: `${40}%` }} />
                            </div>
                            <a href="# " className="rating-link">
                              (
                              {allRatedProducts[2]}

                              {'Products'}
                              )
                            </a>
                          </div>

                          <div className="ratings-container">
                            <input className="" type="radio" value="1" name="averageUserRating" />
                            <div className="product-ratings">
                              <span className="ratings" style={{ width: `${20}%` }} />
                            </div>
                            <a href="# " className="rating-link">
                              (
                              {allRatedProducts[1]}

                              {'Products'}
                              )
                            </a>
                          </div>

                          <div className="ratings-container">
                            <input className="" type="radio" value="0" name="averageUserRating" />
                            <div className="product-ratings">
                              <span className="ratings" style={{ width: `${0}%` }} />
                            </div>
                            <a href="# " className="rating-link">
                              (
                              {allRatedProducts[0]}

                              {'Products'}
                              )
                            </a>
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
        <FeatureProductQuickView
          quickViewDetails={quickViewDetails}
          onClose={onCloseHandler}
        />
      </main>

    </form>
  );
};
export default SearchFilterComp;
