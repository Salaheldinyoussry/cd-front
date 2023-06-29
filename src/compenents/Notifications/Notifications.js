import { useState } from 'react';

import './Notifications.css';
import avatar from '../../assets/avatar.png';

export function Notifications() {
    const [currnetNotifications, setCurrnetNotifications] = useState(null);
    
    //setCurrnetNotifications();


    return (
      <div className="Notifications">
        <Notifications image={avatar} description="test" />    
      </div>
    );
}

function Notification({ image, description }) {
  return (
    <div className="Notification">
      <img src={image} />
      <label> {description} </label>
    </div>
  );
}
