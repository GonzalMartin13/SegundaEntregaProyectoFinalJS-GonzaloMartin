const lineasProductos = [ {
    nombre:'Juego de living',
    parrafo: 'La sala de estar que siempre soñaste',
    precio: 50000,
    descripcion:'El combo consta de un sillon esquinero de 2mt x 90cm x 160cm, mesa ratonera de 80cm x 60cm y 3 almohadones decorativos.',
    imgURL:"./Assets/IMG/Living.jpg",
    codigo: "Liv13",
    cantidad: 5,
},
{   nombre:'Dormitorio',
    parrafo: 'Descansa como se debe',
    precio: 75000,
    descripcion:'El juego de dormitorio trae un sommier de 1.40cm X 1.90cm (dos plazas) junto a su respaldo correspondiente y dos mesas de luz de melamina',
    imgURL:'./Assets/IMG/Colchon.jpg', 
    codigo: "Dorm7",
    cantidad: 5,
},
{   nombre:'Comedor Escandinavo',
    parrafo: 'El comedor que siempre quisiste por poco dinero!',
    precio: 60000,
    descripcion:'Este set de comedor trae una mesa de vidrio con patas en madera paraiso de 1.60cm X 80cm junto a seis sillas tapizadas con patas en paraiso',
    imgURL:'./Assets/IMG/Comedor.jpg', 
    codigo: "Com20",
    cantidad: 5,
}
];

const chango = [];

const botonCliente = document.getElementById("BotonCliente");
const divCartas = document.getElementById("CartasProds");
const changuito = document.getElementById("chango");



const renderProds = (lineas, target) => {
    divCartas.className = "BienvenidaCartas d-flex text-center justify-content-center align-items-center";
    divCartas.style = "border: black 5px solid";
    
    let acumulador = '';
    lineas.map(producto => {
        acumulador += `
        <div class=" col-4 m-2" style="width: 18rem" ;>
            <div class="card-body m-4">
                <h5 class=" m-2 card-title">${producto.nombre}</h5>
                <h6 class="card-subtitle mb-3 text-muted">${producto.parrafo}</h6>
                <img src=${producto.imgURL} width="100" height="175" class="card-img-top" alt="${producto.nombre}">
                <p class="mt-2 card-text">${producto.descripcion} </br> Precio: $${producto.precio}.</p>
                <button ref=${producto.codigo} class="boton_venta BP btn btn-secondary my-2 col-md-3" id=${`botonCarta` + producto.nombre} > Agregar al carrito</button>
            </div>
        </div>   
        `
    })

    target.innerHTML = acumulador;

    const botonesCompra = document.querySelectorAll(".BP");
    botonesCompra.forEach(button => button.addEventListener("click", handleClick));    
}

const renderChango = (lineas, target) => {
    let acumulador = '';
    lineas.map(producto => {
        acumulador += `
        <div class=" col-4 m-2" style="width: 18rem" ;>
            <div class="card-body m-4">
                <h5 class=" m-2 card-title">${producto.nombre}</h5>
                <img src=${producto.imgURL} width="100" height="175" class="card-img-top" alt="${producto.nombre}">
                <p class="mt-2 card-text"> Cantidad selecionada: ${producto.vendido} </br> Precio: $${producto.precio}.</p>
                <button ref=${producto.codigo} class="boton_venta BCA btn btn-secondary my-2 col-md-3" id="botonCarroAgregar" > Agregar uno mas </button>
                <button ref=${producto.codigo} class="boton_venta BCQ btn btn-secondary my-2 col-md-3" id="botonCarroQuitar" > Quitar uno </button>
            </div>
        </div>   
        `
    })

    target.innerHTML = acumulador;   
}

const handleClick = (event) => {
    const cod = event.target.getAttribute("ref");
    const code = lineasProductos.find(prod => prod.codigo === cod);
    if (chango.some(compra => compra.codigo === code.codigo)) {
        const posicion = chango.findIndex(el => el.codigo === code.codigo)
        chango[posicion].vendido = chango[posicion].vendido + 1 ;
        } else {
            chango.push({
                codigo:code.codigo,
                nombre: code.nombre,
                precio: code.precio,
                imgURL: code.imgURL,
                vendido: code.vendido, 
                })
            }
        
        renderChango (chango, changuito);
}

function guardarCarroSS(carro) {
    sessionStorage.setItem("carrito de compras", JSON.stringify(carro));
}

function recuperarCarroSS(carro) {
    return JSON.parse(sessionStorage.getItem("carrito de compras")) || [];
}
botonCliente.onclick = () => { renderProds(lineasProductos, divCartas)};















