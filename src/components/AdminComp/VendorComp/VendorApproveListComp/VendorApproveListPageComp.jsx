import { render } from 'react-dom';
import React, { useEffect, useState } from 'react';
import {
  Provider as AlertProvider, useAlert,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { useI18n } from '../../../../shared/context/i18nContext';
import LayoutComp from '../../../../shared/components/LayoutComp';
import VendorsListComp from './VendorListComp';
import BreadCrumbComp from '../../../../shared/components/BreadCrumbComp';
import RenderIfAuthenticated from '../../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';
import useApiHook from '../../../../shared/hooks/useApiHook';
import { getAllPendingVendors, approveVendor, approveSelectedVendor } from '../../../../shared/api/api';

const VendorApproveListWrapperComp = ({ reqPendingVendorsList }) => {
  const reqVendorApproval = useApiHook({ apiDispatchCall: approveVendor, initiateOnLoad: false });
  const reqSelectedVendorApproval = useApiHook({ apiDispatchCall: approveSelectedVendor, initiateOnLoad: false });
  const [selectedVendors, setSelectedVendors] = useState([]);
  const { _vendorPage, header: { _menuItems } } = useI18n();
  const loadVendorsList = reqPendingVendorsList.body;
  const [vendors, setVendors] = useState();
  const [check, setCheck] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    if (loadVendorsList) {
      setVendors(loadVendorsList);
    }
  }, [loadVendorsList]);

  const onVendorSelectedHandler = (checked, vendorId) => {
    if (checked) {
      setSelectedVendors((prevState) => ([...prevState, { vendorId }]));
    } else {
      setSelectedVendors(selectedVendors.filter((vendor) => vendor.vendorId !== vendorId));
    }
  };

  const onSelectAllHandler = (checked) => {
    vendors.map((vendor) => {
      if (checked) {
        setSelectedVendors((prevState) => ([...prevState, { vendorId: vendor.id }]));
        setCheck(true);
      } else {
        setSelectedVendors([]);
        setCheck(false);
      }
    });
  };

  const onHandleSelectedApproval = () => {
    const vendorsId = selectedVendors.map((v) => v.vendorId);
    let afterVendorApproval = vendors;
    reqSelectedVendorApproval.dispatchCall(selectedVendors)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          vendorsId.map((vendorId) => {
            const isNotVendorId = (vendor) => vendor.id !== vendorId;
            afterVendorApproval = afterVendorApproval.filter(isNotVendorId);
            setVendors(afterVendorApproval);
          });
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
    setCheck(false);
  };

  const onHandleOneApprove = (vendorId) => {
    reqVendorApproval.dispatchCall(vendorId)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          const isNotVendorId = (vendor) => vendor.id !== vendorId;
          const afterVendorApproval = vendors.filter(isNotVendorId);
          setVendors(afterVendorApproval);
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
    setCheck(false);
  };

  return (
    <main className="main">
      <BreadCrumbComp items={[
        { text: _menuItems.admin() },
        { text: _menuItems.vendor() },
        { text: _menuItems.approveVendor() },
      ]}
      />
      <div className="page-header">
        <div className="container">
          <h3>{_vendorPage.approveVendors()}</h3>
        </div>
      </div>
      <div className="container">
        <VendorsListComp
          vendors={vendors}
          onHandleOneApprove={onHandleOneApprove}
          onVendorSelected={onVendorSelectedHandler}
          onHandleSelectedApproval={onHandleSelectedApproval}
          onSelectAllHandler={onSelectAllHandler}
          check={check}
        />
        <div className="mb-10" />
      </div>
    </main>
  );
};

const VendorApproveListPageComp = () => {
  const reqPendingVendorsList = useApiHook({ apiDispatchCall: getAllPendingVendors });
  return (
    <AlertProvider template={AlertTemplate}>
      <LayoutComp waitFor={reqPendingVendorsList}>
        <RenderIfAuthenticated redirectToIfUnAuth="/" hasRoles={['admin']}>
          <VendorApproveListWrapperComp reqPendingVendorsList={reqPendingVendorsList} />
        </RenderIfAuthenticated>
      </LayoutComp>
    </AlertProvider>
  );
};

render(<VendorApproveListPageComp />, document.getElementById('react-container'));
