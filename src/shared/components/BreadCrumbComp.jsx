import React from 'react';
import PropTypes from 'prop-types';

const BreadCrumbComp = ({
  items,
}) => (
  <nav aria-label="breadcrumb" className="breadcrumb-nav">
    <div className="container">
      <ol className="breadcrumb">
        {
            items && items.map((item) => (
              <li className="breadcrumb-item active" aria-current="page" key={item.text}>{item.text}</li>
            ))
        }
      </ol>
    </div>
  </nav>
);

BreadCrumbComp.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
};

BreadCrumbComp.defaultProps = {
  items: [],
};

export default BreadCrumbComp;

{ /* <li className="breadcrumb-item"><a href="/"><i className="icon-home" /></a></li> */ }
{ /* <li className="breadcrumb-item"><a href="# " /></li> */ }
{ /* <li className="breadcrumb-item active" aria-current="page">Lorem Ipsum</li> */ }
