/* eslint-disable */
import React, { Component } from 'react';
import '../stylesheets/Todo.css';
import axios from 'axios';
import {Popover, OverlayTrigger} from 'react-bootstrap';

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
        res.data.results.forEach(result => {
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
      <Popover id="dictionary widget" className="aboutNewsWidget" title="About 'Dictionary'">
        <p>
          This widget lets you search for Engish words.
          It gives you definition, example, preposition, and pronunciation of the word.
        </p>
        <ul>
          <li><strong>Search A Word</strong>: Enter the word at the top, and press 'Enter'.
           You'll see a list of words related to the searched word. Scroll down to see them all.
           </li>
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
        res.data.results.forEach(result => {
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
        this.state.words.map((word, idx) => (
          <li className="word-one-definition" key={idx}>
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
            placeholder="Enter A Word"
            ref={(input) => { this.word = input; }}
            onKeyPress={this.defineWord}
          />
        <span className="pull-right">
          <OverlayTrigger placement="top" overlay={this.moreInfo()}>
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
