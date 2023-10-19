// const API_KEY = '32e312ca42167aa3a612c46bc67be586'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmUzMTJjYTQyMTY3YWEzYTYxMmM0NmJjNjdiZTU4NiIsInN1YiI6IjY1MmYyNTlkYTgwMjM2MDExYWM3YzBiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.njfFp-h_Xr_eveVOIyI4_exwO1zWRtnpohvfcdIqVVA'
  }
};

const searchBtnDOM = document.getElementById('searchBtn');
const cardList = document.getElementById('cardList');
const form = document.getElementById('form');
const input = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function getTopRatedMovies() {
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(renderMovies) // .then(data => renderMovies(data))
    .catch(err => console.error(err));
}

function renderMovies(data) {
  // console.log(data)
  // console.log(data.results);
  // console.log(JSON.stringify(data));
  data.results.forEach(element => {
    // console.log(element.title);

    cardList.innerHTML += `
      <div class="movieCard" onclick="alert('영화 id : ${element.id}')">
        <img src="https://image.tmdb.org/t/p/w300/${element.poster_path}" alt="">
        <div class="movieInfo">
            <h3>${element.title}</h3>
            <span class="vote_average">평점 : ${element.vote_average}%</span>
        </div>
        <div class="overview">
            <h4>overveiw</h4>
            ${element.overview}
        </div>
      </div>
    `
  });
}
// console.log('object' + "456" + '문자열더하기');
// let a = '유나';
// a += '박';
// console.log(a);

getTopRatedMovies();

input.addEventListener('keyup', (e)=>{
  e.preventDefault(); // 새로고침 방지

  if(e.key === 'Enter') {
    if(input.value !== '') {
      getTopRatedMovies();
    } else {
      location.reload();
    }
  }
})

