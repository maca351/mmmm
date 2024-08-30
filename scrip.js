const carrito = document.getElementById('carrito');
const template = document.getElementById('template');
const footerCarrito = document.querySelector('#footerCarrito');
const templatefooterCarrito = document.querySelector('#templatefooterCarrito');
const fragment = document.createDocumentFragment();
const modalPago = document.getElementById('modalPago');
const closeModal = document.querySelector('.close');


let carritoObjeto = [];

document.addEventListener('click', (e) => {
    if (e.target.matches(".btn-agregar[data-deporte]")) {
        agregarAlCarrito(e);
    }
    if (e.target.matches(".btn-agregar[data-id]")) {
        btnAumentar(e);
        console.log("me diste click")
    };
    if (e.target.matches("#carrito .list-item .btn-quitar")) {
        btnDisminuir(e);
        console.log("me diste click")
    }
});



const agregarAlCarrito = (e) => {
    const producto = {
        titulo: e.target.dataset.deporte,
        id: e.target.dataset.deporte,
        cantidad: 1,
        price: parseInt(e.target.dataset.price)
    };

    const indice = carritoObjeto.findIndex((item) => item.id === producto.id);

    if (indice === -1) {
        carritoObjeto.push(producto);
    } else {
        carritoObjeto[indice].cantidad++;
    }

    renderCarrito();
};

const renderCarrito = () => {
    carrito.textContent = "";
    carritoObjeto.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.item-titulo').textContent = item.titulo;
        clone.querySelector('.item-cantidad').textContent = item.cantidad;
        clone.querySelector('.item-total span').textContent = item.price * item.cantidad;
        clone.querySelector('.btn-quitar').dataset.id = item.id;
        clone.querySelector('.btn-agregar').dataset.id = item.id;

        fragment.appendChild(clone);
    });
    carrito.appendChild(fragment);
    renderfooterCarrito();
};
/*
const renderfooterCarrito = () => {
    footerCarrito.textContent = "";

    const total = carritoObjeto.reduce((acc, current) => acc + current.cantidad * current.price, 0);

    const clone = templatefooterCarrito.content.cloneNode(true);
    clone.querySelector('p span').textContent = total;
    footerCarrito.appendChild(clone);
};*/
const renderfooterCarrito = () => {
    // Limpia el contenido actual del footer
    footerCarrito.textContent = "";

    // Calcula el total
    const total = carritoObjeto.reduce((acc, current) => acc + current.cantidad * current.price, 0);

    // Clona el template y actualiza el total
    const clone = templatefooterCarrito.content.firstElementChild.cloneNode(true);//lo agregué para el addEventListener

    clone.querySelector('.total-container span').textContent = total;

    // Asegúrate de que el botón esté visible y activo
    const finalizarBtn = clone.querySelector('.btn-finalizar');

    finalizarBtn.addEventListener("click", clickFinalizarCompra )
    if (total > 0) {
        finalizarBtn.disabled = false;
    } else {
        finalizarBtn.disabled = true;
    }

    // Añade el clone al DOM
    footerCarrito.appendChild(clone);
};

const btnAumentar = (e) => {
    console.log(e.target.dataset.id);
    carritoObjeto = carritoObjeto.map((item) => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++;
        }
        return item;
    });
    renderCarrito();
};


const btnDisminuir = (e) => {
    console.log(e.target.dataset.id);
    carritoObjeto = carritoObjeto.filter((item) => {
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--;
                 console.log(item);
                if (item.cantidad === 0) return;
                return item;
            }          
        } else {
            return item;
        }
    });
    renderCarrito();
};
const clickFinalizarCompra = () => {
    console.log("me diste clic finalizando compra");

    // Muestra el total en el modal
    const total = carritoObjeto.reduce((acc, current) => acc + current.cantidad * current.price, 0);
    /*document.getElementById('totalCompraMostrar').textContent = `Total: $${total}`;*/

   // Verifica si el total es mayor a 0
   if (total > 0) {
    // Muestra el total en el modal
    document.querySelector('.totalCompraMostrar').textContent = `Total para Abonar: $${total}`;
    console.log(total)

    // Asigna el total al campo oculto
   document.querySelector('input[name="totalCompra"]').value = total;
    document.getElementById('totalCompra').value = total; // Aquí es donde se asigna el valor
    
    // Verifica que el valor esté correctamente asignado
    console.log("Valor total asignado al input:", document.getElementById('totalCompra').value);
    
    // Abre el modal
    modalPago.style.display = 'flex';
} else {
    alert('El carrito está vacío.');
}
   
};
 // Cerrar el modal
 closeModal.addEventListener('click', () => {
     modalPago.style.display = 'none';
 });

 // Cerrar el modal al hacer clic fuera del contenido
 window.addEventListener('click', (e) => {
     if (e.target === modalPago) {
         modalPago.style.display = 'none';
     }
 });