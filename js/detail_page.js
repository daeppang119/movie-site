const fullUrl = window.location.href;
const url = new URL(fullUrl);
const pages = document.querySelector("#pages");
const movieID = url.searchParams.get("movie_id");
// console.log(url.searchParams.get("movie_id"));

const commentForm = document.querySelector("#commentForm");
const comments = document.querySelector("#comments");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmUzMTJjYTQyMTY3YWEzYTYxMmM0NmJjNjdiZTU4NiIsInN1YiI6IjY1MmYyNTlkYTgwMjM2MDExYWM3YzBiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.njfFp-h_Xr_eveVOIyI4_exwO1zWRtnpohvfcdIqVVA"
  }
};

function detailPage() {
  fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, options)
    .then((response) => response.json())
    .then((data) => movieDetails(data))
    .catch((err) => console.error(err));
}

function movieDetails(data) {
  // console.log(data);
  let capRan = data.original_language.toUpperCase();
  let genresArray = data.genres[0].name;
  let genresArray2 = data.genres[1].name;

  // console.log(genresArray);
  // console.log(genresArray2);
  const {
    title,
    overview,
    poster_path,
    runtime,
    vote_average,
    vote_count,
    tagline,
    status,
    release_date,
    genres,
    original_language,
    homepage,
    adult
  } = data;

  pages.innerHTML = `
  <div class="detail_wrap">
    <div class="img_back">
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}"/>
    </div>
    <div class="totalBox">
        <div class="titleVote">
          <div class="detail_title">${title}</div>
          <div class="vote">⭐${vote_average}(${vote_count} voted)</div>
          <div class="ran">${capRan}</div>
        </div>

        <div class="tagline">"${tagline}"</div>
        <div class="overview">
          ${overview}
        </div>
        <ul class="detail_bottom">
          <li class="hp"><a href=${homepage} target=_blank>${homepage}</a></li>
          <li>${release_date}</li>
          <li>${genresArray}/${genresArray2}</li >
          <li class="runtime">${runtime} min</li>
        </ul >
    </div >   
  </div >
  `;
}

detailPage();

// 댓글기능
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nicknameInput = commentForm.nickname;
  const commentInput = commentForm.comment;
  const passwordInput = commentForm.password;

  console.log(nicknameInput.value);
  console.log(commentInput.value);
  console.log(passwordInput.value);

  comments.innerHTML += `
    <li>
      <div>
        <p>${nicknameInput.value}</p>
      </div>
      <div>
        ${commentInput.value}
      </div>
    </li>
  `;

  // localStorage 데이터 저장
  const key = localStorage.length + 1;
  const value = {
    nickname: nicknameInput.value,
    comment: commentInput.value,
    password: passwordInput.value
  };

  localStorage.setItem(key, JSON.stringify(value));
  // JSON.stringify - 객체를 문자열로 바꾸기

  nicknameInput.value = "";
  commentInput.value = "";
  passwordInput.value = "";
});

// localStorage 데이터 불러오기
const localData = JSON.parse(localStorage.getItem("key"));

console.log(localData);
