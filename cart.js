(function () {
  const CART_KEY = 'xphones-cart';

  const products = {
    'x-phone': { id: 'x-phone', name: 'X Phone', price: 899, image: 'images/v4/x-phone.webp?b=3', storage: '256GB' },
    'x-phone-plus': { id: 'x-phone-plus', name: 'X Phone Plus', price: 1099, image: 'images/v4/x-phone-plus.webp?b=5', storage: '512GB' },
    'x-phone-pro': { id: 'x-phone-pro', name: 'X Phone Pro', price: 1299, image: 'images/v4/x-phone-pro.webp', storage: '1TB' },
    'x-phone-max': { id: 'x-phone-max', name: 'X Phone Max', price: 1599, image: 'images/v4/x-phone-pro-max.webp', storage: '1.5TB' },
    'x-phone-elite': { id: 'x-phone-elite', name: 'X Phone Elite', price: 1899, image: 'images/v4/x-phone-ultra.webp', storage: '2TB' },
    'x-phone-ultra': { id: 'x-phone-ultra', name: 'X Phone Ultra', price: 2499, image: 'images/v4/x-phone-ultra-max.webp', storage: '2TB + Foldable' },
  };

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function formatPrice(amount) {
    return '$' + amount.toLocaleString();
  }

  window.XPhonesCart = {
    products,
    getCart,
    add(productId) {
      const product = products[productId];
      if (!product) return;
      const cart = getCart();
      const existing = cart.find((item) => item.id === productId);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ ...product, qty: 1 });
      }
      saveCart(cart);
    },
    remove(productId) {
      saveCart(getCart().filter((item) => item.id !== productId));
    },
    total(cart) {
      return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    },
    formatPrice,
  };

  document.querySelectorAll('[data-add-to-cart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.addToCart;
      window.XPhonesCart.add(id);
      window.location.href = 'cart.html';
    });
  });

  const cartItemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');

  if (cartItemsEl && totalEl) {
    function renderCart() {
      const cart = getCart();

      if (cart.length === 0) {
        cartItemsEl.innerHTML = `
          <div class="text-center py-16 text-zinc-400">
            <p class="text-xl mb-6">Your cart is empty.</p>
            <a href="shop.html" class="inline-block px-10 py-4 bg-white text-black font-bold rounded-2xl">Browse Phones</a>
          </div>`;
        totalEl.textContent = '$0';
        return;
      }

      cartItemsEl.innerHTML = cart.map((item) => `
        <div class="bg-zinc-900 rounded-2xl p-4 sm:p-6 overflow-hidden">
          <div class="flex gap-4 items-start">
            <img src="${item.image}" width="96" height="96" class="w-20 h-20 sm:w-24 sm:h-24 shrink-0 object-cover rounded-xl" alt="${item.name}">
            <div class="flex-1 min-w-0">
              <h2 class="text-xl sm:text-2xl font-bold truncate">${item.name}</h2>
              <p class="text-zinc-400 text-sm sm:text-base mt-1">${item.storage} · Qty ${item.qty}</p>
            </div>
          </div>
          <div class="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <p class="text-xl sm:text-2xl font-semibold text-blue-400">${formatPrice(item.price * item.qty)}</p>
            <button type="button" data-remove="${item.id}" class="text-zinc-400 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/5">Remove</button>
          </div>
        </div>
      `).join('');

      totalEl.textContent = formatPrice(window.XPhonesCart.total(cart));

      cartItemsEl.querySelectorAll('[data-remove]').forEach((btn) => {
        btn.addEventListener('click', () => {
          window.XPhonesCart.remove(btn.dataset.remove);
          renderCart();
        });
      });
    }

    renderCart();
  }
})();
