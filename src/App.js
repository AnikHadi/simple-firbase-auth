import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Auth/Auth.initialize';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import googleLogo from './image/Google__G__Logo.svg.png';
import githubLogo from './image/github.png';
import signOutLogo from './image/sign Out.jpg';
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';

initializeAuthentication();


function App() {

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const [user, setUser] = useState([]);

  const userInfoObject = (loginUser) => {
    const { displayName, email, photoURL, uid } = loginUser;
    const loginUserInfo = {
      name: displayName,
      email: email,
      picture: photoURL,
      uid: uid
    }
    return setUser(loginUserInfo);
  }

  const auth = getAuth();
  const googleAuthorizeHandler = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        userInfoObject(result.user);
        // const { displayName, email, photoURL, uid } = result.user;
        // const loginUserInfo = {
        //   name: displayName,
        //   email: email,
        //   picture: photoURL,
        //   uid: uid
        // }
        // setUser(loginUserInfo);
      })
  }

  const githubAuthorizeHandler = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        userInfoObject(result.user);
      })
  }

  // SignOut
  const signOutHandler = () => {
    signOut(auth).then(() => {
      setUser({});
    })
  }
  // <FontAwesomeIcon id='google-logo' icon={faGoogle} />
  // <FontAwesomeIcon id='github-logo' icon={faGithub} />

  return (
    <div className="App">
      {!user.email ?
        <div>
          <h3>Sign In with </h3>
          <button className='login-icon' onClick={googleAuthorizeHandler}><img src={googleLogo} alt="" /></button>
          <button className='login-icon' onClick={githubAuthorizeHandler}><img src={githubLogo} alt="" /></button>
        </div> :
        <div>
          <h3>Sing Out</h3>
          <button className='login-icon' onClick={signOutHandler} id='sign-out'><img src={signOutLogo} alt="" /></button>
        </div>
      }
      <br />


      <div className="user-info">

        {
          user.email && <div>
            <h1>User Information</h1>
            <img src={user.picture} alt="" />
            <h3>Welcome to {user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Uniq ID: {user.uid}</p>
          </div>
        }
      </div>

    </div>
  );
}

export default App;