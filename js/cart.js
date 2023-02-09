/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  state.cart = new Cart(cartItems);
  state.cart.updateCounter()
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tbody = document.querySelector('tbody');
  let trs = document.querySelectorAll('tr')
  trs.forEach(tr => {
    tr.remove()
  })
}


// DONE: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // DONE: Find the table body
  let tbody = document.querySelector('tbody')
  // DONE: Iterate over the items in the cart

  for (let i = 0; i < state.cart.items.length; i++){
  // TODO: Create a TR
    let tr = document.createElement('tr');
    let productTd = document.createElement('td');
    let quantityTd = document.createElement('td');
    let removeTd = document.createElement('td');


    productTd.textContent = state.cart.items[i][0];
    quantityTd.textContent = state.cart.items[i][1];
    removeTd.textContent= 'X'

  // DONE: Create a TD for the delete link, quantity,  and the item
  // DONE: Add the TR to the TBODY and each of the TD's to the TR
    tbody.appendChild(tr)
    tr.appendChild(removeTd)
    tr.appendChild(quantityTd)
    tr.appendChild(productTd)
  }

  
}

function removeItemFromCart(event) {
  let myCart = localStorage.getItem('cart')
  myCart = JSON.parse(myCart)

  let updatedCart = new Cart(myCart.items)

  updatedCart.updateCounter()
  // DONE: When a delete link is clicked, use cart.removeItem to remove the correct item
  let clickedItem = event.target.nextElementSibling
  let actualTarget = clickedItem.nextElementSibling.textContent
  updatedCart.removeItem(actualTarget)
  // DONE: Save the cart back to local storage
  // DONE: Re-draw the cart table
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();

