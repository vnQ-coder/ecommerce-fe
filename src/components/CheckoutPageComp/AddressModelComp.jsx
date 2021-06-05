import React, { useRef } from 'react';

const AddressModelComp = ({
  title, addressState, onSubmit, id,
}) => {
  const closeBtnRef = useRef();
  const { formState, onUpdateState, onClearState } = addressState;

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (closeBtnRef.current) closeBtnRef.current.click();
    if (onSubmit) onSubmit(formState);
  };

  return (
    <div className="modal fade" id={id} tabIndex={-1} role="dialog" aria-labelledby="addressModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={onFormSubmit}>
            <div className="modal-header">
              <h3 className="modal-title" id="addressModalLabel">{title}</h3>
              <button ref={closeBtnRef} className="d-none" data-dismiss="modal" />
              <button type="button" className="close" data-dismiss="modal" onClick={onClearState} aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group required-field">
                <label>Phone Number </label>
                <input
                  name="phone"
                  value={formState.phone || ''}
                  onChange={onUpdateState}
                  type="tel"
                  className="form-control form-control-sm"
                  required
                />
              </div>
              <div className="form-group required-field">
                <label>Zip/Postal Code </label>
                <input
                  type="text"
                  name="zip"
                  value={formState.zip || ''}
                  onChange={onUpdateState}
                  className="form-control form-control-sm"
                  required
                />
              </div>
              <div className="form-group required-field">
                <label>City </label>
                <input
                  type="text"
                  name="city"
                  value={formState.city || ''}
                  onChange={onUpdateState}
                  className="form-control form-control-sm"
                  required
                />
              </div>
              <div className="form-group required-field">
                <label>State/Province</label>
                <input
                  type="text"
                  name="state"
                  value={formState.state || ''}
                  onChange={onUpdateState}
                  className="form-control form-control-sm"
                  required
                />
              </div>
              <div className="form-group required-field">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formState.country || ''}
                  onChange={onUpdateState}
                  className="form-control form-control-sm"
                  required
                />
              </div>
              <div className="form-group required-field">
                <label>Address</label>
                <textarea
                  cols="30"
                  rows="1"
                  className="form-control"
                  name="address"
                  value={formState.address || ''}
                  onChange={onUpdateState}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-link btn-sm" onClick={onClearState} data-dismiss="modal">
                Cancel
              </button>
              <button id="saveChanges" type="submit" className="btn btn-primary btn-sm">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddressModelComp;
