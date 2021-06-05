import React from 'react';
import { render } from 'react-dom';
import BreadCrumbComp from '../../../shared/components/BreadCrumbComp';
import LayoutComp from '../../../shared/components/LayoutComp';
import { useI18n } from '../../../shared/context/i18nContext';
import LineChartComp from './HighChartsComp/LineChartComp';
import useApiHook from '../../../shared/hooks/useApiHook';
import { getBestSellingProducts, getWorstSellingProducts } from '../../../shared/api/api';
import SellingProductsTableComp from './SellingProductsTableComp/SellingProductsTableComp';
import RenderIfAuthenticated from '../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';

const dummyCategories = ['Apr 2018', 'May 2018',
  'Jun 2018', 'Jul 2018', 'Aug 2018', 'Sep 2018',
  'Oct 2018', 'Nov 2018', 'Dec 2018', 'Jan 2019',
  'Feb 2019', 'Mar 2019'];
const generateRandomValsArr = (length) => [...new Array(length)].map((_, idx) => Math.floor((Math.random() * 1000) * (idx + 1) * Math.random()));

const StatisticsWrapperComp = ({ respBestSellingProducts, respWorstSellingProducts }) => {
  const { header: { _menuItems } } = useI18n();

  return (
    <main className="main">
      <BreadCrumbComp items={[
        { text: _menuItems.admin() },
        { text: _menuItems.statistics() },
        { text: _menuItems.statistics() },
      ]}
      />
      <div className="page-header">
        <div className="container">
          <h3>{_menuItems.statistics()}</h3>
          <LineChartComp
            categories={dummyCategories}
            series={[
              { name: 'Product Abc', data: generateRandomValsArr(dummyCategories.length) },
              { name: 'Product Xyz', data: generateRandomValsArr(dummyCategories.length), dashStyle: 'dash' },
              { name: 'Product 123', data: generateRandomValsArr(dummyCategories.length), dashStyle: 'dot' },
            ]}
            titleText="Best selling products"
          />
          <LineChartComp
            categories={dummyCategories}
            series={[
              { name: 'Product 123', data: generateRandomValsArr(dummyCategories.length), dashStyle: 'dot' },
              { name: 'Product Xyz', data: generateRandomValsArr(dummyCategories.length), dashStyle: 'dash' },
              { name: 'Product Abc', data: generateRandomValsArr(dummyCategories.length) },
            ]}
            titleText="Worst Selling Products"
          />
          <hr />
          <SellingProductsTableComp
            id="bestSelling"
            title="Best Selling Products"
            ajaxCall={getBestSellingProducts}
            products={respBestSellingProducts.body}
          />
          <hr />
          <SellingProductsTableComp
            id="worstSelling"
            title="Worst Selling Products"
            ajaxCall={getWorstSellingProducts}
            products={respWorstSellingProducts.body}
          />
        </div>
      </div>
      <div className="container">
        <div className="mb-10" />
      </div>
    </main>
  );
};
const StatisticsPageComp = () => {
  const respBestSellingProducts = useApiHook({ apiDispatchCall: getBestSellingProducts });
  const respWorstSellingProducts = useApiHook({ apiDispatchCall: getWorstSellingProducts });

  return (
    <LayoutComp waitFor={respBestSellingProducts && respWorstSellingProducts}>
      <RenderIfAuthenticated redirectToIfUnAuth="/" hasRoles={['admin']}>
        <StatisticsWrapperComp
          respBestSellingProducts={respBestSellingProducts}
          respWorstSellingProducts={respWorstSellingProducts}
        />
      </RenderIfAuthenticated>
    </LayoutComp>
  );
};

render(<StatisticsPageComp />, document.getElementById('react-container'));
