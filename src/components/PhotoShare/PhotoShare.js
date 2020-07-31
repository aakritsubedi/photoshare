import React, { useState, useEffect } from "react";
import { RiCamera3Line } from "react-icons/ri";
import firebase from 'firebase';

import { auth, db, storage } from "firebaseConfig";

import Modal from "react-modal";

import Uploader from "components/Uploader";
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
    borderRadius: "6px",
  },
};

function PhotoShare() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [user, setUser] = useState("");
  const [userIPInfo, setUserIPInfo] = useState({});

  useEffect(() => {
    db.collection("posts").orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  useEffect(() => {
    async function fetchuserIPInfo() {
      const userIpInfo = await fetch("https://ipapi.co/json").then((res) =>
        res.json()
      ).catch(error => console.log(error));
      setUserIPInfo(userIpInfo);
    }

    fetchuserIPInfo();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //Logged in..
        setUser(authUser);
      } else {
        //Logged out ..
        setUser(null);
      }
    });
    return () => {
      //clean up action
      unsubscribe();
    };
  }, [user]);

  let userLogin = (e, email, password) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
    setOpen(false);
  };
  let userSignup = (e, username, email, password) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };
  let uploadImg = (e, image, caption) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes ) * 100
        );
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage.ref('images')
        .child(image.name)
        .getDownloadURL()
        .then(url => {
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              image_url: url,
              location: `${userIPInfo.city},${userIPInfo.region} ${userIPInfo.org.split(' ')[0]} ${userIPInfo.ip}`,
              avatar: '',
              username: user.displayName
            })
        })
      }
    )
    setOpen(false);
  }
  let loginClick = () => {
    setOpen(true);
    setModalContent(<Login userLogin={userLogin} />);
  };

  let signUpClick = () => {
    setOpen(true);
    setModalContent(<Signup userSignup={userSignup} />);
  };
  let logoutClick = () => {
    auth.signOut();
  };
  let letsUpload = () => {
    setOpen(true);
    setModalContent(<Uploader user={user} uploadImg={uploadImg} />);
  };

  return (
    <div className="App">
      <Header
        user={user}
        onLoginClick={loginClick}
        onSignUpClick={signUpClick}
        onLogoutClick={logoutClick}
      />
      <div className="post-wrapper">
        {posts.map(({ post, id }) => (
          <Post post={post} postId={id} key={id} user={user} />
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
      <span className="bdr-ripple-ani-btn">
        <button className="photoshare-add-post" onClick={letsUpload}>
          <RiCamera3Line />
        </button>
      </span>
    </div>
  );
}

export default PhotoShare;
