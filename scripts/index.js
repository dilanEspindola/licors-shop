const API = "https://backend-licores.herokuapp.com/productos/";
const API_Categoria_Cerveza =
  "https://backend-licores.herokuapp.com/categorias/1/productos";
const API_Categoria_Wiski =
  "https://backend-licores.herokuapp.com/categorias/2/productos";
const API_Categoria_Tequila =
  "https://backend-licores.herokuapp.com/categorias/3/productos";
const API_Categoria_Vinos =
  "https://backend-licores.herokuapp.com/categorias/4/productos";

const POST_API = "https://backend-licores.herokuapp.com/productos/";

const getApi = async () => {
  const resp = await fetch(API);
  const data = await resp.json();
  showProducts(data);
  return data;
};

getApi();

const showProducts = (data) => {
  const grid = document.getElementById("main");
  grid.innerHTML += "";

  const products = data.map((product) => {
    return `
      <div class="col-12 col-md-2 col-lg-3">
        <div class="card mb-4 shadow-sm">
          <img
            src="${product.imagen}"
            alt="${product.nombre}"
            class="card-img-top"
          >
          <div class="card-body">
            <h5 class="card-title">${product.nombre}</h5>
            <p class="card-text">${product.cantidad}</p>
            <p class="card-text">${product.presentacion}</p>
            <div class="d-flex justify-content-end align-items-center">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-sm btn-success"
                  onclick="updateProduct('${product.id}')"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo"
                >
                  Editar
                </button>
                <button
                  class="btn btn-sm btn-danger"
                  onclick="deleteProduct('${product.id}')"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  grid.innerHTML = products;
};

const formAdd = document.getElementById("formAdd");
formAdd.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    nombre: document.getElementById("nombre").value,
    presentacion: document.getElementById("presentacion").value,
    cantidad: document.getElementById("cantidad").value,
    categoriaId: Number(document.getElementById("idCategoria").value),
    imagen: document.getElementById("imagen").value,
  };
  console.log(product);

  createProduct(product);
});

// const

// CRUD - Create Read Update Delete

// Delete

// Update
const updateProduct = async (product) => {
  const res = await fetch(API);
  const data = await res.json();

  const productUpdate = data.find((item) => item.id == product);
  const nombre = (document.getElementById("nombre").value =
    productUpdate.nombre);
  const presentacion = (document.getElementById("presentacion").value =
    productUpdate.presentacion);
  const cantidad = (document.getElementById("cantidad").value =
    productUpdate.cantidad);
  const imagen = (document.getElementById("imagen").value =
    productUpdate.imagen);

  const openModal = document.querySelector(".modal");
  openModal.classList.add("show");
  openModal.style.display = "block";

  document.getElementById("btnEditar").addEventListener("click", async (e) => {
    e.preventDefault();
    const product = {
      nombre: document.getElementById("nombre").value,
      presentacion: document.getElementById("presentacion").value,
      cantidad: document.getElementById("cantidad").value,
      imagen: document.getElementById("imagen").value,
    };

    try {
      await fetch(`${API}${productUpdate.id}`, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      location.reload();
      console.log("datos actualizados");
    } catch (error) {
      console.log(error);
    }
  });
};

// Create
const createProduct = async (product) => {
  try {
    await fetch(POST_API, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

const openModal = document.getElementById("openModal");
openModal.addEventListener("click", (e) => {
  e.preventDefault();
  //
});

//delete
const deleteProduct = async (id) => {
  try {
    await fetch(`${API}${id}`, {
      method: "DELETE",
    });
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

// filtrar por categoria

// filtrar por cerveza
document.getElementById("cerveza").addEventListener("click", (e) => {
  e.preventDefault();
  filterByCerveza(API_Categoria_Cerveza);
});

async function filterByCerveza(ApiCerveza) {
  const res = await fetch(ApiCerveza);
  const data = await res.json();
  showProducts(data);
}

//filtrar por wiski
document.getElementById("wiski").addEventListener("click", (e) => {
  e.preventDefault();
  filterByWiski(API_Categoria_Wiski);
});

async function filterByWiski(ApiWiski) {
  const res = await fetch(ApiWiski);
  const data = await res.json();
  showProducts(data);
}

//filtrar por tequila
document.getElementById("tequila").addEventListener("click", (e) => {
  e.preventDefault();
  filterByWiski(API_Categoria_Tequila);
});

async function filterByTequila(ApiTequila) {
  const res = await fetch(ApiTequila);
  const data = await res.json();
  showProducts(data);
}

//filtrar por vino
document.getElementById("vino").addEventListener("click", (e) => {
  e.preventDefault();
  filterByWiski(API_Categoria_Vinos);
});

async function filterByTequila(ApiVino) {
  const res = await fetch(ApiVino);
  const data = await res.json();
  showProducts(data);
}

// buscar por nombre
document.getElementById("search").addEventListener("keyup", async (e) => {
  const busqueda = e.target.value.toLowerCase();
  console.log(busqueda);
  const res = await fetch(API);
  const data = await res.json();

  const grid = document.getElementById("main");
  grid.innerHTML = "";

  data.forEach((e) => {
    if (e.nombre.toLowerCase().includes(busqueda)) {
      grid.innerHTML += `
      <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <img
          src="${e.imagen}"
          alt="${e.nombre}"
          class="card-img-top"
        >
        <div class="card-body">
          <p class="card-text">${e.nombre}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              onclick="updateProduct('${e.id}')"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
            >
              Edit
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteProduct('${e.id}')" >Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    }
  });
});
