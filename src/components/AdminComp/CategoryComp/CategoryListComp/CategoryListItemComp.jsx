import React from 'react';
import { useI18n } from '../../../../shared/context/i18nContext';

const CategoryListItemComp = ({
  category: {
    id, image, title, description, featured,
  },
  onItemSelected,
  onDeleteCategory,
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
            defaultChecked={featured}
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
      <td className="product-col">
        <figure className="product-image-container">
          <a href="category" className="product-image">
            <img src={image} alt="product" />
          </a>
        </figure>
      </td>
      <td>
        <b>{title}</b>
      </td>
      <td style={{ maxWidth: '150px', overflowWrap: 'break-word' }}>
        {description}
      </td>
      <td>
        <a
          href={`add-category?categoryId=${id}`}
          className="btn btn-sm btn-dark rounded"
        >
          Edit
        </a>
        <button
          className="btn btn-sm btn-danger rounded ml-2"
          data-toggle="modal"
          data-target="#deleteModel"
          onClick={() => onDeleteCategory(id)}
        >
          {_labels.delete()}
        </button>
      </td>
    </tr>
  );
};
export default CategoryListItemComp;
