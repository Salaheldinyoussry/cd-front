import './PostWall.css';
import { useState , useEffect} from 'react';
import { Post } from '../Post/Post.js';

import avatar from '../../assets/avatar.png';
import ImageSelector from './ImageSelector'
import { GET ,POST } from '../utils/API';
import { toast } from 'react-toastify';

export function PostWall({me, posts}) {
    const [homePosts, setHomePosts] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    // just for testing
    const userAvatar = avatar;
    const username = "User Name";
    const date = new Date('July 20, 2021 20:17:40 GMT+00:00');
    const rating = 4.6;
    const commentsCount = 20;
    const comment = {avatar: avatar, text: "It is awsome!"};

    // let posts;
    // let images_urls = [
    //     "https://fastly.picsum.photos/id/3/1024/768.jpg?hmac=2sPBRwLQLIkqj6SEgd78RBwP-yLUnpwsUEmosuIdsX0",
    //     "https://fastly.picsum.photos/id/596/1024/768.jpg?hmac=q9PXDEOrLj3oAS3xpSFnYzN__ZQa_RxqouJ0G-sHQ8A",
    //     "https://fastly.picsum.photos/id/904/1024/768.jpg?hmac=_fjgeEgewh0hiFbPVTXPbklJ9eqeqCEqLTycO0_yQtU",
    //     "https://fastly.picsum.photos/id/292/1024/768.jpg?hmac=FMpKe8HszpcXFpZVHA-P6IkrlvS3bka2tC3pC5mBuXk",
    //     "https://fastly.picsum.photos/id/10/1024/768.jpg?hmac=mA5I0AkDe7a6l2QE_J0nnnEgg1YMuTifLB5o_AxyChY",
    //     "https://fastly.picsum.photos/id/975/1024/768.jpg?hmac=nwohZdlT3jJb1BfKt68MQ_rECCuTIatVOMG5jgUrG50",
    //     "https://fastly.picsum.photos/id/37/1024/768.jpg?hmac=zQnljzdQPaouOTie737KiA3fz2ANrAF6wCGL7vtrAE8",
    //     "https://fastly.picsum.photos/id/803/1024/768.jpg?hmac=61YoRvM2huqpgUC1tycmTibi3nCRubUKmjlqzevLYOM",
    //     "https://fastly.picsum.photos/id/1036/1024/768.jpg?hmac=pyCnv26-ynEYVMb2auR5X8WT9JIMbmXZxktfD8d5WAU",
    //     "https://fastly.picsum.photos/id/214/1024/768.jpg?hmac=dG9pnF2pZ7mbIsr_7ZspukCS4h7JMWSamLWPHhnAHvw",
    //     "https://fastly.picsum.photos/id/781/1024/768.jpg?hmac=Kutj2s31vnwn76YiUV9pJka_niZQBf2Diq39L8mCJtU",
    //     "https://fastly.picsum.photos/id/570/1024/768.jpg?hmac=J7Peq8uX0IP0xe5hpd0yP2QY8o7RehGcLKdIsRWR3dE"
    // ];
    // posts = images_urls.map((imageURL, index) => 
    //     <Post key={index} id={index} userAvatar={userAvatar} username={username} date={date}
    //         content={imageURL} rating={rating} commentsCount={commentsCount} comment={comment} />
    // );

    function addImage(url){
        setImages([url,...images]);
    }

    function starPost(post, index, staredSet){
        if(staredSet.has(post.id) ) return <Post key={index} id={index} userAvatar={userAvatar} post={post} stareded = {true}/>
        return <Post key={index} id={index} userAvatar={userAvatar} post={post} />
    }

    useEffect(() => {
        if(me) {
            GET('post').then((data) => {
                const staredSet = new Set(data.stared);
                setHomePosts(data.posts.map((post, index) => 
                    //<Post key={index} id={index} userAvatar={userAvatar} post={post} />
                    starPost(post, index, staredSet)
                ))
            })
            .catch((err) => {
                toast('Error Fetching Posts', {type: 'error'});
            })
            return  
        }

        GET('image?type=regular').then((data) => {
          setImages(data.images.map((image) => image.url))
    
        })

        GET('post/feed').then((data) => {
            const staredSet = new Set(data.stared);
            setHomePosts(data.posts.map((post, index) => 
                //<Post key={index} id={index} userAvatar={userAvatar} post={post} />
                starPost(post, index, staredSet)     
            ))
        })
        .catch((err) => {
            toast('Error Fetching Posts', {type: 'error'});
        })
      
    }, [me, posts]);

    // just for testing

    return (
        <div className="post-wall">
           {!me && <div className='add-post' onClick={()=>{
                document.getElementById('myDialog').showModal();
            }}>
                New Post

            </div>}

            <dialog id="myDialog">
            <button id="closeBtn" onClick ={()=>{
                document.getElementById('myDialog').close();
            }}>x</button>
            <h1>Create Post</h1>
            <textarea id="description" name="description" placeholder='write a description...' rows="4" cols="50"></textarea>

            <ImageSelector  images={images} addImage={addImage} selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
            <button id="submitBtn" onClick ={()=>{
                let data = {
                    description: document.getElementById('description').value,
                    images: selectedImages
                }
                POST('post',data).then((data) => {
                    console.log(data)
                    toast('Post Created Successfully');
                }).catch((err) => {
                    toast('Error Creating Post', {type: 'error'});
                })  
                document.getElementById('myDialog').close();

            }} > Submit </button>
   
            </dialog>

            { posts.length!=0? posts:homePosts }
        </div>
    );
}