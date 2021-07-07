import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";

const API = "http://localhost:3001";

class Pagination extends Component {
  state = {
    page: 1,
    articles: [],
    lastPage: 10,
  };

  componentDidMount() {
    const { page } = this.state;
    this.fetchArticles(page);
  }

  fetchArticles = (page) => {
    fetch(API + `/articles?page=${page}&limit=${4}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        this.setState({
          articles: data.articles,
          page,
          lastPage: data.last_page,
        });
      });
  };

  displayArticles = () => {
    return this.state.articles.map((article) => (
      <ArticleCard key={article.id} article={article} />
    ));
  };

  handleButtonClick = (page) => {
    this.fetchArticles(page);
  };

  render() {
    const { page, lastPage } = this.state;

    return (
      <>
        <div className="cards-container">{this.displayArticles()}</div>
        <button
          id="leftArrow"
          className={page <= 1 ? "disabled leftArrow" : "leftArrow"}
          onClick={() => this.handleButtonClick(page - 1)}
        >
          &larr;
        </button>
        <button
          id="rightArrow"
          className={page >= lastPage ? "disabled rightArrow" : "rightArrow"}
          onClick={() => this.handleButtonClick(page + 1)}
        >
          &rarr;
        </button>
      </>
    );
  }
}

export default Pagination;
