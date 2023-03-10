// frontend/src/components/LoginFormPage/index.js
// frontend/src/components/LoginFormModal/index.js
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Link } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [eyeOpen,setEyeOpen] = useState(false)
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

  useEffect(() => {
    let e = []

    if(credential.length < 4){
      e.push("There must be at least 4 characters in your username/email")
    }
    if(password.length < 6){
      e.push("There must be at least 6 characters in your password")
    }
    
    setErrors(e)
  },[credential,password])

  const showPasswordFunc =  (e) => {
    // console.log(document.root)
    const pswd = document.getElementById('passwordInput')
    if(pswd.type === "password") pswd.type = 'text'
    else pswd.type = 'password'

    if(!eyeOpen)setEyeOpen(true) 
    else setEyeOpen(false)
  }
  console.log("errors.length",errors)


  return (
    <div className="wrapper">
      <div className="form-box-login">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            {/* <p className="errors">
              {errors.map((error, idx) => (
                <p key={idx}>{error}</p>
              ))}
            </p> */} 
            {/* removed (not sure if the errors for the inputs are required) */}
            <div className="input-box">
              <i id="icon" class="fa-solid fa-envelope"></i>
              <input type="text" placeholder="username or email" value={credential}  onChange={(e) => setCredential(e.target.value)} required />
            </div>
            <div className="input-box" for='passwordInput'>
              {/* <i id="icon" class="fa-solid fa-lock"></i> */}
              <input type="password" placeholder="password" value={password} id="passwordInput" onChange={(e) => setPassword(e.target.value)} required/>
              <i id='icon' class={eyeOpen ? 'fa-sharp fa-solid fa-eye':'fa-solid fa-eye-slash' } onClick={() => showPasswordFunc()}></i>
            </div>
          </div>
          <div className="bottom-area">
            <button 
              className="btn" 
              type="submit"
              disabled={errors.length ? true:false}
            >Log In
            
            </button>
            <div className="login-register"> <p> Don't have an account? <Link className="register-link" to='/'>Register </Link> </p> </div>
            <div className="demo-user-login"> <Link className="demo-link" to="/">Demo User</Link> </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;