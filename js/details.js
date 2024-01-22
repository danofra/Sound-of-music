document.addEventListener("DOMContentLoaded", () => {
  let loc = new URLSearchParams(location.search);
  let parametro = loc.get("productId");
  if (!parametro) {
    console.error("Il parametro productID non è presente nell'URL");
  } else {
    console.log(parametro);
    const url = `https://striveschool-api.herokuapp.com/api/product/${parametro}`;
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
      .then((product) => {
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
              <a href="#" class="btn btn-warning mt-2" id="modifica">Modifica<i class="bi bi-pen ms-2"></i></a>
              <a href="#" class="btn btn-danger mt-2" id="elimina">Elimina<i class="bi bi-trash ms-2"></i></a>
            </div>
          </div>`;

        const elimina = document.getElementById("elimina");
        elimina.addEventListener("click", function (e) {
          e.preventDefault();
          fetch(url, {
            method: "DELETE",
            headers: {
              Authorization: token,
            },
          })
            .then((response) => {
              if (response.ok) {
                alert("Il prodotto è stato cancellato con successo!");
                location.assign("./index.html");
              } else {
                alert("Il prodotto non è stato cancellato con successo");
                throw new Error("errore nella cancellazione");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });

        const modifica = document.getElementById("modifica");
        modifica.addEventListener("click", (e) => {
          e.preventDefault();
          editForm(product);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    const editForm = function (product) {
      const col = document.getElementById("card");
      col.innerHTML = `
        <form id="edit-form">
          <div class="mb-3">
            <label for="productname" class="form-label">Inserisci il Nome prodotto</label>
            <input type="text" class="form-control" id="productname" value="${product.name}" required />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Inserisci la Descrizione dell'articolo</label>
            <input type="text" class="form-control" id="description" value="${product.description}" required />
          </div>
          <div class="mb-3">
            <label for="brand" class="form-label">Inserisci la marca dell'articolo</label>
            <input type="text" class="form-control" id="brand" value="${product.brand}" required />
          </div>
          <div class="mb-3">
            <label for="imageSrc" class="form-label">Inserisci la Sorgente dell'immagine ...jpeg,png</label>
            <input type="text" class="form-control" id="imageSrc" value="${product.imageUrl}" required />
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Inserisci il prezzo dell'articolo</label>
            <input type="number" class="form-control" id="price" value="${product.price}" required />
          </div>
          <button type="submit" class="btn btn-primary">Salva</button>
        </form>`;

      const editFormElement = document.getElementById("edit-form");
      editFormElement.addEventListener("submit", async (e) => {
        e.preventDefault();
        const productName = document.getElementById("productname").value;
        const description = document.getElementById("description").value;
        const brand = document.getElementById("brand").value;
        const img = document.getElementById("imageSrc").value;
        const price = document.getElementById("price").value;

        const newProduct = {
          name: productName,
          description: description,
          brand: brand,
          imageUrl: img,
          price: price,
        };

        try {
          const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(newProduct),
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const updatedProduct = await response.json();
            console.log(updatedProduct);
            alert("Prodotto modificato con successo!");
            location.assign("./details.html?productId=" + product._id);
          } else {
            throw new Error("Errore nella richiesta al server");
          }
        } catch (error) {
          console.error(error);
        }
      });
    };
  }
});
