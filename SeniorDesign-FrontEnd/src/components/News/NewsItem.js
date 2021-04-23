import React from 'react';
import './newsitem.css';

const NewsItem = ({ title, description, url, urlToImage }) =>
{
    return (
        <div className="news-item">
            <img className="news-img" src={urlToImage} alt="New image"/>
            <h3>
                <a href={url}>{title}</a>
            </h3>
            <p>{description}</p>
        </div>
    )
}

export default NewsItem;
