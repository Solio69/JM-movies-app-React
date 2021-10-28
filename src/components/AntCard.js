import React, { Component } from 'react';
import { format } from 'date-fns';

import { Card } from 'antd';
import { Rate } from 'antd';

import ApiServise from './ApiServise';

export default class AntCard extends Component {
  state = {
    genresList: this.props.genresList,
  };

  // вовзращает список жанров каждого конкретного фильма
  movieGenreList = (genresIdsArr) => {
    const newfilmGenres = [];
    for (let genreId of genresIdsArr) {
      this.state.genresList.forEach((el) => {
        if (el.id === genreId) {
          newfilmGenres.push(el.name);
        }
      });
    }
    // console.log(newfilmGenres)
    return newfilmGenres;
  };

  // форматирует сроку даты выхода фильма
  formatDateRelease = (dataStr) => {
    return format(new Date(dataStr), 'MMM Q, y');
  };

  // сокращает текст описания
  shortenText = (text) => {
    const strLength = text.length;
    let newText = '';

    if (strLength > 180) {
      const lastChar = text.substring(179, 180);
      if (lastChar === ' ') {
        newText = text.substring(0, 180) + '...';
        return newText;
      } else {
        let closestSpaceIndex = text.substring(0, 180).lastIndexOf(' ');
        newText = text.substring(0, closestSpaceIndex) + '...';
        return newText;
      }
    } else {
      return text;
    }
  };

  // получает значение оценки и отправляет его на сервер
  ratingСhanges = (grade) => {
    const id = this.props.item.id;
    const token = this.props.token;

    const apiCall = new ApiServise();
    apiCall.rateFilm(id, token, grade);
  };

  render() {
    const { title, poster_path, overview, release_date, genre_ids, rating, vote_average } = this.props.item;

    const poster = `https://image.tmdb.org/t/p/w200/${poster_path}`;
    const shorOverview = this.shortenText(overview);
    const releaseDate = release_date ? this.formatDateRelease(release_date) : null;

    // если был оценен, то передает оценку
    const showRating = rating ? rating : 0;

    // получает список жанров каждогоконкретного фильма
    const genreArr = this.movieGenreList(genre_ids);
    // добавляет жанр в список жанров карточки
    const filmGenres = (
      <React.Fragment>
        {genreArr.map((genre, ind) => {
          return (
            <span className="ant-card-body_genre-item" key={ind}>
              {genre}
            </span>
          );
        })}
      </React.Fragment>
    );

    return (
      <Card className="ant-card" hoverable cover={<img alt="poster" src={poster} />}>
        <div className="ant-card-body_rating">{vote_average}</div>
        <div className="ant-card-body_title">{title}</div>
        <div className="ant-card-body_data">{releaseDate}</div>
        <div className="ant-card-body_genres">{filmGenres}</div>
        <p className="ant-card-body_text"> {shorOverview}</p>

        <div className="ant-card-body_genre-stars">
          <Rate defaultValue={showRating} count={10} onChange={this.ratingСhanges} />
        </div>
      </Card>
    );
  }
}
