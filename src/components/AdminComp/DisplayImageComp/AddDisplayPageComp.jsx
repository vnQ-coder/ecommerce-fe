import { render } from "react-dom";
import React, { useState, useEffect, useCallback } from "react";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import LayoutComp from "../../../shared/components/LayoutComp";
import BreadCrumbComp from "../../../shared/components/BreadCrumbComp";
import {
  getAllBanners,
  getDisplayImageWithDetails,
} from "../../../shared/api/api";
import useApiHook from "../../../shared/hooks/useApiHook";
import { useI18n } from "../../../shared/context/i18nContext";
import BannerFormComp from "./BannerComp/BannerFormComp";
import DisplayImagesForm from "./DisplayComp/DisplayImageFormComp";
import RenderIfAuthenticated from "../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc";

const AddDisplayWrapperComp = ({ displayImagesRes, bannerRes }) => {
  const displayImagesBodyRes = displayImagesRes.body;
  const bannersBodyRes = bannerRes.body;
  const [banners, setBanners] = useState([]);
  const [displayImages, setDisplayImages] = useState([]);
  const {
    _common: { _labels },
    _displayImagePage,
    header: { _menuItems },
  } = useI18n();

  useEffect(() => {
    if (bannersBodyRes) {
      setBanners(bannersBodyRes);
    }
  }, [bannersBodyRes]);

  useEffect(() => {
    if (displayImagesBodyRes) {
      setDisplayImages(displayImagesBodyRes);
    }
  }, [displayImagesBodyRes]);

  const onDisplayImageUpdate = useCallback((body) => {
    setDisplayImages(body);
  }, []);

  const onBannerUpdate = useCallback((body) => {
    setBanners(body);
  }, []);

  return (
    <main className="main">
      <BreadCrumbComp
        items={[
          { text: _menuItems.admin() },
          { text: _menuItems.displayImage() },
          { text: _menuItems.addDisplayImage() },
        ]}
      />
      <h2 className="text-center mb-2">{_labels.sliderImages()}</h2>
      <br />
      
            {
                banners && banners.map((banner) => (
                    <BannerFormComp
                        key={banner.id}
                        id={banner.id}
                        firstHeading={banner.firstHeading}
                        secondHeading={banner.secondHeading}
                        thirdHeading={banner.thirdHeading}
                        forthHeading={banner.forthHeading}
                        price={banner.price}
                        imageNumber={banner.imageNumber}
                        imagePath={banner.imagePath}
                        onBannerUpdate={onBannerUpdate}
                    />
                ))
            }

      <h2 className="text-center mb-2">{_displayImagePage.displayImage()}</h2>
      <br />
      {displayImages &&
        displayImages.map((dp) => (
          <DisplayImagesForm
            key={dp.id}
            id={dp.id}
            title={dp.title}
            description={dp.description}
            btnText={dp.btnText}
            btnLink={dp.btnLink}
            imageNumber={dp.imageNumber}
            imagePath={dp.imagePath}
            onDisplayImageUpdate={onDisplayImageUpdate}
          />
        ))}
    </main>
  );
};
const AddDisplayPageComp = () => {
  const displayImagesRes = useApiHook({
    apiDispatchCall: getDisplayImageWithDetails,
  });
  const bannerRes = useApiHook({ apiDispatchCall: getAllBanners });

  return (
    <AlertProvider template={AlertTemplate}>
      <LayoutComp waitFor={displayImagesRes && bannerRes}>
        <RenderIfAuthenticated redirectToIfUnAuth="/" hasRoles={["admin"]}>
          <AddDisplayWrapperComp
            bannerRes={bannerRes}
            displayImagesRes={displayImagesRes}
          />
        </RenderIfAuthenticated>
      </LayoutComp>
    </AlertProvider>
  );
};

render(<AddDisplayPageComp />, document.getElementById("react-container"));
