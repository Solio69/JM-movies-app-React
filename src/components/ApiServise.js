export default class ApiServise {
  apiKey = '162123c84167fbeaf28191b62529a99d';

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
}
