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
              <img className="pull-left" src={article.urlToImage} height="80px" width="100px"/>
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
      <Popover className="aboutNewsWidget" title="About 'Top Tech News'">
        <p>
          This widget gives you the top 10 latest tech news. You can click on a
          title that you like, and it will take you to the news page, where you can
          read the full news. It refreshes automatically several times a day.
        </p>
        <p>
          Scroll down with your mouse to view the rest of the news feed.
        </p>
      </Popover>
    );
  }

  render() {
    return (
      <div className="main_News">
        <h2>
        <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo()}>
          <i className="fa fa-info-circle moreInfoBtn" aria-hidden="true"></i>
        </OverlayTrigger>
          &nbsp;
          Top Tech News
          <span className="pull-right poweredBy">
            Powered By:&nbsp;
            <img src={the_next_web_logo} height="30px" width="80px" alt="logo"/>
          </span>
        </h2>
        <hr />
        <ul>
          {this.showLatestNews()}
        </ul>
        <br />
      </div>
    );
  }
}

export default News;
