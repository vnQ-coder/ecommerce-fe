import React, { useCallback, useEffect, useState } from 'react';
import CommentDisplayComp from './CommentDisplayComp';
import RenderIfAuthenticated from '../../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';
import AskQuestionForm from './AskQuestionForm';

const AskQuestionComp = ({
  elementId, productId, askedQuestions, tabHash,
}) => {
  const [askedQuestionsList, setAskedQuestionList] = useState(askedQuestions || []);

  useEffect(() => {
    if (askedQuestions) setAskedQuestionList(askedQuestions);
  }, [askedQuestions]);

  const onAddNewQuestionHandler = (newQuestion) => {
    setAskedQuestionList((prevState) => [newQuestion, ...prevState]);
  };

  const onAddCommentReplyHandler = useCallback((threadId, commentObj) => {
    setAskedQuestionList((prevState) => prevState.map((state) => (
      state.id === threadId ? { ...state, messages: [...state.messages, commentObj] } : state
    )));
  }, []);

  return (

    <div
      className={`tab-pane fade  ${tabHash === '#product-tab-ask-question' ? 'active show' : ''}`}
      id={elementId}
      role="tabpanel"
      aria-labelledby="product-tab-reviews"
    >
      <div className="product-reviews-content">
        <div className="row justify-content-center">
          <AskQuestionForm productId={productId} onAddNewQuestion={onAddNewQuestionHandler} />
          <CommentDisplayComp askedQuestions={askedQuestionsList} onAddCommentReply={onAddCommentReplyHandler} />
        </div>
      </div>
    </div>
  );
};

export default AskQuestionComp;
