export default class ApiServise {
  apiKey = '162123c84167fbeaf28191b62529a99d';
  baseStr = 'https://api.themoviedb.org/3/';

  // шаблон GET запроса
  requestGet = (url) => {
    return fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error(`error fetch URL ${url}, response status ${res.status}`);
      }
      return res.json();
    });
  };

  // гостевая сессия
  async creatGuestSession() {
    const url = `${this.baseStr}authentication/guest_session/new?api_key=${this.apiKey}`;

    const body = await this.requestGet(url);
    // console.log(body)
    const sessionId = body.guest_session_id;
    return sessionId;
  }

  // получить список фильмов по поиску
  async getMovies(searchQuery, numberPage) {
    const url = `${this.baseStr}search/movie?api_key=${this.apiKey}&query=${searchQuery}&page=${numberPage}`;

    const body = await this.requestGet(url);

    return {
      totalPages: body.total_pages,
      list: body.results,
    };
  }

  // получить список жанров
  async getGenres() {
    const url = `${this.baseStr}genre/movie/list?api_key=${this.apiKey}`;
    const body = await this.requestGet(url);
    return body.genres;
  }

  // оценивает фильм
  async rateFilm(id, token, rate) {
    const url = `${this.baseStr}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${token}`;

    const body = {
      value: rate,
    };
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    });
  }

  // удаляет оценку
  async deleteRateFilm(id, token) {
    const url = `${this.baseStr}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${token}`;

    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    return await fetch(url, {
      method: 'DELETE',
      headers: headers,
    });
  }

  // получает список оцененных фильмов
  async getRatedFilms(token) {
    const url = `${this.baseStr}guest_session/${token}/rated/movies?api_key=${this.apiKey}`;

    const body = await this.requestGet(url);

    return body;
  }
}
