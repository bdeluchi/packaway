import * as firebase from "firebase";

export default class AuthService {
  static async signup(email, password) {
    let error = null;

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      error = err.code;
    }
    return error;
  }

  static async login(email, password) {
    let error = null;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      error = err.code;
    }
    return error;
  }

  static getErrorMessage(code) {
    console.log(code)
    const errorMessage = ERROR_MESSAGES[code];
    return errorMessage || 'Unexpected error';
  }

  static registerAuthObserver(callback) {
    return firebase.auth().onAuthStateChanged(callback);
  }

  static logout() {
    firebase.auth().signOut();
  }
}


const ERROR_MESSAGES = {
  'auth/weak-password'        : 'Password must be at least 6 characters long',
  'auth/invalid-email'        : 'Please enter a valid email',
  'auth/email-already-in-use' : 'Email is already in use',
  'auth/wrong-password'       : 'User or password incorrect',
  'auth/user-not-found'       : 'User not found'
}