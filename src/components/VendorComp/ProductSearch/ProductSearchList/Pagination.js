import React from 'react';

const Pagination = ({ postsPerPage, totalPages, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <ul
        className="pagination justify-content-end"
        style={{
          margin: '20px 0',
        }}
      >
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button type="button" onClick={() => paginate(number)} className="btn btn-dark text-white">
              {number}
            </button>
          </li>

        ))}
      </ul>
    </div>
  );
};

export default Pagination;
