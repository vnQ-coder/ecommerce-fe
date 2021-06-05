import React, { useContext } from 'react';
import AppStateContext from '../../../../shared/context/AppStateContext';
import { buildPathToImageThumb } from '../../../../base/utils/string';

const ProductListItemComp = ({
  product: {
    id, title, description, price, productCode, featured, productStatus,
  }, images, onItemSelected, onDeleteProduct,
}) => {
  const { user } = useContext(AppStateContext);
  return (
    <tr className="product-row">
      {
        user.isAdmin()
        && (
          <td>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                defaultChecked={featured}
                onChange={(e) => onItemSelected(e.target.checked, id)}
                className="custom-control-input"
                id={`approval-item-${id}`}
              />
              <label className="custom-control-label" htmlFor={`approval-item-${id}`}>&nbsp;</label>
            </div>
          </td>
        )
      }
      {
        user.isVendor()
        && (
          <td>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                defaultChecked={productStatus === 'disable'}
                onChange={(e) => onItemSelected(productStatus, id)}
                className="custom-control-input"
                id={`approval-item-${id}`}
              />
              <label className="custom-control-label" htmlFor={`approval-item-${id}`}>&nbsp;</label>
            </div>
          </td>
        )
      }
      <td className="product-col">
        <figure className="product-image-container">

          <div id={`demo-${id}`} className="carousel slide" data-ride="carousel" style={{ height: '200px' }}>
            <div className="carousel-inner">
              <a href={`product?productId=${id}`}>

                <img
                  src={buildPathToImageThumb(images)}
                  alt="product"
                  width={200}
                  height={200}
                />

              </a>
            </div>

          </div>

        </figure>
      </td>
      <td>
        <b>{productCode}</b>
      </td>
      <td>
        <b>{title}</b>
      </td>
      <td style={{ maxWidth: '150px', overflowWrap: 'break-word' }}>{description}</td>
      <td>{price}</td>
      <td>
        <a href={`add-product?productId=${id}`} className="btn btn-primary btn-sm rounded">Edit</a>
        <button
          className="btn btn-danger btn-sm rounded ml-2"
          onClick={() => onDeleteProduct(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductListItemComp;
