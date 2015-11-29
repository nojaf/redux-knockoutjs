/// <reference path="../../typings/tsd.d.ts" />
import { createStore } from "redux";
import colorReducers from '../reducers/index';

const store = createStore(colorReducers)

export default store;