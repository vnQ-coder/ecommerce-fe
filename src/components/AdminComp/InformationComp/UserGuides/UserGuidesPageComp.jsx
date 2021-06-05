import { render } from 'react-dom';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Provider as AlertProvider, useAlert,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LayoutComp from '../../../../shared/components/LayoutComp';
import { getAllUserGuides, deleteUserGuides } from '../../../../shared/api/api';
import useApiHook from '../../../../shared/hooks/useApiHook';
import { useI18n } from '../../../../shared/context/i18nContext';
import UserGuideCardComp from './UserGuideCard/UserGuideCardComp';
import UserBrowseTopicComp from './UserBrowseTopic/UserBrowseTopicComp';
import UserGuidesPopupComp from './UserGuidesPopup/UserGuidesPopupComp';

const UserGuidesWrapperComp = ({ userGuidesRes }) => {
  const userGuides = userGuidesRes.body;
  const reqDeleteUserGuide = useApiHook({ apiDispatchCall: deleteUserGuides, initiateOnLoad: false });
  const { _common: { _labels } } = useI18n();
  const [guides, setGuides] = useState([]);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [guideId, setGuideId] = useState(null);
  const [idx, setIdx] = useState(null);
  const [popup, Setpop] = useState(true);
  const alert = useAlert();

  const onSetPopupHandler = (guideId, title, description, idx) => {
    setGuideId(guideId);
    setTitle(title);
    setDescription(description);
    setIdx(idx);
  };

  useEffect(() => {
    if (userGuides) {
      setGuides(userGuides);
    }
  }, [userGuides]);

  const onInformationAfterDelete = useCallback((body) => {
    setGuides(body);
  }, []);

  const onDeleteGuide = (guideId, idx) => {
    reqDeleteUserGuide.dispatchCall(guideId)
      .then(({ isSuccessResponse, body }) => {
        const msg = body.message;
        if (isSuccessResponse) {
          onInformationAfterDelete(body.result);
          alert.success(msg);
        }
        if (!isSuccessResponse) {
          alert.error(msg);
        }
      });
  };

  return (
    <main className="main">
      {/* <BreadCrumbComp /> */}
      <div className="container">
        <div className="row">
          {
            guides && guides.length ? (
              <>
                <div className="col-lg-3 col-md-12 mr-5">
                  <h4>Browse Topic</h4>
                  {
                    guides && guides.map((userGuide) => (
                      <UserBrowseTopicComp
                        key={userGuide.informationId}
                        id={userGuide.informationId}
                        title={userGuide.informationTitle}
                        guides={userGuide.guides}
                      />
                    ))
                  }

                </div>
                <div className="col-lg-8 col-lg-7">
                  {
                    guides && guides.map((userGuide, idx) => (
                      <UserGuideCardComp
                        key={userGuide.informationId}
                        id={userGuide.informationId}
                        title={userGuide.informationTitle}
                        guides={userGuide.guides}
                        idx={idx}
                        onSetPopupHandler={onSetPopupHandler}
                      />
                    ))
                  }

                  <UserGuidesPopupComp
                    title={title}
                    description={description}
                    guideId={guideId}
                    idx={idx}
                    onDeleteGuide={onDeleteGuide}
                  />
                </div>
              </>
            )
              : (
                <div className="col-lg-12">
                  <h3 className="text-center mt-5">No Guides are available in this page</h3>
                </div>
              )
          }

        </div>
      </div>

    </main>
  );
};
const UserGuidesPageComp = () => {
  const userGuidesRes = useApiHook({ apiDispatchCall: getAllUserGuides });
  return (
    <AlertProvider template={AlertTemplate}>
      <LayoutComp waitFor>
        <UserGuidesWrapperComp userGuidesRes={userGuidesRes} />
      </LayoutComp>
    </AlertProvider>
  );
};

render(<UserGuidesPageComp />, document.getElementById('react-container'));
