import React, { useState, useEffect, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useAlert } from 'react-alert';
import { useI18n } from '../../../../shared/context/i18nContext';
import Editor from '../../../../ckeditor-custom/build/ckeditor';
import { getAllInformationType } from '../../../../shared/api/api';
import useApiHook from '../../../../shared/hooks/useApiHook';

function InformationDetailFormComp({
  title, description, informationId, onUpdateState, informationType, formState, setFormState, onUpdateCKEditorState,
}) {
  const { _common, _common: { _labels } } = useI18n();
  const reqAllInformationType = useApiHook({ apiDispatchCall: getAllInformationType, initiateOnLoad: false });
  const [information, setInformation] = useState(informationType || 'vendor');
  const [createdInformations, setCreatedInformations] = useState([]);
  const alert = useAlert();
  const onInformationChange = useCallback((body) => {
    setCreatedInformations(body);
  }, []);

  useEffect(() => {
    if (information) {
      const onHandleInformationType = () => {
        reqAllInformationType.dispatchCall({ information })
          .then(({ isSuccessResponse, body }) => {
            const msg = body.message;
            if (isSuccessResponse) {
              onInformationChange(body);
            }
            if (!isSuccessResponse) {
              alert.error(msg);
            }
          });
      };
      onHandleInformationType();
    }
  }, [information]);

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

  const onUpdateStatus = (e) => {
    setFormState({ ...formState, informationType: e.target.value });
    setInformation(e.target.value);
  };

  return (
    <>
      <div className="row mb-1">

        <div className="col-lg-8 d-flex flex-column mb-1">
          <label>
            {_labels.informationTitle()}
            <span className="required">*</span>
          </label>
          <select
            name="informationId"
            value={informationId}
            onChange={onUpdateState}
            className="input-field-search-select shadow"
          >
            <option value={0}>{_common.none()}</option>
            {createdInformations
              ? createdInformations.map(({ id, title }) => <option key={id} value={id}>{title}</option>)
              : (
                <option value={1}>
                  {_common.loading()}

                  {_labels.categories()}
                  ...
                </option>
              )}
          </select>
        </div>
        <div className="col-lg-4 d-flex flex-column">
          <label>
            {_labels.informationType()}
            <span className="required">*</span>
          </label>
          <select
            value={informationType}
            onChange={onUpdateStatus}
            name="informationType"
            className="input-field-search-select shadow"
          >
            <option value="vendor">Vendor</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>
      <div className="row mb-1">
        <div className="col-lg-8 d-flex flex-column">
          <label>
            {_labels.title()}

            <span className="required">*</span>
          </label>
          <input
            name="title"
            type="text"
            className="form-control input-field-search shadow"
            required
            value={title}
            onChange={onUpdateState}
            placeholder="Information Title"
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-lg-12 ckeditor-list">
          <label>
            {_labels.description()}

            <span className="required">*</span>
          </label>
          <CKEditor
            editor={Editor}
            config={editorConfiguration}
            data={description}
            onChange={onUpdateCKEditorState}
          />
        </div>
      </div>
    </>
  );
}

export default InformationDetailFormComp;
