import React, { useContext, useState } from 'react';
import { useAlert } from 'react-alert';
import { buildPathToImage } from '../../../base/utils/string';
import AppStateContext from '../../../shared/context/AppStateContext';
import useFormStateHook from '../../../shared/hooks/useFormStateHook';
import currency from '../../../base/utils/currency';
import OrderItemsComp from './OrderItemsComp';

import { useI18n } from '../../../shared/context/i18nContext';
import OrderChatComp from './OrderChatComp';
import useApiHook from '../../../shared/hooks/useApiHook';
import { getMessagesByUserId } from '../../../shared/api/api';

const OrderListItemComp = ({
  dashboardImageHeight, src, userId, title, price, cargoTitle, shipmentNumber, link, qty, storeName, status, productId, orderItemId, onItemSelected,
}) => {
  const { user } = useContext(AppStateContext);
  const reqGetThreadByUserIdAndVendorId = useApiHook({ apiDispatchCall: getMessagesByUserId, initiateOnLoad: false });
  const { _common: { _labels }, _userOrdersPage } = useI18n();
  const [record, setRecord] = useState();
  const alert = useAlert();
  const { formState, onUpdateState } = useFormStateHook({
    title: cargoTitle,
    shipmentno: shipmentNumber,
    link,
  });

  const onHandleUserId = (userId) => {
    reqGetThreadByUserIdAndVendorId.dispatchCall(userId)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          setRecord(body);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };

  return (
    <>
      <div className="col-lg-8 product-default left-details product-list mb-4">
        {
          (user.isAdmin() || user.isVendor())
          && (
            <div className="custom-control custom-checkbox OrderlistitemCheckbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id={`approval-item-${orderItemId}`}
                defaultValue={false}
                onChange={(e) => onItemSelected(e.target.checked, orderItemId, formState)}
              />
              <label
                className="custom-control-label"
                htmlFor={`approval-item-${orderItemId}`}
              >
                &nbsp;
                &nbsp;
                &nbsp;
              </label>
            </div>
          )
        }
        <div className="product-details">
          <div>
            <OrderItemsComp
              OrderItemsbuttontext
              SendMessageTouserButtonCheck
              LeaveReviewButtonCheck
              AskaQuestionToUserButtonCheck
              dashboardImageHeight={dashboardImageHeight}
              src={src}
              productId={productId}
              title={title}
              price={price}
              qty={qty}
              storeName={storeName}
              status={status}
              userId={userId}
              onHandleUserId={onHandleUserId}
            />
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        {
          user.isVendor() || user.isAdmin()
            ? (
              <div className="col cargo-detail-form">
                <div>
                  <label className="cargo-label">{_userOrdersPage.nameOfCargo()}</label>
                  <input
                    type="text"
                    name="title"
                    value={formState.title}
                    className="input-field-cargo shadow rounded mt-1 cargoDetailsInput"
                    onChange={onUpdateState}
                  />
                </div>
                <div>
                  <label className="cargo-label">{_userOrdersPage.shipmentNumber()}</label>
                  <input
                    type="text"
                    name="shipmentno"
                    value={formState.shipmentno}
                    className="input-field-cargo shadow rounded mt-1 cargoDetailsInput"
                    onChange={onUpdateState}
                  />
                </div>
                <div>
                  <label className="cargo-label">{_userOrdersPage.link()}</label>
                  <input
                    type="text"
                    name="link"
                    value={formState.link}
                    className="input-field-cargo shadow rounded mt-1 cargoDetailsInput"
                    onChange={onUpdateState}
                  />
                </div>
              </div>
            )
            : (
              <div className={(cargoTitle === null || shipmentNumber === null || link === null) ? 'display-none' : 'cargo'}>
                <div className="cargo-body">
                  <div className="cargo-title">
                    {_labels.cargoName()}
                    :
                    {cargoTitle}
                  </div>
                  <div className="cargo-shipnumber">
                    {_labels.shipmentNumber()}
                    :
                    {shipmentNumber}
                  </div>
                  <a href={link} className="cargo-link">
                    <button className="btn btn-dark cargo-btn">
                      {_labels.cargoTracking()}
                    </button>
                  </a>

                </div>
              </div>
            )
        }
        {
          (user.isVendor() || user.isAdmin())
          && <OrderChatComp id="OrderChatModel" record={record} />
        }
      </div>

    </>
  );
};

export default OrderListItemComp;
