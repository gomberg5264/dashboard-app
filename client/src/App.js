import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Button, Input, ButtonToolbar, Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import axios from 'axios';
import './stylesheets/App.css';
import About from './components/About';
import NotFound from './components/NotFound';
import Todo from './components/Todo';
import PopularLinks from './components/PopularLinks';
import News from './components/News';
import Postit from './components/Postit';
import Weather from './components/Weather';
import StockMarket from './components/StockMarket';
import Login from './components/Login';
import MainFocus from './components/MainFocus';
import './stylesheets/animate.css';

class App extends Component {
   render() {
    return (
      <div className="main_App">
        <Grid fluid>
          {/*
          <Row className="show-grid">
            <Col xs={12} sm={12} md={6} lg={3} className="oneColumn">
             <Login  />
            </Col>
          </Row>
          */}
          <Row className="show-grid">
            <Col xs={12} sm={12} md={12} lg={12} className="animated bounce">
              <MainFocus />
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} sm={12} md={6} lg={5} className="oneColumn animated rotateInDownLeft">
              <News />
            </Col>
            <Col xs={12} sm={12} md={6} lg={2} className="oneColumn animated bounceInDown">
              <PopularLinks />
            </Col>
            <Col xs={12} sm={12} md={6} lg={5} className="oneColumn animated rotateInDownRight">
              <Postit />
            </Col>
            <Col xs={12} sm={12} md={6} lg={4} className="oneColumn animated rotateInDownLeft">
              <Todo />
            </Col>
            <Col xs={12} sm={12} md={6} lg={4} className="oneColumn animated bounceInUp">
              <Weather  />
            </Col>
            <Col xs={12} sm={12} md={6} lg={4} className="oneColumn animated rotateInDownRight">
              <StockMarket />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
