import React, { useEffect, useState } from 'react';

const FileUploadInputComp = ({
  name, buttonText, placeholder, reset, onChange,
}) => {
  const [filename, setFileName] = useState('');

  useEffect(() => { if (reset) setFileName(''); }, [reset]);

  const onFileSelected = (e) => {
    const { files } = e.target;
    if (files && files.length) setFileName(files[0].name);
    else setFileName('');
    if (onChange) onChange(files, name);
  };

  return (
    <div className="input-group">
      <input
        disabled
        value={filename}
        type="text"
        className="form-control form-control-sm input-field-search shadow"
        placeholder={placeholder}
      />
      <div className="input-group-append">
        <label htmlFor={`file-input-${name}`} className="btn btn-sm btn-primary mb-0 rounded shadow">{buttonText}</label>
        <input id={`file-input-${name}`} type="file" className="d-none" onChange={onFileSelected} name={name} />
      </div>
    </div>
  );
};

export default FileUploadInputComp;
