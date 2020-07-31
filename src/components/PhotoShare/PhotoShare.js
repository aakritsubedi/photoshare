import React, { useState, useEffect } from "react";

import { db, auth } from "firebaseConfig";

import Modal from "react-modal";

import Header from "components/Header";
import Signup from "components/Signup";
import Login from "components/Login";
import Post from "components/Post";

import "assets/css/PhotoShare.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: '6px'
  },
};

function PhotoShare() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        //Logged in..
        console.log(authUser);
        setUser(authUser);
      }
      else {
        //Logged out .. 
        setUser(null);
      }
    })
    return () => {
      //clean up action
      unsubscribe();
    }
  }, [user]);

  
  let userLogin = (e, email, password) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error));
    setOpen(false);
  }
  let userSignup = (e, username, email, password) => {
    e.preventDefault();
    // setUsername(username);
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
    setOpen(false);
  }
  let loginClick = () => {
    setOpen(true);
    setModalContent(<Login userLogin={userLogin} />);
  };

  let signUpClick = () => {
    setOpen(true);
    setModalContent(<Signup userSignup={userSignup}/>) ;
  };
  let logoutClick = () => {
    auth.signOut();
  }
  
  return (
    <div className="App">
      <Header user={user} onLoginClick={loginClick} onSignUpClick={signUpClick} onLogoutClick={logoutClick}/>
      <div className="post-wrapper">
        {posts.map(({ post, id }) => (
          <Post post={post} key={id} />
        ))}
      </div>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

export default PhotoShare;
