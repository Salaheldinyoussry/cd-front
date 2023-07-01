import { useEffect, useState} from 'react';
import { Route, Routes, Link , useLocation,} from 'react-router-dom';
import { toast } from 'react-toastify';
import { GET } from '../utils/API';
import './SideBar.css';
import avatar from '../../assets/avatar.png';

import { Profile } from '../Profile/Profile.js';
import { Home } from '../Home/Home.js';
import { ImageMorphing } from '../ImageMorphing/ImageMorphing.js';
import { DataAugmentation } from '../DataAugmentation/DataAugmentation.js';
import { GenerateImage } from '../GenerateImage/GenerateImage.js';
import { SavedImages } from '../SavedImages/SavedImages.js';
import { DrawPlane } from '../DrawPlane/DrawPlane.js';
import { BugReport } from '../BugReport/BugReport.js';

export function SideBar() {
    const location = useLocation();
    const [user, setUser] = useState({});
    const [sidebar, setSidebar] = useState(false);
    
    useEffect(() => {
        GET('user').then((res) => {
            setUser(res);
            sessionStorage.setItem('user', JSON.stringify(res));

        }).catch((err) => {
            toast(err.message, {type: 'error'});
        });

        setSidebar (Array.from(document.querySelectorAll('.sidebar'))[0]);
        const navItems = Array.from(document.querySelectorAll('nav .nav-item'));
        navItems.forEach(navItem => {
            if(location.pathname === navItem.id) {
                navItem.classList.add('active');
            }
            
            navItem.addEventListener('click', () => {
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });
                navItem.classList.add('active');
            });
        });

    }, [location]);

    function useToggle() {
        if(sidebar.className === 'sidebar')
            sidebar.classList.add('open');
        else
            sidebar.classList.remove('open');
    }

    return (
        <div>
            <div className="body">
                <link href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css" rel="stylesheet"/>
                <div className="sidebar">
                    <div className="toggle" onClick={useToggle}>
                        <i className="bx bx-chevron-right"></i>
                    </div>

                    <div className="logo">
                        <img style={{borderRadius:"50%"}} src={avatar} alt="..."/>
                        <h3>{user ? user.name:""}</h3>
                    </div>

                    <br/> 

                    <nav>
                        <ul>
                            <li>
                                <Link to="/profile" className="nav-item" id="/profile">
                                    <i className="bx bxs-face"></i>
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="nav-item" id="/">
                                    <i className="bx bxs-home"></i>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/generate" className="nav-item" id="/generate">
                                    <i className="bx bxs-image-add"></i>
                                    <span>Generate Image</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/morphing" className="nav-item" id="/morphing">
                                    <i className="bx bxs-image"></i>
                                    <span>Image Morphing</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/augmentation" className="nav-item" id="/augmentation">
                                    <i className="bx bx-images"></i>
                                    <span>Data Augmentation</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/images" className="nav-item" id="/images">
                                    <i className="bx bxs-photo-album"></i>
                                    <span>Saved Images</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/draw" className="nav-item" id="/draw">
                                    <i className="bx bxs-pencil"></i>
                                    <span>Draw</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/notifications" className="nav-item" id="/notifications">
                                    <i className="bx bxs-bell"></i>
                                    <span>Notifications</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/settings" className="nav-item" id="/settings">
                                    <i className="bx bxs-cog"></i>
                                    <span>Settings</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/bug" className="nav-item" id="/bug">
                                    <i className="bx bxs-message-dots"></i>
                                    <span>Report Bug</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        </div>
    );
}

