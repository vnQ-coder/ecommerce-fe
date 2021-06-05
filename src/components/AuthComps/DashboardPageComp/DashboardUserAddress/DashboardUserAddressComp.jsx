import React from 'react';
import { useI18n } from '../../../../shared/context/i18nContext';
import UserBillingAddressComp from './UserBillingAddressComp';
import UserShippingAddressComp from './UserShippingAddressComp';
import useApiHook from '../../../../shared/hooks/useApiHook';
import {
  getUserBillingAddressByUserId,
  getAllUserShippingAddressesByUserId,
} from '../../../../shared/api/api';

function DashboardUserAddressComp() {
  const { _dashboardPage } = useI18n();
  const billingAddressRes = useApiHook({ apiDispatchCall: getUserBillingAddressByUserId });
  const shippingAddressesRes = useApiHook({ apiDispatchCall: getAllUserShippingAddressesByUserId });
  const billingAddress = billingAddressRes.body;
  const shippingAddresses = shippingAddressesRes.body;
  return (
    <>
      <h3>{_dashboardPage.addressBook()}</h3>
      <div className="row">
        <div className="col-md-6">
          <UserBillingAddressComp
            address={billingAddress}
          />
        </div>
        <div className="col-md-6">
          <UserShippingAddressComp
            shippingAddresses={shippingAddresses}
          />
        </div>
      </div>
    </>
  );
}

export default DashboardUserAddressComp;
