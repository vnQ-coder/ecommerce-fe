import { render } from 'react-dom';
import React, { useEffect, useState } from 'react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LayoutComp from '../../shared/components/LayoutComp';
import CartModelComp from '../../shared/components/CartModelComp';
import ProductDetailComp from './ProductDetailComp/ProductDetailComp';
import useApiHook from '../../shared/hooks/useApiHook';
import {
  getAllProductReviews,
  getProductDetailsById,
  getProductImagesById,
  getUserQuestions,
  getAllRelatedProducts,
  getOtherVendorProducts,
  checkIfUserPlacedOrder,
} from '../../shared/api/api';

const ProductPageComp = () => {
  const [ajaxCallLoaded, setAjaxCallLoaded] = useState(false);
  const productId = new URLSearchParams(window.location.search).get('productId');
  const productReviewsRes = useApiHook({ apiDispatchCall: getAllProductReviews, initiateOnLoadCallData: productId });
  const productImagesRes = useApiHook({ apiDispatchCall: getProductImagesById, initiateOnLoadCallData: productId });
  const productDetailsRes = useApiHook({ apiDispatchCall: getProductDetailsById, initiateOnLoadCallData: productId });
  const relatedProductsRes = useApiHook({ apiDispatchCall: getAllRelatedProducts, initiateOnLoadCallData: productId });
  const otherProductsRes = useApiHook({ apiDispatchCall: getOtherVendorProducts, initiateOnLoadCallData: productId });
  const checkUserRes = useApiHook({ apiDispatchCall: checkIfUserPlacedOrder, initiateOnLoadCallData: productId });
  const resUserQuestion = useApiHook({ apiDispatchCall: getUserQuestions, initiateOnLoadCallData: productId });

  useEffect(() => {
    if (productReviewsRes.body && productImagesRes.body && productDetailsRes.body
      && resUserQuestion.body && relatedProductsRes.body && otherProductsRes.body) {
      setAjaxCallLoaded(true);
    }
  }, [productReviewsRes, productImagesRes, productDetailsRes, resUserQuestion, relatedProductsRes, otherProductsRes]);

  return (
    <AlertProvider template={AlertTemplate}>
      <LayoutComp waitFor={ajaxCallLoaded}>
        <main className="main">
          {/* <BreadCrumbComp /> */}
          <ProductDetailComp
            productReviewsRes={productReviewsRes}
            productImagesRes={productImagesRes}
            productDetailsRes={productDetailsRes}
            productId={productId}
            askedQuestions={resUserQuestion.body}
            relatedProductsRes={relatedProductsRes}
            otherProductsRes={otherProductsRes}
            checkUserRes={checkUserRes}
          />
          <CartModelComp />
          {/* <RelatedProducts /> */}
        </main>
      </LayoutComp>
    </AlertProvider>
  );
};

render(<ProductPageComp />, document.getElementById('react-container'));
