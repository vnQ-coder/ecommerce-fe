import React from 'react';
import { useAlert } from 'react-alert';
import useFormStateHook from '../../../../shared/hooks/useFormStateHook';
import useApiHook from '../../../../shared/hooks/useApiHook';
import { postCommentReply } from '../../../../shared/api/api';

const ReplyComp = ({ onAddReply, threadId }) => {
  const reqUserQuestion = useApiHook({ apiDispatchCall: postCommentReply, initiateOnLoad: false });
  const { formState, onClearState, onUpdateFormState } = useFormStateHook({ message: '' });
  const alert = useAlert();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    reqUserQuestion.dispatchCall(threadId, formState.message)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          onAddReply(threadId,
            { id: body.data.messageId, message: formState.message, postedAt: new Date().toDateString() });
          onClearState();
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };

  return (
    <form action="#" className="mt-1" onSubmit={onSubmitHandler}>
      <div className="footer-submit-wrapper d-flex">
        <input
          className="form-control form-control-sm"
          placeholder="Reply to comment..."
          size="40"
          required
          style={{ margin: 0 }}
          name="message"
          value={formState.message}
          onChange={onUpdateFormState}
        />
        <button type="submit" className="btn btn-dark btn-sm" style={{ width: '140px' }}>Reply</button>
      </div>
    </form>
  );
};

export default ReplyComp;
