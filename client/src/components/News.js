import React, { Component } from 'react';
import '../stylesheets/News.css';
import axios from 'axios';

class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: []
    }
    this.showLatestNews = this.showLatestNews.bind(this);
  }

  componentDidMount() {
    axios.get(`https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=84c64f8b7b9b43a39644758899bb99b6`)
    .then((res) => {
      this.setState({
        articles: res.data.articles
      })
      console.log(res.data.articles);
    })
  }

  showLatestNews() {
    if (this.state.articles.length > 0) {
      return (
        this.state.articles.map((article) => (
          <a href={article.url} target="_blank">
            <h4>{article.title}</h4>
            <img src={article.urlToImage} height="150px" width="300px"/>
            <li>{article.description}</li>
          </a>
          )
        )
      )
      // this.state.articles.map((el) => {
      //   console.log(el);
      // })
    }
  }

  render() {
    return (
      <div className="main_News">
        <h1>Latest News</h1>
        <ul>
          {this.showLatestNews()}
        </ul>
        <br />
      </div>
    );
  }
}

export default News;
