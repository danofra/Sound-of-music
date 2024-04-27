const form = document.getElementById("product-form");
const nameProduct = document.getElementById("name");
const description = document.getElementById("description");
const brand = document.getElementById("brand");
const imageUrl = document.getElementById("imageUrl");
const price = document.getElementById("price");
const invia = document.getElementById("invia");
const url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJjNTJmMjMzNzk3OTAwMTlhNjcyMzkiLCJpYXQiOjE3MTQxODA4NTAsImV4cCI6MTcxNTM5MDQ1MH0.FHAWvAUKvnGsdtILksmo4lmFqVxiVBeqT2zEkHPrcsU";

const fetchFunction = function () {
  const productData = {
    name: nameProduct.value,
    description: description.value,
    brand: brand.value,
    imageUrl: imageUrl.value,
    price: price.value,
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(productData),
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
    })
    .catch((error) => {
      console.error(error.message);
    });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchFunction();
});
