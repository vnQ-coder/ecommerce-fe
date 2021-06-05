import { createContext } from 'react';

const AppStateContext = createContext({
  user: null,
  logoutUser: () => {},
  Cart: {
    Cart: Object,
    onAddCartItem: (item) => {},
    onRemoveCartItem: (id) => {},
    onClearCart: () => {},
    getItemById: (id) => {},
  },
});

export default AppStateContext;
