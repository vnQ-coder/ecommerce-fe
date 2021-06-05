import React from 'react';
import { useI18n } from '../../../shared/context/i18nContext';

function ProductListSummaryComp({
  allProducts, approved, pending, denied,
}) {
  const { _productListSummary } = useI18n();
  return (
    <div className="container">
      <div className="card">
        <div className="card-header bg-dark text-white">{_productListSummary.productListSummary()}</div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-3 p-5 d-flex justify-content-center flex-column text-center">
              {_productListSummary.allProducts()}
              <h4 className="text-info">{allProducts || 0}</h4>
            </div>
            <div className="col-lg-3 border-left p-5 d-flex justify-content-center flex-column text-center">
              {_productListSummary.approved()}
              <h4 className="text-info">{approved || 0}</h4>
            </div>
            <div className="col-lg-3 border-left p-5 d-flex justify-content-center flex-column text-center">
              {_productListSummary.pending()}
              <h4 className="text-info">{pending || 0}</h4>
            </div>
            <div className="col-lg-3 border-left p-5 d-flex justify-content-center flex-column text-center">
              {_productListSummary.denied()}
              <h4 className="text-info">{denied || 0}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListSummaryComp;
