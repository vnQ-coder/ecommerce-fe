import React from 'react';
import { useI18n } from '../../../../shared/context/i18nContext';

function OrderSearchFilterComp({
  clearForm, onHandleOrderSearch, onUpdateState, formState,
}) {
  const { _common: { _labels } } = useI18n();
  return (
    <div className="container">
      <div className="card shadow card-border">
        <div className="card-header bg-dark text-white card-header-border">
          {_labels.orderSearch()}
        </div>
        <div className="card-body p-5">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column">
              <label>{_labels.customerName()}</label>
              <input
                type="text"
                className="form-control input-field-search shadow"
                name="customerName"
                placeholder={_labels.customerName()}
                value={formState.customerName}
                onChange={onUpdateState}
              />
            </div>
            <div className="col-lg-6 d-flex flex-column">
              <label>{_labels.orderStatus()}</label>
              <select
                id="product-category"
                name="orderStatus"
                value={formState.orderStatus}
                onChange={onUpdateState}
                className="input-field-search-select shadow"
              >
                <option value="pending">{_labels.pending()}</option>
                <option value="shipped">{_labels.shipped()}</option>
                <option value="dispute">{_labels.dispute()}</option>
                <option value="refund">{_labels.refund()}</option>
                <option value="cancelled">{_labels.cancelled()}</option>
                <option value="processing">{_labels.processing()}</option>
              </select>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-lg-6 d-flex flex-column">
              <label>{_labels.productCode()}</label>
              <input
                type="text"
                className="form-control input-field-search shadow"
                name="productCode"
                placeholder={_labels.productCode()}
                value={formState.productCode}
                onChange={onUpdateState}
              />
            </div>
            <div className="col-lg-6 d-flex flex-column">
              <label>{_labels.orderCode()}</label>
              <input
                type="text"
                className="form-control input-field-search shadow"
                name="orderCode"
                placeholder={_labels.orderCode()}
                value={formState.orderCode}
                onChange={onUpdateState}
              />
            </div>
          </div>
          <div className="row mt-1 mb-1">
            <div className="col-lg-2 d-flex flex-column mt-3">
              <label>{_labels.payment()}</label>
            </div>
            <div className="col-lg-4 d-flex flex-column">
              <label>{_labels.start()}</label>
              <input
                type="date"
                className="form-control input-field-search shadow"
                name="startDate"
                value={formState.startDate}
                onChange={onUpdateState}
              />
            </div>
            <div className="col-lg-4 d-flex flex-column">
              <label>{_labels.end()}</label>
              <input
                type="date"
                className="form-control input-field-search shadow"
                name="endDate"
                value={formState.endDate}
                onChange={onUpdateState}
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
            onClick={onHandleOrderSearch}
          >
            {_labels.search()}
          </button>
        </div>
      </div>

    </div>
  );
}

export default OrderSearchFilterComp;
