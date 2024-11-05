const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.cardCoffe');

  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;

  // Se obtiene la URL de la imagen desde el estilo
  const itemImage = item.querySelector('.cover').style.backgroundImage;
  const itemImageUrl = itemImage.slice(5, -2); // Extrae la URL entre "url()"

  // Pasa itemImageUrl a la función
  addItemToShoppingCart(itemTitle, itemPrice, itemImageUrl);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
      elementQuantity.value++; // Incrementa la cantidad
      $('.toast').toast('show');

      // Actualiza el precio de ese artículo en específico
      const shoppingCartItemPriceElement = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemPrice');
      const originalPrice = parseFloat(itemPrice.replace('$', '').replace(' COP', '').trim());
      const newQuantity = parseInt(elementQuantity.value);
      const newItemTotalPrice = originalPrice * newQuantity; // Calcula el nuevo precio total

      // Actualiza el precio mostrado del artículo
      shoppingCartItemPriceElement.textContent = `$${newItemTotalPrice.toFixed(0)} COP`;
      updateShoppingCartTotal(); // Actualiza el total del carrito
      return;
    }
  }

  // Código para agregar un nuevo artículo al carrito
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
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  const shoppingCartItem = input.closest('.shoppingCartItem'); // Encuentra el contenedor del producto
  const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');

  // Obtiene el precio del artículo original
  const itemPriceText = shoppingCartItemPriceElement.dataset.originalPrice; // Usar un atributo de datos para el precio original
  const itemPrice = Number(itemPriceText); // Convierte a número

  // Se asegura de que la cantidad ingresada sea un número
  let shoppingCartItemQuantity = Number(input.value);

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

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

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

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}

function toggleCardInput() {
  const paymentMethod = document.getElementById('paymentMethod').value;
  const cardInfo = document.getElementById('cardInfo');
  cardInfo.style.display = (paymentMethod === 'tarjeta') ? 'block' : 'none';
}


function completePurchase() {
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

  // Validación de campos requeridos
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

  if (valid) {
      // Generación de número de pedido aleatorio
      const orderNumber = Math.floor(Math.random() * 1000000);
      document.getElementById('textoPedido').innerHTML = `
          <p>Su compra se ha completado. Número de pedido: ${orderNumber}</p>
          <p><a href="./HTML/orderTracking.html">Rastrea tu pedido aquí.</a></p>
      `;
      // Limpiar formulario
      document.getElementById('purchaseForm').reset();
      toggleCardInput(); // Ocultar información de tarjeta
  }
}
