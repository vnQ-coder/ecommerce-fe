import React, { useContext } from 'react';
import AppStateContext from '../../context/AppStateContext';

/**
 * @param children
 * @param {boolean} redirectToIfUnAuth
 * @param {['admin','vendor']} hasRoles
 * @returns {JSX.Element}
 * @constructor
 */
const RenderIfAuthenticated = (
  {
    children, redirectToIfUnAuth, hasRoles, renderIfUnAuth,
  },
) => {
  const { user } = useContext(AppStateContext);

  let render = <h3 className="text-center">Loading</h3>;

  if (user) {
    if (user.isLoggedIn() && (!hasRoles || (hasRoles.includes('admin') && user.isAdmin())
      || (hasRoles.includes('vendor') && user.isVendor()))
      || (hasRoles.includes('user') && user.isUser())) render = children;
    else if (!renderIfUnAuth) window.location.replace(redirectToIfUnAuth);
    else render = renderIfUnAuth;
  }

  return (
    <>
      {render}
    </>
  );
};

RenderIfAuthenticated.defaultProps = {
  redirectToIfUnAuth: '/login',
};

export default RenderIfAuthenticated;
