import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from "./reducers/rootReducer"
import {composeWithDevTools} from "redux-devtools-extension"

let initialState={}
const middleware=applyMiddleware(thunk)
const store=createStore(
    rootReducer,initialState,
    composeWithDevTools(middleware)
)
export default store
