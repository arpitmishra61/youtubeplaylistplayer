 
 export const addVideoToScreen= (videoData)=>dispatch=>{localStorage.setItem("video", JSON.stringify( videoData.video))
     return dispatch({
    payload:videoData,
    type:"addVideoToScreen"

})}
export const addVideosToQueue=(videosData)=>dispatch=>{
    if(!videosData.videos.length)
    {localStorage.removeItem("videos")}
    else

    localStorage.setItem("videos",JSON.stringify( videosData.videos))
    
    return dispatch({
    payload:videosData,
    type:"addVideosToQueue"

})
}


