import React, { useContext } from 'react';
import AppStateContext from '../context/AppStateContext';
import { useI18n } from '../context/i18nContext';

const MenuMobileComp = () => {
  const { _common, header: { _menuItems } } = useI18n();
  const { user, logoutUser } = useContext(AppStateContext);
  return (
    <>
      <div className="mobile-menu-overlay" />
      <div className="mobile-menu-container">
        <div className="mobile-menu-wrapper">
          <span className="mobile-menu-close"><i className="icon-compare-link" /></span>
          <nav className="mobile-nav">
            <ul className="mobile-menu">
              <li><a href="/">{_menuItems.home()}</a></li>
              <li><a href="about-us">{_menuItems.aboutUs()}</a></li>
              {user.isLoggedIn() && <li><a href="contact-us">{_menuItems.contactUs()}</a></li>}
              {user.isLoggedIn() && <li><a href="dashboard">{_menuItems.dashboard()}</a></li>}
              {(user.isAdmin() || user.isVendor()) && (
                <li>
                  <a className="sf-with-ul-admin">{_menuItems.admin()}</a>
                  <ul style={{ display: 'none' }}>

                    {user.isAdmin() && (
                      <li>
                        <a href="# " className="sf-ul-category">{_menuItems.category()}</a>
                        <ul style={{ display: 'none' }}>
                          <li><a href="add-category">{_menuItems.addCategory()}</a></li>
                          <li><a href="category-list">{_menuItems.allCategories()}</a></li>
                        </ul>
                      </li>
                    )}
                    {user.isAdmin() && (
                      <li>
                        <a href="# " className="sf-ul-displayimages">{_menuItems.displayImage()}</a>
                        <ul style={{ display: 'none' }}>
                          <li><a href="add-displayimage">{_menuItems.addDisplayImage()}</a></li>
                        </ul>
                      </li>
                    )}
                    {user.isAdmin() && (
                      <li>
                        <a href="# " className="sf-ul-statistics">{_menuItems.statistics()}</a>
                        <ul style={{ display: 'none' }}>
                          <li><a href="statistics">{_menuItems.statistics()}</a></li>
                        </ul>
                      </li>
                    )}
                    {(user.isVendor() || user.isAdmin()) && (
                      <li>
                        <a href="# " className="sf-ul-vendor">{_menuItems.userMessage()}</a>
                        <ul style={{ display: 'none' }}>
                          <li><a href="user-messages">{_menuItems.userMessage()}</a></li>
                        </ul>
                      </li>
                    )}
                    {(user.isVendor() || user.isAdmin()) && (
                      <li>
                        <a href="# " className="sf-ul-vendor">{_menuItems.userOrders()}</a>
                        <ul style={{ display: 'none' }}>
                          <li><a href="user-orders">{_menuItems.userOrders()}</a></li>
                          {(user.isVendor() || user.isAdmin()) && (
                            <li>
                              <a href="order-search">{_menuItems.orderSearch()}</a>
                            </li>
                          )}
                        </ul>
                      </li>
                    )}
                    {(user.isVendor() || user.isAdmin()) && (
                      <li>
                        <a href="# " className="sf-ul-vendor">{_menuItems.informationType()}</a>
                        <ul style={{ display: 'none' }}>
                          <li><a href="create-user-guides">{_menuItems.informationType()}</a></li>
                          {(user.isVendor() || user.isAdmin()) && (
                            <li>
                              <a href="information-type">{_menuItems.information()}</a>
                            </li>
                          )}
                        </ul>
                      </li>
                    )}
                    {user.isAdmin() && (
                      <li>
                        <a href="# " className="sf-ul-vendor">{_menuItems.contentPages()}</a>
                        <ul style={{ display: 'none' }}>
                          <li><a href="content-page">{_menuItems.createContentPages()}</a></li>
                        </ul>
                      </li>
                    )}
                    <li>
                      <a href="# " className="sf-ul-product">{_menuItems.product()}</a>
                      <ul style={{ display: 'none' }}>
                        <li><a href="add-product">{_menuItems.addProduct()}</a></li>
                        {user.isAdmin() && <li><a href="product-approval">{_menuItems.approveProduct()}</a></li>}
                        {(user.isAdmin() || user.isVendor()) && (
                          <li>
                            <a href="product-list">{_menuItems.allProducts()}</a>
                          </li>
                        )}
                        {(user.isVendor() || user.isAdmin()) && (
                          <li>
                            <a href="product-search">{_menuItems.productSearch()}</a>
                          </li>
                        )}
                      </ul>
                    </li>
                    {user.isAdmin() && (
                      <li>
                        <a href="# " className="sf-ul-vendor">{_menuItems.vendor()}</a>
                        <ul style={{ display: 'none' }}>
                          <li><a href="vendor-approval">{_menuItems.approveVendor()}</a></li>
                        </ul>
                      </li>
                    )}
                  </ul>
                </li>
              )}
              {(user.isLoggedIn() && !user.isVendor() && !user.isAdmin())
                && <li><a href="user-orders">{_menuItems.userOrders()}</a></li>}
              {(user.isLoggedIn())
                && <li><a href="user-guides">{_menuItems.help()}</a></li>}

              {!user.isLoggedIn() && (
                <li>
                  <a className="sf-with-ul-account">{_menuItems.account()}</a>
                  <ul style={{ display: 'none' }}>
                    <li>
                      <a href="# " className="sf-with-ul-account">{_menuItems.register()}</a>
                      <ul style={{ display: 'none' }}>
                        <li><a href="login">Register</a></li>
                        <li><a href="register-vendor">{_menuItems.registerAsVendor()}</a></li>
                      </ul>
                    </li>
                    <li><a href="login">{_menuItems.login()}</a></li>
                    <li><a href="forgot-password">{_menuItems.forgotPwd()}</a></li>
                  </ul>
                </li>
              )}
              <li><a href="cart">{_menuItems.cart()}</a></li>
              {user.isLoggedIn() && (
                <li>
                  <a
                    href="logout"
                    onClick={(e) => {
                      e.preventDefault();
                      logoutUser();
                    }}
                  >
                    {_menuItems.logout()}
                  </a>
                </li>
              )}
            </ul>
          </nav>

          <div className="social-icons">
            <a href="# " className="social-icon" target="_blank"><i className="icon-facebook" /></a>
            <a href="# " className="social-icon" target="_blank"><i className="icon-twitter" /></a>
            <a href="# " className="social-icon" target="_blank"><i className="icon-instagram" /></a>
          </div>

        </div>

      </div>

    </>
  );
};
export default MenuMobileComp;
