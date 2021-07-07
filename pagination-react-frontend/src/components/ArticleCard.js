import React from "react";

export default function ArticleCard({ article }) {
  return (
    <article className="card">
      <h2>{article.title}</h2>
      <img src={article.image} alt="article" />
      <p>{article.content}</p>
    </article>
  );
}
