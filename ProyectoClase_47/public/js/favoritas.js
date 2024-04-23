document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.classList.add("container");
  app.appendChild(container);

  try {
    const response = await fetch("http://localhost:3000/api/movies");
    const peliculas = await response.json();

    const favoritas = JSON.parse(
      localStorage.getItem("favoritas") || "{}"
    );
    const data = peliculas.data;

    let moviesFound = false;

    data.forEach((movie) => {
      if (favoritas[movie.id]) {
        moviesFound = true;
        const card = createMovieCard(movie, favoritas);
        container.appendChild(card);
      }
    });

    if (!moviesFound) {
      const noMovies = document.createElement("h2");
      noMovies.innerText = "No tienes películas favoritas.";
      container.appendChild(noMovies);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});

function createMovieCard(movie, favoritas) {
  const card = document.createElement("div");
  card.style.cursor = "pointer";
  card.classList.add("card");

  card.addEventListener("click", () => {
    window.location.href = `/movies/update/${movie.id}`;
  });

  const h1 = document.createElement("h1");
  h1.textContent = movie.title;

  const p = document.createElement("p");
  p.textContent = `Rating: ${movie.rating}`;

  const duracion = document.createElement("p");
  duracion.textContent = `Duración: ${movie.length}`;

  const favorita = document.createElement("i");
  favorita.id = movie.id;
  favorita.classList.add("fa-star");
  favorita.classList.add("far"); // Agrega la clase para un corazón vacío

  if (favoritas[movie.id]) {
    favorita.classList.remove("far"); // Remueve la clase para un corazón vacío
    favorita.classList.add("fas"); // Agrega la clase para un corazón lleno
    favorita.style.color = "yellow"; // Establece el color del icono a rojo
  }

  favorita.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (favoritas[movie.id]) {
      delete favoritas[movie.id];
      favorita.classList.remove("fas"); // Remueve la clase para un corazón lleno
      favorita.classList.add("far"); // Agrega la clase para un corazón vacío
      favorita.style.color = ""; // Restaura el color predeterminado del icono
    } else {
      favoritas[movie.id] = true;
      favorita.classList.remove("far"); // Remueve la clase para un corazón vacío
      favorita.classList.add("fas"); // Agrega la clase para un corazón lleno
      favorita.style.color = "yellow"; // Establece el color del icono a rojo
    }
    localStorage.setItem("favoritas", JSON.stringify(favoritas));
  });

  card.appendChild(h1);
  card.appendChild(p);
  if (movie.genre !== null) {
    const genero = document.createElement("p");
    genero.textContent = `Género: ${movie.genre.name}`;
    card.appendChild(genero);
  }
  card.appendChild(duracion);
  card.appendChild(favorita);

  return card;
}
