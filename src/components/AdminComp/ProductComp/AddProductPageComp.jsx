import { render } from 'react-dom';
import React, {
  useContext, useEffect, useState, useCallback,
} from 'react';
import {
  Provider as AlertProvider, useAlert,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import useFormStateHook from '../../../shared/hooks/useFormStateHook';
import useApiHook from '../../../shared/hooks/useApiHook';
import I18nContext, { useI18n } from '../../../shared/context/i18nContext';
import LayoutComp from '../../../shared/components/LayoutComp';
import {
  getProductDetailsById, getProductImagesById, postAddProduct, updateProduct, getContentPageByPageName, getVendorApproval,
} from '../../../shared/api/api';
import AddProdImageComp from './AddProdImageComp/AddProdImageComp';
import AddProdDetailComp from './AddProdDetailComp/AddProdDetailComp';
import appConfigs from '../../../base/config/appConfig';
import { buildPathToImageThumb } from '../../../base/utils/string';
import RenderIfAuthenticated from '../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';
import BreadCrumbComp from '../../../shared/components/BreadCrumbComp';

const AddProductWrapperComp = ({ productId, productDetailsRes, productImagesRes }) => {
  const { locale } = useContext(I18nContext);
  const [addProductPage, setAddProductPage] = useState({});
  const pageName = 'Add Product Page Guidelines';
  const reqAddProductPage = useApiHook({ apiDispatchCall: getContentPageByPageName, initiateOnLoad: false });
  const reqVendorApproval = useApiHook({ apiDispatchCall: getVendorApproval, initiateOnLoad: false });
  const {
    _common, _common: { _labels }, _productPage, header: { _menuItems },
  } = useI18n();
  const baseURL = appConfigs.bkUrl;
  const productImages = productImagesRes.body;
  const productDetails = productDetailsRes.body;
  const reqUpdateProduct = useApiHook({ apiDispatchCall: updateProduct, initiateOnLoad: false });
  const reqAddProduct = useApiHook({ apiDispatchCall: postAddProduct, initiateOnLoad: false });
  const [respMsg, setRespMsg] = useState({ error: false, msg: '' });
  const [selectedImages, setSelectedImages] = useState([{}]);
  const [checkApproval, setCheckApproval] = useState({});

  const alert = useAlert();
  const {
    formState, onUpdateState, onClearState, setFormState,
  } = useFormStateHook({
    title: '',
    productQty: '',
    price: '',
    description: '',
    detailDescription: '',
    catergoryId: '',
    productId: '',
    categoryTitle: '',
  });

  const onLangChange = useCallback((body) => {
    setAddProductPage(body);
  }, []);

  useEffect(() => {
    reqVendorApproval.dispatchCall()
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          setCheckApproval(body);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  }, [alert]);

  useEffect(() => {
    if (locale) {
      const onHandleLanguage = () => {
        reqAddProductPage.dispatchCall({ pageName, locale })
          .then(({ isSuccessResponse, body }) => {
            const msg = body.message;
            if (isSuccessResponse) {
              onLangChange(body);
            }
            if (!isSuccessResponse) {
              alert.error(msg);
            }
          });
      };

      onHandleLanguage();
    }
  }, [alert, locale, onLangChange]);

  const onUpdateCKEditorState = (e, editor) => {
    setFormState((prevState) => ({ ...prevState, detailDescription: editor.getData() }));
  };

  const handleAddNewField = () => {
    setSelectedImages([...selectedImages, {}]);
  };

  const handleRemoveFields = (index) => {
    setSelectedImages(selectedImages.filter((_up, idx) => idx !== index));
  };

  const onFileSelectedHandler = (keyName, file, imageId, idx) => {
    if (productId) {
      setSelectedImages([...selectedImages, file]);
      if (!formState.imagesIds) formState.imagesIds = [];
      formState.imagesIds[idx] = imageId;
    } else {
      setSelectedImages(selectedImages.map((si, index) => (index === idx ? file : si)));
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    e.persist();
    const formData = new FormData();

    for (const key of Object.keys(selectedImages)) {
      formData.append('image', selectedImages[key]);
    }

    const cleanImagesArr = formState.imagesIds ? formState.imagesIds.filter((e) => e) : [];

    Object.keys(formState).forEach((k) => {
      if (k === 'imagesIds') formData.append(k, cleanImagesArr);
      else formData.append(k, formState[k]);
    });

    if (formState.productId !== '') {
      reqUpdateProduct.dispatchCall(formData).then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
    } else {
      reqAddProduct.dispatchCall(formData).then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          e.target.reset();
          setFormState((prevState) => ({ ...prevState, detailDescription: '' }));
          onClearState();
          setSelectedImages([{}]);
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
    }
  };

  useEffect(() => {
    if (productId && productDetails) {
      setFormState({ ...productDetails, imagesIds: [] });
    }
  }, [productDetails, productId, setFormState]);

  return (
    <main className="main">
      <BreadCrumbComp items={[
        { text: _menuItems.admin() },
        { text: _menuItems.product() },
        { text: _menuItems.addProduct() },
      ]}
      />
      { checkApproval.status === 'active' ? (
        <div>
          <div className="container">
            <h3 className="text-center mb-2">
              {
                productId ? _labels.addProductPageGuides()
                  : _labels.addProductPageGuides()
              }
            </h3>
          </div>
          <div className="container mb-5">
            <div className="border rounded p-5 ckeditor-list">
              <span dangerouslySetInnerHTML={{ __html: addProductPage && addProductPage.content }} />
            </div>
          </div>

          <div className="container">
            <h3 className="text-center mb-2">
              {
                productId ? _productPage.updateProduct()
                  : _productPage.createProduct()
              }
            </h3>
          </div>

          <form onSubmit={onSubmitHandler}>
            <div className="container">
              <div className="card shadow card-border">
                <div className="card-header bg-dark text-white card-header-border">
                  {productId ? _productPage.updateProduct() : _productPage.createProduct()}
                </div>
                <div className="card-body p-5">

                  {
                    !productId ? (
                      <AddProdDetailComp
                        onUpdateState={onUpdateState}
                        onUpdateCKEditorState={onUpdateCKEditorState}
                      />
                    ) : (
                      <AddProdDetailComp
                        onUpdateState={onUpdateState}
                        title={formState.title}
                        description={formState.description}
                        detailDescription={formState.detailDescription}
                        categoryTitle={formState.categoryTitle}
                        catId={formState.categoryId}
                        price={formState.price}
                        productQty={formState.productQty}
                        productId={productId}
                        onUpdateCKEditorState={onUpdateCKEditorState}
                      />
                    )
                  }
                  {
                    !productId
                      ? (
                        selectedImages.map((uploadFileField, index) => (

                          <AddProdImageComp
                            key={index.toString()}
                            idx={index}
                            handleAddNewField={handleAddNewField}
                            handleRemoveFields={handleRemoveFields}
                            onFileSelected={onFileSelectedHandler}
                            src={uploadFileField.name
                              ? URL.createObjectURL(uploadFileField)
                              : '/assets/images/placeholder/Untitled.png'}

                          />

                        ))
                      )

                      : productImages && productImages.map((pi, index) => (

                        <AddProdImageComp
                          key={index.toString()}
                          idx={index}
                          onFileSelected={onFileSelectedHandler}
                          src={buildPathToImageThumb(pi)}
                          imageId={pi.id}
                          productId={productId}
                          isPreview
                        />

                      ))
                  }
                  <br />
                  <div className={`cst-form-${respMsg.error ? 'error' : 'success'}`}>{respMsg.msg}</div>
                  <br />

                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-center">
                    <input
                      type="submit"
                      className="btn btn-sm btn-dark rounded"
                      value={
                        productId ? _productPage.updateProduct()
                          : _productPage.addProduct()
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )
        : (
          <div className="notApproveLabel">
            {_labels.notApproveYet()}
          </div>
        )}
    </main>
  );
};
const AddProductPageComp = () => {
  const productId = new URLSearchParams(window.location.search).get('productId');
  const productDetailsRes = useApiHook({
    apiDispatchCall: getProductDetailsById,
    initiateOnLoad: !!productId,
    initiateOnLoadCallData: productId,
  });
  const productImagesRes = useApiHook({
    apiDispatchCall: getProductImagesById,
    initiateOnLoad: !!productId,
    initiateOnLoadCallData: productId,
  });

  return (
    <AlertProvider template={AlertTemplate}>
      <LayoutComp waitFor={productDetailsRes && productImagesRes}>
        <RenderIfAuthenticated redirectToIfUnAuth="/" hasRoles={['admin', 'vendor']}>
          <AddProductWrapperComp
            productId={productId}
            productDetailsRes={productDetailsRes}
            productImagesRes={productImagesRes}
          />
        </RenderIfAuthenticated>
      </LayoutComp>
    </AlertProvider>
  );
};

render(<AddProductPageComp />, document.getElementById('react-container'));
