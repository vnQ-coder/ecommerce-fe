import appConfigs from '../../base/config/appConfig';
import {
  post, get, postFile, del,
} from '../../base/services/ajaxService';

const bkUrl = appConfigs.bkApiUrl;

const defaultHeaders = { 'CONTENT-TYPE': 'application/json' };

// auth
export const postLogin = (body) => post(`${bkUrl}/auth/login`, defaultHeaders, body);

export const postRegister = (body) => post(`${bkUrl}/auth/register`, defaultHeaders, body);

export const verifyEmail = (body) => post(`${bkUrl}/auth/verify-email`, defaultHeaders, body);

export const changePassword = (body) => post(`${bkUrl}/auth/recover-password`, defaultHeaders, body);

// vendor
export const postRegisterVendor = (body) => postFile(`${bkUrl}/auth/register-vendor`, null, body);

export const getVendorApproval = () => get(`${bkUrl}/admin/get-vendor-approval`);

export const getRejectedProducts = () => get(`${bkUrl}/admin/rejected-products`);

// store
export const getAllCategories = () => get(`${bkUrl}/store/category`);

export const getAllProducts = () => get(`${bkUrl}/store/products`);

export const getFeatureProducts = () => get(`${bkUrl}/store/feature-products`);

export const getFeaturedCategories = () => get(`${bkUrl}/store/feature-category`);

export const getAllProductsByCategory = (categoryId) => get(`${bkUrl}/store/products/${categoryId}`);

export const getProductImagesById = (productId) => get(`${bkUrl}/store/product-images/${productId}`);

export const getProductDetailsById = (productId) => get(`${bkUrl}/store/product-details/${productId}`);

export const getAllRelatedProducts = (productId) => get(`${bkUrl}/store/product-relevants/${productId}`);

export const getOtherVendorProducts = (productId) => get(`${bkUrl}/store/product-others/${productId}`);

export const checkIfUserPlacedOrder = (productId) => get(`${bkUrl}/store/user-order-exists/${productId}`);

export const getProductOrderDetails = () => get(`${bkUrl}/store/product-order-details`);

export const getProductOrderDetailsLimited = () => get(`${bkUrl}/store/product-order-details-limited`);

// admin
export const getDisplayImageWithDetails = () => get(`${bkUrl}/admin/displayimages`);

export const postAddDisplayImage = (body) => postFile(`${bkUrl}/admin/update-displayimages`, null, body);

export const getBestSellingProducts = (query) => {
  const queryParam = query ? `?from=${query.fromDate || ''}&to=${query.toDate || ''}` : '';
  return get(`${bkUrl}/admin/best-selling-products${queryParam}`);
};

export const getWorstSellingProducts = (query) => {
  const queryParam = query ? `?from=${query.fromDate || ''}&to=${query.toDate || ''}` : '';
  return get(`${bkUrl}/admin/worst-selling-products${queryParam}`);
};

export const getCategoryDetailsById = (categoryId) => get(`${bkUrl}/admin/category-details/${categoryId}`);

export const updateCategory = (formData) => postFile(`${bkUrl}/admin/update-category`, null, formData);

export const delCategory = (categoryId) => del(`${bkUrl}/admin/category`, defaultHeaders, { id: categoryId });

export const getAllPlacedProductOrders = () => get(`${bkUrl}/admin/user-orders`);

export const updateCargoDetail = (body) => post(`${bkUrl}/store/update-cargo`, defaultHeaders, body);

export const getAllPendingVendors = () => get(`${bkUrl}/admin/pending-vendors`);

export const approveVendor = (vendorId) => post(`${bkUrl}/admin/vendor-approval`, defaultHeaders, { id: vendorId });

export const approveSelectedVendor = (vendorId) => post(`${bkUrl}/admin/selected-vendor-approval`, defaultHeaders, vendorId);

// banner homepage
export const getAllBanners = () => get(`${bkUrl}/admin/banner`);

export const postUpdateBanner = (body) => postFile(`${bkUrl}/admin/update-banner`, null, body);

export const getAllPendingApproveProducts = () => get(`${bkUrl}/admin/pending-approve-products`);

export const getVendorPendingProducts = () => get(`${bkUrl}/admin/vendor-pending-products`);

export const postAddProduct = (body) => postFile(`${bkUrl}/admin/product`, null, body);

export const updateProduct = (formData) => postFile(`${bkUrl}/admin/update-product`, null, formData);

export const delProduct = (productId) => del(`${bkUrl}/admin/product`, defaultHeaders, { id: productId });

export const getProductCategories = () => get(`${bkUrl}/admin/category`);

export const postCreateCategory = (body) => postFile(`${bkUrl}/admin/category`, null, body);

export const postApproveProduct = (productId) => post(`${bkUrl}/admin/approve-product`, defaultHeaders, { id: productId });

export const postRejectProduct = (productId, reason) => post(`${bkUrl}/admin/reject-product`,
  defaultHeaders, { id: productId, reason });

