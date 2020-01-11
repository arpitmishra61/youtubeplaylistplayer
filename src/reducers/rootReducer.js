import {combineReducers} from 'redux'

import videoScreenReducer from "./videoScreenReducer" 

export default combineReducers({
    videoData:videoScreenReducer,
   

})