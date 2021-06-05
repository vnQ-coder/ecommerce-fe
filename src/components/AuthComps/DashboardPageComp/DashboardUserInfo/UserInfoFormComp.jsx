import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useI18n } from '../../../../shared/context/i18nContext';
import useApiHook from '../../../../shared/hooks/useApiHook';
import { updateUserInfoByUserId } from '../../../../shared/api/api';
import useFormStateHook from '../../../../shared/hooks/useFormStateHook';
import AddCatImageComp from '../../../AdminComp/CategoryComp/AddCatImageComp/AddCatImageComp';
import { buildPathToImage } from '../../../../base/utils/string';

function UserInfoFormComp({
  userInfo,
  setInfoVisible,
  setInfoFormVisible,
  onUserRecordChange,
}) {
  const [respMsg, setRespMsg] = useState({ error: false, msg: '' });
  const reqUpdateUserInfo = useApiHook({
    apiDispatchCall: updateUserInfoByUserId,
    initiateOnLoad: false,
  });
  const {
    _common: { _labels }, _dashboardPage,
  } = useI18n();
  const { formState, onUpdateState, setFormState } = useFormStateHook({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    imageId: '',
    userId: '',
  });
  const [selectedImage, setSelectedImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const alert = useAlert();

  useEffect(() => {
    setFormState({
      firstName: userInfo && userInfo.firstName,
      lastName: userInfo && userInfo.lastName,
      email: userInfo && userInfo.email,
      password: userInfo && userInfo.password,
      imageId: userInfo && userInfo.userImageId === null ? '1' : userInfo.userImageId,
      userId: userInfo && userInfo.id,
    });
  }, [setFormState, userInfo]);

  const onSelectImageHandler = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setSelectedImage(e.target.files[0]);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedImage);
    Object.keys(formState).forEach((k) => formData.append(k, formState[k]));

    reqUpdateUserInfo
      .dispatchCall(formData)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          onUserRecordChange(body);
          setInfoFormVisible(false);
          setInfoVisible(true);
          alert.success(msg || _dashboardPage.profileUpdated());
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <div className="card shadow card-border">
        <div className="card-header bg-dark text-white card-header-border">
          {_labels.editUserProfile()}
        </div>
        <div className="card-body p-5">
          <label htmlFor="register-firstName">
            {_labels.firstName()}
            <span className="required">*</span>
          </label>
          <input
            name="firstName"
            type="text"
            className="form-control input-field-search shadow mb-2"
            id="register-firstName"
            placeholder={_labels.firstName()}
            required
            value={formState.firstName}
            onChange={onUpdateState}
          />

          <label htmlFor="register-lastName">
            {_labels.lastName()}

            <span className="required">*</span>
          </label>
          <input
            name="lastName"
            type="text"
            className="form-control input-field-search shadow mb-2"
            id="register-lastName"
            required
            placeholder={_labels.lastName()}
            value={formState.lastName}
            onChange={onUpdateState}
          />

          <label htmlFor="register-email">
            {_labels.emailAddress()}

            <span className="required">*</span>
          </label>
          <input
            name="email"
            type="email"
            className="form-control input-field-search shadow mb-2"
            id="register-email"
            required
            placeholder={_labels.emailAddress()}
            value={formState.email}
            onChange={onUpdateState}
          />

          <label htmlFor="register-email">
            {_labels.password()}

            <span className="required">*</span>
          </label>
          <input
            name="password"
            type="password"
            className="form-control input-field-search shadow mb-2"
            id="register-password"
            required
            placeholder={_labels.password()}
            value={formState.password}
            onChange={onUpdateState}
          />

          <AddCatImageComp
            onSelectImageHandler={onSelectImageHandler}
            src={
              userInfo && userInfo.userImageId
                ? buildPathToImage(userInfo.image)
                : '/assets/images/placeholder/Untitled.png'
            }
            imagePreview={imagePreview}
          />
        </div>
        <div className={`cst-form-${respMsg.error ? 'error' : 'success'}`}>{respMsg.msg}</div>
        <div className="card-footer">
          <div className="d-flex justify-content-center">
            <input
              type="submit"
              className="btn btn-sm btn-dark rounded"
              value={_labels.update()}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default UserInfoFormComp;
