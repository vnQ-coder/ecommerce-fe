import React from 'react';
import { useI18n } from '../context/i18nContext';

const AccountSideMenu = () => {
  const { _accountMenu, _common } = useI18n();

  return (
    <aside className="sidebar col-lg-3">
      <div className="widget widget-dashboard">
        <h3 className="widget-title">{_accountMenu.myAccount()}</h3>
        <ul className="list">
          <li className="active"><a href="# ">{_accountMenu.accountDashboard()}</a></li>
          <li><a href="# ">{_common.accountInfo()}</a></li>
          <li><a href="# ">{_accountMenu.addressBook()}</a></li>
          <li><a href="# ">{_accountMenu.myOrders()}</a></li>
          <li><a href="# ">{_accountMenu.billingAgreements()}</a></li>
          <li><a href="# ">{_accountMenu.recurringProfiles()}</a></li>
          <li>
            <a href="# ">
              {_accountMenu.myProduct()}

              Reviews
            </a>
          </li>
          <li><a href="# ">{_accountMenu.myTags()}</a></li>
          <li><a href="# ">{_accountMenu.myWishlist()}</a></li>
          <li><a href="# ">{_accountMenu.myApplications()}</a></li>
          <li><a href="# ">{_accountMenu.newsletterSubscriptions()}</a></li>
          <li><a href="# ">{_accountMenu.myDownloadableProducts()}</a></li>
        </ul>
      </div>
    </aside>
  );
};
export default AccountSideMenu;
