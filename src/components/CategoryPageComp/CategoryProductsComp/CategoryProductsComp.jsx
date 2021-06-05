import React, { useState } from 'react';
import PaginationComp from '../../../shared/components/PaginationComp';
import FeatureProductItemComp from '../../HomePageComp/FeatureProductsComp/FeatureProductItemComp';
import CategoryToolbarComp from '../CategoryToolbarComp/CategoryToolbarComp';
import CategoryBannerComp from '../CategoryBannerComp/CategoryBannerComp';
import FeatureProductQuickView from '../../HomePageComp/FeatureProductsComp/FeatureProductQuickView';

const dummyProducts = [{
  id: 1,
  image: '/assets/images/products/home/p3.jpg',
  category: 'Lorem Ipsum',
  title: 'Fake Product 1',
  discount: '10',
  oldPrice: '55',
  price: '35',
}, {
  id: 2,
  image: '/assets/images/products/home/p7.jpg',
  category: 'Lorem Ipsum',
  title: 'Fake Product 2',
  discount: '10',
  oldPrice: '55',
  price: '35',
}, {
  id: 3,
  image: '/assets/images/products/home/p8.jpg',
  category: 'Lorem Ipsum',
  title: 'Fake Product 3',
  discount: '10',
  oldPrice: '55',
  price: '35',
}, {
  id: 4,
  image: '/assets/images/products/home/p9.jpg',
  category: 'Lorem Ipsum',
  title: 'Fake Product 4',
  discount: '10',
  oldPrice: '55',
  price: '35',
}, {
  id: 5,
  image: '/assets/images/products/home/p4.jpeg',
  category: 'Lorem Ipsum',
  title: 'Fake Product 5',
  discount: '10',
  oldPrice: '55',
  price: '35',
}, {
  id: 6,
  image: '/assets/images/products/home/p11.jpg',
  category: 'Lorem Ipsum',
  title: 'Fake Product 6',
  discount: '10',
  oldPrice: '55',
  price: '35',
}];

const CategoryProductsComp = ({ respCategoryProducts }) => {
  const [quickViewDetails, setQuickViewDetails] = useState(null);
  let products = [];

  if (respCategoryProducts.apiResponse.body) {
    products = respCategoryProducts.apiResponse.body;
  }

  const onSetQuickViewHandler = (details, images, reviews) => {
    setQuickViewDetails({ details, images, reviews });
  };

  const onCloseHandler = () => {
    setQuickViewDetails(null);
  };

  return (
    <div className="col-lg-9 main-content">
      <CategoryBannerComp />
      <CategoryToolbarComp />
      <div className="row">
        {
          products
            && Array.isArray(products)
            && products.length
            ? products.map((catProd) => (
              <FeatureProductItemComp
                key={catProd.id}
                id={catProd.id}
                product={{ ...catProd, image: catProd.image }}
                images={catProd.image}
                onSetQuickViewDetails={onSetQuickViewHandler}
              />
            ))
            : <div className="container"><h4 className="text-center">The category has no products</h4></div>
        }
      </div>
      <PaginationComp />
      <FeatureProductQuickView
        quickViewDetails={quickViewDetails}
        onClose={onCloseHandler}
      />
    </div>
  );
};
export default CategoryProductsComp;
