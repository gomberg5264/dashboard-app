import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Button, Input, Modal, ButtonToolbar, Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import axios from 'axios';
import './stylesheets/App.css';
import About from './components/About';
import NotFound from './components/NotFound';
import Todo from './components/Todo';
import Twitter from './components/Twitter';
import WitAI from './components/WitAI';
import Postit from './components/Postit';
import Weather from './components/Weather';
import StockMarket from './components/StockMarket';

class App extends Component {
  componentDidMount() {
    axios.get('/user')
    .then((response) => {
      // console.log(response);
    })
    .catch((err) => { console.error(err); });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="main_App">
          <Grid>
            <Row className="show-grid">
              <Col xs={6} md={3}><code>&lt;{'Col xs={6} md={3}'} /&gt;</code>
                <Twitter />
              </Col>
              <Col xs={6} md={6}><code>&lt;{'Col xs={6} md={6}'} /&gt;</code>
                <WitAI />
              </Col>
              <Col xsHidden md={3}><code>&lt;{'Col xsHidden md={3}'} /&gt;</code>
                <Todo />
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
                <Postit />
              </Col>
              <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
                <Weather />
              </Col>
              <Col xsHidden md={4}><code>&lt;{'Col xsHidden md={4}'} /&gt;</code>
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
