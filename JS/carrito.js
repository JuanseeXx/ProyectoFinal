// Selecciona todos los botones con la clase "addToCart" (botones para agregar al carrito)
const addToShoppingCartButtons = document.querySelectorAll('.addToCart');

// Recorre cada botón y agrega un evento de clic
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked); // Asocia el evento al clic de cada botón
});

// Selecciona el botón de "Comprar" y agrega un evento de clic
const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked); // Asocia el evento al clic del botón "Comprar"

// Selecciona el contenedor donde se agregarán los productos del carrito
const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');

// Función que se ejecuta cuando se hace clic en un botón de agregar al carrito
function addToCartClicked(event) {
  const button = event.target; // Obtiene el botón clickeado
  const item = button.closest('.cardCoffe'); // Encuentra el contenedor del producto

  // Extrae el título, precio y URL de la imagen
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;

  // Se obtiene la URL de la imagen desde el estilo CSS
  const itemImage = item.querySelector('.cover').style.backgroundImage;
  const itemImageUrl = itemImage.slice(5, -2); // Extrae la URL entre "url()"

  // Llama a la función para agregar el producto al carrito
  addItemToShoppingCart(itemTitle, itemPrice, itemImageUrl);
}

// Función que agrega un producto al carrito
function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {

  // Busca si el artículo ya está en el carrito
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
      elementQuantity.value++; // Incrementa la cantidad del articulo
      $('.toast').toast('show'); // Muestra una notificación tipo toast

      // Actualiza el precio de ese artículo en específico
      const shoppingCartItemPriceElement = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemPrice');
      const originalPrice = parseFloat(itemPrice.replace('$', '').replace(' COP', '').trim());
      const newQuantity = parseInt(elementQuantity.value);
      const newItemTotalPrice = originalPrice * newQuantity; // Calcula el nuevo precio total

      // Actualiza el precio mostrado del artículo
      shoppingCartItemPriceElement.textContent = `$${newItemTotalPrice.toFixed(0)} COP`;
      updateShoppingCartTotal(); // Actualiza el total del carrito
      return; // Termina la función si el producto ya está en el carrito
    }
  }

  // Si el producto no está en el carrito, lo agrega
  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src="${itemImage}" class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice" data-original-price="${parseFloat(itemPrice.replace(/\./g, '').replace('$', '').replace(' COP', '').trim())}">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow); // Agrega el producto al contenedor del carrito

  // Agrega los eventos para eliminar el artículo y cambiar la cantidad
  shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem);
  shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);

  updateShoppingCartTotal(); // Actualiza el total del carrito
}

// Función que elimina un artículo del carrito
function removeShoppingCartItem(event) {
  const buttonClicked = event.target; // Obtiene el botón clickeado
  buttonClicked.closest('.shoppingCartItem').remove(); // Elimina el artículo del carrito
  updateShoppingCartTotal(); // Actualiza el total del carrito
}

// Función que actualiza la cantidad de un artículo en el carrito
function quantityChanged(event) {
  const input = event.target; // Obtiene el campo de cantidad
  const shoppingCartItem = input.closest('.shoppingCartItem'); // Encuentra el contenedor del producto
  const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');

  // Obtiene el precio original 
  const itemPriceText = shoppingCartItemPriceElement.dataset.originalPrice;
  const itemPrice = Number(itemPriceText); // Convierte el precio a número

  let shoppingCartItemQuantity = Number(input.value); // Se asegura de que la cantidad ingresada sea un número y la obtiene

  // Verifica que la cantidad no sea menor a 1
  if (input.value <= 0) {
    input.value = 1; // Se asegura de que no se puede reducir a menos de 1
  } else {
    shoppingCartItemQuantity = Number(input.value);
  }

  // Calcula el nuevo precio total basado en la cantidad actual
  const newItemTotalPrice = itemPrice * shoppingCartItemQuantity; // Usa el valor de la cantidad
  shoppingCartItemPriceElement.textContent = `$${newItemTotalPrice.toFixed(0)} COP`; // Actualiza el precio mostrado
  updateShoppingCartTotal(); // Actualiza el total del carrito
}

