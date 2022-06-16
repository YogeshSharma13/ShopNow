
import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from './reducers'

const store = createStore(reducers,{},applyMiddleware(thunk))


export default store;
//createStore(reducers, {}, applyMiddleware(thunk))