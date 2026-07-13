(function () {
  const orderItemsEl = document.getElementById('order-items');
  const totalPriceEl = document.getElementById('total-price');
  const form = document.getElementById('checkout-form');

  if (!orderItemsEl || !totalPriceEl || !window.XPhonesCart) return;

  const { getCart, formatPrice, total } = window.XPhonesCart;
  const cart = getCart();

  if (cart.length === 0) {
    orderItemsEl.innerHTML = `
      <div class="text-center py-12 text-zinc-400 bg-zinc-900 rounded-2xl px-6">
        <p class="text-lg mb-6">Your cart is empty.</p>
        <a href="shop.html" class="inline-block px-8 py-3 bg-white text-black font-bold rounded-2xl">Browse Phones</a>
      </div>`;
    totalPriceEl.textContent = '$0';
    if (form) form.classList.add('opacity-50', 'pointer-events-none');
    return;
  }

  orderItemsEl.innerHTML = cart.map((item) => `
    <div class="flex gap-4 items-center bg-zinc-900 rounded-2xl p-4">
      <img src="${item.image}" width="64" height="64" class="w-16 h-16 shrink-0 object-cover rounded-xl" alt="${item.name}">
      <div class="flex-1 min-w-0">
        <h3 class="font-bold truncate">${item.name}</h3>
        <p class="text-zinc-400 text-sm">${item.storage} · Qty ${item.qty}</p>
      </div>
      <p class="font-semibold text-blue-400 shrink-0">${formatPrice(item.price * item.qty)}</p>
    </div>
  `).join('');

  totalPriceEl.textContent = formatPrice(total(cart));

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Payment Successful! (Demo)');
    });
  }
})();
