let loc = new URLSearchParams(location.search);
let parametro = loc.get("productId");

if (!parametro) {
  console.error("Il parametro productID non è presente nell'URL");
} else {
  console.log(parametro);

  const url = "https://striveschool-api.herokuapp.com/api/product/";
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNjAxMDE4N2U1YzAwMTgxNGM3MjgiLCJpYXQiOjE3MDU2NjQ1MjgsImV4cCI6MTcwNjg3NDEyOH0.m6j18AqBGfu3uqENFWj6gDgb6LpOFg0ke6rCAt4BuvM";

  fetch(url, {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta al server");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((product) => {
        if (product._id === parametro) {
          const col = document.getElementById("card");
          col.innerHTML = `
            <div class="card">
              <img src="${product.imageUrl}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Descrizione: ${product.description}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Marca: ${product.brand}</li>
                <li class="list-group-item">Codice: ${product._id}</li>
                <li class="list-group-item">Prezzo: ${product.price}.00€</li>
              </ul>
              <div class="card-body">
              <a href="./details.html?productId=${product._id}" class="btn btn-warning mt-2" id="modifica">Modifica<i class="bi bi-pen ms-2"></i></a>
                <a href="./details.html?productId=${product._id}" class="btn btn-danger mt-2" id="elimina">Elimina<i class="bi bi-trash ms-2"></i></a>
              </div>
            </div>`;
        }
      });

      const elimina = document.getElementById("elimina");
      elimina.addEventListener("click", function (e) {
        e.preventDefault();
        fetch(url + "/" + parametro, {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        })
          .then((response) => {
            if (response.ok) {
              alert("cancellato!");
              location.assign("./index.html");
            } else {
              alert("problema nella cancellazione :(");
              throw new Error("errore nella cancellazione");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
}
