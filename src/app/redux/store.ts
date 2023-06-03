import { combineReducers, createStore } from 'redux';
import { productsReducer } from './redux.component';

const reducers = combineReducers({
  productsState: productsReducer,
});

const store = createStore(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
