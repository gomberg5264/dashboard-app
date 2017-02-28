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
          <div className="one_article">
            <a href={article.url} target="_blank">
              <h3 className="header">{article.title}</h3>
              <br />
              <img src={article.urlToImage} height="150px" width="300px"/>
              <br /><br />
              <h4><li>{article.description}</li></h4>
            </a>
            <br />
          </div>
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
      <div className="main_News text-center">
        <h2>Latest News</h2>
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
