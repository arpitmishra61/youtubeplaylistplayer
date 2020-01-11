import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import {addVideosToQueue,addVideoToScreen}   from "../actions/videoAction";


 class SideBar extends Component {
     state={
    error:false
}

deleteVideo=(video)=>{ if(window.confirm("sire to delete a video ?"))  {const remaningVideos=this.props.videos.filter((cVideo)=>cVideo.id!==video.id)
    if(!remaningVideos.length){
        

        this.setState({
            error:false
        })
        this.props.addVideoToScreen({
            video:"",
            videoFlag:false
        })

        this.props.addVideosToQueue({
            videos:[],
            queueFlag:false

        })

    }
    else
if(this.props.video){
   
 if(this.props.video.id===video.id)
{ 
this.props.addVideosToQueue(
  {videos:remaningVideos}
)

this.props.addVideoToScreen({
            video:"",
            videoFlag:false
        })
}
               
 else
 {
this.props.addVideosToQueue({
videos:remaningVideos
 

 })
}}

                                              

else{
this.props.addVideosToQueue({
videos:remaningVideos

})}}}

  validateYouTubeUrl=(youtubeUrl)=>
{const url=youtubeUrl


const urlMain=String(url).substring(0,32)
const urlListIndex=url.search("&list=")
const urlVideoId=url.substring(32,urlListIndex)
const urlListId=url.substring(urlListIndex+6,url.length)
let videoIdValid=false
let listIdValid=false

if(urlMain==="https://www.youtube.com/watch?v=" && urlListIndex!==-1)
{axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${urlVideoId}&key=AIzaSyAqYC8NO0D83N1DyUQQYXznt0aegFEK-_M`).then((res1)=>{
   
    if(res1.data.items.length)
    videoIdValid=true

    axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${urlListId}&key=AIzaSyAqYC8NO0D83N1DyUQQYXznt0aegFEK-_M`).then((res2)=>{
        if(res2.data.items.length)
        {
         
                
                const dataVideo=res2.data.items
              
                const videosFetched=[]
                dataVideo.forEach((data)=>{
                    const videoToAdd={
                    id:data.snippet.resourceId.videoId,
                    title:data.snippet.title,
                    img:data.snippet.thumbnails.high,
                    channelTitle:data.snippet.channelTitle
                }

                videosFetched.push(videoToAdd)
              
                
                

                
            })
            this.props.addVideosToQueue({videos:[...this.props.videos,...videosFetched],queueFlag:true})
            this.setState({
                error:false
            })

        }

   if(!listIdValid && !videoIdValid)
{
    this.setState({
         error:true
     }) }




}).catch((err)=>{
    this.setState({
         error:true
     }) 
})

}
)}
else
 {
     this.setState({
         error:true
     }) 
}

}                                           

    
    render() {
        
        
        
        
        return (
            <div className="sideBar" style={{height:"75vh",
    backgroundColor: "rgb(224, 224, 224)",
    paddingBottom: "5px",
    overflowY:"scroll"}}>
                <div className="card p-2 d-block ">
                   <div>
                       <div className="d-inline-block">
                            <button className="btn btn-danger btn-sm mr-2 trash" onClick={()=>{
                                if(window.confirm("Sure to delete?")){

                                    this.setState({
                                        error:false
                                    })
                                    this.props.addVideosToQueue({
                                        videos:[],
                                        queueFlag:false
                                    })
                                    this.props.addVideoToScreen({
                                        video:{},
                                        videoFlag:false
                                    })
                                }
                            }}>Delete All</button>
                       </div>
{this.state.error ?<h3 className="my-4  alert alert-danger">Invaid link</h3>:null}
                       
                       <h4 className="d-inline-block">Music Queue</h4>
                    
                    
                        <button className="btn btn-primary d-inline-block float-right"  data-toggle="modal" data-target="#exampleModal">Add</button></div>

                       
                        
                    
                </div> <div className="display">
                    {!this.props.queueFlag ?<h5 className="bg-warning text-dark p-2 text-capitalize mx-2 mt-4 rounded">No Music kindly add music</h5> : <div>
                       
                            {this.props.videos.map((video,key)=> <div className="p-1 card m-2" key={key} >
                                <div className="row m-0 p-1" style={{cursor:"pointer"}} onClick={(e)=>{
                                    if(!e.target.classList.contains("fa-times") && 
                                    
                                    !e.target.classList.contains("trash") )
                                    
                                 {
                                  this.props.addVideoToScreen({video:video,videoFlag:true})}
                                }}>
                                   
                                        <div className="col-md-3 p-0 pr-2 mt-2">
                                        <img src={video.img.url} alt="" width="100%"
                                        height="100%"/>
                                    </div>

                                      <div className="col-md-9 p-0">
        <div className="mb-3"><i className="fas fa-times text-danger float-right " onClick={()=>this.deleteVideo(video)}></i></div>
        <h6 className="text-secondary">{video.title}</h6>
        <p className="text-primary " >{" "}{video.channelTitle}</p>
        {this.props.video.id ? 
        this.props.video.id===video.id ?

        <h6  className="text-success playingStatus">Currently Playing</h6>: null  :  null}
 </div>
                                    </div>
                                    
                                


                            </div>)}
                            
                        
                        
                        </div>}
                            
                        </div>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add Youtube Video URL</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"
          >&times;</span>
        </button>
      </div>
      <div className="modal-body">
       <input type="text" className="form-control videoUrl" placeholder="Give Youtube URL" />
      </div>
      <div className="modal-footer">
          
         
          
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>{
            let url=document.querySelector(".videoUrl").value

            this.validateYouTubeUrl(url)
           
          
           
         }}
        >Add URL</button>
      </div>
    </div>
  </div>
</div>
                
            </div>
        )
    }
    componentDidMount(){
       

        if("videos" in localStorage)

       {let videosLocalStorage= 
         localStorage.getItem("videos")
       let videoLocalStorage= localStorage.getItem("video")
       
           if(videosLocalStorage)
           {
               this.props.addVideosToQueue(
                   {videos:
                   JSON.parse(videosLocalStorage),
                   queueFlag:true}
               )
           }
           
           

            if(videoLocalStorage &&     JSON.parse(videoLocalStorage)!=="")
            
           {

               this.props.addVideoToScreen(
                   {video:
                    JSON.parse(videoLocalStorage),
                   videoFlag:true}
               )
           }
           
       }
        
            
        

        else
        {localStorage.setItem("videos",[])
        localStorage.setItem("video","")}
    }




}

const mapStateToProps=(state)=>{
    
    return {
    videos:state.videoData.videos,
    queueFlag:state.videoData.queueFlag,
    video:state.videoData.video
}}

export default connect(mapStateToProps,{addVideosToQueue,addVideoToScreen})(SideBar)
