import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Button, Input, Modal, ButtonToolbar, Grid, Row, Col, Thumbnail } from 'react-bootstrap';
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

class App extends Component {
   render() {
    return (
      <BrowserRouter>
        <div className="main_App">
          <Grid>
            <Row className="show-grid">
              <Col xs={12} sm={12} md={6} lg={3} className="oneColumn">
               <Login  />
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12} sm={12} md={6} lg={3} className="oneColumn">
                <PopularLinks />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} className="oneColumn">
                <News />
              </Col>
              <Col xs={12} sm={12} md={6} lg={3} className="oneColumn">
                <Todo />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} className="oneColumn">
                <Postit />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} className="oneColumn">
                <Weather  />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} className="oneColumn">
                <StockMarket />
              </Col>
            </Row>
          </Grid>
          <div>
            {/* <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          */}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
