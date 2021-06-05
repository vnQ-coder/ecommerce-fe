import { render } from "react-dom";
import React, { useState } from "react";
import { Provider as AlertProvider, useAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import LayoutComp from "../../../../shared/components/LayoutComp";
import { postCreateInformationType } from "../../../../shared/api/api";
import useApiHook from "../../../../shared/hooks/useApiHook";
import { useI18n } from "../../../../shared/context/i18nContext";
import RenderIfAuthenticated from "../../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc";
import useFormStateHook from "../../../../shared/hooks/useFormStateHook";
import BreadCrumbComp from "../../../../shared/components/BreadCrumbComp";

const InformationTypeWrapperComp = () => {
  const {
    _common: { _labels },
    header: { _menuItems },
  } = useI18n();
  const reqCreateInformationType = useApiHook({
    apiDispatchCall: postCreateInformationType,
    initiateOnLoad: false,
  });
  const [respMsg, setRespMsg] = useState({ error: false, msg: "" });
  const alert = useAlert();
  const { formState, onUpdateState, onClearState } = useFormStateHook({
    title: "",
    informationType: "vendor",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    reqCreateInformationType
      .dispatchCall(formState)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          onClearState();
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };
  return (
    <main className="main">
      <BreadCrumbComp
        items={[
          { text: _menuItems.admin() },
          { text: _menuItems.informationType() },
          { text: _menuItems.information() },
        ]}
      />
      <div className="container">
        <h2 className="text-center mb-2">{_labels.information()}</h2>
      </div>
      <div className="container">
        <form onSubmit={onSubmitHandler}>
          <div className="card shadow card-border">
            <div className="card-header bg-dark text-white card-header-border">
              {_labels.information()}
            </div>
            <div className="card-body p-5">
              <div className="row mb-1">
                <div className="col-lg-6 d-flex flex-column">
                  <label>
                    {_labels.title()}

                    <span className="required">*</span>
                  </label>
                  <input
                    name="title"
                    id="title"
                    type="text"
                    className="form-control input-field-search shadow"
                    required
                    value={formState.title}
                    onChange={onUpdateState}
                    placeholder="Information Type Title"
                  />
                </div>
                <div className="col-lg-6 d-flex flex-column">
                  <label>
                    {_labels.informationType()}
                    <span className="required">*</span>
                  </label>
                  <select
                    name="informationType"
                    id="informationType"
                    value={formState.informationType}
                    onChange={onUpdateState}
                    className="input-field-search-select shadow"
                  >
                    <option id="vendor" value="vendor">
                      Vendor
                    </option>
                    <option id="user" value="user">
                      User
                    </option>
                  </select>
                </div>
              </div>
              <br />
              <div
                className={`cst-form-${respMsg.error ? "error" : "success"}`}
              >
                {respMsg.msg}
              </div>
              <br />
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center">
                <input
                  type="submit"
                  className="btn btn-sm btn-dark rounded"
                  value={_labels.information()}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
const InformationTypePageComp = () => (
  <AlertProvider template={AlertTemplate}>
    <LayoutComp waitFor>
      <RenderIfAuthenticated redirectToIfUnAuth="/" hasRoles={["admin"]}>
        <InformationTypeWrapperComp />
      </RenderIfAuthenticated>
    </LayoutComp>
  </AlertProvider>
);

render(<InformationTypePageComp />, document.getElementById("react-container"));
