import React from 'react';
import { useI18n } from '../../../shared/context/i18nContext';
import appConfigs from '../../../base/config/appConfig';
import ShopCategoryItemComp from './ShopCategoryItemComp';

// const dummyCategories = [
//   { id: 1, image: "/assets/images/products/home/p1.jpg", title: "Fake Category 1", productsCount: 8 },
//   { id: 2, image: "/assets/images/products/home/p2.jpg", title: "Fake Category 2", productsCount: 2 },
//   { id: 3, image: "/assets/images/products/home/p3.jpg", title: "Fake Category 3", productsCount: 6 },
//   { id: 4, image: "/assets/images/products/home/p7.jpg", title: "Fake Category 4", productsCount: 8 },
//   { id: 5, image: "/assets/images/products/home/p8.jpg", title: "Fake Category 5", productsCount: 3 },
//   { id: 6, image: "/assets/images/products/home/p9.jpg", title: "Fake Category 6", productsCount: 1 },
//   { id: 7, image: "/assets/images/products/home/p1.jpg", title: "Fake Category 7", productsCount: 0 },
// ]

const ShopCategoryComp = ({ shopByCategory }) => {
  const { homepage: { _shopCategory } } = useI18n();
  // const {shopByCategory} = useContext(HomepageContext);

  return (
    <section className="container">
      <h2 className="section-title ls-n-10 text-center pt-2 m-b-4">{_shopCategory.shopByCategory()}</h2>
      {/* <div className="owl-carousel owl-theme nav-image-center show-nav-hover nav-outer cats-slider">
        {
          dummyCategories.map((category) => (
            <ShopCategoryItemComp key={category.id} category={category} />
          ))
        }
      </div> */}
      <div className="owl-carousel owl-theme nav-image-center show-nav-hover nav-outer cats-slider">
        {
          shopByCategory && shopByCategory.map((category) => (
            <ShopCategoryItemComp
              key={category.id}
              category={{ ...category, image: appConfigs.bkUrl + category.image }}
            />
          ))
        }
      </div>
    </section>
  );
};
export default ShopCategoryComp;
