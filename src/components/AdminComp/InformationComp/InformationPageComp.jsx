import { render } from 'react-dom';
import React, { useState, useEffect } from 'react';
import {
  Provider as AlertProvider, useAlert,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LayoutComp from '../../../shared/components/LayoutComp';
import { postCreateInformation, getUserGuidesById, updateUserGuide } from '../../../shared/api/api';
import useApiHook from '../../../shared/hooks/useApiHook';
import { useI18n } from '../../../shared/context/i18nContext';
import RenderIfAuthenticated from '../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';
import InformationDetailFormComp from './InformationDetailForm/InformationDetailFormComp';
import AddCatImageComp from '../CategoryComp/AddCatImageComp/AddCatImageComp';
import useFormStateHook from '../../../shared/hooks/useFormStateHook';
import { buildPathToImage } from '../../../base/utils/string';
import BreadCrumbComp from '../../../shared/components/BreadCrumbComp';

const InformationWrapperComp = () => {
  const { _userGuides, header: { _menuItems } } = useI18n();
  const guideId = new URLSearchParams(window.location.search).get('guideId');
  const userGuidesRes = useApiHook({
    apiDispatchCall: getUserGuidesById,
    initiateOnLoad: !!guideId,
    initiateOnLoadCallData: guideId,
  });
  const userGuides = userGuidesRes.body;
  const reqCreateUserGuide = useApiHook({ apiDispatchCall: postCreateInformation, initiateOnLoad: false });
  const reqUpdateUserGuide = useApiHook({ apiDispatchCall: updateUserGuide, initiateOnLoad: false });
  const [respMsg, setRespMsg] = useState({ error: false, msg: '' });
  const [selectedImage, setSelectedImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const alert = useAlert();
  const {
    formState, onUpdateState, onClearState, setFormState,
  } = useFormStateHook({
    title: '',
    description: '',
    informationId: '',
    imageId: '',
    guideId: '',
    informationType: 'vendor',
  });

  const onUpdateCKEditorState = (e, editor) => {
    setFormState((prevState) => ({ ...prevState, description: editor.getData() }));
  };

  useEffect(() => {
    if (guideId && userGuides) {
      setFormState({
        title: userGuides.title,
        description: userGuides.description,
        informationId: userGuides.informationId,
        guideId: userGuides.guideId,
        imageId: userGuides.image.id,
        informationType: userGuides.informationFor,
      });
    }
  }, [userGuides, guideId, setFormState]);

  const onSelectImageHandler = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setSelectedImage(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append('image', selectedImage);
    Object.keys(formState).forEach((k) => formData.append(k, formState[k]));

    if (guideId) {
      reqUpdateUserGuide.dispatchCall(formData).then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
    }

    if (!guideId) {
      reqCreateUserGuide.dispatchCall(formData).then(({ isSuccessResponse, body }) => {
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
        { text: _menuItems.informationType() },
        { text: _menuItems.informationType() },
      ]}
      />
      <div className="container">
        <h2 className="text-center mb-2">{guideId ? _userGuides.updateUserGuide() : _userGuides.addUserGuide()}</h2>
      </div>
      <div className="container">
        <form onSubmit={onSubmitHandler}>
          <div className="card shadow card-border">
            <div className="card-header bg-dark text-white card-header-border">{guideId ? _userGuides.updateUserGuide() : _userGuides.addUserGuide()}</div>
            <div className="card-body p-5">
              <InformationDetailFormComp
                onUpdateState={onUpdateState}
                onUpdateCKEditorState={onUpdateCKEditorState}
                title={formState.title}
                description={formState.description}
                informationId={formState.informationId}
                informationType={formState.informationType}
                formState={formState}
                setFormState={setFormState}
              />
              <AddCatImageComp
                onSelectImageHandler={onSelectImageHandler}
                src={guideId && userGuides ? buildPathToImage(userGuides.image) : '/assets/images/placeholder/Untitled.png'}
                imagePreview={imagePreview}
              />
              <br />
              <div className={`cst-form-${respMsg.error ? 'error' : 'success'}`}>{respMsg.msg}</div>
              <br />
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center">
                <input
                  type="submit"
                  className="btn btn-sm btn-dark rounded"
                  value={guideId ? _userGuides.updateUserGuide() : _userGuides.addUserGuide()}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
const InformationPageComp = () => (
  <AlertProvider template={AlertTemplate}>
    <LayoutComp waitFor>
      <RenderIfAuthenticated redirectToIfUnAuth="/" hasRoles={['admin']}>
        <InformationWrapperComp />
      </RenderIfAuthenticated>
    </LayoutComp>
  </AlertProvider>
);

render(<InformationPageComp />, document.getElementById('react-container'));
