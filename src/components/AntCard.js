import React, { Component } from 'react';

import apiServise from '../services/ApiServise';
import iconNoPoster from '.././images/no-pictures.png';

import formatDateRelease from '../utils/date.utils..js';

import { Card } from 'antd';
import { Rate } from 'antd';

export default class AntCard extends Component {
  // вовзращает список жанров каждого конкретного фильма
  movieGenreList = (genresIdsArr) => {
    const newfilmGenres = genresIdsArr.map((el) => {
      let foundGenre = this.props.genresList.find((item) => item.id === el);
      return foundGenre.name;
    });
    return newfilmGenres;
  };

  // сокращает текст описания
  shortenText = (text, maxCharacters) => {
    const strLength = text.length;
    let newText = '';

    if (strLength > maxCharacters) {
      const lastCharacter = text.substring(maxCharacters - 1, maxCharacters);
      if (lastCharacter === ' ') {
        newText = text.substring(0, maxCharacters) + '...';
        return newText;
      } else {
        let closestSpaceIndex = text.substring(0, maxCharacters).lastIndexOf(' ');
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
    if (grade === 0) {
      // если оценка 0, то отправляет запрос на удаление оценки
      apiServise.deleteRateFilm(id);
    } else {
      // отправляет запрос на добавление оценки
      apiServise.rateFilm(id, grade);
    }
    // изменяет масссив оцененных
    this.props.changeRateList();
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

  // вовращает отформатированный постер или заглушку
  showPoster = (image) => {
    if (image !== null) {
      return `https://image.tmdb.org/t/p/w200/${image}`;
    } else {
      return iconNoPoster;
    }
  };

  // проверяет есть ли фильм в оцененных
  checkMovieInRated = (id, arr, isRating) => {
    let rating = 0;
    // если rating есть
    if (isRating) {
      rating = isRating; // то возвращает его (это для компонент AntRatedContent)
    } else {
      arr.forEach((el) => {
        // ищет по id элемент в массиве оцененных фильмов
        if (el.id === id) {
          return (rating = el.rating); // если есть, то берет rating от туда
        }
      });
    }
    return rating;
  };

  render() {
    const { rateList } = this.props;

    const { title, poster_path, overview, release_date, genre_ids, vote_average, rating, id } = this.props.item;

    // оценка если фильм есть в оцененных
    let onRating = this.checkMovieInRated(id, rateList, rating);

    // отформатированный постер
    const poster = this.showPoster(poster_path);

    // сокращенный текст
    const shorOverview = this.shortenText(overview, 180);

    // сокращенный заголовок
    const shorTitle = this.shortenText(title, 30);

    // форматирование даты
    const releaseDate = release_date ? formatDateRelease(release_date) : null;

    // цвет блока с рейтингом
    const ratingСolor = this.defineRatingСolor(vote_average);

    // список жанров каждого конкретного фильма
    const genreArr = this.movieGenreList(genre_ids);

    // добавляет жанр в список жанров карточки
    const filmGenres = (
      <React.Fragment>
        {genreArr.map((genre) => {
          return (
            <span className="ant-card-body_genre-item" key={genre}>
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
        <div className="ant-card-body_title">{shorTitle}</div>
        <div className="ant-card-body_data">{releaseDate}</div>
        <div className="ant-card-body_genres">{filmGenres}</div>
        <p className="ant-card-body_text"> {shorOverview}</p>

        <div className="ant-card-body_genre-stars">
          <Rate defaultValue={onRating} count={10} onChange={this.ratingСhanges} />
        </div>
      </Card>
    );
  }
}
