const addToShoppingCartButtons = document.querySelectorAll('.btn-comprar');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('#btn-pagar');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector('#lista-carrito');

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.producto');

  const itemTitle = item.querySelector('h3').textContent;
  const itemPrice = item.dataset.precio; // Obtener el precio directamente del atributo data-precio

  const itemImage = item.querySelector('.cover').style.backgroundImage;
  const itemImageUrl = itemImage.slice(5, -2); // Extraer la URL entre "url()"

  addItemToShoppingCart(itemTitle, itemPrice, itemImageUrl);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[i].closest('.shopping-cart-quantity').querySelector('.shoppingCartItemQuantity');
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

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

  shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem);
  shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  const shoppingCartItem = input.closest('.shoppingCartItem');
  const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
  
  const itemPriceText = shoppingCartItemPriceElement.dataset.originalPrice;
  const itemPrice = Number(itemPriceText);

  let shoppingCartItemQuantity = Number(input.value);

  if (input.value <= 0) {
    input.value = 1;
  }

  const newItemTotalPrice = itemPrice * shoppingCartItemQuantity;
  shoppingCartItemPriceElement.textContent = `$${newItemTotalPrice.toFixed(0)} COP`;

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
    const shoppingCartItemPriceText = shoppingCartItemPriceElement.textContent;

    const shoppingCartItemPrice = parseInt(shoppingCartItemPriceText.replace('$', '').replace(' COP', '').trim());

    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
    const shoppingCartItemQuantity = parseInt(shoppingCartItemQuantityElement.value);

    if (shoppingCartItemQuantity > 0) {
      total += shoppingCartItemPrice * shoppingCartItemQuantity;
    }
  });

  const totalElement = document.getElementById('total');
  totalElement.textContent = `${Math.floor(total)} COP`;
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}
