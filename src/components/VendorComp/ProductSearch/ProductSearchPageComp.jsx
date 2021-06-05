import { render } from 'react-dom';
import React, { useState, useCallback } from 'react';
import LayoutComp from '../../../shared/components/LayoutComp';
import { useI18n } from '../../../shared/context/i18nContext';
import useApiHook from '../../../shared/hooks/useApiHook';
import { productSearchFilterByVendorId } from '../../../shared/api/api';
import ProductSearchListComp from './ProductSearchList/ProductSearchListComp';
import ProductSearchFilterComp from './ProductSearchFilter/ProductSearchFilterComp';
import RenderIfAuthenticated from '../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';
import useFormStateHook from '../../../shared/hooks/useFormStateHook';
import Pagination from './ProductSearchList/Pagination';
import BreadCrumbComp from '../../../shared/components/BreadCrumbComp';

const ProductSearchWrapperComp = () => {
  const reqProductSearch = useApiHook({
    apiDispatchCall: productSearchFilterByVendorId,
    initiateOnLoad: false,
  });
  const { _common: { _labels }, header: { _menuItems } } = useI18n();
  const { formState, onUpdateState, onClearState } = useFormStateHook({
    categoryId: '',
    productId: '',
    productCode: '',
    endDate: '',
    startDate: '',
    title: '',
    status: '',
    pageNumber: 1,
  });
  const [result, setResult] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const clearForm = () => {
    onClearState();
  };

  const onProductSearch = useCallback((body) => {
    setResult(body);
  }, []);

  const paginate = (pageNumber) => {
    reqProductSearch.dispatchCall({ ...formState, pageNumber })
      .then(({ isSuccessResponse, body }) => {
        if (isSuccessResponse) {
          onProductSearch(body.result);
        }
      });
  };

  const onHandleProductSearch = (e) => {
    e.preventDefault();
    reqProductSearch.dispatchCall(formState)
      .then(({ isSuccessResponse, body }) => {
        if (isSuccessResponse) {
          onProductSearch(body.result);
          setTotalPages(body.totalPages);
        }
      });
  };

  return (
    <main className="main">
      <BreadCrumbComp items={[
        { text: _menuItems.admin() },
        { text: _menuItems.product() },
        { text: _menuItems.productSearch() },
      ]}
      />
      <h3 className="text-center">{_labels.productSearch()}</h3>
      <ProductSearchFilterComp
        onUpdateState={onUpdateState}
        onHandleProductSearch={onHandleProductSearch}
        clearForm={clearForm}
        formState={formState}
      />
      {
        result && result.length
          ? (
            <>
              <ProductSearchListComp results={result} />
              <Pagination
                totalPages={totalPages}
                paginate={paginate}
              />
            </>
          )
          : <ProductSearchListComp noResults="No Results Found" />
      }

    </main>
  );
};
const ProductSearchPageComp = () => (
  <LayoutComp waitFor>
    <RenderIfAuthenticated redirectToIfUnAuth="/" hasRoles={['vendor', 'admin']}>
      <ProductSearchWrapperComp />
    </RenderIfAuthenticated>
  </LayoutComp>
);

render(<ProductSearchPageComp />, document.getElementById('react-container'));
