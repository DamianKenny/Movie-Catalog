const movieForm = document.getElementById('movieForm');
const movieList = document.getElementById('movieList');
const searchBar = document.getElementById('searchBar');

// Movies Array (Initial Sample Data)
let movies = [
  {
    title: "Oppenheimer",
    description: "The story of J. Robert Oppenheimer.",
    image: "https://example.com/oppenheimer.jpg",
  },
  {
    title: "Moonlight",
    description: "A timeless story of self-discovery.",
    image: "https://example.com/moonlight.jpg",
  },
];

// Render Movies
function renderMovies() {
  movieList.innerHTML = "";
  movies.forEach((movie, index) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-list-item");
    movieItem.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" class="movie-list-item-image">
      <h3 class="movie-list-item-title">${movie.title}</h3>
      <p class="movie-list-item-desc">${movie.description}</p>
      <button onclick="editMovie(${index})" class="movie-list-item-button">Edit</button>
      <button onclick="deleteMovie(${index})" class="movie-list-item-button">Delete</button>
    `;
    movieList.appendChild(movieItem);
  });
}

// Add or Update Movie
movieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("movieTitle").value;
  const description = document.getElementById("movieDesc").value;
  const image = document.getElementById("movieImage").value;

  const existingIndex = movies.findIndex((movie) => movie.title === title);

  if (existingIndex >= 0) {
    // Update movie
    movies[existingIndex] = { title, description, image };
  } else {
    // Add movie
    movies.push({ title, description, image });
  }

  renderMovies();
  movieForm.reset();
});

// Delete Movie
function deleteMovie(index) {
  movies.splice(index, 1);
  renderMovies();
}

// Edit Movie
function editMovie(index) {
  const movie = movies[index];
  document.getElementById("movieTitle").value = movie.title;
  document.getElementById("movieDesc").value = movie.description;
  document.getElementById("movieImage").value = movie.image;
}

// Search Movies
searchBar.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );
  renderMovies(filteredMovies);
});

// Initial Render
renderMovies();
