const baseDeDatos = [
    {
        id: 1,
        nombre: 'Cheesecake Clasico',
        precio: 4400,
    },
    {
        id: 2,
        nombre: 'Cheesecake DDL',
        precio: 3960,
    },
    {
        id: 3,
        nombre: 'Marquise',
        precio: 4990,
    },
    {
        id: 4,
        nombre: 'Key Lemon Pie',
        precio: 4180,
    },
    {
        id: 5,
        nombre: 'Havannet',
        precio: 3960,
    },
    {
        id: 6,
        nombre: 'Carrot Cake',
        precio: 5500,
    },
    {
        id: 7,
        nombre: 'Choco-Vegan',
        precio: 5830,
    },
    {
        id: 8,
        nombre: 'Limon y Chia',
        precio: 5280,
    },
    {
        id: 9,
        nombre: 'Red Velvet',
        precio: 5500,
    },
    {
        id: 10,
        nombre: 'Letter / Number Cake',
        precio: 5500,
    },
    {
        id: 11,
        nombre: 'Alfajores Blancos',
        precio: 2800,
    },
    {
        id: 12,
        nombre: 'Alfajores Negros',
        precio: 2700,
    },
    {
        id: 13,
        nombre: 'Alfajores con Leche',
        precio: 2940,
    },
    {
        id: 14,
        nombre: 'Alfajores de Maicena',
        precio: 2700,
    },
    {
        id: 15,
        nombre: 'Mix Alfajores',
        precio: 2910,
    },
    ];

let carrito = [];
let divisa = '$'

const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonFinalizar = document.querySelector('#boton-finalizar');

function renderizarCarrito() {

    DOMcarrito.textContent = '';
    carrito = JSON.parse(sessionStorage.getItem("carrito"));
    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa}${miItem[0].precio}`;

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn','rounded-5','btn-dark', 'mx-2');
        miBoton.textContent = 'x';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    DOMtotal.textContent = calcularTotal();
}

function borrarItemCarrito(producto) {
    const id = producto.target.dataset.item;
    let buff = JSON.parse(sessionStorage.getItem("carrito"));
    if (buff != null) {
        carrito = buff
    }
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}


function vaciarCarrito() {
    carrito = [];
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

function finalizarCompra() {
    vaciarCarrito()
    alert("¡Su compra ha sido realizada con exito!")
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonFinalizar.addEventListener('click', finalizarCompra);

renderizarCarrito();