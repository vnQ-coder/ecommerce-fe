import React, { useState } from "react";
import { useAlert } from "react-alert";
import useApiHook from "../../../../shared/hooks/useApiHook";
import useFormStateHook from "../../../../shared/hooks/useFormStateHook";
import { useI18n } from "../../../../shared/context/i18nContext";
import { postAddDisplayImage } from "../../../../shared/api/api";
import appConfigs from "../../../../base/config/appConfig";

const DisplayImagesForm = ({
  imageNumber,
  title,
  imagePath,
  description,
  btnText,
  btnLink,
  onDisplayImageUpdate
}) => {
  const {
    _common: { _labels },
    _displayImagePage,
  } = useI18n();
  const [selectedImage, setSelectedImage] = useState();
  const { formState, onUpdateFormState, onClearState } = useFormStateHook({
    title,
    btnText,
    imageNumber,
    description,
    btnLink,
  });
  const baseURL = appConfigs.bkUrl;
  const { dispatchCall } = useApiHook({
    apiDispatchCall: postAddDisplayImage,
    initiateOnLoad: false,
  });
  const alert = useAlert();

  const onSelectImageHandler = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    e.persist();
    const formData = new FormData();
    formData.append("image", selectedImage);
    Object.keys(formState).forEach((k) => formData.append(k, formState[k]));
    
    dispatchCall(formData).then(({ isSuccessResponse, body }) => {
      const msg = body.message;
      if (isSuccessResponse) {
        onDisplayImageUpdate(body.displayImages);
        alert.success(msg);
        setSelectedImage(null);
      }
      if (!isSuccessResponse) {
        alert.error(msg);
      }
    });
  };

  return (
    <div className="container">
      <div className="container">
        <div className="card shadow card-border">
          <div className="card-header bg-dark text-white card-header-border">
            {_displayImagePage.displayImage()}
          </div>
          <div className="card-body p-5">
            <h3>
              {_displayImagePage.displayImage()} No {imageNumber}
            </h3>
            <div
              style={{
                display: "grid",
                placeItems: "center",
                marginBottom: "20px",
              }}
            >
              <img src={baseURL + imagePath} alt="" width="200" height="200" />
            </div>
            <input type="hidden" name="imageNumber" value={imageNumber} />
            <label htmlFor="displayimage-title">
              {_labels.title()}

              <span className="required">*</span>
            </label>
            <input
              name="title"
              type="text"
              className="form-control input-field-search shadow mb-2"
              id={`displayimage_title_${imageNumber}`}
              required
              value={formState.title}
              onChange={onUpdateFormState}
            />

            <label htmlFor="displayimage-btnText">
              {_labels.btnText()}
              <span className="required">*</span>
            </label>
            <input
              name="btnText"
              type="text"
              className="form-control input-field-search shadow mb-2"
              id={`displayimage_btnText_${imageNumber}`}
              required
              value={formState.btnText}
              onChange={onUpdateFormState}
            />

            <label htmlFor="displayimage-btnLink">
              {_labels.btnLink()}
              <span className="required">*</span>
            </label>
            <input
              name="btnLink"
              type="text"
              className="form-control input-field-search shadow mb-2"
              id={`displayimage_btnLink_${imageNumber}`}
              required
              value={formState.btnLink}
              onChange={onUpdateFormState}
            />

            <label htmlFor="displayimage-description">
              {_labels.description()}

              <span className="required">*</span>
            </label>
            <textarea
              name="description"
              cols="30"
              rows="1"
              id={`displayimage_description_${imageNumber}`}
              className="form-control input-field-search shadow mb-2"
              required
              value={formState.description}
              onChange={onUpdateFormState}
            />

            <input
              type="file"
              id={`img_${imageNumber}`}
              name="image"
              accept="image/*"
              onChange={onSelectImageHandler}
            />
            <br />
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center">
              <input
                type="button"
                onClick={onSubmitHandler}
                className="btn btn-sm btn-dark rounded"
                value={_displayImagePage.updateDisplayImage()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DisplayImagesForm;
