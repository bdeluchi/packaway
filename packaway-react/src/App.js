import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import POISearchPage from './pages/POISearchPage'
import EditPackPage from './pages/packs/EditPackPage'
import PackOverviewPage from './pages/packs/PackOverviewPage'
import ViewPackPage from './pages/packs/ViewPackPage'
import Navbar from './components/Navbar';



const App = () => {
  return (
    <div className="App">
     <Router>
       <Navbar />
       <Switch>
         <Route exact path="/" component={HomePage} />
         <Route path="/login" component={LoginPage} />
         <Route path="/poisearch/:cityId" component={POISearchPage} />
         <Route path="/packs/edit" component={EditPackPage} />
         <Route path="/packs/view" component={ViewPackPage} />
         <Route path="/packs" component={PackOverviewPage} />
       </Switch>
     </Router>
    </div>
  );
}

export default App;
