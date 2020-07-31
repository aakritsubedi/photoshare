import React, { useState } from "react";

function Uploader({ uploadImg, user }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleChange = e => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }
  }

  let upload = (e) => {
    uploadImg(e, image, caption);

    setImage(null);
    setCaption('');
  }

  return (
    <div className="login-wrapper">
      <h1 className="header-title">PhotoShare</h1>
      {user ? (
        <form>
        <div>
          <input type="file" onChange={handleChange} />
        </div>
        <div>
          <textarea value={caption} onChange={(e) => setCaption(e.target.value)} cols='40' rows='5' placeholder='Enter caption'></textarea>
        </div>
        <div>
          {image ? (
            <button type="submit" onClick={(e) => upload(e)}> Upload </button>
          ): (
            <button type="submit" className='disabled'> Upload </button>
          )}
        </div>
      </form>
      ): (
        <h3>Sorry, you need to login to upload...</h3>
      )}
    </div>
  );
}

export default Uploader;
