import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import PropType from 'prop-types';
import { useI18n } from '../../../../shared/context/i18nContext';
import useApiHook from '../../../../shared/hooks/useApiHook';
import { getProductCategories } from '../../../../shared/api/api';
import Editor from '../../../../ckeditor-custom/build/ckeditor';

function AddProdDetailComp({
  onUpdateState, title, price, description, catId, productQty, onUpdateCKEditorState, detailDescription,
}) {
  const categoryCall = useApiHook({ apiDispatchCall: getProductCategories });
  const { _common, _common: { _labels } } = useI18n();
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

  return (
    <>

      <div className="row row-sparse">
        <div className="col-md-8">
          <div className="form-group">
            <label htmlFor="product-title">
              {_labels.title()}

              <span className="required">*</span>
            </label>
            <input
              name="title"
              type="text"
              className="form-control input-field-search shadow"
              id="product-title"
              placeholder="Product Title"
              required
              onChange={onUpdateState}
              value={title}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="product-category">{_labels.chooseCategory()}</label>
            <select
              value={catId}
              id="product-category"
              name="categoryId"
              className="form-control form-control-sm mb-2 input-field-search-select shadow"
              onChange={onUpdateState}
            >

              <option value={0}>{_common.none()}</option>
              {!categoryCall.isLoadingResponse
                && categoryCall.isSuccessResponse
                ? categoryCall.body.map(({ id, title }) => <option key={id} value={id}>{title}</option>)
                : (
                  <option value={1}>
                    {_common.loading()}

                    {_labels.categories()}
                    ...
                  </option>
                )}
            </select>
          </div>
        </div>
      </div>

      <div className="row row-sparse">
        <div className="col-md-8">
          <div className="form-group">
            <label htmlFor="product-price">
              Products Available
              <span className="required">*</span>
            </label>
            <input
              name="productQty"
              type="number"
              className="form-control input-field-search shadow mb-2"
              id="productQty"
              placeholder="Product Quantity"
              required
              onChange={onUpdateState}
              value={productQty}
              min="1"
            />
          </div>
        </div>
      </div>

      <div className="row row-sparse">
        <div className="col-md-8">
          <div className="form-group">
            <label htmlFor="product-price">
              {_common.price()}

              <span className="required">*</span>
            </label>
            <input
              name="price"
              type="number"
              className="form-control input-field-search shadow mb-2"
              id="product-price"
              placeholder="Product Price"
              required
              onChange={onUpdateState}
              value={price}
              min="1"
            />
          </div>
        </div>
      </div>

      <div className="row row-sparse">
        <div className="col-md-8">
          <label htmlFor="product-description">
            {_labels.description()}

            <span className="required">*</span>
          </label>
          <textarea
            name="description"
            rows="1"
            id="product-description"
            placeholder="Product Description"
            className="form-control input-field-textarea shadow"
            required
            value={description}
            onChange={onUpdateState}
          />
        </div>
      </div>
      <div className="row mb-2 mt-1">
        <div className="col-lg-12 ckeditor-list">
          <label>
            {_labels.detailDescription()}
            <span className="required">*</span>
          </label>
          <CKEditor
            editor={Editor}
            config={editorConfiguration}
            data={detailDescription === null ? '' : detailDescription}
            onChange={onUpdateCKEditorState}
          />
        </div>
      </div>
    </>
  );
}

AddProdDetailComp.propTypes = {
  onUpdateState: PropType.func.isRequired,
  title: PropType.string.isRequired,
  price: PropType.number.isRequired,
  description: PropType.string.isRequired,
  catId: PropType.string.isRequired,
  productQty: PropType.number.isRequired,
  onUpdateCKEditorState: PropType.func.isRequired,
  detailDescription: PropType.string.isRequired,
};

export default AddProdDetailComp;
