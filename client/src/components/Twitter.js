import React, { Component } from 'react';
import '../stylesheets/Twitter.css';
import Twit from 'twit';

class Twitter extends Component {
  constructor() {
    super();
    this.getTweets = this.getTweets.bind(this);
  }

// var config = {
//       "consumerKey": "AyZQifGGCSt6TGXKTu0vs2BRG",
//       "consumerSecret": "caKG3adVopFxWBHkmHzVdyZGjDjEadphRB9A2fp6jZy4NXFQla",
//       "accessToken": "4897031386-X56H7x5i8RbtcTm491uzaSTWoD9qwiG8l2GwUHZ",
//       "accessTokenSecret": "BeIYJsve7LD1ixKZNzAnOotDHk8nSXtAcFvRXNkMpEaGu",
//       "callBackUrl": "XXX"
//     }

  getTweets() {
    var Twitter = new Twit({
      consumer_key:         'AyZQifGGCSt6TGXKTu0vs2BRG',
      consumer_secret:      'caKG3adVopFxWBHkmHzVdyZGjDjEadphRB9A2fp6jZy4NXFQla',
      access_token:         'X56H7x5i8RbtcTm491uzaSTWoD9qwiG8l2GwUHZ',
      access_token_secret:  'BeIYJsve7LD1ixKZNzAnOotDHk8nSXtAcFvRXNkMpEaGu',
      timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    })
    console.log(Twitter);
// find latest tweet according the query 'q' in params
var retweet = function() {
    var params = {
        q: '#nodejs, #Nodejs',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // // grab ID of tweet to retweet
          //   var retweetId = data.statuses[0].id_str;
          //   // Tell TWITTER to retweet
          //   Twitter.post('statuses/retweet/:id', {
          //       id: retweetId
          //   }, function(err, response) {
          //       if (response) {
          //           console.log('Retweeted!!!');
          //       }
          //       // if there was an error while tweeting
          //       if (err) {
          //           console.log('Something went wrong while RETWEETING... Duplication maybe...');
          //       }
          //   });
          console.log(data);
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
  }

// grab & retweet as soon as program is running...
retweet();

}

  render() {
    return (
      <div className="main_Twitter">
        <h1>Twitter</h1>
        <input
          type="text"
          placeholder="#follow_someone"
          ref={(input) => { this.hashTag = input; }}
        />
        <input
          type="button"
          value="Follow"
          onClick={this.getTweets}
        />
      </div>
    );
  }
}

export default Twitter;
