import{call,put,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {fetchProductsSuccess,fetchProductsFailure} from './actions';

function* fetchProductsSaga() {
    try {
      const response = yield call(axios.get, 'https://5fc9346b2af77700165ae514.mockapi.io/products');
      yield put(fetchProductsSuccess(response.data));
      
    } catch (error) {
      yield put(fetchProductsFailure(error.message));
      console.log(error.message)
    }
  }
  
  function* rootSaga() {
    yield takeLatest('FETCH_PRODUCTS_REQUEST', fetchProductsSaga);
  }
  
  export default rootSaga;