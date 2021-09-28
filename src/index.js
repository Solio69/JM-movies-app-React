import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from '../src/components/App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);




const apiKey = '162123c84167fbeaf28191b62529a99d'
let searchQuery = 'return'
let currentPage = 1
const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${currentPage}&language=en-US`


// const getMovies = async(url)=>{
//   const res = await fetch(url)
//   if(!res.ok){
//     throw new Error(`error fetch URL ${url}, response status ${res.status}`)
//   }
//   const body = await res.json()
//   return body
// }

// getMovies(url).then((body)=>{
//   console.log(body)
// }).catch((err)=>{
//   console.error(`error fetch, ${err}`)
// })

class ApiServise{
  async getMovies(url){
      const res = await fetch(url)
      if(!res.ok){
        throw new Error(`error fetch URL ${url}, response status ${res.status}`)
      }
      const body = await res.json()
      return   body.results
  }
}

const swapi = new ApiServise();
swapi.getMovies(url).then((moviesArr)=>{
  console.log(moviesArr)
})