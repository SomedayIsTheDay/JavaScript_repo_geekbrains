'use strict';

const cart = {};
const cartIcon = document.querySelector('.cartIconWrap');
const cartPanel = document.querySelector('.shoppingCart');
const featuredItems = document.querySelector('.featuredItems');
const cartNumber = cartIcon.querySelector('.cartNumber');
const cartTotalValue = cartPanel.querySelector('.cartTotalValue');
const cartProducts = cartPanel.querySelectorAll
    ('.cartName, .cartAmount, .cartPrice, .cartProductTotal');


featuredItems.addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
    const item = event.target.parentNode.parentNode.parentNode.dataset;
    addToCart(item);
});


function addToCart(obj) {
    cartNumber.textContent = +cartNumber.textContent + 1;

    if (Object.hasOwn(cart, obj.id)) {
        cart[obj.id].amount += 1;
        cart[obj.id].total += +obj.price;

        cartPanel.querySelector(`#${cart[obj.id].name}-amount`)
            .textContent = cart[obj.id].amount;

        cartPanel.querySelector(`#${cart[obj.id].name}-total`)
            .textContent = cart[obj.id].total;

    } else {
        cart[obj.id] = {
            'name': obj.name, 'amount': 1,
            'price': obj.price, 'total': +obj.price
        };

        cartProducts[0].insertAdjacentHTML('beforeend',
            `<div>${cart[obj.id].name}</div>`);

        cartProducts[1].insertAdjacentHTML('beforeend',
            `<div id="${cart[obj.id].name}-amount">${cart[obj.id].amount}</div>`);

        cartProducts[2].insertAdjacentHTML('beforeend',
            `<div>${cart[obj.id].price}</div>`);

        cartProducts[3].insertAdjacentHTML('beforeend',
            `<div id="${cart[obj.id].name}-total">${cart[obj.id].total}</div>`);
    }

    cartTotalValue.textContent = +cartTotalValue.textContent + +obj.price;

}

cartIcon.addEventListener('click', () => {
    cartPanel.classList.toggle('hidden');
});

