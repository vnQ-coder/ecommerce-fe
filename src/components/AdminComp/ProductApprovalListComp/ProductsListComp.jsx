import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import useApiHook from '../../../shared/hooks/useApiHook';
import { useI18n } from '../../../shared/context/i18nContext';
import ProductRejectReasonDialog from './ProductRejectReasonDialog';
import AlertComp from '../../../shared/components/UI/AlertMsgComp';
import { getAllPendingApproveProducts, postApproveProduct, postRejectProduct } from '../../../shared/api/api';
import ProductListItemComp from './ProductListItemComp';

const ProductsListComp = ({ pendingApprovalProdResp }) => {
  const { _common, _common: { _labels }, _productPage } = useI18n();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showReasonDialogIfId, setShowReasonDialogId] = useState(null);
  const [msg, setMessage] = useState({ msgType: 'success', msg: null });
  const { body, setBody } = pendingApprovalProdResp;
  const reqApproveProd = useApiHook({ apiDispatchCall: postApproveProduct, initiateOnLoad: false });
  const reqRejectProd = useApiHook({ apiDispatchCall: postRejectProduct, initiateOnLoad: false });
  const alert = useAlert();

  const onUpdateDataByResp = (productId) => ({ isSuccessResponse, body }) => {
    const msg = body.message;
    if (isSuccessResponse) {
      setBody((prevState) => ({
        products: prevState.products
          .filter((prod) => {
            if (Array.isArray(productId)) return !productId.includes(prod.id);
            return productId !== prod.id;
          }),
      }));
      setShowReasonDialogId(null);
      setSelectedProducts([]);
      alert.success(msg);
    }
    if (!isSuccessResponse) {
      alert.error(msg);
    }
  };

  const onApproveProductHandler = (productId) => {
    reqApproveProd.dispatchCall(productId).then(onUpdateDataByResp(productId));
  };

  const onRejectClickHandler = (productId, reason) => {
    reqRejectProd.dispatchCall(productId, reason).then(onUpdateDataByResp(productId));
  };

  const onAddSelectedProductHandler = (selected, productId) => {
    if (selected) setSelectedProducts((prevState) => [...prevState, productId]);
    else setSelectedProducts((prevState) => prevState.filter((pid) => pid !== productId));
  };

  return (
    <>
      {msg.msg && <AlertComp msg={msg.msg} />}
      <ProductRejectReasonDialog
        rejId={showReasonDialogIfId}
        onCloseClick={() => setShowReasonDialogId(null)}
        onRejectClick={onRejectClickHandler}
      />
      <div className="cart-table-container">
        <table className="table table-cart">
          <thead>
            <tr>
              <th>{_labels.select()}</th>
              <th>{_labels.image()}</th>
              <th>{_labels.title()}</th>
              <th>{_labels.description()}</th>
              <th>{_common.price()}</th>
              <th>{_labels.approve()}</th>
            </tr>
          </thead>
          <tbody>
            {body && body.products && body.products.length ? body.products.map(({
              id, title, description, price, image,
            }) => (
              <ProductListItemComp
                key={id}
                id={id}
                images={image}
                title={title}
                description={description}
                price={price}
                onApproveClick={onApproveProductHandler}
                onRejectClick={setShowReasonDialogId}
                onItemSelected={onAddSelectedProductHandler}
              />
            ))
              : (
                <tr>
                  <td colSpan="6"><h3 className="mt-2">{_productPage.noProducts()}</h3></td>
                </tr>
              )}
          </tbody>
          {selectedProducts.length ? (
            <tfoot>
              <tr>
                <td colSpan="6" className="clearfix">
                  <div className="float-right">
                    <button
                      className="btn btn-outline-secondary btn-clear-cart"
                      onClick={() => setShowReasonDialogId(selectedProducts)}
                    >
                      {_labels.reject()}

                      {_labels.selected()}
                    </button>
                    <button
                      id="approveSelected"
                      className="btn btn-outline-secondary btn-update-cart"
                      onClick={() => onApproveProductHandler(selectedProducts)}
                    >
                      {_labels.approve()}

                      {_labels.selected()}
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          ) : <></>}
        </table>
      </div>
    </>
  );
};

export default ProductsListComp;
