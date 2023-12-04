export const fetchProductsRequest = () => ({type:'FETCH_PRODUCTS_REQUEST'});
export const fetchProductsSuccess = (products) => ({ type: 'FETCH_PRODUCTS_SUCCESS',payload: products});
export const fetchProductsFailure = (error) => ({ type:'FETCH_PRODUCTS_FAILURE',payload:error});

export const addToCart = (cartItems) => ({
    type: 'ADD_TO_CART',
    payload: cartItems,
  });
  export const removeToCart = (cartItems) => ({
    type: 'REMOVE_TO_CART',
    payload: cartItems,
  });
  export const increaseQuantity = (cartItems) => ({
    type: 'INCREASE_QUANTITY',
    payload: cartItems,
  });
  
  export const decreaseQuantity = (cartItems) => ({
    type: 'DECREASE_QUANTITY',
    payload: cartItems,
  });
  export const addToFavorites = (product) => ({
    type: 'ADD_TO_FAVORITES',
    payload: product,
  });

  export const sortProductsByPrice = (type) => ({
    type: "SORT_PRODUCTS_BY_PRICE",
    payload: type,
  });
  export const removeToFavorites = (product) => ({
    type: 'REMOVE_TO_FAVORITES',
    payload: product,
  });