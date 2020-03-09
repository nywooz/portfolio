import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./components/homepage/Layout";
import History from "./components/History";
import { Router, Route } from "react-router-dom";
import ProjectDescription from "./components/project-description-module/ProjectDescription";
import ContactMe from './components/ContactMe';
import PotterPage from './components/potter-module/Potter.mainView';


import './styles/scss/react-transitions.scss';

class App extends Component {

  render() {
    return (
      <Router history={History}>
        <div className="transition-container">
        <Route exact path="/" component={Layout}/>
        <Route path="/projects" component={ProjectDescription}></Route>
        <Route path='/contactMe' component={ContactMe} />
        <Route path='/potterPage' component={PotterPage} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  reducerInfo: state.reducerInfo
});

export default connect(mapStateToProps)(App);
