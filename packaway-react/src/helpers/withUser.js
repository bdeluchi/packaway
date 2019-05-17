import React from 'react';
import { connect } from 'react-redux';
import { setUserInfo, addPackToUser } from '../redux/actions/userActions';


function withUser(WrappedComponent){
  const NewComponent = (props) => {
    const userInfo = props;
    return <WrappedComponent userInfo={userInfo} {...props} />
  }

  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: (user) => dispatch(setUserInfo(user)),
    addPackToUser: (packId) => dispatch(addPackToUser(packId))
  };
};

export default withUser;