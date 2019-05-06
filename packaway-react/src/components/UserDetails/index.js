import React, { Component } from "react";

import StorageService from "../../services/storage";
import DataService from "../../services/data";
import withUser from "../../helpers/withUser"

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null
    };
  }

  async componentDidMount() {
    const { userInfo } = this.props;
    if (userInfo) {
      const user = userInfo;
      this.setState({ user, loading: false });
    }
  }

  async componentDidUpdate(prevProps) {
    const { userInfo } = this.props;
    if (!prevProps.userInfo && userInfo) {
      const user = userInfo;
      this.setState({ user, loading: false });
    }
  }

  onChangeInput = e => {
    const {user} = this.state;
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  };

  onFileSelected = e => {
    const file = e.target.files[0];
    const {user} = this.state;
    StorageService.uploadFile(file, "user-images", imageUrl => {
      this.setState({
        user: {
          ...user,
          imageUrl
        }
      });
    });
  };

  onSubmitForm = e => {
    e.preventDefault();
    const { email, name, lastname, uid, imageUrl } = this.state.user;
    const updateUser = {
      email,
      name,
      lastname,
      imageUrl
    }
    console.log('updateuser',updateUser)
    const id = uid;
    const success = DataService.updateDetail('users', id, updateUser);
    if(success) {
      console.log("updated!!")
      this.props.setUserInfo(updateUser);
    }

  };

  deleteImage = () => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        imageUrl : ''
      }
    });
  };

  render() {
    const { user } = this.state;
    return (
      <div>
        {user && (
          <div>
            <form onSubmit={this.onSubmitForm}>
              <label>Email:</label>
              <input
                type="email"
                value={user.email || ''}
                name="email"
                onChange={this.onChangeInput}
              />
              <br />
              <label>Name:</label>
              <input
                type="name"
                value={user.name || ''}
                name="name"
                onChange={this.onChangeInput}
              />
              <br />
              <label>Last Name:</label>
              <input
                type="lastname"
                value={user.lastname || ''}
                name="lastname"
                onChange={this.onChangeInput}
              />
              <br />
              <label>Profile image:</label>
              {user.imageUrl && <img src={user.imageUrl} alt={user.name} />}
              <div onClick={this.deleteImage}>Remove image</div>
            <input type="file" name="picture" onChange={this.onFileSelected} />
              <br />
              <button>Save</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default withUser(UserDetails);
