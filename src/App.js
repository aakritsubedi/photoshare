import React, { useState, useEffect } from "react";

import Header from "components/Header";
import Post from "components/Post";

import "assets/css/App.css";

const postsData = [
  { username: 'Aakrit Subedi', avatar: '#', image: 'http://aakritsubedi.com.np/us/img/us/aakrit.jpg', caption: 'hey .. k cha khabr?', location: 'Kathmandu, Nepal' },
  { username: 'Aakriti Subedi', avatar: '#', image: 'http://aakritsubedi.com.np/us/img/us/aakrit.jpg', caption: 'hey .. k cha khabr?', location: 'Kathmandu, Nepal' },
  { username: 'Yukti Bhatt', avatar: 'http://aakritsubedi.com.np/images/profile_new.jpg', image: 'http://aakritsubedi.com.np/us/img/us/aakrit.jpg', caption: 'hey .. k cha khabr?', location: 'Kathmandu, Nepal' },
  { username: 'Aakrit Subedi', avatar: 'http://aakritsubedi.com.np/images/profile_new.jpg', image: 'http://aakritsubedi.com.np/us/img/us/aakrit.jpg', caption: 'hey .. k cha khabr?', location: 'Kathmandu, Nepal' }
]

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts([...postsData])
  }, [])
  return (
    <div className="App">
      <Header />
      <div className="post-wrapper">
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
