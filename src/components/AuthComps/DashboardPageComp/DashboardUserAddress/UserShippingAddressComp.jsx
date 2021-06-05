import React, { useState, useCallback, useEffect } from 'react';
import { useI18n } from '../../../../shared/context/i18nContext';
import AddNewShippingAddressComp from './AddNewShippingAddressComp';
import UserShippingAddressFormComp from './UserShippingAddressFormComp';
import UserShippingAddressInfoComp from './UserShippingAddressInfoComp';

function UserShippingAddressComp({ shippingAddresses }) {
  const [infoFormVisible, setInfoFormVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
  const [infoShippingFormVisible, setInfoShippingFormVisible] = useState(false);
  const [infoShippingVisible, setInfoShippingVisible] = useState(true);
  const [userShippingAddresses, setUserShippingAddresses] = useState([]);
  const [editable, setEditable] = useState(null);

  useEffect(() => {
    setUserShippingAddresses(shippingAddresses);
  }, [shippingAddresses]);

  const onHandleEdit = (id) => {
    setEditable(id);
    setInfoVisible(false);
    setInfoFormVisible(true);
  };

  const onHandleNewForm = (e) => {
    e.preventDefault();
    setInfoShippingVisible(false);
    setInfoShippingFormVisible(true);
  };

  const onUserShippingAddressChange = useCallback((body) => {
    setUserShippingAddresses(body);
  }, []);

  const onNewUserShippingAddressAdd = useCallback((body) => {
    setUserShippingAddresses(body);
  }, []);

  const onDeleteUserShippingAddress = useCallback((body) => {
    setUserShippingAddresses(body);
  }, []);

  const { _dashboardPage } = useI18n();
  return (
    <>
      { infoShippingVisible
        && (
          <div className="card shadow card-border">
            <div className="card-header bg-dark text-white card-header-border">
              {_dashboardPage.defaultShippingAddress()}
              <a
                id="editShipingAddress"
                href="# "
                className=" card-edit text-white"
                onClick={onHandleNewForm}
              >
                <i className="icon-plus" />
              </a>
            </div>
            <div className="card-body card-user-info">
              {
                userShippingAddresses && userShippingAddresses.map((shippingAddress, index) => (
                  <div key={shippingAddress.id}>
                    <UserShippingAddressInfoComp
                      index={index}
                      shippingAddress={shippingAddress}
                      onHandleEdit={onHandleEdit}
                      onDeleteUserShippingAddress={onDeleteUserShippingAddress}
                      infoVisible={infoVisible}
                    />
                    <UserShippingAddressFormComp
                      index={index}
                      shippingAddress={shippingAddress}
                      setInfoFormVisible={setInfoFormVisible}
                      setInfoVisible={setInfoVisible}
                      infoFormVisible={infoFormVisible}
                      onUserShippingAddressChange={onUserShippingAddressChange}
                      editable={editable}
                    />
                  </div>
                ))
              }

            </div>
          </div>
        )}
      { infoShippingFormVisible && (
        <AddNewShippingAddressComp
          setInfoShippingVisible={setInfoShippingVisible}
          setInfoShippingFormVisible={setInfoShippingFormVisible}
          onNewUserShippingAddressAdd={onNewUserShippingAddressAdd}
        />
      )}
    </>
  );
}

export default UserShippingAddressComp;
