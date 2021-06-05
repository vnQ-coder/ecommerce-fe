import React, { useContext } from 'react';
import { useI18n } from '../context/i18nContext';
import AppStateContext from '../context/AppStateContext';
import LangControlComp from './LangControlComp';
import CartComp from './CartComp';

const HeaderComp = () => {
  const { header: { _menuItems }, _common } = useI18n();
  const { Cart, user, logoutUser } = useContext(AppStateContext);

  return (
    <header className="header">
      <div className="sticky-wrapper">
        <div className="header-middle">
          <div className="container">
            <div className="header-left">
              <a href="/" className="logo">
                <img src="assets/images/sitelogo.png" height="100" width="120" alt="Saglik Logo" />
              </a>
              <nav className="main-nav font2">
                <ul className="menu">
                  <li><a href="/">{_menuItems.home()}</a></li>
                  <li><a href="about-us">{_menuItems.aboutUs()}</a></li>
                  {user.isLoggedIn() && <li><a href="contact-us">{_menuItems.contactUs()}</a></li>}
                  {user.isLoggedIn() && <li><a href="dashboard">{_menuItems.dashboard()}</a></li>}
                  {(user.isAdmin() || user.isVendor()) && (
                    <li>
                      <a href="#" className="sf-with-ul-admin">{_menuItems.admin()}</a>
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
                        {(user.isAdmin()) && (
                          <li>
                            <a href="# " className="sf-ul-vendor">{_menuItems.informationType()}</a>
                            <ul style={{ display: 'none' }}>
                              <li><a href="create-user-guides">{_menuItems.informationType()}</a></li>
                              {(user.isAdmin()) && <li><a href="information-type">{_menuItems.information()}</a></li>}
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

                      </ul>
                    </li>
                  )}
                  {(user.isLoggedIn() && !user.isVendor() && !user.isAdmin())
                    && <li><a href="user-orders">{_menuItems.userOrders()}</a></li>}
                  {(user.isLoggedIn())
                    && <li><a href="user-guides">{_menuItems.help()}</a></li>}
                  {!user.isLoggedIn() && (
                    <li>
                      <a href="#" className="sf-with-ul-account">{_menuItems.account()}</a>
                      <ul style={{ display: 'none' }}>
                        <li>
                          <a href="# " className="sf-with-ul-account">{_menuItems.register()}</a>
                          <ul style={{ display: 'none' }}>
                            <li><a href="login">{_menuItems.register()}</a></li>
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
            </div>
            <div className="header-right">
              <button className="mobile-menu-toggler" type="button">
                <i className="icon-menu"> </i>
              </button>

              <div className="header-search header-search-popup header-search-category d-none d-sm-block">
                <a href="# " className="search-toggle" role="button"><i className="icon-magnifier"> </i></a>
                <form action="search" method="get">
                  <div className="header-search-wrapper">
                    <input
                      type="search"
                      className="form-control"
                      name="productName"
                      id="productName"
                      placeholder={_common.iAmSearchingFor()}
                      required=""
                    />
                    <div className="select-custom">
                      <select id="category" name="category">
                        <option value="">{_menuItems.allCategories()}</option>
                      </select>
                    </div>
                    <button className="btn bg-dark icon-search-3" type="submit"> </button>
                  </div>
                </form>
              </div>
              {
                user.isLoggedIn() && (
                  <span className="mr-4"><b>{user.user.firstName + ' ' + user.user.lastName}</b></span>
                )
              }
              <div className="dropdown cart-dropdown">
                <a
                  href="# "
                  className="dropdown-toggle dropdown-arrow"
                  role="button"
                  id="icon-shopping-cart"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-display="static"
                >
                  <i className="icon-shopping-cart" />
                  <span className="cart-count badge-circle">{Cart.Cart.totalItems}</span>
                </a>
                <CartComp />
              </div>
              <div className="mt-2">
                <LangControlComp />
              </div>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default HeaderComp;
