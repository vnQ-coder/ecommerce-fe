import React from 'react';
import useApiHook from '../../../../shared/hooks/useApiHook';
import { getProductCategories } from '../../../../shared/api/api';
import { useI18n } from '../../../../shared/context/i18nContext';

function ProductSearchFilterComp({
  onHandleProductSearch, onUpdateState, clearForm, formState,
}) {
  const categoryCall = useApiHook({ apiDispatchCall: getProductCategories });
  const { _common, _common: { _labels } } = useI18n();
  return (
    <div className="container">
      <div className="card shadow card-border">
        <div className="card-header bg-dark text-white card-header-border">
          {_labels.productSearch()}
        </div>
        <div className="card-body p-5">
          <div className="row">
            <div className="col-lg-4 d-flex flex-column">
              <label>{_labels.categoryGroup()}</label>
              <select
                value={formState.categoryId}
                id="product-category"
                name="categoryId"
                className="mb-1 input-field-search-select shadow"
                onChange={onUpdateState}
              >

                <option value={0}>{_common.none()}</option>
                {!categoryCall.isLoadingResponse
                  && categoryCall.isSuccessResponse
                  ? categoryCall.body.map(({ id, title }) => <option key={id} value={id}>{title}</option>)
                  : (
                    <option value={1}>
                      {_common.loading()}

                      {_labels.categories()}
                      ...
                    </option>
                  )}
              </select>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-lg-4 d-flex flex-column">
              <label>{_labels.productCode()}</label>
              <input
                type="text"
                className="mb-1 form-control input-field-search shadow"
                name="productCode"
                placeholder="Product Code"
                value={formState.productCode}
                onChange={onUpdateState}
              />
            </div>
            <div className="col-lg-4 d-flex flex-column">
              <label>{_labels.nameOfTheProduct()}</label>
              <input
                type="text"
                className="mb-1 form-control input-field-search shadow"
                placeholder="Name of the Product"
                name="title"
                value={formState.title}
                onChange={onUpdateState}
              />
            </div>
            <div className="col-lg-4 d-flex flex-column">
              <label>{_labels.productStatus()}</label>
              <select
                className="mb-1 input-field-search-select shadow"
                name="status"
                onChange={onUpdateState}
                value={formState.status}
              >
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-lg-2 d-flex flex-column mt-3">
              <label>{_labels.dateOfCreation()}</label>
            </div>
            <div className="col-lg-4 d-flex flex-column">
              <label>{_labels.start()}</label>
              <input
                type="date"
                className=" mb-1 form-control input-field-search shadow"
                name="startDate"
                onChange={onUpdateState}
                value={formState.startDate}
              />
            </div>
            <div className="col-lg-4 d-flex flex-column">
              <label>{_labels.end()}</label>
              <input
                type="date"
                className="mb-1 form-control input-field-search shadow"
                name="endDate"
                onChange={onUpdateState}
                value={formState.endDate}
              />
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-center">
          <button
            className="bg-white btn-form-search"
            onClick={clearForm}
          >
            {_labels.clean()}
          </button>
          <button
            className="ml-2 btn-form-search bg-dark text-white"
            onClick={onHandleProductSearch}
          >
            {_labels.search()}
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProductSearchFilterComp;
