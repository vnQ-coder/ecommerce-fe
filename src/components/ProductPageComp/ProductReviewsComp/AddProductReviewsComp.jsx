import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import useApiHook from '../../../shared/hooks/useApiHook';
import useFormStateHook from '../../../shared/hooks/useFormStateHook';
import { useI18n } from '../../../shared/context/i18nContext';
import { addProductReviews } from '../../../shared/api/api';

const AddProductReviewsComp = ({ productId }) => {
  const { _common, _common: { _labels } } = useI18n();
  const { formState, onUpdateFormState, onUpdateStateByKey } = useFormStateHook({ productId });
  const reqPostProductReviews = useApiHook({ apiDispatchCall: addProductReviews, initiateOnLoad: false });
  const [disableForm, setDisableForm] = useState(false);
  const [respMsg, setRespMsg] = useState({ error: false, msg: '' });
  const alert = useAlert();

  const onSubmitHandler = () => {
    reqPostProductReviews.dispatchCall(formState)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          setDisableForm(true);
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };

  return (
    !disableForm ? (
      <div className="card shadow card-border">
        <div className="card-header bg-dark text-white card-header-border">{_common.addAReview()}</div>
        <div className="card-body p-5">
          <div className="rating-form">
            <input type="hidden" value={formState.productId} name="productId" onChange={onUpdateFormState} />
            <label htmlFor="rating">
              {_common.yourRating()}

              <span className="required">*</span>
            </label>
            <span
              className="rating-stars"
              onClick={(e) => onUpdateStateByKey('rating', e.target.getAttribute('data-rating'))}
            >
              <a className="star-1" href="# " data-rating={1} title={_common.veryPoor()}>1</a>
              <a className="star-2" href="# " data-rating={2} title={_common.notThatBad()}>2</a>
              <a className="star-3" href="# " data-rating={3} title={_common.average()}>3</a>
              <a className="star-4" href="# " data-rating={4} title={_common.good()}>4</a>
              <a className="star-5" href="# " data-rating={5} title={_common.perfect()}>5</a>
            </span>
          </div>

          <label>
            {_common.yourReview()}

            <span className="required">*</span>
          </label>
          <textarea
            cols={5}
            rows={6}
            name="comments"
            className="form-control input-field-textarea shadow  mb-2"
            placeholder="Comment here"
            defaultValue=""
            onChange={onUpdateFormState}
          />
        </div>
        <div className="card-footer d-flex justify-content-center">
          <button className="btn btn-dark btn-sm rounded" onClick={onSubmitHandler}>{_labels.submit()}</button>
        </div>
      </div>
    ) : ''
  );
};
export default AddProductReviewsComp;
