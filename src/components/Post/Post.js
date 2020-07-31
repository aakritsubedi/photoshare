import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";

import firebase from "firebase";

import "assets/css/Post.css";
import { db } from "firebaseConfig";

function Post(props) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const postId = props.postId;
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({ id: doc.id, comment: doc.data() }))
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  let postComment = (e) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      username: props.user.displayName,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  const { username, avatar, image_url, caption, location } = props.post;
  return (
    <div className="post-container">
      <div className="post-header">
        <Avatar
          size="35"
          name={username}
          src={avatar}
          className="post-user-img"
          round={true}
        />
        <div className="post-header-user-info">
          <h3 className="post-header-username">{username}</h3>
          <span className="post-location">{location}</span>
        </div>
      </div>
      <div className="post-img-wrapper">
        <img src={image_url} alt="Aakrit Subedi" className="post-img" />
      </div>
      <h4 className="post-text">
        <span className="post-username">{username}</span>&nbsp;
        <span className="post-caption">{caption}</span>
      </h4>
      {/* Comment Section */}
      <div className="comment-wrapper">
        {comments.map((cmt) => (
          <p key={cmt.id}>
            <b>{cmt.comment.username}</b> {cmt.comment.text}
          </p>
        ))}
      </div>
      {props.user ? (
        <form className="post-comment-box">
          <input
            className="post-comment-input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button
            className="post-comment-btn"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Comment
          </button>
        </form>
      ) : (
        <h6 className="post-comment-box">Sign in to comment...l</h6>
      )}
    </div>
  );
}

export default Post;
