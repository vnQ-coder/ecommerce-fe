import { render } from 'react-dom';
import React, { useState, useCallback } from 'react';
import LayoutComp from '../../../shared/components/LayoutComp';
import { useI18n } from '../../../shared/context/i18nContext';
import useApiHook from '../../../shared/hooks/useApiHook';
import { orderSearchFilterByVendorId } from '../../../shared/api/api';
import OrderSearchListComp from './OrderSearchList/OrderSearchListComp';
import OrderSearchFilterComp from './OrderSearchFilter/OrderSearchFilterComp';
import RenderIfAuthenticated from '../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';
import useFormStateHook from '../../../shared/hooks/useFormStateHook';
import Pagination from '../ProductSearch/ProductSearchList/Pagination';
import BreadCrumbComp from '../../../shared/components/BreadCrumbComp';

const OrderSearchWrapperComp = () => {
  const reqOrderSearch = useApiHook({
    apiDispatchCall: orderSearchFilterByVendorId,
    initiateOnLoad: false,
  });
  const { _common: { _labels }, header: { _menuItems } } = useI18n();
  const { formState, onUpdateState, onClearState } = useFormStateHook({
    customerName: '',
    orderStatus: '',
    productCode: '',
    orderCode: '',
    startDate: '',
    endDate: '',
    pageNumber: 1,

  });
  const [result, setResult] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const clearForm = () => {
    onClearState();
  };

  const onOrderSearch = useCallback((body) => {
    setResult(body);
  }, []);

  const paginate = (pageNumber) => {
    reqOrderSearch.dispatchCall({ ...formState, pageNumber })
      .then(({ isSuccessResponse, body }) => {
        if (isSuccessResponse) {
          onOrderSearch(body.result);
        }
      });
  };

  const onHandleOrderSearch = (e) => {
    e.preventDefault();
    reqOrderSearch.dispatchCall(formState)
      .then(({ isSuccessResponse, body }) => {
        if (isSuccessResponse) {
          onOrderSearch(body.result);
          setTotalPages(body.totalPages);
        }
      });
  };

  return (
    <main className="main">
      <BreadCrumbComp items={[
        { text: _menuItems.admin() },
        { text: _menuItems.userOrders() },
        { text: _menuItems.orderSearch() },
      ]}
      />
      <h3 className="text-center">{_labels.orderSearch()}</h3>
      <OrderSearchFilterComp
        onUpdateState={onUpdateState}
        onHandleOrderSearch={onHandleOrderSearch}
        clearForm={clearForm}
        formState={formState}
      />
      {
        result && result.length
          ? (
            <>
              <OrderSearchListComp results={result} />
              <Pagination
                totalPages={totalPages}
                paginate={paginate}
              />
            </>
          )
          : <OrderSearchListComp noResults="No Results Found" />
      }

    </main>
  );
};
const OrderSearchPageComp = () => (
  <LayoutComp waitFor>
    <RenderIfAuthenticated redirectToIfUnAuth="/" hasRoles={['vendor', 'admin']}>
      <OrderSearchWrapperComp />
    </RenderIfAuthenticated>
  </LayoutComp>
);

render(<OrderSearchPageComp />, document.getElementById('react-container'));
