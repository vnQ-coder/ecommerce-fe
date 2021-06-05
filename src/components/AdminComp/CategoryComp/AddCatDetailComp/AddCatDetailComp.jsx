import React from 'react';
import { useI18n } from '../../../../shared/context/i18nContext';

function AddCatDetailComp({
  onUpdateState, title, description, id,
}) {
  const { _common, _common: { _labels } } = useI18n();
  return (
    <>
      <label htmlFor="category-title">
        {_labels.title()}

        <span className="required">*</span>
      </label>
      <input
        name="title"
        type="text"
        className="form-control input-field-search shadow mb-2"
        id={`category-title_${id}`}
        required
        value={title}
        placeholder="Category Title"
        onChange={onUpdateState}
      />

      <label htmlFor="category-description">
        {_labels.description()}

        <span className="required">*</span>
      </label>
      <textarea
        name="description"
        cols="30"
        rows="1"
        id={`category-decription_${id}`}
        placeholder="Category Description"
        className="form-control input-field-textarea shadow  mb-2"
        required
        value={description}
        onChange={onUpdateState}
      />
    </>
  );
}

export default AddCatDetailComp;
