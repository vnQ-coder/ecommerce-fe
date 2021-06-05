import React from 'react';
import { useAlert } from 'react-alert';
import useApiHook from '../../../../shared/hooks/useApiHook';
import { postUserQuestion } from '../../../../shared/api/api';
import { useI18n } from '../../../../shared/context/i18nContext';
import useFormStateHook from '../../../../shared/hooks/useFormStateHook';

const topics = [
  'Product',
  'Cargo',
  'Cancel',
  'Change',
  'Return',
  'Pay back',
  'Other',
];

const AskQuestionForm = ({ productId, onAddNewQuestion }) => {
  const reqUserQuestion = useApiHook({
    apiDispatchCall: postUserQuestion,
    initiateOnLoad: false,
  });
  const {
    _common: { _labels },
  } = useI18n();
  const alert = useAlert();
  const { formState, onClearState, onUpdateFormState } = useFormStateHook({
    productId,
    topic: 'product',
    title: '',
    message: '',
    isPrivate: false,
  });

  const onSubmitFormHandler = (e) => {
    e.preventDefault();

    reqUserQuestion
      .dispatchCall(formState)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          const { threadId, messageId } = body.data;
          const {
            title, topic, message, isPrivate,
          } = formState;
          onAddNewQuestion({
            id: threadId,
            title,
            topic,
            username: 'You',
            isPrivate,
            isCurrentUser: true,
            messages: [
              {
                id: messageId,
                message,
                postedAt: new Date().toDateString(),
              },
            ],
          });
          onClearState();
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };
  return (
    <div className="col-xl-12" id={productId}>
      <div className="add-product-review">
        <form
          action="#"
          className="comment-form m-0"
          onSubmit={onSubmitFormHandler}
        >
          <h3 className="review-title">{_labels.write()}</h3>
          <div className="row">
            <div className="col-md-6 col-xl-12">
              <div className="form-group form-group-sm">
                <label>
                  {_labels.topic()}
                  *
                </label>
                <div className="select-custom">
                  <select
                    className="form-control form-control-sm"
                    name="topic"
                    value={formState.topic}
                    required
                    onChange={onUpdateFormState}
                  >
                    {topics.map((topic) => (
                      <option
                        key={topic.toLowerCase()}
                        value={topic.toLowerCase()}
                      >
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-12">
              <div className="form-group">
                <label>
                  {_labels.questionTitle()}
                  *
                </label>
                <input
                  id="title"
                  type="text"
                  className="form-control form-control-sm"
                  required
                  value={formState.title}
                  name="title"
                  onChange={onUpdateFormState}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>
              {_labels.question()}
              *
            </label>
            <textarea
              id="message"
              cols={5}
              rows={6}
              className="form-control form-control-sm"
              required
              value={formState.message}
              name="message"
              onChange={onUpdateFormState}
            />
          </div>
          <div>
            <label>
              {_labels.visibleTo()}
              :
            </label>
            <div className="form-group form-inline">
              <label className="form-control radio-inline">
                <input
                  type="radio"
                  required
                  value="true"
                  name="isPrivate"
                  onChange={onUpdateFormState}
                />
                &nbsp;
                {_labels.me()}
              </label>
              <label className="form-control radio-inline mt-0">
                <input
                  type="radio"
                  defaultChecked
                  required
                  value="false"
                  name="isPrivate"
                  onChange={onUpdateFormState}
                />
                &nbsp;
                {_labels.everyone()}
              </label>
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-dark ls-n-15"
            value={_labels.submit()}
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestionForm;
