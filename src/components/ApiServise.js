export default class ApiServise {
  apiKey = '162123c84167fbeaf28191b62529a99d';

  // гостевая сессия
  async creatGuestSession() {
    const url = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.apiKey}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`error fetch URL ${url}, response status ${res.status}`);
    }
    const result = await res.json();
    // console.log(result)
    const sessionId = result.guest_session_id;
    // console.log(sessionId)
    return sessionId;
  }

  // получить список фильмов по поиску
  async getMovies(searchQuery, numberPage) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${searchQuery}&page=${numberPage}&language=en-US`;

    // console.log(numberPage);
    const res = await fetch(url);
    // console.log(res.status)
    if (!res.ok) {
      throw new Error(`error fetch URL ${url}, response status ${res.status}`);
    }
    const body = await res.json();
    // console.log(body);
    return {
      totalPages: body.total_pages,
      list: body.results,
    };
    // return body.results;
  }

  // получить список жанров
  async getGenres() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`error fetch URL ${url}, response status ${res.status}`);
    }
    const body = await res.json();
    // console.log(body)
    return body.genres;
  }

  // ТЕСТ оценивает фильм
  async rateFilm(id, token) {
    const url = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${token}`;

    const body = {
      value: 8,
    };
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    }).then((res) => {
      console.log(res);
    });
  }

  // ТЕСТ получает списо оцененных фильмов
  async getRatedFilms(token) {
    const url = `https://api.themoviedb.org/3/guest_session/${token}/rated/movies?api_key=${this.apiKey}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`error fetch URL ${url}, response status ${res.status}`);
    }
    const result = await res.json();
    console.log(result);
  }
}
