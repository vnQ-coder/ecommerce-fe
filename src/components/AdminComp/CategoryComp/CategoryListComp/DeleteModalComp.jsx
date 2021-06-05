import React from 'react';
import { useI18n } from '../../../../shared/context/i18nContext';

const DeleteModalComp = ({ id, categoryId, onHandlePopUp }) => {
  const { _categoryPage } = useI18n();

  return (
    <div className="modal fade" id={id} tabIndex={-1} role="dialog">
      <div className="modal-dialog" style={{ marginTop: '20%' }} role="document">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <h3 className="modal-title">{_categoryPage.wantToDelete()}</h3>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary btn-sm rounded ml-2" data-dismiss="modal">No</button>
              <button
                type="button"
                className="btn btn-sm btn-danger rounded ml-2"
                data-dismiss="modal"
                style={{ backgroundColor: 'red' }}
                onClick={() => onHandlePopUp(categoryId)}
              >
                Yes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default DeleteModalComp;