export const postSetProductsAsFeatured = (data) => post(`${bkUrl}/admin/feature-products`, defaultHeaders, data);
export const postSetProductStatus = (data) => post(`${bkUrl}/admin/product-status`, defaultHeaders, data);

export const postSetCategoryAsFeatured = (data) => post(`${bkUrl}/admin/feature-category`, defaultHeaders, data);

export const getProductCountByVendorId = () => get(`${bkUrl}/admin/count-vendor-products`);

export const getOrdersCountByVendorId = () => get(`${bkUrl}/admin/count-vendor-orders`);

export const productSearchFilterByVendorId = (data) => post(`${bkUrl}/admin/product-search`, defaultHeaders, data);

export const orderSearchFilterByVendorId = (data) => post(`${bkUrl}/admin/order-search`, defaultHeaders, data);

export const userQuestionSearchFilterByVendorId = (data) => post(`${bkUrl}/admin/user-messages-search`,
  defaultHeaders, data);

export const getAllMessagesByThreadId = (data) => post(`${bkUrl}/admin/user-messages`, defaultHeaders, data);

// user
export const getSessionUser = () => get(`${bkUrl}/user`);

export const getUserAllShippingAddress = () => get(`${bkUrl}/user/shipping-address`);

export const getUserAddress = () => get(`${bkUrl}/user/address`);

export const addUserShippingAddress = (data) => post(`${bkUrl}/user/shipping-address`, defaultHeaders, data);

export const getLogout = () => get(`${bkUrl}/auth/logout`);

export const getUserInfoById = () => get(`${bkUrl}/user/user-info`);

export const updateUserInfoByUserId = (formData) => postFile(`${bkUrl}/user/user-info`, null, formData);

export const getUserBillingAddressByUserId = () => get(`${bkUrl}/user/user-billingaddress`);

export const updateUserBillingAddressById = (data) => post(`${bkUrl}/user/user-billingaddress`, defaultHeaders, data);

export const getAllUserShippingAddressesByUserId = () => get(`${bkUrl}/user/user-shippingaddress`);

export const updateUserShippingAddressById = (data) => post(`${bkUrl}/user/user-shippingaddress`, defaultHeaders, data);

export const deleteUserShippingAddressById = (shippingAddressId) => del(`${bkUrl}/user/user-shippingaddress`,
  defaultHeaders, { id: shippingAddressId });

export const postContactUs = (data) => post(`${bkUrl}/user/contact`, defaultHeaders, data);

export const postUserQuestion = (data) => post(`${bkUrl}/user/question`, defaultHeaders, data);

export const postCommentReply = (threadId, message) => post(`${bkUrl}/user/comment/${threadId}`,
  defaultHeaders, { message });

export const getUserQuestions = (productId) => get(`${bkUrl}/user/questions/${productId}`);

export const getAllUserQuestions = () => get(`${bkUrl}/user/user-questions`);

export const postVendorAnswer = (data) => post(`${bkUrl}/user/user-questions`, defaultHeaders, data);

// order
export const postPlaceOrder = (data) => post(`${bkUrl}/user/order`, defaultHeaders, data);

// userId
export const getMessagesByUserId = (userId) => post(`${bkUrl}/admin/user-messages-by-id`, defaultHeaders, { id: userId });

// product view

export const addProductReviews = (data) => post(`${bkUrl}/user/product-reviews`, defaultHeaders, data);

export const getAllProductReviews = (productId) => get(`${bkUrl}/user/product-reviews/${productId}`);

export const postAllProductsByFilter = (data) => post(`${bkUrl}/store/search-products`, defaultHeaders, data);

// content pages

export const addContentPages = (data) => post(`${bkUrl}/admin/content-pages`, defaultHeaders, data);

export const updateContentPages = (data) => post(`${bkUrl}/admin/content-page-update`, defaultHeaders, data);

export const getAllContentPages = () => get(`${bkUrl}/admin/content-pages`);

export const getContentPageByPageName = (data) => post(`${bkUrl}/admin/content-page`, defaultHeaders, data);

// Information Page

export const postCreateInformation = (body) => postFile(`${bkUrl}/admin/information`, null, body);

export const postCreateInformationType = (data) => post(`${bkUrl}/admin/information-type`, defaultHeaders, data);

export const getAllInformationType = (data) => post(`${bkUrl}/admin/all-information-type`, defaultHeaders, data);

export const getAllUserGuides = () => get(`${bkUrl}/admin/user-guides`);

export const getUserGuidesById = (guideId) => get(`${bkUrl}/admin/user-guides/${guideId}`);

export const updateUserGuide = (formData) => postFile(`${bkUrl}/admin/update-user-guides`, null, formData);

export const deleteUserGuides = (guideId) => del(`${bkUrl}/admin/delete-user-guides`, defaultHeaders, { id: guideId });
