import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import {
  Provider as AlertProvider, useAlert,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LayoutComp from '../../../shared/components/LayoutComp';
import RenderIfAuthenticated from '../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';
import { useI18n } from '../../../shared/context/i18nContext';
import UserMessagesDetailsComp from './UserMessagesDetails/UserMessagesDetailsComp';
import UserMessagesListComp from './UserMessagesList/UserMessagesListComp';
import useApiHook from '../../../shared/hooks/useApiHook';
import { userQuestionSearchFilterByVendorId, getAllMessagesByThreadId } from '../../../shared/api/api';
import SearchUserMessages from './SearchUserMessages/SearchUserMessages';
import useFormStateHook from '../../../shared/hooks/useFormStateHook';
import Pagination from '../../VendorComp/ProductSearch/ProductSearchList/Pagination';
import BreadCrumbComp from '../../../shared/components/BreadCrumbComp';

const UserMessagesWrapperComp = () => {
  const { _userMessagesPage, header: { _menuItems } } = useI18n();
  const alert = useAlert();
  const reqUserQuestionsSearch = useApiHook({ apiDispatchCall: userQuestionSearchFilterByVendorId, initiateOnLoad: false });
  const reqAllMessages = useApiHook({ apiDispatchCall: getAllMessagesByThreadId, initiateOnLoad: false });

  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState('');
  const [result, setResult] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { formState, onUpdateState, onClearState } = useFormStateHook({
    productCode: '',
    endDate: '',
    startDate: '',
    topic: '',
    status: '',
    pageNumber: 1,
  });

  const onDisplayMessages = useCallback((body) => {
    setMessages(body);
  }, []);

  const onUserQuestionSearch = useCallback((body) => {
    setResult(body);
  }, []);

  const onHandleMessageSearch = (e) => {
    e.preventDefault();
    reqUserQuestionsSearch.dispatchCall(formState)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          onUserQuestionSearch(body.result);
          setTotalPages(body.totalCount);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };

  const clearForm = () => {
    onClearState();
  };

  const messagesHandler = (threadId) => {
    reqAllMessages.dispatchCall({ threadId })
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          onDisplayMessages(body.result);
          setThreadId(body.threadId);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };

  const paginate = (pageNumber) => {
    reqUserQuestionsSearch.dispatchCall({ ...formState, pageNumber })
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          onUserQuestionSearch(body.result);
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };

  return (
    <main className="main">
      <BreadCrumbComp items={[
        { text: _menuItems.admin() },
        { text: _menuItems.userMessage() },
        { text: _menuItems.userMessage() },
      ]}
      />

      <div className="container">
        <h3 className="text-center mb-5">{_userMessagesPage.userMessages()}</h3>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SearchUserMessages
              onUpdateState={onUpdateState}
              formState={formState}
              onHandleMessageSearch={onHandleMessageSearch}
              clearForm={clearForm}
            />
          </div>
        </div>
        <div className={result && result.length ? 'row' : 'd-none'}>
          <div className="col-lg-4 list-view">
            <UserMessagesListComp
              results={result}
              onMessagesHandler={messagesHandler}
            />
            <Pagination
              totalPages={totalPages}
              paginate={paginate}
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
                : <h2 className="text-center user-message-detail">Click on any message to display</h2>
            }
          </div>
        </div>
      </div>
    </main>
  );
};

const UserMessagesPageComp = () => (
  <AlertProvider template={AlertTemplate}>
    <LayoutComp waitFor>
      <RenderIfAuthenticated redirectToIfUnAuth="/" hasRoles={['admin', 'vendor']}>
        <UserMessagesWrapperComp />
      </RenderIfAuthenticated>
    </LayoutComp>
  </AlertProvider>
);

render(<UserMessagesPageComp />, document.getElementById('react-container'));
