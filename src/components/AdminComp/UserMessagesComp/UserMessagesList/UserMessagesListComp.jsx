import React from 'react';

function UserMessagesListComp({ results, onMessagesHandler }) {
  return (
    <>
      {
            results && results.map((r) => (
              <div className="user-messages-list-body" key={r.threadId} onClick={() => onMessagesHandler(r.threadId)}>
                <img
                  src="assets/images/avatar/avatar2.jpg"
                  className="rounded-circle"
                  width={65}
                  height={65}
                  alt="avatar"
                />
                <div className="user-messages-main">
                  <div className="user-messages-header">
                    <div className="username">{r.username}</div>
                    <div className="question-time">{new Date(r.created_at).toDateString()}</div>
                  </div>
                  <div className="user-messages-body">
                    <div className="question-title">{r.title}</div>
                    <div className="question-topic">
                      (
                      {r.topic}
                      )
                    </div>
                  </div>
                </div>
              </div>

            ))
         }

    </>
  );
}

export default UserMessagesListComp;
