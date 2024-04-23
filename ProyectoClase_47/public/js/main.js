window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.querySelector(".container");

  try {
    const response = await fetch("http://localhost:3000/api/movies");
    const peliculas = await response.json();

    let data = peliculas.data;

    let favoritas = localStorage.getItem("favoritas");

    favoritas = favoritas ? JSON.parse(favoritas) : {};

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.style.cursor = "pointer";
      card.setAttribute("class", "card");

      card.addEventListener("click", () => {
        window.location.href = `/movies/update/${movie.id}`;
      });

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      const favorito = createStar(movie.id, favoritas);

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Género: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

      card.appendChild(favorito);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

function createStar(movieId, favoritas) {
  const favorito = document.createElement("i");
  favorito.id = movieId;
  favorito.classList.add("fa-star");
  favorito.classList.add("far");

  if (favoritas[movieId]) {
    favorito.classList.remove("far");
    favorito.classList.add("fas");
    favorito.style.color = "yellow";
  }

  favorito.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (favoritas[movieId]) {
      delete favoritas[movieId];
      favorito.classList.remove("fas");
      favorito.classList.add("far");
      favorito.style.color = "";
    } else {
      favoritas[movieId] = true;
      favorito.classList.remove("far");
      favorito.classList.add("fas");
      favorito.style.color = "yellow";
    }
    localStorage.setItem("favoritas", JSON.stringify(favoritas));
  });

  return favorito;
}
