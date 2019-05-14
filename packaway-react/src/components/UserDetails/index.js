import React, { Component } from "react";

import StorageService from "../../services/storage";
import DataService from "../../services/data";
import withUser from "../../helpers/withUser";

import "./index.scss";

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
    const { user } = this.state;
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
    const { user } = this.state;
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
    const { name, lastname, uid, imageUrl } = this.state.user;
    const updateUser = {
      name,
      lastname,
      imageUrl
    };
    const id = uid;
    const success = DataService.updateDetail("users", id, updateUser);
    if (success) {
      this.props.setUserInfo(updateUser);
    }
  };

  deleteImage = () => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        imageUrl: ""
      }
    });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="user-main">
        {user && (
          <div className="user-container">
            <div className="user-img-container">
              {user.imageUrl && <img className="user-img" src={user.imageUrl} alt={user.name} />}
            </div>
            <input type="file" name="picture" onChange={this.onFileSelected} />
            <div className="remove-img-btn" onClick={this.deleteImage}>Remove image</div>
            <form className="user-form" onSubmit={this.onSubmitForm}>
              <label className="user-input-label">Name:</label>
              <input 
                className="user-input-field"
                type="name"
                value={user.name || ""}
                name="name"
                onChange={this.onChangeInput}
              />
              <br />
              <label className="user-input-label">Last Name:</label>
              <input 
                className="user-input-field"
                type="lastname"
                value={user.lastname || ""}
                name="lastname"
                onChange={this.onChangeInput}
              />
              <button className="user-save-btn">Save</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default withUser(UserDetails);
