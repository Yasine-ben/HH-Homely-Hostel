// frontend/src/components/LoginFormPage/index.js
// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const showPasswordFunc =  (e) => {
    console.log(document.root)
    const pswd = document.getElementById('passwordInput')
    if(pswd.type === "password") pswd.type = 'text'
    else pswd.type = 'password'
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input type="text" value={credential} onChange={(e) => setCredential(e.target.value)} required />
        </label>

        <label for='passwordInput'>Password
          <input type="password" defaultValue='password' value={password} id="passwordInput" onChange={(e) => setPassword(e.target.value)} required/>
        </label>
        
        <input type="checkbox" id='box' onClick={() => showPasswordFunc()}/>
        <label>hide/show password</label>

        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;