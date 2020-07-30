import React from "react";
import Avatar from 'react-avatar';

import "assets/css/Post.css";

function Post(props) {
  const { username, avatar, image_url, caption, location } = props.post;
  return (
    <div className="post-container">
      <div className="post-header">
        <Avatar size="35" name={username} src={avatar} className="post-user-img" round={true}/>
        <div className="post-header-user-info">
          <h3 className='post-header-username'>{username}</h3>
          <span className='post-location'>{location}</span>
        </div>
      </div>
      <div className="post-img-wrapper">
        <img src={image_url} alt="Aakrit Subedi" className="post-img" />
      </div>
      <h4 className="post-text">
        <span className="post-username">{username}</span>&nbsp;
        <span className="post-caption">{caption}</span>
      </h4>
    </div>
  );
}

export default Post;
