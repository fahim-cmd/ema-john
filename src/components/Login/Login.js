
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

initializeLoginFramework();

function Login() {


  //redirect shipment page with sign in
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  //use context api data 
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);



  const handleSignOut = () => {
    const signedOutUser = {
      isSignedOut: false,
      name: '',
      email: '',
      photo: ''
    }
    setUser(signedOutUser);
  }


  //submit button
  const handleSubmit = (e) => {

    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.email, user.name, user.password)
        .then(res => {
          setUser(res);
          setLoggedInUser(res)
          history.replace(from)
        })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          setUser(res);
          setLoggedInUser(res)
          history.replace(from)
        })
    }
    e.preventDefault();
  }



  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      isFormValid = isEmailValid;
    }
    if (e.target.name === 'password') {
      const isPasswordValid = /\d{1}/.test(e.target.value) && e.target.value.length > 4;
      isFormValid = isPasswordValid;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
  }

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        setUser(res);
        setLoggedInUser(res)
        history.replace(from)
      })
  }

  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        setUser(res);
        setLoggedInUser(res)
        history.replace(from)
      })
  }


  return (
    <div style={{ textAlign: 'center' }}>
      { user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
        <button onClick={googleSignIn}>Sign in</button>}

      <button onClick={handleFbSignIn}>fb sign in</button>

      {
        user.isSignedIn && <div>
          <h3> welcome, {user.name}</h3>
          <p> your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our Own Authentication</h1>

      <input type="checkbox" onChange={() => { setNewUser(!newUser) }} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign in</label>

      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" onBlur={handleBlur} placeholder="Enter Your Name" name="name" id="" />}
        <br />
        <input type="text" onBlur={handleBlur} placeholder="write your name" name="email" required />
        <br />
        <input type="password" onBlur={handleBlur} placeholder="your password" name="password" id="" required />
        <br />
        <input type="submit" value={newUser ? 'sign up' : 'sign in'} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && <p style={{ color: "green" }}>user {newUser ? 'created' : 'logged in'} successfully</p>}
    </div>
  );
}

export default Login;
