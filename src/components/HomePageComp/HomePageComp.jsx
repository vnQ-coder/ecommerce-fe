import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import useApiHook from '../../shared/hooks/useApiHook';
import LayoutComp from '../../shared/components/LayoutComp';
import NewsLetterPopup from '../../shared/components/NewsLetterPopup';
import CartModelComp from '../../shared/components/CartModelComp';
import FeatureInfoComp from './FeatureProductsComp/FeatureInfoComp';
import FeatureProductComp from './FeatureProductsComp/FeatureProductComp';
import ShopCategoryComp from './ShopCategoryComp/ShopCategoryComp';
import HomeSliderComp from './HomeSliderComp/HomeSliderComp';
import DisplayImage from './DisplayImageComp/DisplayImages';
import {
  getAllBanners,
  getDisplayImageWithDetails,
  getFeaturedCategories,
  getFeatureProducts,
} from '../../shared/api/api';

const HomePageComp = () => {
  const [ajaxCallLoaded, setAjaxCallLoaded] = useState(false);
  const categoryResp = useApiHook({ apiDispatchCall: getFeaturedCategories });
  const productsReq = useApiHook({ apiDispatchCall: getFeatureProducts });
  const displayImagesRes = useApiHook({ apiDispatchCall: getDisplayImageWithDetails });
  const bannerRes = useApiHook({ apiDispatchCall: getAllBanners });

  useEffect(() => {
    if (
      categoryResp && productsReq && displayImagesRes && bannerRes
    ) setAjaxCallLoaded(true);
  }, [bannerRes, categoryResp, displayImagesRes, productsReq]);

  return (
    <LayoutComp waitFor={ajaxCallLoaded}>
      <main className="main">
        <HomeSliderComp bannerRes={bannerRes} />
        <ShopCategoryComp shopByCategory={categoryResp.body} />
        {/* <BannerComp /> */}
        <DisplayImage displayImagesRes={displayImagesRes} />
        <FeatureProductComp products={productsReq.body} />
        <hr className="mt-3 mb-6" />
        <FeatureInfoComp />
      </main>
      <CartModelComp />
      <NewsLetterPopup />
    </LayoutComp>
  );
};

render(<HomePageComp />, document.getElementById('react-container'));
