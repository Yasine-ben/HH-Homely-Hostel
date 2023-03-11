import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  useEffect(() => { //input error checker/filer
    let e = []

    if(!email.length||!username.length||!firstName.length||!lastName.length||!password.length||!confirmPassword.length){ 
      e.push('All fields must be filled') //empty fields validator
    } if(password !== confirmPassword){ //password / confirm password matching validator
      e.push('Passwords must match')
    }if(username.length < 4){
      e.push("Username must be longer than 4 characters")
    }if(password.length < 6){
      e.push("Password must be greater than 6 characters")
    }

    setErrors(e)
  },[email,username,password,firstName,lastName,password,confirmPassword])

  return (
    <div className="wrapper-signUp">
      <div className="form-box signUp">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <p className="errors">
              {errors.map((error, idx) => <p key={idx}>{error}</p>)}
            </p>
            <div className="input-box">
              <input
                type="text"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="text"
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="text"
                value={firstName}
                placeholder="first name"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="text"
                value={lastName}
                placeholder="last name"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                value={confirmPassword}
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button 
              className="btn" 
              type="submit"
              disabled={errors.length ? true:false}
            >Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;