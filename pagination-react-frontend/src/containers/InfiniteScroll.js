import React, { Component } from "react";
import ArticleCard from "../components/ArticleCard";

const API = "http://localhost:3001";

class InfiniteScroll extends Component {
  state = {
    page: 0,
    articles: [],
    lastPage: 10,
  };

  loader = React.createRef();

  componentDidMount() {
    const observer = new IntersectionObserver(this.handleNextFetch);
    if (this.loader.current) {
      observer.observe(this.loader.current);
    }
    this.setState({
      observer,
    });
  }

  displayArticles = () => {
    return this.state.articles.map((article) => (
      <ArticleCard key={article.id} article={article} />
    ));
  };

  handleNextFetch = (entities) => {
    const { page, lastPage } = this.state;
    if (entities[0].isIntersecting && page < lastPage) {
      this.fetchData(page + 1);
    }
  };

  fetchData = (page) => {
    fetch(API + `/articles?page=${page}`)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          page,
          articles: [...this.state.articles, ...data.articles],
          lastPage: data.last_page,
        });
      });
  };

  componentWillUnmount() {
    console.log("unmounting");
    this.state.observer.unobserve(this.loader);
  }

  render() {
    const { page, observer, lastPage } = this.state;
    // console.log(this.state.observer);
    return (
      <>
        <div className="cards-container">{this.displayArticles()}</div>
        {page < lastPage && (
          <div className="loading" ref={this.loader}>
            <h2>Load More</h2>
          </div>
        )}
      </>
    );
  }
}

export default InfiniteScroll;
