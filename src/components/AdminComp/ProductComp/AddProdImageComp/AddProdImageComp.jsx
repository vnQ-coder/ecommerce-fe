import React, { useState } from 'react';

const AddProdImageComp = ({
  idx, src, imageId, productId, isPreview, handleAddNewField, handleRemoveFields, onFileSelected,
}) => {
  const [imagePreview, setImagePreview] = useState();
  const onSelectImageHandler = (e) => {
    if (e.target.files && e.target.files.length) {
      onFileSelected(e.target.name, e.target.files[0], imageId, idx);
      if (isPreview) setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <>
      <div className="product__container">
        <input type="file" id={`img-${idx}`} name={`img-${idx}`} accept="image/*" onChange={onSelectImageHandler} />
        <div className="img__btn">

          {/* <img className="product__image" src={imagePreview  || baseURL + src} alt="product Image"/> */}
          <img className="product__image" src={imagePreview || src} alt="product Image" />
          {
            !productId
              ? (
                <div className="add__btn">
                  <button type="button" onClick={() => handleAddNewField(idx)}> + </button>

                  {idx === 0 ? '' : (
                    <button
                      type="button"
                      className="btn-minus"
                      onClick={() => handleRemoveFields(idx)}
                    >
                      -
                    </button>
                  )}

                </div>
              )
              : ''
          }

        </div>
      </div>

    </>
  );
};

export default AddProdImageComp;