// Función que actualiza el total del carrito
function updateShoppingCartTotal() {
  let total = 0; // Inicializa el total
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal'); // Obtiene el elemento para mostrar el total
  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem'); // Obtiene todos los artículos en el carrito

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
    const shoppingCartItemPriceText = shoppingCartItemPriceElement.textContent;

    // Extrae el precio como un número entero
    const shoppingCartItemPrice = parseInt(shoppingCartItemPriceText.replace('$', '').replace('COP', '').trim());

    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
    const shoppingCartItemQuantity = parseInt(shoppingCartItemQuantityElement.value);

    // Se asegura de que las cantidades sean válidas
    if (shoppingCartItemQuantity > 0) {
      total += shoppingCartItemPrice; // Solo sumamos el precio total del artículo
    }
  });

  // Muestra el total como un número entero
  shoppingCartTotal.innerHTML = `${Math.floor(total)} COP`; // Sin decimales
}

// Función que se ejecuta cuando se hace clic en el botón "Comprar"
function comprarButtonClicked() {
  // Obtiene el contenedor de detalles del carrito
  const cartDetailsContainer = document.getElementById('cartDetails');
  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem'); // Obtiene todos los artículos del carrito

  // Limpia los detalles del carrito antes de agregar nuevos
  cartDetailsContainer.innerHTML = '<h6>Detalles de la Compra:</h6>';

  let totalCompra = 0; // Inicializa el total de la compra

  // Recorre cada elemento del carrito y calcula el total para cada uno
  shoppingCartItems.forEach((item) => {
    const itemName = item.querySelector('.shoppingCartItemTitle').textContent; // Obtiene el nombre del artículo
    const itemPrice = parseFloat(item.querySelector('.shoppingCartItemPrice').dataset.originalPrice); // Obtiene el precio del artículo
    const itemQuantity = parseInt(item.querySelector('.shoppingCartItemQuantity').value); // Obtiene la cantidad del artículo

    // Calcula el total por producto y acumula en el total de la compra
    const itemTotal = itemPrice * itemQuantity;
    totalCompra += itemTotal;

    // Agrega solo el nombre y el total por cantidad de cada producto al modal
    const itemDetail = document.createElement('p');
    itemDetail.textContent = `${itemName} - Cantidad: ${itemQuantity}, Precio Total: $${itemTotal.toFixed(0)} COP`;
    cartDetailsContainer.appendChild(itemDetail);
  });

  // Agrega el total de la compra al final
  const totalDetail = document.createElement('p');
  totalDetail.innerHTML = `<strong>Total de la Compra: $${totalCompra.toFixed(0)} COP</strong>`;
  cartDetailsContainer.appendChild(totalDetail);

  // Muestra el modal con el detalle de la compra
  $('#comprarModal').modal('show');
}

// Función para mostrar u ocultar los campos de tarjeta según el método de pago seleccionado
function toggleCardInput() {
  const paymentMethod = document.getElementById('paymentMethod').value;
  const cardInfo = document.getElementById('cardInfo');
  cardInfo.style.display = (paymentMethod === 'tarjeta') ? 'block' : 'none';
}

