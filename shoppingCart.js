'use strict';

const cart = {};
const cartIcon = document.querySelector('.cartIconWrap');
const cartPanel = document.querySelector('.shoppingCart');
const cartCount = cartIcon.querySelector('.cartCount');
const cartTotalValue = cartPanel.querySelector('.cartTotalValue');

cartIcon.addEventListener('click', () => {
    cartPanel.classList.toggle('hidden');
});

document.querySelector('.featuredItems'); addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }
    const item = event.target.closest('.featuredItem').dataset;
    const id = +item.id;
    const name = item.name;
    const price = +item.price;

    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    cartCount.textContent = +cartCount.textContent + 1;
    cartTotalValue.textContent = +cartTotalValue.textContent + price;

    if (id in cart) {
        cart[id].amount += 1;
        cart[id].total += price;

        cartPanel.querySelector(`#${cart[id].name}-amount`)
            .textContent = cart[id].amount;

        cartPanel.querySelector(`#${cart[id].name}-total`)
            .textContent = cart[id].total;
    } else {
        cart[id] = { name, price, amount: 1, total: price };

        const cartRow = `
          <div class="cartRow">
            <div>${cart[id].name}</div>
            <div>
              <span id="${cart[id].name}-amount">${cart[id].amount}</span>pcs.
            </div>
            <div>$${cart[id].price}</div>
            <div>
              $<span id="${cart[id].name}-total">${cart[id].price}</span>
            </div>
          </div>
          `;

        cartTotalValue.parentNode.insertAdjacentHTML("beforebegin", cartRow);
    }
}
