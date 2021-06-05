import React from 'react';
import { useI18n } from '../../../../shared/context/i18nContext';

function SearchUserMessages({
  formState, onUpdateState, clearForm, onHandleMessageSearch,
}) {
  const { _common, _common: { _labels } } = useI18n();
  return (
    <div className="card shadow card-border">
      <div className="card-header bg-dark text-white card-header-border">
        {_labels.answer()}
      </div>
      <div className="card-body p-5">
        <div className="row mt-1">
          <div className="col-lg-12 d-flex flex-column">
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
        </div>
        <div className="row mt-1">
          <div className="col-lg-6 d-flex flex-column">
            <label>{_labels.topic()}</label>
            <select
              className="input-field-search-select shadow"
              name="topic"
              value={formState.topic}
              onChange={onUpdateState}
            >
              <option value="product">{_labels.product()}</option>
              <option value="cargo">{_labels.cargo()}</option>
              <option value="cancel">{_labels.cancel()}</option>
              <option value="change">{_labels.change()}</option>
              <option value="return">{_labels.return()}</option>
              <option value="pay back">{_labels.payBack()}</option>
            </select>
          </div>
          <div className="col-lg-6 d-flex flex-column">
            <label>{_labels.status()}</label>
            <select
              className="input-field-search-select shadow"
              name="status"
              value={formState.status}
              onChange={onUpdateState}
            >
              <option value="false">{_labels.public()}</option>
              <option value="true">{_labels.private()}</option>
            </select>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-lg-4 d-flex flex-column">
            <label>{_labels.questionDate()}</label>
            <select className="input-field-search-select shadow" readOnly>
              <option>{_labels.dateOfQuestion()}</option>
            </select>
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
          onClick={onHandleMessageSearch}
        >
          {_labels.search()}
        </button>
      </div>
    </div>
  );
}

export default SearchUserMessages;
