import React, { Component } from 'react';
import '../stylesheets/Todo.css';
import axios from 'axios';
import {Button, Glyphicon} from 'react-bootstrap';
import $ from 'jquery';
import alertify from 'alertify.js';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import request from 'request';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    }
    this.moreInfo = this.moreInfo.bind(this);
    this.defineWord = this.defineWord.bind(this);
  }

  componentDidMount() {
    var url = "https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=test&apikey=IisfAgxSFUYAYApg33kEGpgnlJhsiFcO";
    axios.get(url)
    .then(res => {
      console.log(res);
    })
  }

  moreInfo() {
    return (
      <Popover className="aboutNewsWidget" title="About 'Weather'">
        <p>
          This widget gives you the current weather and next 5 days forecast.
        </p>
        <ul>
          <li><strong>Enter Your Zipcode</strong>: Enter your zipcode at the top, and press 'Enter'.
           It will be saved in locally the next time you visit.</li><br />
          <li><strong>Can't Read Full Summary</strong>: If the summary is too long, hover your
          mouse/trackpad on the summary, and scroll down to read full weather summary</li>
        </ul>
      </Popover>
    );
  }

  defineWord(e) {
    if (e.key === 'Enter') {
      axios.get(`https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=${this.word.value}&apikey=IisfAgxSFUYAYApg33kEGpgnlJhsiFcO`)
      .then(res => {
        res.data.results.map(result => {
          console.log(result.headword);
          console.log(result.part_of_speech);
          // console.log(result.pronunciations[0].ipa);
          // console.log(result.pronunciations[0].audio[0].lang);
          // console.log(result.pronunciations[0].audio[0].url);
          // console.log(result.pronunciations[0].audio[1].lang);
          // console.log(result.pronunciations[0].audio[1].url);
          console.log(result.senses[0].definition[0]);
          console.log(result.senses[0].examples[0].text);
          console.log('/n');
        })
      })
    }
  }

  render() {
    return (
      <div className="main_Todo text-center">
        <h2 className="pull-left">
          &nbsp;
          <i className="fa fa-book" aria-hidden="true"></i>
          &nbsp;
          Dictionary
        </h2>
          <input
            className="weather-input text-center"
            type="text"
            placeholder="Enter Your Word"
            ref={(input) => { this.word = input; }}
            onKeyPress={this.defineWord}
          />
        <span className="pull-right">
          <OverlayTrigger trigger="hover" placement="top" overlay={this.moreInfo()}>
            <i className="fa fa-info-circle moreInfoBtn" aria-hidden="true"></i>
          </OverlayTrigger>
        </span>
        <br />
    </div>
    );
  }
}

export default Todo;
