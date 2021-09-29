

const apiKey = '162123c84167fbeaf28191b62529a99d'
let searchQuery = 'return'
let currentPage = 1
const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${currentPage}&language=en-US`

export default class ApiServise{
  async getMovies(){
    const res = await fetch(url)
    if(!res.ok){
      throw new Error(`error fetch URL ${url}, response status ${res.status}`)
    }
    const body = await res.json()
    // console.log(body.results)
    return body.results
  }
}
  


