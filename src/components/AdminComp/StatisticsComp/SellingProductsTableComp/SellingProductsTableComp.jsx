import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import useFormStateHook from '../../../../shared/hooks/useFormStateHook';
import useApiHook from '../../../../shared/hooks/useApiHook';
import { useI18n } from '../../../../shared/context/i18nContext';

const SellingProductsTableComp = ({
  id, title, products, ajaxCall,
}) => {
  const reqBestSellingProducts = useApiHook({ apiDispatchCall: ajaxCall, initiateOnLoad: false });
  const [sellingProducts, setSellingProducts] = useState([]);
  const { formState, onUpdateFormState } = useFormStateHook({ fromDate: null, toDate: null });
  const alert = useAlert();

  const {
    _statistics,
  } = useI18n();

  useEffect(() => {
    if (products && Array.isArray(products) && products.length) setSellingProducts(products);
  }, [products]);

  const onFilterClickHandler = async () => {
    if (!(formState.fromDate || formState.toDate)) alert.error(_statistics.dateCannotBeEmpty());
    else if (
      (formState.fromDate && formState.toDate && formState.fromDate > formState.toDate)
      || (formState.toDate && formState.fromDate && formState.toDate < formState.fromDate)
    ) alert.error(_statistics.fromDataCannotBeSmaller());
    else {
      const resp = await reqBestSellingProducts.dispatchCall(formState);
      setSellingProducts(resp.body);
    }
  };

  return (
    <div className="container">
      <h4>{title}</h4>
      <div className="cart-table-container">
        <div className="row row-sparse">
          <div className="col-md-5">
            <div className="card">
              <div className="card-header">
                From:&nbsp;&nbsp;
                <input
                  name="fromDate"
                  className="form-control input-field-search shadow"
                  onChange={onUpdateFormState}
                  type="date"
                />
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <input type="button" value="Filter" className="btn btn-primary btn-sm rounded" onClick={onFilterClickHandler} />
          </div>
          <div className="col-md-5">
            <div className="card">
              <div className="card-header">
                To:&nbsp;&nbsp;
                <input
                  name="toDate"
                  className="form-control input-field-search shadow"
                  onChange={onUpdateFormState}
                  type="date"
                />
              </div>
            </div>
          </div>
        </div>
        <table className="table table-cart">
          <thead>
            <tr>
              <th>Product name</th>
              <th>Product ID / SKU</th>
              <th>Sold count</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              sellingProducts.map((prod, idx) => (
                <tr className="product-row" key={`${id}-${idx}`}>
                  <td>{prod.title}</td>
                  <td>{prod.id}</td>
                  <td>{prod.total}</td>
                  <td>{prod.price}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="mb-10" />
    </div>
  );
};

export default SellingProductsTableComp;
