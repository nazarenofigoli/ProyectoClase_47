window.onload = async () => {
  const title = document.querySelector("#title");
  const rating = document.querySelector("#rating");
  const awards = document.querySelector("#awards");
  const release_date = document.querySelector("#release_date");
  const length = document.querySelector("#length");
  const agregar = document.querySelector(".botonAgregar");
  const editar = document.querySelector(".botonModificar");
  const eliminar = document.querySelector(".botonBorrar");
  const path = window.location.pathname;
  const movieId = path.substring(path.lastIndexOf("/") + 1);
  const inputs = document.querySelectorAll("input");

  function notEmpty(input) {
    input.addEventListener("blur", (e) => {
      if (!input.value.trim()) {
        input.style.backgroundColor = "red";
      } else {
        input.style.backgroundColor = "white";
      }
    });
  }

  inputs.forEach((input) => {
    notEmpty(input);
  });

  // Verificar si la ruta actual contiene un ID de película
  if (path.includes("update")) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/movies/${movieId}`
      );
      const data = await response.json();
      const movie = data.data;
      title.value = movie.title;
      rating.value = movie.rating;
      awards.value = movie.awards;
      release_date.value = new Date(movie.release_date)
        .toISOString()
        .split("T")[0];
      length.value = movie.length;

      editar.addEventListener("click", async (e) => {
        const updatedMovie = {
          title: title.value,
          rating: rating.value,
          awards: awards.value,
          release_date: release_date.value,
          length: length.value,
        };

        const response = await fetch(
          `http://localhost:3000/api/movies/update/${movieId}`,
          {
            method: "PUT",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify(updatedMovie),
          }
        );

        if (response.ok) {
          location.href = `/`;
          console.log("Pelicula Actualizada");
        } else {
          console.error("Error al actualizar Pelicula:", response.status);
        }
      });
    } catch (error) {
      console.log("Error:", error);
    }

    console.log(location);
  }

  if (path.includes("add")) {
    try {
      agregar.addEventListener("click", async (e) => {
        const movie = {
          title: title.value,
          rating: rating.value,
          awards: awards.value,
          release_date: release_date.value,
          length: length.value,
        };

        const response = await fetch(
          "http://localhost:3000/api/movies/create",
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify(movie),
          }
        );

        if (response.ok) {
          location.href = `/`;
          console.log("Pelicula Agregada!");
        } else {
          console.log("Error al agregar Pelicula");
        }
      });
    } catch (error) {}
  }

  eliminar.addEventListener("click", async (e) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/movies/delete/${movieId}`,
        {
          method: "DELETE",
          headers: {
            "content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        location.href = `/`;
        console.log("Pelicula Eliminada");
      } else {
        console.error("Error al eliminar Pelicula:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  });
};
