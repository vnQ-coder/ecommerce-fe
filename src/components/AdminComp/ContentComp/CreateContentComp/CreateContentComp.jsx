import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import useFormStateHook from '../../../../shared/hooks/useFormStateHook';
import { addContentPages, updateContentPages } from '../../../../shared/api/api';
import useApiHook from '../../../../shared/hooks/useApiHook';
import { useI18n } from '../../../../shared/context/i18nContext';
import Editor from '../../../../ckeditor-custom/build/ckeditor';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function CreateContentComp({
  content, pageName, id, onContentPageCreated, lang,
}) {
  const { _common: { _labels } } = useI18n();
  const reqAddContentPages = useApiHook({ apiDispatchCall: addContentPages, initiateOnLoad: false });
  const reqUpdateContentPages = useApiHook({ apiDispatchCall: updateContentPages, initiateOnLoad: false });
  const [respMsg] = useState({ error: false, msg: '' });
  const alert = useAlert();
  const { formState, onClearState, setFormState } = useFormStateHook({
    content: content || '',
    pageName: pageName || '',
    lang: lang || '',
  });

  const editorConfiguration = {
    toolbar:
      [
        'Alignment',
        'bulletedList',
        'numberedList',
        'BlockQuote',
        'Bold',
        'FontBackgroundColor',
        'FontColor',
        'FontFamily',
        'Heading',
        'ImageInsert',
        'ImageResize',
        'ImageUpload',
        'Indent',
        'Italic',
        'Link',
        'MediaEmbed',
      ],
  };

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setFormState({ ...formState, content: data });
  };

  const handlePageName = (e) => {
    setFormState({ ...formState, pageName: e.target.value });
  };

  const handlePageLang = (e) => {
    setFormState({ ...formState, lang: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (pageName) {
      reqUpdateContentPages.dispatchCall(formState).then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
    } else {
      reqAddContentPages.dispatchCall(formState).then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          onContentPageCreated({
            id: body.data.id,
            content: body.data.content,
            pageName: body.data.pageName,
            lang: body.data.lang,
          });
          onClearState();
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <div className="card shadow rounded">
        <div className="card-header bg-dark text-white card-header-border">
          {pageName ? _labels.updateContentPage() : _labels.createContentPage()}
        </div>
        <div className="card-body p-5">

          {
            !pageName
              ? (
                <>
                  <div className="row mb-2">
                    <div className="col-lg-2 d-flex flex-column">
                      <label>
                        <span className="required">*</span>
                        Select Language
                      </label>
                      <select className="input-field-search-select shadow" name="lang" onChange={handlePageLang}>
                        <option value="none" selected disabled hidden>{_labels.selectAnOption()}</option>
                        <option value="en">English</option>
                        <option value="tr">Turkish</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="form-group col-lg-6 d-flex flex-column">
                      <label>
                        <span className="required">*</span>
                        Page Name
                      </label>
                      <select className="input-field-search-select shadow" name="pageName" onChange={handlePageName}>
                        <option value="none" selected disabled hidden>{_labels.selectAnOption()}</option>
                        <option value="About Us">{_labels.aboutUs()}</option>
                        <option value="Add Product Page Guidelines">{_labels.addProductPageGuidelines()}</option>
                        <option value="Terms and Conditions">{_labels.termsAndConditions()}</option>
                        <option value="Vendor Agreement">{_labels.vendorAgreement()}</option>
                      </select>
                    </div>
                    <div className="col-lg-6" />
                  </div>
                </>
              )
              : (
                <>
                  <h4 className="mb-2">{pageName}</h4>
                  <h5 className="mb-2">
                    Language Type :
                    {lang}
                  </h5>
                </>
              )
          }
          {pageName && <input type="hidden" name="pageName" value={formState.pageName} />}
          <div className="row ckeditor-list">
            <div className="form-group col-lg-6 d-flex flex-column">
              <label>
                <span className="required">*</span>
                Page Content
              </label>
              <CKEditor
                editor={Editor}
                config={editorConfiguration}
                data={formState.content}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6" />
          </div>
        </div>
        <div className={`cst-form-${respMsg.error ? 'error' : 'success'}`}>{respMsg.msg}</div>
        <div className="card-footer">
          <div className="d-flex justify-content-center">
            <input
              type="submit"
              className="btn btn-dark btn-sm rounded"
              value={pageName ? _labels.updateContentPage() : _labels.createContentPage()}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateContentComp;
