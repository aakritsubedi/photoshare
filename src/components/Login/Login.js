import React, { useState } from "react";

function Login({   userLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let login = (e) => {
    userLogin(e, email, password);
  }
  return (
    <div className="login-wrapper">
      <h1 className="header-title">PhotoShare</h1>
      <form>
      <div>
          <input value={email} type="email"  onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
        </div>
        <div>
          <input value={password} type="password"  onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
        </div>
        <div>
        {email && password ? (
            <button type="submit" onClick={(e) => login(e)}> Login </button>
          ): (
            <button type="submit" className='disabled'> Login </button>
        )}  
        </div>
      </form>
    </div>
  );
}

export default Login;
