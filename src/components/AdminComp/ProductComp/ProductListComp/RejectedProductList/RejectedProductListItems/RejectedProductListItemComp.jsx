import React from 'react';
import { buildPathToImageThumb } from '../../../../../../base/utils/string';

const RejectedProductListItemComp = ({
  images,
  price,
  title,
  rejectReason,
}) => (
  <tr>
    <td className="d-flex justify-content-center product-image-table" style={{ minWidth : '300px' }}>
      <img
        src={buildPathToImageThumb(images)}
        alt={title}
        className="rejected-product-image"
      />
    </td>
    <td style={{ minWidth : '100px' }}>{title}</td>
    <td style={{ minWidth : '100px' }}>{price}</td>
    <td style={{ minWidth : '300px' }}>{rejectReason}</td>
  </tr>
);

export default RejectedProductListItemComp;
