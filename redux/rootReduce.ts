import { combineReducers } from "redux";
import vagasReducer from "./vagas/reduce";

const rootReducer = combineReducers({ vagasReducer });

export default rootReducer;