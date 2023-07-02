import { useState , useEffect } from 'react';
import { toast } from 'react-toastify';

import './Home.css';
import avatar from '../../assets/avatar.png';

import { PostWall } from '../PostWall/PostWall.js';
import { Post } from '../Post/Post.js';
import { Profile } from '../Profile/Profile.js';
import { POST } from '../utils/API';

export function Home() {
  const filter_classes = ["description", "user"];
  const filter_options = filter_classes.map((filter_option) => 
      <option key={filter_option}>{ filter_option }</option>
  );

  const userAvatar = avatar;
  const [filterType, setFilterType] = useState("description");
  const [searchFilter, setSearchFilter] = useState("");
  const [posts, setPosts] = useState([]);

  const [home_or_profile, setHome_or_Profile] = useState(null);

  function filterSearch() {
    if(searchFilter !== "") {
      const query = {
        filterType: filterType,
        searchFilter: searchFilter
      };
      POST('post/filter', query).then((data) => {
        setPosts(data.posts.map((post, index) => 
            <Post key={index} id={index} userAvatar={userAvatar} post={post} showProfile={showProfile} />        
        ))
        console.log(data.posts);
      })
      .catch((error) => {
        console.log(error);
        toast('Error Fetching Posts', {type: 'error'});
      })
    }
    else {
      setPosts([]);
    }
  }

  function showProfile(e) {
    let profileUserId = e.target.id;
    console.log("profile userId", e.target.id);
    setHome_or_Profile(<Profile profileId={profileUserId} />);
  }

  useEffect(() => {
    setHome_or_Profile(
      <div className="home">
        <div className="search-bar">
          <input type="search" className="search-text" id="search-prompt" 
            onChange={(e) => {
              setSearchFilter(e.target.value);
            }}
          />
          <select className="filter-select" name="filter-class" id="filter-class"
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            { filter_options }
          </select>
          <button className="search-btn" onClick={filterSearch}> Search </button>
        </div>
        <PostWall posts={posts} showProfile={showProfile} />
      </div>
    );
    
  },[posts]);

  return (
    <div>
      { home_or_profile }
    </div>
  );
}