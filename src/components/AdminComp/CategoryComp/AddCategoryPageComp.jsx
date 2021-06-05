import { render } from 'react-dom';
import React, { useState, useEffect } from 'react';
import {
  Provider as AlertProvider, useAlert,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import useApiHook from '../../../shared/hooks/useApiHook';
import useFormStateHook from '../../../shared/hooks/useFormStateHook';
import { useI18n } from '../../../shared/context/i18nContext';
import AddCatDetailComp from './AddCatDetailComp/AddCatDetailComp';
import appConfigs from '../../../base/config/appConfig';
import AddCatImageComp from './AddCatImageComp/AddCatImageComp';
import LayoutComp from '../../../shared/components/LayoutComp';
import { postCreateCategory, getCategoryDetailsById, updateCategory } from '../../../shared/api/api';
import RenderIfAuthenticated from '../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';
import BreadCrumbComp from '../../../shared/components/BreadCrumbComp';

const AddCategoryPageComp = () => {
  const { _common: { _labels }, _categoryPage, header: { _menuItems } } = useI18n();
  const baseURL = appConfigs.bkUrl;
  const categoryId = new URLSearchParams(window.location.search).get('categoryId');
  const categoryDetailsRes = useApiHook({
    apiDispatchCall: getCategoryDetailsById,
    initiateOnLoad: !!categoryId,
    initiateOnLoadCallData: categoryId,
  });
  const categoryDetails = categoryDetailsRes.body;
  const [selectedImage, setSelectedImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const alert = useAlert();
  const {
    formState, onUpdateState, onClearState, setFormState,
  } = useFormStateHook({
    title: '',
    description: '',
    categoryId: '',
    imageId: '',
  });
  useEffect(() => {
    if (categoryId && categoryDetails) {
      setFormState({
        title: categoryDetails.title,
        description: categoryDetails.description,
        categoryId: categoryDetails.id,
        imageId: categoryDetails.imageId,
      });
    }
  }, [categoryDetails, categoryId, setFormState]);
  const reqCreateCategory = useApiHook({ apiDispatchCall: postCreateCategory, initiateOnLoad: false });
  const reqUpdateCategory = useApiHook({ apiDispatchCall: updateCategory, initiateOnLoad: false });

  const onSelectImageHandler = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setSelectedImage(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    e.persist();

    if (categoryId && !selectedImage) {
      const formData = new FormData();
      Object.keys(formState).forEach((k) => formData.append(k, formState[k]));

      reqUpdateCategory.dispatchCall(formData).then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
    }

    const formData = new FormData();
    formData.append('image', selectedImage);
    Object.keys(formState).forEach((k) => formData.append(k, formState[k]));

    if (categoryId) {
      reqUpdateCategory.dispatchCall(formData).then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
    } else {
      reqCreateCategory.dispatchCall(formData).then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          e.target.reset();
          onClearState();
          setSelectedImage(null);
          setImagePreview('/assets/images/placeholder/Untitled.png');
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
    }
  };

  return (
    <main className="main">
      <BreadCrumbComp items={[
        { text: _menuItems.admin() },
        { text: _menuItems.category() },
        { text: _menuItems.addCategory() },
      ]}
      />

      <div className="container">
        <h3 className="text-center mb-2">
          {!categoryId ? _categoryPage.createCategory() : _categoryPage.updateCategory()}
        </h3>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="container">
          <div className="card shadow card-border">
            <div className="card-header bg-dark text-white card-header-border">
              {!categoryId ? _categoryPage.createCategory() : _categoryPage.updateCategory()}
            </div>
            <div className="card-body p-5">

              {
                <AddCatDetailComp
                  onUpdateState={onUpdateState}
                  title={formState.title}
                  description={formState.description}
                  id={categoryDetails && categoryDetails.id}
                />
              }
              {
                <AddCatImageComp
                  onSelectImageHandler={onSelectImageHandler}
                  src={categoryId && categoryDetails
                    ? `${baseURL + categoryDetails.path}/${categoryDetails.imageId + categoryDetails.ext}` : '/assets/images/placeholder/Untitled.png'}
                  imagePreview={imagePreview}
                />
              }
              
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center">
                <input
                  type="submit"
                  className="btn btn-sm btn-dark rounded"
                  value={!categoryId ? _categoryPage.createCategory() : _categoryPage.updateCategory()}
                />
              </div>
            </div>
          </div>

        </div>
      </form>
    </main>
  );
};

render(
  <AlertProvider template={AlertTemplate}>
    <LayoutComp waitFor>
      <RenderIfAuthenticated redirectToIfUnAuth="/" hasRoles={['admin']}>
        <AddCategoryPageComp />
      </RenderIfAuthenticated>
    </LayoutComp>
  </AlertProvider>, document.getElementById('react-container'),
);
