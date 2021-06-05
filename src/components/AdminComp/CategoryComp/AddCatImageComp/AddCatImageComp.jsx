import React from 'react';

function AddCatImageComp({ src, onSelectImageHandler, imagePreview }) {
  return (
    <>
      <input
        type="file"
        id="img"
        name="image"
        accept="image/*"
        onChange={onSelectImageHandler}
      />
      <img
        className="category__image"
        src={imagePreview || src}
        alt="Category Image"
      />
    </>
  );
}

export default AddCatImageComp;
