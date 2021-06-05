import React from 'react';
import { useI18n } from '../../../shared/context/i18nContext';

function AddressFormComp({
  phone, zip, city, state, address, country, onUpdateState,
}) {
  const { _common: { _labels } } = useI18n();
  return (
    <>
      <div className="form-group required-field">
        <label>{_labels.phone()}</label>
        <input
          name="phone"
          type="number"
          className="form-control input-field-search shadow mb-2"
          placeholder="Phone Number"
          onChange={onUpdateState}
          value={phone}
        />
      </div>
      <div className="form-group required-field">
        <label>{_labels.zip()}</label>
        <input
          type="text"
          name="zip"
          className="form-control input-field-search shadow mb-2"
          placeholder="Zip/Postal Code"
          onChange={onUpdateState}
          value={zip}
        />
      </div>
      <div className="form-group required-field">
        <label>{_labels.city()}</label>
        <input
          type="text"
          name="city"
          className="form-control input-field-search shadow mb-2"
          placeholder="City Name"
          onChange={onUpdateState}
          value={city}
        />
      </div>
      <div className="form-group required-field">
        <label>{_labels.state()}</label>
        <input
          type="text"
          name="state"
          className="form-control input-field-search shadow mb-2"
          placeholder="State/Province"
          onChange={onUpdateState}
          value={state}
        />
      </div>
      <div className="form-group required-field">
        <label>{_labels.country()}</label>
        <input
          type="text"
          name="country"
          className="form-control input-field-search shadow mb-2"
          placeholder="Country"
          onChange={onUpdateState}
          value={country}
        />
      </div>
      <div className="form-group required-field">
        <label>{_labels.address()}</label>
        <textarea
          cols="30"
          rows="1"
          className="form-control input-field-search shadow mb-2"
          name="address"
          placeholder="Address"
          onChange={onUpdateState}
          value={address}
        />
      </div>
    </>
  );
}

export default AddressFormComp;
