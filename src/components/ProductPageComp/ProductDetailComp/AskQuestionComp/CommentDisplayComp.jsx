import React, { Fragment } from 'react';
import ReplyComp from './ReplyComp';
import CommentComp from './CommentComp/CommentComp';
import { useI18n } from '../../../../shared/context/i18nContext';

const CommentDisplayComp = ({ askedQuestions, onAddCommentReply }) => {
  const { _common: { _labels } } = useI18n();
  return (
    <div className="col-xl-12">
      { askedQuestions && askedQuestions.length
        ? (
          <ol className="comment-list">
            {
            askedQuestions.map((userComment) => (
              <Fragment key={userComment.id}>
                {
                  userComment.messages
                  && (
                  <>
                    <CommentComp
                      key={userComment.messages[0].id}
                      title={userComment.title}
                      topic={userComment.topic}
                      isPrivate={userComment.isPrivate}
                      isCurrentUser={userComment.isCurrentUser}
                      {...userComment.messages[0]}
                    />
                    {
                      userComment.messages.slice(1).map(({ id, ...rest }) => (
                        <CommentComp key={id} {...rest} isReply />
                      ))
                    }
                  </>
                  )
                }
                { userComment.isCurrentUser && (
                <div style={{ marginLeft: '88px' }}>
                  <ReplyComp threadId={userComment.id} onAddReply={onAddCommentReply} />
                </div>
                )}
              </Fragment>
            ))
}
          </ol>
        ) : <h2 className="reviews-title mt-2">{_labels.noQuestion()}</h2>}
    </div>
  );
};

export default CommentDisplayComp;
