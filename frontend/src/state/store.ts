import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';

let middlewares = applyMiddleware(...[thunk]);

const store = createStore(rootReducer, composeWithDevTools(middlewares));

export default store;
