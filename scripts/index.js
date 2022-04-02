const API = 'https://backend-licores.herokuapp.com/productos/'
const POST_API = 'https://backend-licores.herokuapp.com/productos/'

const getApi = async () => {
  const resp = await fetch(API)
  const data = await resp.json()
  showProducts(data)
}

getApi()

const showProducts = (data) => {
  const grid = document.getElementById('main')
  grid.innerHTML = ''

  const products = data.map((product, index) => {
    return `
      <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
          <img
            src="${product.imagen}"
            alt="${product.nombre}"
            class="card-img-top"
          >
          <div class="card-body">
            <p class="card-text">${product.nombre}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                  onclick="updateProduct('${index + 1}')"
                >
                  Edit
                </button>
              </div>
              <small class="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>
    `
  })
  grid.innerHTML = products
}

const formAdd = document.getElementById('formAdd')
formAdd.addEventListener('submit', async (e) => {
  e.preventDefault()

  const product = {
    nombre: document.getElementById('nombre').value,
    presentacion: document.getElementById('presentacion').value,
    cantidad: document.getElementById('cantidad').value,
    imagen: document.getElementById('imagen').value,
  }
  console.log(product)

  createProduct(product)
})

// const

// CRUD - Create Read Update Delete


// Delete


// Update
const updateProduct =(product) => {
  const resp = await fetch(API)
  const data = await resp.json()
  console.log(data)

  const id = product


  data.find(p => {
    if(p.id === id) {
      console.log(p)
    }
  })

  // data.find((product) => product.id == index ? console.log(product) : null)

  // let getProduct = (index) => {

  // }
  //
  // const resp = await fetch(POST_API, {
  //   method: 'PUT',
  //   body: JSON.stringify(product),
  //   headers: {
  //     'Content-Type': 'application/json; charset=utf-8'
  //   }
  // })
  // const data = await resp.json()
  // console.log(product)
}


// Create
const createProduct = async (product) => {
  const resp = await fetch(POST_API, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  const data = await resp.json()
  console.log(data)
}


const openModal = document.getElementById('openModal')
openModal.addEventListener('click', (e) => {
  e.preventDefault()
  //
})

