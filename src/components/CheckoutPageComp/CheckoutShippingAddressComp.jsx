import React, { useState, Fragment, useEffect } from 'react';

const CheckoutShippingAddressComp = ({ addresses, shippingAddressId }) => {
  const { shippingAddress, billingAddress } = addresses;
  const [isShippingBillingSame, setIsShippingBillingSame] = useState(true);

  // useEffect(() => {
  //   if (billingAddress) {
  //     shippingAddressId[1](billingAddress[0].id);
  //   }
  // }, [billingAddress]);

  const onSetBillingAddress = (address) => {
    shippingAddressId[1](address.id);
    setIsShippingBillingSame(false);
  };

  const onCheckSameAddress = (e) => {
    setIsShippingBillingSame(e.target.checked);
    if (e.target.checked) {
      shippingAddressId[1](billingAddress[0].id);
    }
  };

  return (
    <div className="col-lg-8 padding-right-lg">
      <ul className="checkout-steps">
        <li>
          <h2 className="step-title">Billing Address</h2>
          <div className="shipping-step-addresses">

            <>
              <div className="shipping-address-box active">
                <address>
                  <label className="font-weight-bold">
                    Type:
                    {billingAddress && billingAddress.type}
                  </label>
                  <br />
                  <label className="font-weight-bold">Address</label>
                  <br />
                  {billingAddress && billingAddress.address}
                  <br />
                  {billingAddress && billingAddress.city}

                  {billingAddress && billingAddress.state}
                  ,

                  {billingAddress && billingAddress.country}
                  <br />
                  <label className="font-weight-bold">Phone:</label>
                  <br />
                  {billingAddress && billingAddress.phone}

                  <br />
                  <label className="font-weight-bold">Zip / Postal Code:</label>
                  <br />
                  {billingAddress && billingAddress.zip}

                  <br />
                </address>

                <div className="address-box-action clearfix">
                  <button className="btn btn-sm btn-outline-secondary float-right">
                    Ship Here
                  </button>
                </div>
              </div>
            </>

          </div>
        </li>
        <li>
          <div className="form-group-custom-control">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="change-bill-address"
                defaultChecked={isShippingBillingSame}
                onChange={onCheckSameAddress}
              />
              <label className="custom-control-label" htmlFor="change-bill-address">
                My billing and shipping address are the same
              </label>
            </div>
          </div>
        </li>
        <li>
          <h2 className="step-title">Shipping Address</h2>
          <div className="shipping-step-addresses">
            {shippingAddress && shippingAddress.map((address) => (
              <Fragment key={address.id}>
                <div
                  key={address.id}
                  className={
                    `shipping-address-box ${address.id === shippingAddressId[0] ? 'active' : ''} 
                  ${isShippingBillingSame ? 'disabled-shipping-address' : ''}
                  `
                  }
                >
                  <address>
                    <label className="font-weight-bold">
                      Type:
                      {address.type}
                    </label>
                    <br />
                    <label className="font-weight-bold">Address</label>
                    <br />
                    {address.address}
                    <br />
                    {address.city}

                    {address.state}
                    ,

                    {address.country}
                    <br />
                    <label className="font-weight-bold">Phone:</label>
                    <br />
                    {address.phone}

                    <br />
                    <label className="font-weight-bold">Zip / Postal Code:</label>
                    <br />
                    {address.zip}

                    <br />
                  </address>

                  <div className="address-box-action clearfix">
                    <button
                      className="btn btn-sm btn-outline-secondary float-right"
                      onClick={() => onSetBillingAddress(address)}
                    >
                      Ship Here
                    </button>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          {(shippingAddress && shippingAddress.length < 3)
            && (
              <a
                href="# "
                className="btn btn-sm btn-outline-secondary btn-new-address"
                data-toggle="modal"
                data-target="#shipping-address-modal"
              >
                + New Address
              </a>
            )}
        </li>
      </ul>
    </div>
  );
};
export default CheckoutShippingAddressComp;
