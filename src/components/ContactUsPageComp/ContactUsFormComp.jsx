import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useI18n } from '../../shared/context/i18nContext';
import useApiHook from '../../shared/hooks/useApiHook';
import { postContactUs } from '../../shared/api/api';
import useFormStateHook from '../../shared/hooks/useFormStateHook';

const ContactUsFormComp = () => {
  const { formState, onUpdateFormState, onClearState } = useFormStateHook({ name: '', message: '' });
  const [respMsg, setRespMsg] = useState({ error: false, msg: '' });
  const reqContactUs = useApiHook({ apiDispatchCall: postContactUs, initiateOnLoad: false });
  const alert = useAlert();
  const { _common: { _labels }, _contactUsPage } = useI18n();

  const onSendContactDetailsHandler = async (e) => {
    e.preventDefault();
    reqContactUs.dispatchCall(formState)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          alert.success(msg);
          onClearState();
        }
        if (!isSuccessResponse) {
          alert.error(msg);
          onClearState();
        }
      });
  };

  return (
    <div className="row row-sparse">
      <div className="col-md-8">
        <h2 className="light-title" dangerouslySetInnerHTML={{ __html: _contactUsPage.writeUs() }} />
        <form action="#" onSubmit={onSendContactDetailsHandler}>
          <div className="card shadow card-border">
            <div className="card-header bg-dark text-white card-header-border">{_contactUsPage.contactUs()}</div>
            <div className="card-body p-5">
              <div className="form-group required-field">
                <label htmlFor="contact-name">{_labels.name()}</label>
                <input type="text" value={formState.name} placeholder="Enter Your Name" className="form-control input-field-search shadow" id="contact-name" name="name" required onChange={onUpdateFormState} />
              </div>
              <div className="form-group required-field">
                <label htmlFor="contact-message">{_contactUsPage.whatsOnUrMind()}</label>
                <textarea
                  cols="30"
                  rows="1"
                  id="contact-message"
                  className="form-control input-field-textarea shadow"
                  name="message"
                  required
                  value={formState.message}
                  placeholder="Message"
                  onChange={onUpdateFormState}
                />
              </div>
            </div>
            <div className={`cst-form-${respMsg.error ? 'error' : 'success'}`}>{respMsg.msg}</div>
            <div className="card-footer">
              <div className="d-flex justify-content-center">
                <input
                  type="submit"
                  className="btn btn-sm btn-dark rounded"
                  value={_labels.submit()}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="col-md-4">
        <h2 className="light-title" dangerouslySetInnerHTML={{ __html: _contactUsPage.contactDetails() }} />

        <div className="contact-info">
          <div>
            <i className="icon-phone" />
            <p><a href="tel:">0201 203 2032</a></p>
            <p><a href="tel:">0201 203 2032</a></p>
          </div>
          <div>
            <i className="icon-mobile" />
            <p><a href="tel:">201-123-3922</a></p>
            <p><a href="tel:">302-123-3928</a></p>
          </div>
          <div>
            <i className="icon-mail-alt" />
            <p><a href="mailto:#">lorem@gmail.com</a></p>
            <p><a href="mailto:#">lorem@loremtemplate.com</a></p>
          </div>
          <div>
            <i className="icon-skype" />
            <p>lorem_skype</p>
            <p>lorem_temp</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactUsFormComp;