// Función para completar la compra, validando los datos ingresados por el usuario
function completePurchase() {
  // Obtención de los valores del formulario
  const nome = document.getElementById('nome').value;
  const apellidos = document.getElementById('apellidos').value;
  const telefone = document.getElementById('telefone').value;
  const cidade = document.getElementById('cidade').value;
  const direccion = document.getElementById('direccion').value;
  const paymentMethod = document.getElementById('paymentMethod').value;
  const cardNumber = document.getElementById('cardNumber').value;
  const cardName = document.getElementById('cardName').value;
  const expiryDate = document.getElementById('expiryDate').value;
  const cvv = document.getElementById('cvv').value;
  let valid = true;

  // Validación de campos requeridos, mostrando un error si falta alguno
  if (!nome) {
      document.getElementById('nameError').style.display = 'block';
      valid = false;
  } else {
      document.getElementById('nameError').style.display = 'none';
  }

  if (!apellidos) {
      document.getElementById('surnameError').style.display = 'block';
      valid = false;
  } else {
      document.getElementById('surnameError').style.display = 'none';
  }

  if (!telefone) {
      document.getElementById('phoneError').style.display = 'block';
      valid = false;
  } else {
      document.getElementById('phoneError').style.display = 'none';
  }

  if (!cidade) {
      document.getElementById('cityError').style.display = 'block';
      valid = false;
  } else {
      document.getElementById('cityError').style.display = 'none';
  }

  if (!direccion) {
      document.getElementById('addressError').style.display = 'block';
      valid = false;
  } else {
      document.getElementById('addressError').style.display = 'none';
  }

  // Validación de los campos de tarjeta si el método de pago es tarjeta
  if (paymentMethod === 'tarjeta') {
      if (!cardNumber) {
          document.getElementById('cardNumberError').style.display = 'block';
          valid = false;
      } else {
          document.getElementById('cardNumberError').style.display = 'none';
      }

      if (!cardName) {
          document.getElementById('cardNameError').style.display = 'block';
          valid = false;
      } else {
          document.getElementById('cardNameError').style.display = 'none';
      }

      if (!expiryDate) {
          document.getElementById('expiryDateError').style.display = 'block';
          valid = false;
      } else {
          document.getElementById('expiryDateError').style.display = 'none';
      }

      if (!cvv) {
          document.getElementById('cvvError').style.display = 'block';
          valid = false;
      } else {
          document.getElementById('cvvError').style.display = 'none';
      }
  }

  // Si todos los datos son válidos, completa la compra
  if (valid) {
      // Generación de número de pedido aleatorio
      const orderNumber = Math.floor(Math.random() * 1000000);
      document.getElementById('textoPedido').innerHTML = `
          <p>Su compra se ha completado. Número de pedido: ${orderNumber}</p>
          <p><a href="./HTML/orderTracking.html">Rastrea tu pedido aquí.</a></p>
      `;
      // Limpiar formulario y ocultar la información de la tarjeta
      document.getElementById('purchaseForm').reset();
      toggleCardInput();
  }
}

// Función que habilita o deshabilita el botón "Comprar" según si el carrito tiene productos
function actualizarBotonComprar() {
  const carrito = obtenerCarrito(); // Obtén el carrito actual
  const botonComprar = document.getElementById('comprarBtn'); // El botón "Comprar"

  // Habilita el botón si hay al menos un producto en el carrito, de lo contrario lo desactiva
  if (carrito.length > 0) {
    botonComprar.disabled = false;
  } else {
    botonComprar.disabled = true;
  }
}

// Actualiza el estado del botón "Comprar" al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  actualizarBotonComprar();
});

// Función para manejar el evento cuando un producto es agregado al carrito
function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.cardCoffe');

  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;

  const itemImage = item.querySelector('.cover').style.backgroundImage;
  const itemImageUrl = itemImage.slice(5, -2);

  addItemToShoppingCart(itemTitle, itemPrice, itemImageUrl);

  // Actualiza el estado del botón "Comprar" después de agregar un producto
  actualizarBotonComprar();
}

// Función para eliminar un artículo del carrito
function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();

  updateShoppingCartTotal();

  // Actualiza el estado del botón "Comprar" después de eliminar un producto
  actualizarBotonComprar();
}

// Función que actualiza el estado del botón "Comprar" según los elementos en el carrito
function actualizarBotonComprar() {
  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  const botonComprar = document.getElementById('comprarBtn');

  // Habilita el botón si hay productos en el carrito, de lo contrario lo desactiva
  botonComprar.disabled = shoppingCartItems.length === 0;
}

// Asegúrate de que el botón "Comprar" esté desactivado por defecto cuando cargue la página
document.getElementById('comprarBtn').disabled = true;

// Evento para limpiar el carrito cuando se cierra el modal
const cerrarModalBtn = document.querySelector('.modal-footer .btn-secondary');
cerrarModalBtn.addEventListener('click', limpiarCarrito);

// Función para limpiar el carrito
function limpiarCarrito() {
  shoppingCartItemsContainer.innerHTML = ''; // Elimina todos los elementos del carrito
  
  updateShoppingCartTotal(); // Actualiza el total del carrito
  actualizarBotonComprar(); // Actualiza el estado del botón "Comprar"
}
