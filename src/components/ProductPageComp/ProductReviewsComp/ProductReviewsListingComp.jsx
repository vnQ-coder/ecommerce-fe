import React from 'react';

const ProductReviewsListingComp = ({
  firstName, lastName, rating, comments, created_at,
}) => {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  const ratings = rating * 20;

  return (
    <ol className="comment-list">
      <li className="comment-container">
        <div className="comment-box">
          <div className="comment-avatar">
            <img src="assets/images/avatar/avatar1.jpg" width={65} height={65} alt="avatar" />
          </div>
          <div className="ratings-container">
            <div className="product-ratings">
              <span className="ratings" style={{ width: `${ratings}%` }} />
            </div>
          </div>
          <div className="comment-info mb-1">
            <h4 className="avatar-name">
              {firstName}

              {lastName}
            </h4>

            -
            <span
              className="comment-date"
            >
              {formatter.format(Date.parse(created_at))}
            </span>
          </div>
          <div className="comment-text">
            <p>{comments}</p>
          </div>
        </div>
      </li>
    </ol>
  );
};
export default ProductReviewsListingComp;
