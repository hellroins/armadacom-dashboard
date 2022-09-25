// LoginPage.js
import React from "react";
import { Login, LoginForm } from "react-admin";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase/compat/app";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: '#/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  // Optional callbacks in order to get Access Token from Google,Facebook,... etc
  callbacks: {
    signInSuccessWithAuthResult: (result) => {
      const credential = result.credential;
      // The signed-in user info.
      const user = result.user;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const accessToken = credential.accessToken;
      console.log('oke')
      console.log({result, user, accessToken});
    },

    signInFailure: function(error) {
      // Some unrecoverable error occurred during sign-in.
      // Return a promise when error handling is completed and FirebaseUI
      // will reset, clearing any UI. This commonly occurs for error code
      // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
      // occurs. Check below for more details on this.
      console.log(error);
    }
  }
}

const SignInScreen = () => <StyledFirebaseAuth 
  firebaseAuth={firebase.auth()}
  uiConfig={uiConfig}
/>;

const CustomLoginForm = props => (
  <div>
    <div style={{fontFamily: "monospace", marginLeft: '15px'}}>
    </div>
    <LoginForm {...props} />
    <SignInScreen />
  </div>
);

const LoginPage = props => (
  <Login {...props}>
    <CustomLoginForm {...props}/>
  </Login>
);

export default LoginPage;
