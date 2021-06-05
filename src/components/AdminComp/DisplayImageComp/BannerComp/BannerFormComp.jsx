import React from 'react';
import { useAlert } from 'react-alert';
import useApiHook from '../../../../shared/hooks/useApiHook';
import useFormStateHook from '../../../../shared/hooks/useFormStateHook';
import { useI18n } from '../../../../shared/context/i18nContext';
import { postUpdateBanner } from '../../../../shared/api/api';
import appConfigs from '../../../../base/config/appConfig';

const BannerFormComp = ({
  imageNumber, firstHeading, imagePath, secondHeading, thirdHeading, forthHeading, price,onBannerUpdate
}) => {
  const { _common: { _labels }, _BannerPage } = useI18n();
  const [selectedImage, setSelectedImage] = React.useState();
  const alert = useAlert();
  const { formState, onUpdateFormState, onClearState } = useFormStateHook({
    firstHeading,
    secondHeading,
    thirdHeading,
    forthHeading,
    price,
    imageNumber,
  });
  const baseURL = appConfigs.bkUrl;
  const { dispatchCall } = useApiHook({ apiDispatchCall: postUpdateBanner, initiateOnLoad: false });

  const onSelectImageHandler = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    e.persist();
    const formData = new FormData();
    formData.append('image', selectedImage);
    Object.keys(formState).forEach((k) => formData.append(k, formState[k]));
    dispatchCall(formData).then(({ isSuccessResponse, body }) => {
      const msg = body.message;
      if (isSuccessResponse) {
        onBannerUpdate(body.banners);
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
          <div className="card-header bg-dark text-white card-header-border">{_labels.sliderImages()}</div>
          <div className="card-body p-5">
            <h3>
              {_BannerPage.banner()}

              No

              {imageNumber}
            </h3>

            <div style={{
              display: 'grid',
              placeItems: 'center',
              marginBottom: '20px',
            }}
            >
              <img src={baseURL + imagePath} alt="" width="200" height="200" />
            </div>
            <input type="hidden" name="imageNumber" value={imageNumber} />

            <label htmlFor="banner-firstHeading">
              {_labels.firstHeading()}

              <span className="required">*</span>
            </label>
            <input
              name="firstHeading"
              type="text"
              className="form-control input-field-search shadow mb-2"
              id={`banner_firstHeading_${imageNumber}`}
              required
              value={formState.firstHeading}
              onChange={onUpdateFormState}
            />

            <label htmlFor="banner-secondHeading">
              {_labels.secondHeading()}

              <span className="required">*</span>
            </label>
            <input
              name="secondHeading"
              type="text"
              className="form-control input-field-search shadow mb-2"
              id={`banner_secondHeading_${imageNumber}`}
              required
              value={formState.secondHeading}
              onChange={onUpdateFormState}
            />

            <label htmlFor="banner-thirdHeading">
              {_labels.thirdHeading()}

              <span className="required">*</span>
            </label>
            <input
              name="thirdHeading"
              type="text"
              className="form-control input-field-search shadow mb-2"
              id={`banner_thirdHeading_${imageNumber}`}
              required
              value={formState.thirdHeading}
              onChange={onUpdateFormState}
            />

            <label htmlFor="banner-forthHeading">
              {_labels.forthHeading()}

              <span className="required">*</span>
            </label>
            <input
              name="forthHeading"
              type="text"
              className="form-control input-field-search shadow mb-2"
              id={`banner_forthHeading_${imageNumber}`}
              required
              value={formState.forthHeading}
              onChange={onUpdateFormState}
            />

            <label htmlFor="banner-price">
              {_labels.price()}

              <span className="required">*</span>
            </label>
            <input
              name="price"
              type="number"
              className="form-control input-field-search shadow mb-2"
              id={`banner_price_${imageNumber}`}
              required
              value={formState.price}
              onChange={onUpdateFormState}
            />
            <input
              type="file"
              id={`banner_img_${imageNumber}`}
              name="image"
              accept="image/*"
              onChange={onSelectImageHandler}
            />
            <br />
            <br />
            <label>
              {_BannerPage.note()}
              <span className="required">*</span>
            </label>
            <ol>
              <li>
                <span className="required">*</span>
                <small>{_BannerPage.maxFileSize()}</small>
              </li>
              <li>
                <span className="required">*</span>
                <small>{_BannerPage.minImageHeight()}</small>
              </li>
              <li>
                <span className="required">*</span>
                <small>{_BannerPage.minImageWidth()}</small>
              </li>
            </ol>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center">
              <input
                id="updateBanner"
                type="button"
                onClick={onSubmitHandler}
                className="btn btn-sm btn-dark rounded"
                value={_BannerPage.updateBanner()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BannerFormComp;
