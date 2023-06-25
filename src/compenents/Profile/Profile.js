import { useState, useEffect } from "react";

import './Profile.css';
import avatar from '../../assets/avatar.png';
import pro from '../../assets/pro.jpg';

import { GET } from '../utils/API';
import { PostWall } from "../PostWall/PostWall";

export function Profile() {
    const [name, setName] = useState("Tom");
    const [email, setEmail] = useState("TomHolland@gmail.com");
    // const [password, setPassword] = useState("******");
    const [image, setImage] = useState(avatar);
    const [small , setSmall] = useState(false);

    const [me, setMe] = useState(true);

    useEffect(() => {
        // update them to database
        window.addEventListener("scroll", function () {
            // var banner = document.querySelector(".pro-head");
            // if(window.scrollY > 0)
            //     setSmall(!small);

            //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            // if (scrollTop === 0) {
            //     setSmall(false)
            //     // The user has scrolled to the top of the page
            //     console.log("Scrolled to top of page");
            //     }

            // if (window.scrollY > 0) {
            //     setSmall(false)
            //     // banner.classList.add("pro-head-min");
            // }
            // banner.classList.toggle("pro-head-min", window.scrollY > 0);
          });

    },[]);

    useEffect(() => {
        // update them to database

        GET('user').then((res) => {
            setName(res.name);
            // setSecondName(res.secondName);

            setEmail(res.email);
            setImage(res.image);
            sessionStorage.setItem('user', JSON.stringify(res));

        })

        
    },[name, email]);

    const [isFirstNameDisabled, setIsFirstNameDisabled] = useState(true);
    const [isJobDisabled, setIsJobDisabled] = useState(true);
    const [isEmailDisabled, setIsEmailDisabled] = useState(true);
    const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);

    function editFirstName() {
        setIsFirstNameDisabled(!isFirstNameDisabled);
    }
    // function editSecondName() {
    //     setIsSecondNameDisabled(!isSecondNameDisabled);
    // }
    function editJob() {
        setIsJobDisabled(!isJobDisabled);
    }
    function editEmail() {
        setIsEmailDisabled(!isEmailDisabled);
    }
    function editPassword() {
        setIsPasswordDisabled(!isPasswordDisabled);
    }

    return (
        <div>
                <div className={small?  "pro-head pro-head-min": "pro-head" } >
                    <div className="pro-head-mainimg">
                        <img src={pro} ></img> 
                        <div className="pro-banner"></div>
                        
                    </div>
                    <div className="pro-head-img">
                        <img style={{borderRadius:"50%" , height:"150px" ,border:"6px solid #fff"}} src={image || avatar} alt="avatar" />
                        <div className="pro-name">{name} {me &&       
                        <button className="edit-icon" onClick={editPassword}>
                        <i className="bx bx-pencil"></i>
                    </button>  }
                    </div>
                    </div>
                </div>
                <div  className={small?  "pro-body": "pro-body" }>
                <PostWall me={true} />
                </div>



        </div>
    );
}

