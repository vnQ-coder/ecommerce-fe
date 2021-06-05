import React from 'react';
import { render } from 'react-dom';
import LayoutComp from '../../shared/components/LayoutComp';
import SearchFilterComp from './SearchFilter/SearchFilterComp';
import useApiHook from '../../shared/hooks/useApiHook';
import { getProductCategories } from '../../shared/api/api';

const SearchFilterPageComp = () => {
  const categoryCall = useApiHook({ apiDispatchCall: getProductCategories });
  return (
    <LayoutComp waitFor={categoryCall}>
      <main className="main">
        <div>
          <SearchFilterComp categoryCall={categoryCall} />
        </div>
      </main>
    </LayoutComp>
  );
};

render(<SearchFilterPageComp />, document.getElementById('react-container'));
export default SearchFilterPageComp;
