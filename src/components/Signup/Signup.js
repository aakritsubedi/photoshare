import React, { useState } from "react";

function Signup({ userSignup }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let signUp = (e) => {
    userSignup(e, username, email, password);
  }

  return (
    <div className="login-wrapper">
      <h1 className="header-title">PhotoShare</h1>
      <form>
        <div>
          <input value={username} type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
        </div>
        <div>
          <input value={email} type="email"  onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
        </div>
        <div>
          <input value={password} type="password"  onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
        </div>
        <div>
          <button type="submit" onClick={(e) => signUp(e)}> Signup </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
