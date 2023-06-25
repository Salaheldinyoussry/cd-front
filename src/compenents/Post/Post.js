import './Post.css';

import avatar from '../../assets/avatar.png';

import { Comment } from '../Comment/Comment.js';
import { useEffect , useState,useCallback } from 'react';
import ImageViewer from 'react-simple-image-viewer';

import {POST , GET} from '../utils/API'

import Loader from '../Loader/Loader';

export function Post({ userAvatar, username, post }) {
    const [showComments, setShowComments] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [stared , setStared] = useState(false);

    const [comment, setComment] = useState([]);
    
    const [loading, setLoading] = useState(false);



  
    const openImageViewer = useCallback((index) => {
      setCurrentImage(index);
      setIsViewerOpen(true);
    }, []);
  
    const closeImageViewer = () => {
      setCurrentImage(0);
      setIsViewerOpen(false);
      
    };
    function rate() {
        post.stars = (post.stars || 0)

        POST('post/star', { postId: post.id, star: !stared , stars:post.stars }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

        post.stars = (stared ? post.stars - 1 : post.stars + 1)



        setStared(!stared);

    }

    function addComment(e) {
        e.preventDefault();
        let text = e.target[0].value;
        
        POST('post/comment', { postId: post.id, comment: text }).then((res) => {
            post.comments = post.comments || []

            setComment([...comment, { text, userId: JSON.parse(sessionStorage.getItem('user')) }])
             
            
            console.log(res)
        }).catch((err) => {
            console.log(err)
        }
        )


    }

    // function display(images){
    //     if(images.length==2){
    //         return <div style={{display:"flex" , flexDirection:"row"}}>
    //         <img src={images[0]} alt="post"></img>
    //         <img src={images[1]} alt="post"></img>
    //     </div>
    //     }
    //     else if(images.length==3){
    //         return <div style={{display:"flex" , flexDirection:"row"}}>
    //         <img src={images[0]} alt="post"></img>
    //         <img src={images[1]} alt="post"></img>
    //         <div style={{display:"flex"}}>
    //         <img src={images[2]} alt="post"></img>
    //         </div>
    //     </div>
    //     }
    // }

    function handleComments (){
        if(showComments){
            setShowComments(false)
        }
        else{
            setLoading(true)
            GET(`post/comment?postId=${post.id}`).then((res) => {
                console.log(res)
                setComment(res.comments)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                
            })


            setShowComments(true)
        }
    }


    return (
        <div className="post">
            <link href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css" rel="stylesheet"/>

            <div className="user-info">
                <div className="user-avatar">
                    <img src={userAvatar} alt="author"></img>
                </div>

                <div className="user-data">
                    <div className="username"> {post.userId?.name} </div>
                    <div className="post-date"> {new Date(post.createdAt).toUTCString()} </div>
                </div>
            </div>

                <div className="post-text" style={{padding:"10px 20px"}}>
                    {post.description}
                </div>

            <div className="">
            <div>

                        <div className='postimg' style={post.images && post.images.length==1?{ gridTemplateColumns:"1fr"}:{}}>
                        {post.images && post.images .map((img, index) => (
                            <img
                            src={ img }
                            onClick={ () => openImageViewer(index) }
                            width={"100%"}
                            key={ index }
                            style={{ margin: '2px' }}
                            alt=""
                            />
                        ))}
                        </div>



                        {isViewerOpen &&<div style={{zIndex:1000000000}}> 
                            <ImageViewer
                            src={ post.images }
                            currentIndex={ currentImage }
                            disableScroll={ false }
                            closeOnClickOutside={ true }
                            onClose={ closeImageViewer }
                            />
                            </div>
                        }
                        </div>
            </div>

            <div className="post-info">
                <div className="click-icon" onClick={rate} style={{display:"flex" ,alignItems:"center"}} >
                    <div className="icon"><i className={!stared ?"bx bx-star":"bx bxs-star"} style={{fontSize:"26px"}} ></i></div>
                    <div className="count">{post.stars || 0}</div>
                </div>
                <div className="click-icon" style={{display:"flex" ,alignItems:"center"}}  onClick={handleComments}>
                    <div className="icon"><i style={{fontSize:"26px", paddingTop:'5px'}} className="bx bx-comment"></i></div>
                    <div className="count">{post.comments ? post.comments.length :0}</div>
                </div>
            </div>

            
            {showComments && <div className='fade-in'>
         <div className='hline'></div>

            {loading && <Loader/>}
            {
                comment && comment.map((c) =>  <Comment comment={c} />)
            }
           

            <div className="comment-input">
                <div className="user-avatar" style={{margin:"15px"}}>
                    <img src={JSON.parse(sessionStorage.getItem("user"))&& JSON.parse(sessionStorage.getItem("user")).avatar || avatar} alt="avatar"></img>
                </div>
                <form onSubmit={addComment}>
                    <input name="text" type="text" maxLength="200" placeholder="Write you comment here"></input>
                    <button className="submit-button" type="submit">+
                    </button>
                </form>
            </div>
            </ div>}
        </div>
    );
}