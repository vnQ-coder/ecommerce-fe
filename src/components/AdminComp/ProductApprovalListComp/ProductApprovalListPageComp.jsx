import { render } from 'react-dom';
import React from 'react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LayoutComp from '../../../shared/components/LayoutComp';
import ProductsListComp from './ProductsListComp';
import BreadCrumbComp from '../../../shared/components/BreadCrumbComp';
import { useI18n } from '../../../shared/context/i18nContext';
import RenderIfAuthenticated from '../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';
import useApiHook from '../../../shared/hooks/useApiHook';
import { getAllPendingApproveProducts } from '../../../shared/api/api';

const ProductApprovalListWrapperComp = ({ pendingApprovalProdResp }) => {
  const { _productPage, header: { _menuItems } } = useI18n();
  return (
    <main className="main">
      <BreadCrumbComp items={[
        { text: _menuItems.admin() },
        { text: _menuItems.product() },
        { text: _menuItems.approveProduct() },
      ]}
      />
      <div className="page-header">
        <div className="container">
          <h3>{_productPage.approveProduct()}</h3>
        </div>
      </div>
      <div className="container">
        <ProductsListComp pendingApprovalProdResp={pendingApprovalProdResp} />
        <div className="mb-10" />
      </div>
    </main>
  );
};
const ProductApprovalListPageComp = () => {
  const pendingApprovalProdResp = useApiHook({ apiDispatchCall: getAllPendingApproveProducts });

  return (
    <AlertProvider template={AlertTemplate}>
      <LayoutComp waitFor={pendingApprovalProdResp}>
        <RenderIfAuthenticated redirectToIfUnAuth="/" hasRoles={['admin']}>
          <ProductApprovalListWrapperComp pendingApprovalProdResp={pendingApprovalProdResp} />
        </RenderIfAuthenticated>
      </LayoutComp>
    </AlertProvider>
  );
};

render(<ProductApprovalListPageComp />, document.getElementById('react-container'));
