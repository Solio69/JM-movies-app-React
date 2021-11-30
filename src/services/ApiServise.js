class ApiServise {
  apiKey = process.env.REACT_APP_API_KEY;
  baseStr = 'https://api.themoviedb.org/3/';
  token = JSON.parse(localStorage.getItem('guestToken'));

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
    const url = new URL(`${this.baseStr}authentication/guest_session/new`);
    url.searchParams.set('api_key', this.apiKey);

    const body = await this.requestGet(url);

    const sessionId = body.guest_session_id;
    return sessionId;
  }

  // получить список фильмов по поиску
  async getMovies(searchQuery, numberPage) {
    const url = new URL(`${this.baseStr}search/movie`);

    url.searchParams.set('api_key', this.apiKey);
    url.searchParams.set('query', searchQuery);
    url.searchParams.set('page', numberPage);

    const body = await this.requestGet(url);

    return {
      totalPages: body.total_pages,
      list: body.results,
    };
  }

  // получить список жанров
  async getGenres() {
    const url = new URL(`${this.baseStr}genre/movie/list`);
    url.searchParams.set('api_key', this.apiKey);

    const body = await this.requestGet(url);
    return body.genres;
  }

  // оценивает фильм
  async rateFilm(id, rate) {
    const url = new URL(`${this.baseStr}movie/${id}/rating`);

    url.searchParams.set('api_key', this.apiKey);
    url.searchParams.set('guest_session_id', this.token);

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
    }).catch((e) => {
      console.log(e);
    });
  }

  // удаляет оценку
  async deleteRateFilm(id) {
    const url = new URL(`${this.baseStr}movie/${id}/rating`);

    url.searchParams.set('api_key', this.apiKey);
    url.searchParams.set('guest_session_id', this.token);

    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    return await fetch(url, {
      method: 'DELETE',
      headers: headers,
    });
  }

  // получает список оцененных фильмов
  async getRatedFilms() {
    const url = new URL(`${this.baseStr}guest_session/${this.token}/rated/movies`);
    url.searchParams.set('api_key', this.apiKey);

    const body = await this.requestGet(url);

    return body;
  }
}
const apiServise = new ApiServise();

export default apiServise;
