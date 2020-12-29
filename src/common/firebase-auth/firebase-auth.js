import loginStates from '../constants/login-state';

// Todo: Implement getRedirectResult when needed
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('email');
  firebase.auth().signInWithRedirect(provider);
}

function loginWithFb() {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('email');
  firebase.auth().signInWithRedirect(provider);
}

function loginWithTwitter() {
  const provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

function createUserWithEmailAndPassword(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => {
      const event = new CustomEvent('change-login-state', {
        bubbles: true,
        detail: {
          loginState: loginStates.LOGIN_FAILED,
          errorMessage: error.message
        }
      });
      document.dispatchEvent(event);
    });
}

function signInWithEmailAndPassword(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      const event = new CustomEvent('change-login-state', {
        bubbles: true,
        detail: {
          loginState: loginStates.LOGIN_FAILED,
          errorMessage: error.message
        }
      });
      document.dispatchEvent(event);
    });
}

function sendPasswordResetEmail(email) {
  firebase
    .auth()
    .sendPasswordResetEmail(email, {})
    .then(() => {
      const event = new CustomEvent('change-login-state', {
        bubbles: true,
        detail: {
          loginState: loginStates.RESET_PASSWORD,
          errorMessage: 'Password reset email sent.'
        }
      });
      document.dispatchEvent(event);
    })
    .catch(error => {
      const event = new CustomEvent('change-login-state', {
        bubbles: true,
        detail: {
          loginState: loginStates.LOGIN_FAILED,
          errorMessage: error.message
        }
      });
      document.dispatchEvent(event);
    });
}

export {
  loginWithTwitter,
  loginWithFb,
  loginWithGoogle,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
};
