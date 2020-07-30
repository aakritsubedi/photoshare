import React, { useState, useEffect } from "react";

import { db } from 'firebaseConfig';

import Header from "components/Header";
import Post from "components/Post";

const login = 'Hello Login';
const signup = 'Hello Signup';

function PhotoShare() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() })));
    })
  }, [])

  return (
    <div className="App">
      <Header  />
      <div className="post-wrapper">
        {posts.map(({post, id}) => (
          <Post post={post} key={id} />
        ))}
      </div>
    </div>
  );
}

export default PhotoShare;