import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import POISearch from './pages/POISearch'
import EditPack from './pages/packs/EditPack'
import PackOverview from './pages/packs/PackOverview'
import ViewPack from './pages/packs/ViewPack'



const App = () => {
  return (
    <div className="App">
     <Router>
       <Switch>
         <Route exact path="/" component={Home} />
         <Route path="/login" component={Login} />
         <Route path="/poisearch" component={POISearch} />
         <Route path="/packs/edit" component={EditPack} />
         <Route path="/packs/view" component={ViewPack} />
         <Route path="/packs" component={PackOverview} />
       </Switch>
     </Router>
    </div>
  );
}

export default App;
