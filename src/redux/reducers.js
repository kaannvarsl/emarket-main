const initialState = {
    products: [],
    cartItems: [],
    cartCount: 0, 
    favorites: [],
    sortType: null,
    loading: false,
    error: null,
  };
  
  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_PRODUCTS_SUCCESS':
        return { ...state, loading: false, products: action.payload };
      case 'ADD_TO_CART':
        console.log('Adding to cart:', action.payload);
        const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
  
        if (existingItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((item) =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
            cartCount: state.cartCount + 1,
          };
        } else {
          const newCartItem = { ...action.payload, quantity: 1 };
          return {
            ...state,
            cartItems: [...state.cartItems, newCartItem],
            cartCount: state.cartCount + 1,
          };
        }
  
      case 'REMOVE_TO_CART':
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.id !== action.payload),
          cartCount: Math.max(state.cartCount - 1, 0),
        };
      case 'INCREASE_QUANTITY':
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
          ),
          cartCount: state.cartCount + 1,
        };
  
      case 'DECREASE_QUANTITY':
        return {
          ...state,
          cartItems: state.cartItems
            .map((item) =>
              item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
          cartCount: Math.max(state.cartCount - 1, 0),
        };
      case 'ADD_TO_FAVORITES':
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      case 'REMOVE_TO_FAVORITES':
        return {
          ...state,
          favorites: state.favorites.filter((item) => item.id !== action.payload.id),
        };

    case "SORT_PRODUCTS_BY_PRICE":
      
    const sortedProducts = [...state.products];
  if (action.payload === 'lowToHigh') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (action.payload === 'highToLow') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  return {
    ...state,
    sortType: action.payload,
    products: sortedProducts,
  };
  
      case 'FETCH_PRODUCTS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default productsReducer;
  