import { combineReducers } from 'redux';
import productsReducer from './reducers';

const rootReducer = combineReducers({
    cart: productsReducer,

  
});

export default rootReducer;