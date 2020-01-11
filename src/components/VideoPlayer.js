import React, { Component } from 'react'
import {connect} from 'react-redux'
import  YouTube from "react-youtube"

import {addVideoToScreen} from "../actions/videoAction"


class VideoPlayer extends Component {
    
    render() { const opts = {
      height: '450px',
      width: '100%',
      playerVars: { 
        autoplay: 1
      }
    };
        return (
            <div className="videoPlayer p-3">
                {!this.props.videoFlag ? <div className="text-center">
                    <h4>No video to play.</h4>
                    <img src="https://image.flaticon.com/icons/png/512/2285/2285097.png" alt="" width="400px"/>
                </div> :
                
                <div>
                  <button className="btn btn-warning remove" onClick={()=>{
                    if(window.confirm("Are You sure?"))
                    this.props.addVideoToScreen({
                      video:"",
                      videoFlag:false

                    })
                  }}>
                    Remove From Screen

                  </button>
                   <YouTube
        videoId={this.props.video.id}
        opts={opts}
        
      onEnd={(e)=>{
        

        const currentVideo=this.props.video
        const videos=this.props.videos
       const indexCurrentVideo= videos.findIndex((video)=>{
           

       
    
    return currentVideo.id===video.id })
       
      

       if(indexCurrentVideo!==videos.length-1)
       {
           
           document.querySelector(".sideBar").scrollTo(0,148*(indexCurrentVideo+1))
          
           this.props.addVideoToScreen({video:videos[indexCurrentVideo+1]})
       }
       else{
           this.props.addVideoToScreen({video:videos[0]})
           document.querySelector(".sideBar").scrollTo(0,0)
       }

      }}/>
                </div>

                
}
               
                
            </div>
        )
    }
    


}

const mapStateToProps=(state)=>({
    video:state.videoData.video,
    videoFlag:state.videoData.videoFlag,
    videos:state.videoData.videos
   
})

export default connect(mapStateToProps,{addVideoToScreen})(VideoPlayer)