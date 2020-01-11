
const initialState={
    video:{},
    videoFlag:false,
    videos:[],
    queueFlag:false
}

export default (state=initialState,action)=>{

    switch(action.type){
        case "addVideoToScreen": return ({...state,...action.payload})

        case "addVideosToQueue": return ({...state,...action.payload})
        
        default: return state

    }
}