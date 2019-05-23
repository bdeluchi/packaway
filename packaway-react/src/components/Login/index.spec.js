import React from 'react';
import { shallow } from 'enzyme';
import Login from './index'
import firebaseConfig from '../../services/config'
const firebase = require('firebase/app');
firebase.initializeApp(firebaseConfig);




describe('Login component',  () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  })

  it('Should render login component ok', () =>  {
    expect(wrapper.exists()).toBe(true);
  }); 

  it('should show h1 title', () =>  {
    // const loginTitle = wrapper.find('.login-title');
      expect(wrapper.find('.login-title').length).toBe(1)
  })

  it('should show complete form', () => {
    expect(wrapper.find('.login-input-label').length).toBe(2);
  })

})