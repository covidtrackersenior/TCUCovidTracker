import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import NewsItem from './NewsItem';
import {Line} from "react-chartjs-2";

const News = ({nbdate,sname,snamestate}) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const res = await Axios.get(
          `https://newsapi.org/v2/everything?qInTitle=+Covid+in+${sname}&to=${nbdate}&language=en&sortBy=relevancy&pageSize=10&apiKey=76d09548beaa47da9b51c96964e3354c`,
      );

      setArticles(res.data.articles);
      console.log(res);
    };

    getArticles();
  }, [nbdate,sname]);

  return (
      <div>
        {articles.map(({ title, description, url, urlToImage }) => (
            <NewsItem
                title={title}
                description={description}
                url={url}
                urlToImage={urlToImage}
            />
        ))}
      </div>
  );
};

export default News;