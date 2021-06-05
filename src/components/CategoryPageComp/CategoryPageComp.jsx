import React from 'react';
import { render } from 'react-dom';
import CartModelComp from '../../shared/components/CartModelComp';
import CategoryFilterComp from './CategoryFilterComp/CategoryFilterComp';
import CategoryProductsComp from './CategoryProductsComp/CategoryProductsComp';
import LayoutComp from '../../shared/components/LayoutComp';
import useApiHook from '../../shared/hooks/useApiHook';
import { getAllProductsByCategory } from '../../shared/api/api';

const CategoryPageComp = () => {
  const categoryId = new URLSearchParams(window.location.search).get('catId');
  if (!categoryId) window.location.replace('/');

  const respCategoryProducts = useApiHook({
    apiDispatchCall: getAllProductsByCategory,
    initiateOnLoadCallData: categoryId,
  });

  return (
    <LayoutComp waitFor={respCategoryProducts}>
      <main className="main">
        {/* <BreadCrumbComp /> */}
        <div className="container mb-3">
          <div className="row row-sparse">
            <CategoryProductsComp respCategoryProducts={respCategoryProducts} />
            <div className="sidebar-overlay" />
            <div className="sidebar-toggle"><i className="fas fa-sliders-h" /></div>
            <CategoryFilterComp respCategoryProducts={respCategoryProducts} />
          </div>
        </div>
      </main>
      <CartModelComp />
    </LayoutComp>
  );
};

render(<CategoryPageComp />, document.getElementById('react-container'));
