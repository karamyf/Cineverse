
const API_TOKEN = "4e3af7f75015280c1336c41b24e567b3";
export function getFilmsFromApiWithSearchedText (text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))

  }
  // API/TMDBApi.js
export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
  }
  
  export function getTrendingFilmsFromApi(page) {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_TOKEN}&language=fr&page=${page}`;

    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }



