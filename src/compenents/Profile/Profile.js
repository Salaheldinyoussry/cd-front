import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

import './Profile.css';
import avatar from '../../assets/avatar.png';
import pro from '../../assets/pro.jpg';

import { GET , POST } from '../utils/API';
import { PostWall } from "../PostWall/PostWall";

export function Profile() {
    const [id, setId] = useState(null);
    const [name, setName] = useState(null); const [newName, setNewName] = useState(null);
    const [email, setEmail] = useState(null); const [newEmail, setNewEmail] = useState(null);
    const [job, setJob] = useState(null); const [newJob, setNewJob] = useState(null);
    const [phone, setPhone] = useState(null); const [newPhone, setNewPhone] = useState(null);
    const [profileImage, setProfileImage] = useState(avatar);
    const [coverImage, setCoverImage] = useState(pro);

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
        GET('user').then((response) => {
            setId(response.id);
            setName(response.name); setNewName(response.name);
            setEmail(response.email); setNewEmail(response.email);
            setJob(response.job); setNewJob(response.job);
            setPhone(response.phone); setNewPhone(response.phone);
            //setProfileImage(response.profileImage);
            sessionStorage.setItem('user', JSON.stringify(response));
        })
        
    },[name, email, profileImage, coverImage]);
    
    const [isNameDisabled, setIsNameDisabled] = useState(true);
    const [isEmailDisabled, setIsEmailDisabled] = useState(true);
    const [isJobDisabled, setIsJobDisabled] = useState(true);
    const [isPhoneDisabled, setIsPhoneDisabled] = useState(true);

    async function editProfileImage(e) {
        let selectedFile = e.target.files[0];
        const response = editImage(selectedFile);

        // Handle the response from the Sails.js server
        if(response.ok) {
            const data = await response.json();
            setProfileImage(data.url);
            toast(`File uploaded successfully`);
            const newUser = {
                editType: "profileImage",
                id: id,
                profileImage: profileImage
            };
            editInfo(newUser);
        } 
        else {
          toast(`Error uploading file: ${response.statusText}`,{type:'error'});
        }
    }

    async function editCoverImage(e) {
        let selectedFile = e.target.files[0];
        const response = editImage(selectedFile);

        // Handle the response from the Sails.js server
        if(response.ok) {
            const data = await response.json();
            setCoverImage(data.url);
            toast(`File uploaded successfully`);
            const newUser = {
                editType: "coverImage",
                id: id,
                coverImage: coverImage
            };
            editInfo(newUser);
        } 
        else {
          toast(`Error uploading file: ${response.statusText}`,{type:'error'});
        }
    }

    async function editImage(selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
    
        // Send the file upload request to the Sails.js server using the fetch API
        const response = await fetch(/*process.env.REACT_APP_API_BASE_URL*/ "http://localhost:1337/" + 'image/upload', {
          method: 'POST',
          body: formData,
          headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem('_ria')}`,
          })
        });
        console.log("response", response);
        return response;
    }

    function editName() {
        if(!isNameDisabled && (name!==newName)) {
            const newUser = {
                editType: "name",
                id: id,
                name: newName
            };
            editInfo(newUser);
        }
        setIsNameDisabled(!isNameDisabled);
    }

    function editEmail() {
        if(!isEmailDisabled && (email!==newEmail)) {
            const newUser = {
                editType: "email",
                id: id,
                email: newEmail
            };
            editInfo(newUser);
        }
        setIsEmailDisabled(!isEmailDisabled);
    }

    function editJob() {
        if(!isJobDisabled && (job!==newJob)) {
            const newUser = {
                editType: "job",
                id: id,
                job: newJob
            };
            editInfo(newUser);
        }
        setIsJobDisabled(!isJobDisabled);
    }

    function editPhone() {
        if(!isPhoneDisabled && (phone!==newPhone)) {
            const newUser = {
                editType: "phone",
                id: id,
                phone: newPhone
            };
            editInfo(newUser);
        }
        setIsPhoneDisabled(!isPhoneDisabled);
    }

    function editInfo(newUser) {
        POST('edit', newUser).then((response) => {
            console.log(response);
            toast("Account updated successfully", { type: 'success' });
        }).catch((error) => {
            console.log(error);
            toast("Account update failed", { type: 'error' });
        });
    }

    return (
        <div>
            <div className={small? "pro-head pro-head-min": "pro-head" } >
                <div className="pro-head-mainimg">
                    <img src={coverImage} alt="cover" />
                    <input type="file" id="cover-image" name="image" accept="image/*" onChange={editCoverImage}/>  
                    <div className="pro-banner"></div>
                </div>
                <div className="pro-head-img">
                    <div>
                        <img className="pro-img" src={profileImage} alt="avatar" />
                        <input type="file" id="pro-image" name="image" accept="image/*" onChange={editProfileImage}/>
                    </div>
                    <div className="wrapper">
                        <input type="text" className="pro-name" value={newName} disabled={isNameDisabled}
                            onChange={(e) => {
                                setNewName(e.target.value);
                            }}
                        />     
                        <button className="edit-icon" onClick={editName}>
                            <i className="bx bx-pencil"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className={small? "pro-body":"pro-body" }>
                <div className="personal-card">
                    <label className="label"> Personal Info. </label>
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                    <div className="info">
                        <label className="info-label"> 
                            <i className="material-icons" style={{ fontSize: 22, marginRight: 8 }}> email </i>
                            Email 
                        </label>
                        <button className="edit-icon" onClick={editEmail}>
                            <i className="bx bx-pencil"></i>
                        </button>
                        <input type="email" name="email" className="info-input" value={newEmail} disabled={isEmailDisabled}
                            onChange={(e) => {
                                setNewEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="info">
                        <label className="info-label"> 
                            <i className="material-icons" style={{ fontSize: 22, marginRight: 8 }}> work </i>
                            Job Description 
                        </label>
                        <button className="edit-icon" onClick={editJob}>
                            <i className="bx bx-pencil"></i>
                        </button>
                        <input type="text" name="job" className="info-input" disabled={isJobDisabled} 
                            onChange={(e) => {
                                setNewJob(e.target.value);
                            }}
                        />
                    </div>
                    <div className="info">
                        <label className="info-label">
                            <i className="material-icons" style={{ fontSize: 22, marginRight: 8 }}> phone </i>
                            Phone
                        </label>
                        <button className="edit-icon" onClick={editPhone}>
                            <i className="bx bx-pencil"></i>
                        </button>
                        <input type="text" name="phone" className="info-input" disabled={isPhoneDisabled} 
                            onChange={(e) => {
                                setNewPhone(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <PostWall me={true} posts={[]} />
            </div>
        </div>
    );
}
