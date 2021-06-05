import React, { useContext } from 'react';
import AppStateContext from '../../../shared/context/AppStateContext';

const OrderListItemsButtonsComp = ({
  productId, OrderItemsButtonsiconClass, OrderItemsButtonstext, userId, onHandleUserId, hrefBtnText,
}) => {
  const { user } = useContext(AppStateContext);
  return (
    <>
      { (user && user.user.role === 'user')
        && (
          <div className="mt-1">
            <a
              className="OrderItemsListBtnText btn btn-dark btn-sm rounded text-white mr-1"
              href={`product?productId=${productId}#${hrefBtnText}`}
            >
              <i className={OrderItemsButtonsiconClass} />

              <span className="OrderListitemsBtnIcons">{OrderItemsButtonstext}</span>
            </a>
          </div>
        )}
      {
        (user && user.user.role === 'vendor')
        && (
          <div className="mt-1">
            <button
              href="# "
              className="OrderItemsListBtnText btn btn-dark btn-sm rounded text-white mr-1"
              onClick={() => onHandleUserId(userId)}
              data-toggle="modal"
              data-target="#OrderChatModel"
            >
              <i className={OrderItemsButtonsiconClass} />

              <span className="OrderListitemsBtnIcons">{OrderItemsButtonstext}</span>
            </button>
          </div>
        )
      }
    </>
  );
};

export default OrderListItemsButtonsComp;
