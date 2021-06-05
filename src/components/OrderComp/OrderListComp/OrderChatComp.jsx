import React, { useRef, useState, useCallback } from 'react';
import UserMessagesDetailsComp from '../../AdminComp/UserMessagesComp/UserMessagesDetails/UserMessagesDetailsComp';
import UserMessagesListComp from '../../AdminComp/UserMessagesComp/UserMessagesList/UserMessagesListComp';
import useApiHook from '../../../shared/hooks/useApiHook';
import { getAllMessagesByThreadId } from '../../../shared/api/api';
import { useI18n } from '../../../shared/context/i18nContext';

const OrderChatComp = ({ id, record }) => {
  const closeBtnRef = useRef();
  const reqAllMessages = useApiHook({ apiDispatchCall: getAllMessagesByThreadId, initiateOnLoad: false });

  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState('');
  const { _userOrdersPage, header: { _menuItems } } = useI18n();
  const result = record;
  // const alert=useAlert();

  const onDisplayMessages = useCallback((body) => {
    setMessages(body);
  }, []);

  const messagesHandler = (threadId) => {
    reqAllMessages.dispatchCall({ threadId })
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          onDisplayMessages(body.result);
          setThreadId(body.threadId);
          // alert.success(msg)
        }
        if (!isSuccessResponse) {
          // alert.error(msg)
        }
      });
  };

  return (
    <div className="modal fade" id={id} tabIndex={-1} role="dialog" aria-labelledby="addressModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="text-center mb-5">

              {_menuItems.userMessage()}
            </h3>
            <h3 className="modal-title" id="addressModalLabel" />
            <button ref={closeBtnRef} className="d-none" data-dismiss="modal" />
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className={result && result.length ? 'row' : 'd-none'}>
              <div className="col-lg-4 list-view">
                <UserMessagesListComp
                  results={result}
                  onMessagesHandler={messagesHandler}
                />
              </div>
              <div className="col-lg-8">
                {
                  messages.length ? (
                    <UserMessagesDetailsComp
                      messages={messages}
                      threadId={threadId}
                    />
                  )
                    : <h2 className="text-center user-message-detail">{_userOrdersPage.messageDisplay()}</h2>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderChatComp;
