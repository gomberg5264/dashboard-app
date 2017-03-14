import React, { Component } from 'react';
import '../stylesheets/News.css';
import axios from 'axios';
import apiKeys from '../config.js';
import the_next_web_logo from '../images/the_next_web_logo.png';
import moment from 'moment';
import {Popover, OverlayTrigger} from 'react-bootstrap';

class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: []
    }
    this.showLatestNews = this.showLatestNews.bind(this);
    this.timeConvert = this.timeConvert.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
  }

  componentDidMount() {
    // axios.get(`https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=84c64f8b7b9b43a39644758899bb99b6`)
    axios.get(`https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=${apiKeys.newsAPI}`)
    .then((res) => {
      this.setState({
        articles: res.data.articles
      })
      // console.log(res.data.articles);
    })
  }

  timeConvert (time) {
    // convert time from utc to user's local time
    // and make it easily human readible
    time = time.replace("T", ' ');
    time = time.replace("Z", ' ');
    var date = new Date(`${time} UTC`);
    date = moment(date).calendar();
    return date.toString();
  }

  showLatestNews() {
    if (this.state.articles.length > 0) {
      return (
        this.state.articles.map((article) => (
          <div className="one_article">
            <a href={article.url} target="_blank">
              <img className="pull-left news-image" src={article.urlToImage} height="83px" width="100px"/>
              <h4 className="header">{article.title}</h4>
            </a>
            <span className="pull-left">By {article.author}</span>
            <span className="publishTime pull-right">{this.timeConvert(article.publishedAt)}</span>
            <br />
          </div>
          )
        )
      )
    }
  }

  moreInfo() {
    return (
      <Popover className="aboutNewsWidget" title="About 'Tech News'">
        <p>
          This widget gives you the top 10 tech news updated several times a day.
        </p>
        <ul>
          <li>
            <strong>View More</strong>: Scroll down with your mouse/trackpad to view the rest of the news feed.
          </li><br />
          <li>
            <strong>Read Full News</strong>: Click on the news title you like, it'll open a new tab
            that has full news.
          </li>
        </ul>
      </Popover>
    );
  }

  render() {
    return (
      <div className="main_News">
        <h2>
          &nbsp;
          <i className="fa fa-newspaper-o" aria-hidden="true"></i>
          &nbsp;
          Tech News
          <span className="pull-right poweredBy">
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo()}>
              <i className="fa fa-info-circle moreInfoBtn" aria-hidden="true"></i>
            </OverlayTrigger>
          </span>
        </h2>
        <ul className="all-news">
          {this.showLatestNews()}
        </ul>
        <br />
      </div>
    );
  }
}

export default News;
