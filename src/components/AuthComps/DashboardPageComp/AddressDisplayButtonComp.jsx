import React from 'react';
import { useI18n } from '../../../shared/context/i18nContext';

function AddressDisplayButtonComp({ onHandleEdit, onHandleDelete, id }) {
  const { _common: { _labels } } = useI18n();
  return (
    <>
      <div className="address-box-action clearfix">
        <button className="btn btn-sm btn-danger rounded float-right" onClick={() => onHandleDelete(id)}>
          {_labels.delete()}
        </button>
        <button className="mr-2 btn btn-sm btn-dark rounded float-right" onClick={() => onHandleEdit(id)}>
          {_labels.edit()}
        </button>
      </div>
    </>
  );
}

export default AddressDisplayButtonComp;
