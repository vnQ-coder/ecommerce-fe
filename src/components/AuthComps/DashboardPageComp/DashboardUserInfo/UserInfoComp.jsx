import React from 'react';
import { useI18n } from '../../../../shared/context/i18nContext';
import { buildPathToImage } from '../../../../base/utils/string';

function UserInfoComp({ userRecord, onHandleEdit }) {
  const {
    _dashboardPage,
    _common: { _labels },
  } = useI18n();
  return (
    <div className="card shadow card-border">
      <div className="card-header bg-dark text-white card-header-border">
        {_dashboardPage.contactInfo()}
        <a
          href="# "
          onClick={onHandleEdit}
          id="editUserInfo"
          className="card-edit text-white"
        >
          <i className="icon-edit" />
        </a>
      </div>
      <div className="card-body p-5">
        <h5 className="text-center"><u>{_labels.userProfile()}</u></h5>
        <div className="row border card-address">
          <div className="col-lg-4 p-5 d-flex justify-content-center">
            <img
              src={((userRecord && userRecord.image && userRecord.image.path) === null) ? '/assets/images/avatar/avatar.png' : buildPathToImage(userRecord.image)}
              className="rounded-circle"
              alt="User Profile"
              width="100"
              height="100"
            />
          </div>
          <div className="col-lg-8 user-info">
            <p>
              <label>
                {_labels.firstName()}
                :
              </label>
              {userRecord && userRecord.firstName}
            </p>
            <p>
              <label>
                {_labels.lastName()}
                :
              </label>
              {userRecord && userRecord.lastName}
            </p>
            <p>
              <label>
                {_labels.emailAddress()}
                :
              </label>
              {userRecord && userRecord.email}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserInfoComp;
