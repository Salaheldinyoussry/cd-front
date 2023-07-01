import { useState , useEffect } from 'react';

import './Notifications.css';
import avatar from '../../assets/avatar.png';
import { GET } from '../utils/API';

export function Notifications() {
    const [currnetNotifications, setCurrnetNotifications] = useState(null);

    useEffect(() => {
      GET('notify').then((response) => {
        setCurrnetNotifications(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
      });
      
    }, []);

    return (
      <div className="notifications">
        { currnetNotifications &&
          currnetNotifications.map((notify, index) => 
            <Notification key={index} id={index} image={notify.image} description={notify.description} />      
          ) 
        }
      </div>
    );
}

function Notification({ image, description }) {
  return (
    <div className="notification">
      <img className="notify-image" src={image} alt="avatar" />
      <label className="description"> {description} </label>
    </div>
  );
}
