import './CommentCompStyles.css';
import React from 'react';
import clsx from 'clsx';

const CommentComp = ({
  message, title, topic, isPrivate, isCurrentUser, username, postedAt, isReply,
}) => (
  <li className={clsx('comment-container comment-comp', { 'comment-reply': isReply })}>
    <div className="comment-avatar" style={{ flex: '0 1 auto' }}>
      <span className="comment-logo">
        {!isReply ? 'Q' : 'R'}
        :
      </span>
    </div>
    <div className="comment-box w-100">
      <div className="comment-info mb-1">
        {!isReply
          && (
            <>
              <h4 className="avatar-name">
                {title}

              </h4>
              (
              {topic}
              )&nbsp;
              {isPrivate && <span className="private-tag">Private</span>}
            </>
          )}
      </div>
      <div className="comment-text pl-3">
        <p className="mb-0 line-height-1">{message}</p>
      </div>
      <p className="comment-meta">
        <span>
          Comment By:
          {username}
        </span>
        <span>{new Date(postedAt).toDateString()}</span>
      </p>
    </div>
  </li>
);

export default CommentComp;
