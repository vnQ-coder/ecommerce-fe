import React, { useState, useEffect, useContext } from "react";
import { render } from "react-dom";
import { Provider as AlertProvider, useAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import useApiHook from "../../../../shared/hooks/useApiHook";
import AppStateContext from "../../../../shared/context/AppStateContext";
import { useI18n } from "../../../../shared/context/i18nContext";
import LayoutComp from "../../../../shared/components/LayoutComp";
import appConfigs from "../../../../base/config/appConfig";
import ProductListItemComp from "./ProductListItemComp";
import RejectedProductListComp from "./RejectedProductList/RejectedProductListComp";
import BreadCrumbComp from "../../../../shared/components/BreadCrumbComp";
import {
  getAllProducts,
  postSetProductsAsFeatured,
  delProduct,
  postSetProductStatus,
  getRejectedProducts,
  getVendorPendingProducts
} from "../../../../shared/api/api";
import RenderIfAuthenticated from "../../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc";

const ProductListWrapperComp = ({
  reqProductsList,
  reqRejectedProductsList,
  reqPendingProductsList
}) => {
  const { user } = useContext(AppStateContext);
  const {
    _common,
    _common: { _labels },
    _productPage,
    header: { _menuItems },
  } = useI18n();
  const [selectedFeaturedProducts, setSelectedFeaturedProducts] = useState({});
  const [selectedProductStatus, setSelectedProductStatus] = useState({});
  const alert = useAlert();
  const reqFeatureProductsUpdateList = useApiHook({
    apiDispatchCall: postSetProductsAsFeatured,
    initiateOnLoad: false,
  });
  const reqProductStatusUpdateList = useApiHook({
    apiDispatchCall: postSetProductStatus,
    initiateOnLoad: false,
  });
  const reqDeleteProduct = useApiHook({
    apiDispatchCall: delProduct,
    initiateOnLoad: false,
  });
  const onLoadProducts = reqProductsList.body;
  const rejectedProductsList = reqRejectedProductsList.body;
  const pendingProductsList = reqPendingProductsList.body && reqPendingProductsList.body.products;
  const [products, setProducts] = useState([]);
  const [rejectedProducts, setRejectedProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);

  useEffect(() => {
    if (onLoadProducts) {
      setProducts(onLoadProducts);
    }
  }, [onLoadProducts]);

  useEffect(() => {
    if (rejectedProductsList) {
      setRejectedProducts(rejectedProductsList);
    }
  }, [rejectedProductsList]);

  useEffect(() => {
    if (pendingProductsList) {
      setPendingProducts(pendingProductsList);
    }
  }, [pendingProductsList]);

  const onApplyClickHandler = () => {
    if (user.isAdmin()) {
      reqFeatureProductsUpdateList
        .dispatchCall(selectedFeaturedProducts)
        .then(({ isSuccessResponse, body }) => {
          const msg = body.message;
          if (isSuccessResponse) {
            alert.success(msg);
          }
          if (!isSuccessResponse) {
            alert.error(msg);
          }
        });
    } else {
      reqProductStatusUpdateList
        .dispatchCall(selectedProductStatus)
        .then(({ isSuccessResponse, body }) => {
          const msg = body.message;
          if (isSuccessResponse) {
            alert.success(msg);
          }
          if (!isSuccessResponse) {
            alert.error(msg);
          }
        });
    }
  };

  const onItemSelectedHandler = (checked, id) => {
    if (user.isVendor()) {
      setSelectedProductStatus((prevState) => ({
        ...prevState,
        [id]: checked === "active" ? "disable" : "active",
      }));
    }
    if (user.isAdmin()) {
      setSelectedFeaturedProducts((prevState) => ({
        ...prevState,
        [id]: checked,
      }));
    }
  };

  const onDeleteProductHandler = (productId) => {
    reqDeleteProduct
      .dispatchCall(productId)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          const isNotProductId = (product) => product.id !== productId;
          const afterProductDelete = products.filter(isNotProductId);
          setProducts(afterProductDelete);
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };

  return (
    <main className="main">
      <BreadCrumbComp
        items={[
          { text: _menuItems.admin() },
          { text: _menuItems.product() },
          { text: _menuItems.allProducts() },
        ]}
      />
      <div className="page-header">
        <div className="container">
          <h3>{_productPage.productList()}</h3>
        </div>
      </div>
      <div className="container">
        <div className="cart-table-container">
          <table className="table table-cart">
            <thead>
              <tr>
                {user.isAdmin() && <th>{_labels.featured()}</th>}
                {user.isVendor() && <th>{_labels.productStatus()}</th>}
                <th>{_labels.image()}</th>
                <th>{_labels.productCode()}</th>
                <th>{_labels.title()}</th>
                <th>{_labels.description()}</th>
                <th>{_common.price()}</th>
                <th>{_labels.action()}</th>
              </tr>
            </thead>
            <tbody>
              {products && products.length ? (
                products.map((product) => (
                  <ProductListItemComp
                    key={product.id}
                    product={{ ...product }}
                    bkURL={appConfigs.bkUrl}
                    images={product.image}
                    onItemSelected={onItemSelectedHandler}
                    onDeleteProduct={onDeleteProductHandler}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <h3 className="mt-2">{_productPage.noProducts()}</h3>
                  </td>
                </tr>
              )}
            </tbody>
            {Object.keys(selectedFeaturedProducts).length ||
            Object.keys(selectedProductStatus).length ? (
              <tfoot>
                <tr>
                  <td colSpan="6" className="clearfix">
                    <div className="float-right">
                      <button
                        className="btn btn-outline-secondary btn-update-cart"
                        onClick={onApplyClickHandler}
                      >
                        {_labels.apply()}
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            ) : (
              <></>
            )}
          </table>
        </div>

        <div className="mb-5" />
        <div className="container text-center">
          <h3>{_productPage.pendingProducts()}</h3>
        </div>
        <div>
          {pendingProducts && (
            <RejectedProductListComp rejectedProducts={pendingProducts}  title = "pendingProducts"/>
          )}
        </div>

        <div className="mb-5" />
        <div className="container text-center">
          <h3>{_productPage.rejectedProducts()}</h3>
        </div>
        <div>
          {rejectedProducts && (
            <RejectedProductListComp rejectedProducts={rejectedProducts} title = "rejectedProducts" />
          )}
        </div>
      </div>
    </main>
  );
};

const ProductListPageComp = () => {
  const reqProductsList = useApiHook({ apiDispatchCall: getAllProducts });
  const reqRejectedProductsList = useApiHook({
    apiDispatchCall: getRejectedProducts,
  });
  const reqPendingProductsList = useApiHook({
    apiDispatchCall: getVendorPendingProducts,
  });

  return (
    <AlertProvider template={AlertTemplate}>
      <LayoutComp waitFor={reqProductsList}>
        <RenderIfAuthenticated
          redirectToIfUnAuth="/"
          hasRoles={["admin", "vendor"]}
        >
          <ProductListWrapperComp
            reqProductsList={reqProductsList}
            reqRejectedProductsList={reqRejectedProductsList}
            reqPendingProductsList={reqPendingProductsList}
          />
        </RenderIfAuthenticated>
      </LayoutComp>
    </AlertProvider>
  );
};

render(<ProductListPageComp />, document.getElementById("react-container"));
