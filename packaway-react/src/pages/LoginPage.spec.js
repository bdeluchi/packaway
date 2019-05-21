import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from './LoginPage';
import Login from '../components/Login'
import SignUp from '../components/SignUp'

import firebaseConfig from '../services/config'
const firebase = require('firebase/app');
firebase.initializeApp(firebaseConfig);




describe('Login and signup page',  () => {
  let loginWrapper;
  let signupWrapper;

  beforeEach(() => {
    loginWrapper = shallow(<Login />);
    signupWrapper = shallow(<SignUp />)
  })

  it('login renders ok', () =>  {
    expect(loginWrapper.exists()).toBe(true);
  });

  it('signup renders ok', () =>  {
    expect(signupWrapper.exists()).toBe(true);
  });

})