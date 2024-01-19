const cards = document.getElementById("card");
const nameProduct = document.getElementById("name");
const description = document.getElementById("description");
const brand = document.getElementById("brand");
const imageUrl = document.getElementById("imageUrl");
const price = document.getElementById("price");
const url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNjAxMDE4N2U1YzAwMTgxNGM3MjgiLCJpYXQiOjE3MDU2NjQ1MjgsImV4cCI6MTcwNjg3NDEyOH0.m6j18AqBGfu3uqENFWj6gDgb6LpOFg0ke6rCAt4BuvM";

const generateCards = function (arrayOfProducts) {
  arrayOfProducts.forEach((product) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "col-12", "col-md-6", "col-lg-4", "mt-3");
    newCol.innerHTML = `
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
    <a href="./details.html?productId=${product._id}" class="btn btn-danger mt-2">Dettagli<i class="bi bi-arrow-down-right-square ms-2"></i></a>
    </div>
  </div>`;
    cards.appendChild(newCol);
  });
};
const fetchFunction = function () {
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Riscontrato errore");
      }
    })
    .then((data) => {
      console.log(data);
      generateCards(data);
    })
    .catch((error) => {
      console.error(error.message);
    });
};
fetchFunction();
