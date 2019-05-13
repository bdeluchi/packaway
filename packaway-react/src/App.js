import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import POISearchPage from "./pages/POISearchPage";
import EditPackPage from "./pages/packs/EditPackPage";
import PackOverviewPage from "./pages/packs/PackOverviewPage";
import ViewPackPage from "./pages/packs/ViewPackPage";
import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import ProfilePage from "./pages/ProfilePage";
import DataService from "./services/data";
import AuthService from "./services/auth";
import withUser from "./helpers/withUser";

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  componentDidMount() {
    AuthService.registerAuthObserver(async user => {
      if (user) {
        console.log("User is signed in");
        const userDetail = await DataService.getObjectDetail("users", user.uid);

        if (userDetail) {
          this.props.setUserInfo(userDetail);
        } else {
          console.log("ESPERAAAAAA me estoy registrando");
        }
      } else {
        console.log("User is signed out");
      }
      this.setState({ loading: false });
    });
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false})
  }

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }
    return (
      <div className="App" style={{ height: "100%" }}>
        <Router>
          <Navbar drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.sideDrawerOpen}/>
          {backdrop}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/poisearch/:cityId" component={POISearchPage} />
            <Route path="/packs/edit/:packId" component={EditPackPage} />
            <Route path="/packs/view" component={ViewPackPage} />
            <Route path="/packs" component={PackOverviewPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withUser(App);
