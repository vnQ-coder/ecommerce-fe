import React from "react";
import { useI18n } from "../../../shared/context/i18nContext";
import { buildPathToImageThumb } from "../../../base/utils/string";

const ProductListItemComp = ({
  id,
  images,
  title,
  description,
  price,
  onApproveClick,
  onRejectClick,
  onItemSelected,
}) => {
  const {
    _common: { _labels },
  } = useI18n();
  return (
    <tr className="product-row">
      <td>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            onChange={(e) => onItemSelected(e.target.checked, id)}
            className="custom-control-input"
            id={`approval-item-${id}`}
          />
          <label
            className="custom-control-label"
            htmlFor={`approval-item-${id}`}
          >
            &nbsp;
          </label>
        </div>
      </td>
      <td className="d-flex justify-content-center">
        <img
          src={buildPathToImageThumb(images)}
          alt={title}
          className="rejected-product-image"
        />
      </td>
      <td>
        <b>{title}</b>
      </td>
      <td style={{ maxWidth: "150px", overflowWrap: "break-word" }}>
        {description}
      </td>
      <td>{price}</td>
      <td>
        <button
          id="approve"
          type="button"
          className="btn btn-dark btn-sm rounded"
          onClick={() => onApproveClick(id)}
        >
          {_labels.approve()}
        </button>
        <span>&nbsp;&nbsp;</span>
        <button
          type="button"
          className="btn btn-dark btn-sm rounded"
          onClick={() => onRejectClick(id)}
        >
          {_labels.reject()}
        </button>
      </td>
    </tr>
  );
};

export default ProductListItemComp;
