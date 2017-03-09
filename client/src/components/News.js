import React, { Component } from 'react';
import '../stylesheets/News.css';
import axios from 'axios';
import apiKeys from '../config.js';

class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: []
    }
    this.showLatestNews = this.showLatestNews.bind(this);
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

  showLatestNews() {
    if (this.state.articles.length > 0) {
      return (
        this.state.articles.map((article) => (
          <div className="one_article">
            <a href={article.url} target="_blank">
              <img className="pull-left" src={article.urlToImage} height="65px" width="100px"/>
              <h4 className="header">{article.title}</h4>
            </a>
            <br />
          </div>
          )
        )
      )
    }
  }

  render() {
    return (
      <div className="main_News text-center">
        <h2>Latest News
        <span className="pull-right updated">Updated: </span>
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
