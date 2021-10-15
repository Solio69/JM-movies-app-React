export default class ApiServise {
  async getMovies(searchQuery, numberPage) {
    const apiKey = '162123c84167fbeaf28191b62529a99d';

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${numberPage}&language=en-US`;

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
}
