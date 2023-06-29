import { useState } from 'react';
import { toast } from 'react-toastify';

import './Home.css';
import avatar from '../../assets/avatar.png';

import { PostWall } from '../PostWall/PostWall.js';
import { Post } from '../Post/Post.js';
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

  function filterSearch() {
    if(searchFilter !== "") {
      const query = {
        filterType: filterType,
        searchFilter: searchFilter
      };
      POST('post/filter', query).then((data) => {
        setPosts(data.posts.map((post, index) => 
            <Post key={index} id={index} userAvatar={userAvatar} post={post} />        
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

  return (
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
      <PostWall posts={posts} />
    </div>
  );
}