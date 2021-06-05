import React from 'react';
import { useI18n } from '../../../shared/context/i18nContext';

function AddressDisplayComp({ address }) {
  const { _common: { _labels } } = useI18n();
  return (
    <>
      <address className="shipping-addresses">
        <label className="font-weight-bold mb-2">
          {_labels.type()}
          :

          {address && address.type}
        </label>
        <br />
        <label className="font-weight-bold">
          {_labels.address()}
          :
        </label>
        <br />
        {address && address.address}
        <br />
        {address && address.city}

        {address && address.state}
        ,

        {address && address.country}
        <br />
        <label className="font-weight-bold mt-1">
          {_labels.phone()}
          :
        </label>
        <br />
        {address && address.phone}

        <br />
        <label className="font-weight-bold mt-1">
          {_labels.zip()}
          :
        </label>
        <br />
        {address && address.zip}

        <br />
      </address>
    </>
  );
}

export default AddressDisplayComp;
