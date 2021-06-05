import React, { useContext } from 'react';
import AppStateContext from '../../../../../shared/context/AppStateContext';

function UserGuidesPopupComp({
  title, description, guideId, onDeleteGuide, idx,
}) {
  const { user } = useContext(AppStateContext);
  return (
    <div>
      {/* The Modal */}
      <div className="modal rounded" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title text-capitalize">{title}</h4>
              <button type="button" className="close" data-dismiss="modal">×</button>
            </div>
            {/* Modal body */}
            <div className="modal-body text-capitalize ckeditor-list">
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            {/* Modal footer */}
            <div className="modal-footer">
              {
                user.isAdmin() && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm rounded"
                  data-dismiss="modal"
                  onClick={() => onDeleteGuide(guideId, idx)}
                >
                  Delete
                </button>
                )
              }
              <button type="button" className="btn btn-dark btn-sm rounded" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserGuidesPopupComp;
