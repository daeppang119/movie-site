const fullUrl = window.location.href;
const url = new URL(fullUrl);
const pages = document.querySelector("#pages");
const movieID = url.searchParams.get("movie_id");
// console.log(url.searchParams.get("movie_id"));

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
    .then((data) => details(data))
    .catch((err) => console.error(err));
}

function details(data) {
  // console.log(data);
  const { title, overview, poster_path } = data;

  pages.innerHTML += `
    <div class="detail">
    <img
          src="https://image.tmdb.org/t/p/w500/${poster_path}"
          alt="${title}"
        />
    <h3>${title}</h3>
    <div class="overview">
          <h4>overveiw</h4>
          ${overview}
        </div>
    </div>
  `;
}

detailPage();
