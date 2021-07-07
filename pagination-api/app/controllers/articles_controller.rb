class ArticlesController < ApplicationController
    def index
        
        articles = Article.page(params[:page]).per(params[:limit])
        total_pages = articles.total_pages
        render json: {articles: articles, last_page: total_pages }
    end

end
