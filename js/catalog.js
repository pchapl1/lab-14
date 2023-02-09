/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
state.cart = new Cart([]);

// On screen load, we call this method to put all of the product options
// (the things in the state.allProducts array) into the drop down list.
function populateForm() {

  //DONE: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in state.allProducts) {
    //create element
    let option = document.createElement('option')
    // put the name in the dropdown
    option.textContent = state.allProducts[i].name
    // add a value
    option.value = state.allProducts[i].name
    // append the opton 
    selectElement.appendChild(option)
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // DONE: Prevent the page from reloading
  event.preventDefault()
  // Do all the things ...
  addSelectedItemToCart();
  state.cart.saveToLocalStorage();
  state.cart.updateCounter();
  const itemSelect = document.getElementById('items').value
  const itemQuantity = document.getElementById('quantity').value
  updateCartPreview(itemSelect, itemQuantity);

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // DONE: suss out the item picked from the select list
  const itemSelect = document.getElementById('items').value

  // DONE: get the quantity
  const itemQuantity = document.getElementById('quantity').value

  // DONE: using those, add one item to the Cart
  state.cart.addItem(itemSelect, itemQuantity)

}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview(item, quantity) {
  // DONE: Get the item and quantity from the form
  // the item and quantity are passed in during the handlesubmit function
  // DONE: Add a new element to the cartContents div with that information
  let div = document.getElementById('cartContents')
  let h3 = document.createElement('h3')
  let p = document.createElement('p')
  let img = document.createElement('img')
  h3.textContent = item
  p.textContent = quantity
  for (let i = 0; i < state.allProducts.length; i++) {
    if (state.allProducts[i].name === item) {
      img.src = state.allProducts[i].filePath
    }

  }
  div.appendChild(h3)
  div.appendChild(p)
  div.appendChild(img)

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);
state.cart.updateCounter()
// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
