const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  // console.log(movies);
  updateUI(movies);
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=bbdec2f8&s=" + keyword)
    .then((response) => response.json())
    .then((response) => response.Search)
    .catch((e) => console.log(e));
}

//event binding
document.addEventListener("click", async function (e) {
  // console.log(e.target);
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=bbdec2f8&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m)
    .catch((e) => console.log(e));
}

function updateUIDetail(m) {
  const movieDetail = showMovieDetail(m);
  document.querySelector(".modal-body").innerHTML = movieDetail;
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  document.querySelector(".movie-container").innerHTML = cards;
}

function showCards(m) {
  return `<div class="col-md-4 my-3">
              <div class="card">
                <img src="${m.Poster}" class="card-img-top" />
                <div class="card-body">
                  <h5 class="card-title">${m.Title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                  <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                </div>
              </div>
            </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${m.Poster}" class="img-fluid" />
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                    <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                    <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                    <li class="list-group-item"><strong>Plot : </strong><br />${m.Plot}</li>
                  </ul>
                </div>
              </div>
            </div>`;
}
