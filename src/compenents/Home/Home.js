import './Home.css';

import { PostWall } from '../PostWall/PostWall.js';

export function Home() {
  return (
    <div className="home">
      <PostWall />
    </div>
  );
}