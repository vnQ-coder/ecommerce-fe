import React, { useContext } from 'react';
import { buildPathToImage } from '../../../../../base/utils/string';
import AppStateContext from '../../../../../shared/context/AppStateContext';

function UserGuideCardComp({
  title, guides, onSetPopupHandler, idx,
}) {
  const { user } = useContext(AppStateContext);
  return (
    <>
      <h4>{title}</h4>
      <div className="row">
        {
          guides && guides.map((guide) => (
            <div className="col-lg-4 col-md-6" key={guide.id} id={guide.id}>
              <div className="card shadow card-border-top">
                <img className="card-img-top guide-image" src={buildPathToImage(guide.image)} alt="Card image" />
                <div className="card-body d-flex flex-column pl-5 pr-5">
                  <div className="text-capitalize guide-title">{guide.title}</div>

                </div>
                <div className="card-footer rounded bg-white d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#myModal"
                      className="btn btn-sm btn-outline-secondary rounded"
                      onClick={() => onSetPopupHandler(guide.id, guide.title, guide.description, idx)}
                    >
                      View
                    </button>
                    {
                      user.isAdmin() && <a href={`create-user-guides?guideId=${guide.id}`} className="btn btn-sm btn-outline-secondary rounded">Edit</a>
                    }

                  </div>
                  {/* <small className="text-muted">9 mins</small> */}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default UserGuideCardComp;
