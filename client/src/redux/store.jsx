import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from 'axios';

import { userReducer } from "./reducers/UserReducers";


const reducer = combineReducers({
  User: userReducer,
 
});

let initialState = {
  User: {
    User:localStorage.getItem("User")?JSON.parse(localStorage.getItem("User")):null
  }
};

const middleware = [thunk];



    
    

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
