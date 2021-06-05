import React, { useContext } from 'react';

import { buildPathToImage } from '../../../base/utils/string';
import currency from '../../../base/utils/currency';
import OrderItemsButtonsIconClass from '../../../base/utils/OrderItemsButtonsIconClass';
import AppStateContext from '../../../shared/context/AppStateContext';
import { useI18n } from '../../../shared/context/i18nContext';
import OrderListItemsButtonsComp from './OrderListItemButtonsComp';

function OrderItemsComp({
  storeName,
  SendMessageTouserButtonCheck,
  LeaveReviewButtonCheck,
  AskaQuestionToUserButtonCheck,
  status, productId, qty, title, src, price, UserOrdersdashboardImageHeight,
  UserOrdersdashboardImageWidth, onHandleUserId, userId,
}) {
  const { _common, _common: { _labels } } = useI18n();
  const { user } = useContext(AppStateContext);

  return (
    <>
      <div className="col-sm-12 ">
        <div className="row">
          <div className="col">
            <figure
              className="mt-1"
              style={{
                width: UserOrdersdashboardImageWidth ? '200px' : '200px',
              }}
            >
              <a href={`product?productId=${productId}`}>
                <img
                  src={buildPathToImage(src)}
                  style={{ height: UserOrdersdashboardImageHeight ? '10vh' : '18vh' }}
                />
              </a>
            </figure>
          </div>
          <div className="col">
            <div className="mt-1">
              <div className="mt-1">
                <span className="font-weight-bold dashboardproductlink">
                  <a className="" href={`product?productId=${productId}`}>{title}</a>
                </span>

              </div>
            </div>
            <div className="mt-1">
              <span className="">

                <b>{_common.qty()}</b>
                :

                {qty}

                Piece

              </span>
            </div>
            <div className="mt-1 mb-1">

              <span className="product-price">{currency.turkishLira() + price}</span>

            </div>
            <div className="mt-2">
              {
                LeaveReviewButtonCheck && (user && user.user.role === 'user')
                && (
                  <OrderListItemsButtonsComp
                    OrderItemsButtonsiconClass={OrderItemsButtonsIconClass.AskQuestionToUserBtnIconClass()}
                    OrderItemsButtonstext={_labels.LeaveAReviewButton()}
                    productId={productId}
                    hrefBtnText="product-tab-reviews"
                  />
                )
              }
            </div>
            <div>
              {
                SendMessageTouserButtonCheck && (user && user.user.role === 'vendor')
                && (
                  <div>
                    <OrderListItemsButtonsComp
                      OrderItemsButtonsiconClass={OrderItemsButtonsIconClass.sendMessageToUserBtnIconClass()}
                      OrderItemsButtonstext={_labels.sendMessagesToUserButton()}
                      productId={productId}
                      onHandleUserId={onHandleUserId}
                      userId={userId}
                    />
                  </div>
                )
              }
            </div>
          </div>
          <div className="col">
            <ul>
              <li>
                <div className="mt-1 dashboardproductlink">

                  <a
                    href={`product?productId=${productId}`}
                    className="product-category "
                  >
                    <b>{_labels.store()}</b>
                    :
                    {storeName}
&nbsp;
                  </a>

                </div>
              </li>
              <li>
                <div className="OrderStatusAlignment mt-1">
                  <span>
                    <b>{_labels.orderStatus()}</b>

                    :
                    {status}
                  </span>

                </div>
              </li>
            </ul>
            {
              AskaQuestionToUserButtonCheck && (user && user.user.role === 'user')
              && (
                <div className="AskQuestionToUserBtnpadding">
                  <OrderListItemsButtonsComp
                    OrderItemsButtonstext={_labels.AskQuestionToVendorButton()}
                    OrderItemsButtonsiconClass={OrderItemsButtonsIconClass.AskQuestionToUserBtnIconClass()}
                    productId={productId}
                    hrefBtnText="product-tab-ask-question"
                  />
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderItemsComp;
