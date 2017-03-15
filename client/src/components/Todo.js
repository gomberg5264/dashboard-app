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
      words: []
    }
    this.moreInfo = this.moreInfo.bind(this);
    this.defineWord = this.defineWord.bind(this);
    this.showDictionary = this.showDictionary.bind(this);
    this.wordExample = this.wordExample.bind(this);
    this.wordPronunciation = this.wordPronunciation.bind(this);
  }

  componentDidMount() {
    axios.get(`https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=life&apikey=IisfAgxSFUYAYApg33kEGpgnlJhsiFcO`)
      .then(res => {
        var words = [];
        // retreive all the data from the api
        res.data.results.map(result => {
          var word = {};
          if (result.headword)
            word.keyword = result.headword;
          if (result.part_of_speech)
            word.preposition = result.part_of_speech;
          if (result.senses !== undefined)
            word.definition = result.senses[0].definition[0];
          if (result.senses !== undefined && result.senses[0].examples !== undefined)
            word.example = result.senses[0].examples[0].text;
          if (result.pronunciations)
            word.pronunciation = result.pronunciations[0].ipa;
          words.push(word);

          // udpate the state with new word search
          this.setState({
            words
          })
          this.word.value = null;
        })
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
        var words = [];
        // retreive all the data from the api
        res.data.results.map(result => {
          var word = {};
          if (result.headword)
            word.keyword = result.headword;
          if (result.part_of_speech)
            word.preposition = result.part_of_speech;
          if (result.senses !== undefined)
            word.definition = result.senses[0].definition[0];
          if (result.senses !== undefined && result.senses[0].examples !== undefined)
            word.example = result.senses[0].examples[0].text;
          if (result.pronunciations)
            word.pronunciation = result.pronunciations[0].ipa;
          words.push(word);

          // udpate the state with new word search
          this.setState({
            words
          })
          this.word.value = null;
        })
      })
    }
  }

  // return the example if exist
  wordExample(example) {
    if (example) {
      return(
        <div className="word-example"><h4>Example:</h4> {example}</div>
      )
    }
  }

  // return the pronuncation if exist
  wordPronunciation(pronunciation) {
    if (pronunciation) {
      return(
        <span>, pronunciation: '{pronunciation}'</span>
      )
    }
  }

  showDictionary() {
    if (this.state.words) {
      return (
        this.state.words.map(word => (
          <li className="word-one-definition">
            <div className="word-keyword">{word.keyword}</div>
            <div className="word-one-definition-details">
              <div className="word-preposition">
                {word.preposition} {this.wordPronunciation(word.pronunciation)}
              </div>
              <div className="word-definition"><h4>Definition:</h4> {word.definition}</div>
              {this.wordExample(word.example)}
            </div>
          </li>
          ))
        )
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
        <ol className="pull-left dictionary-details">
          {this.showDictionary()}
        </ol>
    </div>
    );
  }
}

export default Todo;
