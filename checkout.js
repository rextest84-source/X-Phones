(function () {
  const orderItemsEl = document.getElementById('order-items');
  const totalPriceEl = document.getElementById('total-price');
  const form = document.getElementById('payment-form');
  const submitButton = document.getElementById('submit-button');
  const cardErrorsEl = document.getElementById('card-errors');

  if (!orderItemsEl || !totalPriceEl || !window.XPhonesCart) return;

  const { getCart, formatPrice, total } = window.XPhonesCart;
  const cart = getCart();

  function disablePayment() {
    if (form) form.classList.add('opacity-50', 'pointer-events-none');
    if (submitButton) submitButton.disabled = true;
  }

  if (cart.length === 0) {
    orderItemsEl.innerHTML = `
      <div class="text-center py-12 text-zinc-400 bg-zinc-900 rounded-2xl px-6">
        <p class="text-lg mb-6">Your cart is empty.</p>
        <a href="shop.html" class="inline-block px-8 py-3 bg-white text-black font-bold rounded-2xl">Browse Phones</a>
      </div>`;
    totalPriceEl.textContent = '$0';
    disablePayment();
    return;
  }

  orderItemsEl.innerHTML = cart.map((item) => `
    <div class="flex gap-4 items-center bg-zinc-900 rounded-2xl p-4">
      <img src="${item.image}" width="64" height="64" class="w-16 h-16 shrink-0 object-cover rounded-xl" alt="${item.name}">
      <div class="flex-1 min-w-0">
        <h3 class="font-bold text-white truncate">${item.name}</h3>
        <p class="text-zinc-400 text-sm">${item.storage} · Qty ${item.qty}</p>
      </div>
      <p class="font-semibold text-blue-400 shrink-0">${formatPrice(item.price * item.qty)}</p>
    </div>
  `).join('');

  totalPriceEl.textContent = formatPrice(total(cart));

  if (!form || !submitButton || typeof Stripe === 'undefined') return;

  const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
  const elements = stripe.elements();
  const card = elements.create('card', {
    style: {
      base: {
        color: '#ffffff',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '16px',
        '::placeholder': { color: '#71717a' },
      },
      invalid: { color: '#f87171' },
    },
  });

  card.mount('#card-element');

  card.on('change', (event) => {
    if (!cardErrorsEl) return;
    if (event.error) {
      cardErrorsEl.textContent = event.error.message;
      cardErrorsEl.classList.remove('hidden');
    } else {
      cardErrorsEl.textContent = '';
      cardErrorsEl.classList.add('hidden');
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';

    // In a real app, call your backend here to create a PaymentIntent
    alert('Demo: Payment would be processed here with Stripe.\n\nIn production, connect to your backend.');

    submitButton.disabled = false;
    submitButton.textContent = 'Pay Securely Now';
  });
})();
