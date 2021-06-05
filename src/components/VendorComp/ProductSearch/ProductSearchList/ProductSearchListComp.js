import React from 'react';
import { buildPathToImage } from '../../../../base/utils/string';
import { useI18n } from '../../../../shared/context/i18nContext';

function ProductSearchListComp({ results, noResults }) {
  const { _common: { _labels } } = useI18n();
  return (
    <div className="container">
      <table className="shadow table table-lg table-bordered
      table-responsive-lg table-responsive-md table-responsive-sm table-responsive-xs text-center"
      >
        <thead>
          <tr className="bg-dark text-white">
            <th className="p-4">{_labels.image()}</th>
            <th className="p-4">{_labels.productName()}</th>
            <th className="p-4">{_labels.price()}</th>
            <th className="p-4">{_labels.categoryName()}</th>
            <th className="p-4">{_labels.productOwner()}</th>
            <th className="p-4">{_labels.productCode()}</th>
            <th className="p-4">{_labels.productStatus()}</th>
          </tr>
        </thead>
        <tbody>
          {
            !noResults ? results.map((r) => (

              <tr key={r.productId}>
                <td className="d-flex justify-content-center">
                  <img
                    src={buildPathToImage(r.image)}
                    alt={r.productTitle}
                    style={{
                      height: '150px',
                      width: '150px',
                    }}
                  />
                </td>
                <td className="cell-padding-search-product">{r.productTitle}</td>
                <td className="cell-padding-search-product">{r.price}</td>
                <td className="cell-padding-search-product">{r.categoryTitle}</td>
                <td className="cell-padding-search-product">{r.username}</td>
                <td className="cell-padding-search-product">{r.productCode}</td>
                <td className="cell-padding-search-product">{r.status}</td>
              </tr>

            ))
              : (
                <tr>
                  <td colSpan={6} className="p-5"><h4 className="text-center">{_labels.noResult()}</h4></td>
                </tr>
              )

          }
        </tbody>

      </table>
    </div>
  );
}

export default ProductSearchListComp;
