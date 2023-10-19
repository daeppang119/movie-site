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

function getTopRatedMovies(value) {
  console.log('value is : ',value);
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then((data) => {
      if(value) {
        const newData = {...data,results: data.results.filter(v => {
          return v.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        })};
        console.log(newData.results);
        //data.results = data.results.filter(v => v.title === value);
          renderMovies(newData);
        return ;
      }
      renderMovies(data);
    }) // .then(data => renderMovies(data)) // 유난미 자꿈 움직이시ㅕㅁㄴ 저도 움직여요 ㅜㅜ
    .catch(err => console.error(err));
}

function renderMovies(data) {
  // console.log(data)asdfasdfasdfasdfasdfasdfasd
  // console.log(data.results);
  // console.log(JSON.stringify(data));
  cardList.innerHTML = '';
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
      // 유나님 이거 이렇게 하면 지금 똑같은 내용을 똑같이 랜더링을 하는 거잖아요
      // 뭔가 value에 따른 조작을 해야하기 때문에
      // 그부분을 생각하셔야 할 것 같아요

      // 그런데 현재 코드에서 저라면 
      getTopRatedMovies(input.value);
    } else {
      //location.reload();
    }
  }
})

form.addEventListener('submit',(e) => e.preventDefault());