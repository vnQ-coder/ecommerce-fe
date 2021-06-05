import React from 'react';
import { useI18n } from '../context/i18nContext';

const PaginationComp = () => {
  const { _common } = useI18n();

  return (
    <nav className="toolbox toolbox-pagination">
      <div className="toolbox-item toolbox-show">
        <label>
          {_common.show()}
          :
        </label>
        <div className="select-custom">
          <select name="count" className="form-control">
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
          </select>
        </div>
      </div>
      <ul className="pagination toolbox-item">
        <li className="page-item active">
          <a className="page-link" href="# ">
            1
            <span className="sr-only">
              (
              {_common.current()}
              )
            </span>
          </a>
        </li>
        <li className="page-item"><a className="page-link" href="# ">2</a></li>
        <li className="page-item"><a className="page-link" href="# ">3</a></li>
        <li className="page-item"><a className="page-link" href="# ">4</a></li>
        <li className="page-item"><a className="page-link" href="# ">5</a></li>
        <li className="page-item"><span className="page-link">...</span></li>
        <li className="page-item">
          <a className="page-link page-link-btn" href="# "><i className="icon-angle-right" /></a>
        </li>
      </ul>
    </nav>
  );
};
export default PaginationComp;
