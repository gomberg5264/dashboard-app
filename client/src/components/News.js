import React, { Component } from 'react';
import '../stylesheets/News.css';
import axios from 'axios';
import apiKeys from '../config.js';
import the_next_web_logo from '../images/the_next_web_logo.png';
import moment from 'moment';

class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: []
    }
    this.showLatestNews = this.showLatestNews.bind(this);
    this.timeConvert = this.timeConvert.bind(this);
  }

  componentDidMount() {
    axios.get(`https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=${apiKeys.newsAPI}`)
    .then((res) => {
      this.setState({
        articles: res.data.articles
      })
      // console.log(res.data.articles);
    })
  }

  timeConvert (time) {
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

  render() {
    return (
      <div className="main_News">
        <h2>
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
