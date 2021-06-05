import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import useApiHook from '../../../../shared/hooks/useApiHook';
import { useI18n } from '../../../../shared/context/i18nContext';
import LayoutComp from '../../../../shared/components/LayoutComp';
import appConfigs from '../../../../base/config/appConfig';
import CategoryListItemComp from './CategoryListItemComp';
import { getAllCategories, postSetCategoryAsFeatured, delCategory } from '../../../../shared/api/api';
import RenderIfAuthenticated from '../../../../shared/hoc/Authentication/RenderIfAuthenticatedHoc';
import DeleteModalComp from './DeleteModalComp';
import BreadCrumbComp from '../../../../shared/components/BreadCrumbComp';

const CategoryListWrapperComp = ({ reqCategoryList }) => {
  const { _categoryPage, _common: { _labels }, header: { _menuItems } } = useI18n();
  const [selectedFeaturedCategories, setSelectedFeaturedCategories] = useState({});
  const reqFeatureCategoryUpdateList = useApiHook({ apiDispatchCall: postSetCategoryAsFeatured, initiateOnLoad: false });
  const reqDeleteCategory = useApiHook({ apiDispatchCall: delCategory, initiateOnLoad: false });
  const [categories, setCategories] = useState(reqCategoryList);
  const loadCategories = reqCategoryList.body;
  const [categoryId, setCategoryId] = useState();
  useEffect(() => {
    if (loadCategories) {
      setCategories(loadCategories);
    }
  }, [loadCategories]);

  const onApplyClickHandler = () => {
    reqFeatureCategoryUpdateList.dispatchCall(selectedFeaturedCategories)
      .then(({ isSuccessResponse, body }) => {
        alert(body.message);
      });
  };

  const onItemSelectedHandler = (checked, id) => {
    setSelectedFeaturedCategories((prevState) => ({ ...prevState, [id]: checked }));
  };

  const onDeleteCategoryHandler = (categoryId) => {
    setCategoryId(categoryId);
  };
  const onHandlePopUp = (categoryId) => {
    reqDeleteCategory.dispatchCall(categoryId)
      .then(({ isSuccessResponse, body }) => {
        if (isSuccessResponse) {
          const isNotCategoryId = (category) => category.id !== categoryId;
          const afterCategoryDelete = categories.filter(isNotCategoryId);
          setCategories(afterCategoryDelete);
        } else alert(body.message);
      });
  };

  return (
    <main className="main">
      <BreadCrumbComp items={[
        { text: _menuItems.admin() },
        { text: _menuItems.category() },
        { text: _menuItems.allCategories() },
      ]}
      />
      <div className="page-header">
        <div className="container">
          <h3>{_categoryPage.categoryList()}</h3>
        </div>
      </div>
      <div className="container">
        <div className="cart-table-container">
          <table className="table table-cart">
            <thead>
              <tr>
                <th>{_labels.featured()}</th>
                <th>{_labels.image()}</th>
                <th>{_labels.title()}</th>
                <th>{_labels.description()}</th>
                <th>{_labels.action()}</th>
              </tr>
            </thead>
            <tbody>
              {categories && categories.length
                ? categories.map((category) => (
                  <CategoryListItemComp
                    key={category.id}
                    category={{ ...category, image: appConfigs.bkUrl + category.image }}
                    onItemSelected={onItemSelectedHandler}
                    onDeleteCategory={onDeleteCategoryHandler}
                  />
                ))
                : (
                  <tr>
                    <td colSpan="6"><h3 className="mt-2">{_categoryPage.noCategories()}</h3></td>
                  </tr>
                )}
            </tbody>
            {Object.keys(selectedFeaturedCategories).length ? (
              <tfoot>
                <tr>
                  <td colSpan="6" className="clearfix">
                    <div className="float-right">
                      <button
                        className="btn btn-outline-secondary btn-update-cart"
                        onClick={onApplyClickHandler}
                      >
                        {_labels.apply()}
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            ) : <></>}
          </table>
        </div>
        <div className="mb-10" />
        <DeleteModalComp id="deleteModel" categoryId={categoryId} onHandlePopUp={onHandlePopUp} />
      </div>
    </main>
  );
};
const CategoryListPageComp = () => {
  const reqCategoryList = useApiHook({ apiDispatchCall: getAllCategories });

  return (
    <LayoutComp waitFor={reqCategoryList}>
      <RenderIfAuthenticated redirectToIfUnAuth="/" hasRoles={['admin']}>
        <CategoryListWrapperComp reqCategoryList={reqCategoryList} />
      </RenderIfAuthenticated>

    </LayoutComp>
  );
};

render(<CategoryListPageComp />, document.getElementById('react-container'));
