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
          if (data && data.message) setErrors([(data.message).toString()]);
          // console.log(data.message)
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
  //console.log("errors.length",errors)


  return (
    <div className="wrapper-login">
      <div className="form-box login">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <h2 className="errors">
              {errors.map((error, idx) => (
                <p key={idx}>{error}</p>
              ))}
            </h2>  
            <div className="input-box">
              <i 
                id="icon" 
                className="fa-solid fa-envelope"
              ></i>
              <input 
                type="text" 
                placeholder="Username or Email" 
                value={credential}  
                onChange={(e) => setCredential(e.target.value)} 
                required 
              />
            </div>
            <div className="input-box" htmlFor='passwordInput'>
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                id="passwordInput" 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
              <i 
                id='icon' 
                className={eyeOpen ? 'fa-sharp fa-solid fa-eye':'fa-solid fa-eye-slash' } 
                onClick={() => showPasswordFunc()}
              ></i>
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
            <div className="demo-user-login"> 
              <Link to="/"
              className="demo-link" 
              onClick={(() => ( //Come back to this closeModal isnt working
                // setCredential('demo_user123'),
                // setPassword('password'),
                dispatch(sessionActions.login({ credential:'demo_user123', password:'password' })),
                closeModal
              ))
              
              }
              >Demo User
              </Link> 
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;