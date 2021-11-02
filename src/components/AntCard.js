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
    const apiCall = new ApiServise();
    const id = this.props.item.id;
    const token = this.props.token;

    if (grade === 0) {
      // если оценка 0, то отправляет запрос на удаление оенки
      apiCall.deleteRateFilm(id, token);
    } else {
      // отправляет запрос на добавление оценки
      apiCall.rateFilm(id, token, grade);
    }
  };

  // возвращает цвет блока с рейтингом
  defineRatingСolor = (num) => {
    let color;
    if (num <= 3) {
      // От 0 до 3 - #E90000
      color = '#E90000';
    } else if (num <= 5) {
      // От 3 до 5 - #E97E00
      color = '#E97E00';
    } else if (num <= 7) {
      // От 5 до 7 - #E9D100
      color = '#E9D100';
    } else if (num > 7) {
      // Выше 7 - #66E900
      color = '#66E900';
    }

    return {
      borderColor: color,
    };
  };

  render() {
    // console.log(this.state.showRating)
    const { title, poster_path, overview, release_date, genre_ids, vote_average, rating } = this.props.item;

    // rating = this.state.showRating
    // отформатированный постер
    const poster = `https://image.tmdb.org/t/p/w200/${poster_path}`;

    // сокращенный текст
    const shorOverview = this.shortenText(overview);

    // форматирование даты
    const releaseDate = release_date ? this.formatDateRelease(release_date) : null;

    // цвет блока с рейтингом
    const ratingСolor = this.defineRatingСolor(vote_average);

    // если был оценен, то передает оценку
    let onRating = rating ? rating : 0;

    // список жанров каждого конкретного фильма
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
        <div style={ratingСolor} className="ant-card-body_rating">
          {vote_average}
        </div>
        <div className="ant-card-body_title">{title}</div>
        <div className="ant-card-body_data">{releaseDate}</div>
        <div className="ant-card-body_genres">{filmGenres}</div>
        <p className="ant-card-body_text"> {shorOverview}</p>

        <div className="ant-card-body_genre-stars">
          <Rate disabled={onRating ? true : false} defaultValue={onRating} count={10} onChange={this.ratingСhanges} />
        </div>
      </Card>
    );
  }
}
