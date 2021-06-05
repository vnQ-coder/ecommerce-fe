import React, {
  useEffect, useContext, useState, useCallback,
} from 'react';
import { useAlert } from 'react-alert';
import useApiHook from '../../../../shared/hooks/useApiHook';
import { postVendorAnswer } from '../../../../shared/api/api';
import useFormStateHook from '../../../../shared/hooks/useFormStateHook';
import AppStateContext from '../../../../shared/context/AppStateContext';
import { useI18n } from '../../../../shared/context/i18nContext';

const UserMessagesDetailsComp = ({ messages, threadId }) => {
  const {
    _common: { _labels },
    _userMessagesPage,
  } = useI18n();
  const reqVendorAnswer = useApiHook({
    apiDispatchCall: postVendorAnswer,
    initiateOnLoad: false,
  });
  const { formState, onUpdateFormState, setFormState } = useFormStateHook({
    id: '',
    message: '',
  });
  const { user } = useContext(AppStateContext);
  const userId = user.user && user.user.id;
  const [vendorReply, setVendorReply] = useState([]);
  const alert = useAlert();

  useEffect(() => {
    if (messages) {
      setVendorReply(messages);
    }
  }, [messages]);

  const onVendorReply = useCallback((commentObj) => {
    setVendorReply((prevState) => [...prevState, commentObj]);
  }, []);

  useEffect(() => {
    if (threadId) {
      setFormState({ ...formState, id: threadId });
    }
  }, [formState]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (formState.message.length === 0 || formState.message.trim() === '') {
      alert.error(_userMessagesPage.emptyMessage());
    } else {
      reqVendorAnswer
        .dispatchCall(formState)
        .then(({ isSuccessResponse, body }) => {
          const msg = body.message;
          if (isSuccessResponse) {
            onVendorReply({
              id: body.data.messageId,
              message: body.data.message,
              created_at: body.data.postedAt,
              replierId: body.data.replierId,
              repliername: body.data.username,
            });
            setFormState({ id: threadId, message: '' });
            alert.success(msg);
          }
          if (!isSuccessResponse) {
            alert.error(msg);
          }
        });
    }
  };

  return (
    <div className="message-details-body">
      <div className="message-details-main">
        {vendorReply
          && vendorReply.map((message) => (
            <div
              className={
                message.replierId === userId ? 'chat-receiver' : 'chat-message'
              }
              key={message.messageId}
            >
              <span className="chat-name">{message.username}</span>
              {message.message}
              <span className="chat-timestamp">
                {new Date(message.created_at).toDateString()}
              </span>
            </div>
          ))}
      </div>
      <div className="message-details-footer">
        <div className="admin-send-message">
          <form onSubmit={sendMessage}>
            <input
              id="message"
              type="text"
              placeholder={_labels.message()}
              className="admin-message-input"
              name="message"
              onChange={onUpdateFormState}
              value={formState.message}
              required
            />
            <button id="submit" className="admin-send-btn" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserMessagesDetailsComp;
