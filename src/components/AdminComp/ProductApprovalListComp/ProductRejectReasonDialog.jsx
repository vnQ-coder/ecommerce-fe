import React from 'react';
import useFormStateHook from '../../../shared/hooks/useFormStateHook';
import { useI18n } from '../../../shared/context/i18nContext';

const ProductRejectReasonDialog = ({ rejId, onCloseClick, onRejectClick }) => {
  const { _common: { _labels } } = useI18n();
  const { onUpdateState, formState } = useFormStateHook();

  return (
    <div
      className={`modal fade ${rejId ? 'show' : ''}`}
      id="addCartModal"
      tabIndex={-1}
      role="dialog"
      style={{ display: 'block', paddingRight: '17px' }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body add-cart-box text-center">
            <h4 id="productTitle">
              {_labels.reason()}
              ?
            </h4>
            <div className="form-group required-field">
              <label>
                {_labels.enterBriefDesc()}
                :
              </label>
              <textarea name="reason" cols="30" rows="1" className="form-control" onChange={onUpdateState} />
            </div>
            <div className="btn-actions">
              <button
                className="btn-primary btn-sm rounded"
                onClick={() => onRejectClick(rejId, formState.reason)}
              >
                {_labels.reject()}
              </button>
              <button className="btn-primary" data-dismiss="modal" onClick={onCloseClick}>{_labels.close()}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRejectReasonDialog;
