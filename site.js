(function () {
  const pages = {
    home: { home: true },
    shop: { shop: true },
    vision: { vision: true },
    cart: { cart: true },
    product: {},
  };

  function navLink(href, label, active, extraCls) {
    const cls = active ? 'text-blue-400' : 'hover:text-blue-400';
    return `<a href="${href}" class="${cls} ${extraCls || ''}">${label}</a>`;
  }

  function renderNav(activePage) {
    const active = pages[activePage] || {};
    const links = [
      navLink('index.html', 'Home', active.home, 'mobile-nav-link'),
      navLink('shop.html', 'Shop', active.shop, 'mobile-nav-link'),
      navLink('vision.html', 'Vision', active.vision, 'mobile-nav-link'),
      navLink('cart.html', 'Cart', active.cart, 'mobile-nav-link'),
    ].join('\n        ');

    return `
  <nav class="fixed top-0 w-full bg-black/90 backdrop-blur border-b border-white/10 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
      <div class="flex justify-between items-center gap-4">
        <a href="index.html" class="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400 shrink-0">X Phones</a>
        <div class="hidden md:flex gap-6 lg:gap-8 font-medium items-center">
          ${links.replace(/ mobile-nav-link/g, '')}
        </div>
        <button type="button" id="mobile-menu-btn" class="md:hidden p-2 text-zinc-300 hover:text-white" aria-label="Open menu" aria-expanded="false">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
      <div id="mobile-nav" class="hidden md:hidden pt-4 pb-2 border-t border-white/10 mt-4 flex flex-col gap-4 font-medium">
        ${links}
      </div>
    </div>
  </nav>`;
  }

  function renderFooter() {
    const modelLinks = [
      { href: 'x-phone.html', name: 'X Phone', detail: '256GB · Grok Assistant' },
      { href: 'x-phone-plus.html', name: 'X Phone Plus', detail: '512GB · Hexa lens' },
      { href: 'x-phone-pro.html', name: 'X Phone Pro', detail: '1TB · Grok 5 on-device' },
      { href: 'x-phone-max.html', name: 'X Phone Max', detail: '1.5TB · Priority Starlink' },
      { href: 'x-phone-elite.html', name: 'X Phone Elite', detail: '2TB · Neural Link ready' },
      { href: 'x-phone-ultra.html', name: 'X Phone Ultra', detail: '2TB Foldable · Full Neural Link' },
    ].map((m) => `
          <a href="${m.href}" class="group flex items-center justify-between gap-3 py-3 px-4 -mx-1 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition">
            <div class="min-w-0">
              <span class="block font-medium text-zinc-200 group-hover:text-blue-400 transition">${m.name}</span>
              <span class="block text-xs text-zinc-500 mt-0.5 truncate">${m.detail}</span>
            </div>
            <svg class="w-4 h-4 text-zinc-600 group-hover:text-blue-400 shrink-0 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </a>`).join('');

    return `
  <footer class="border-t border-white/10 bg-zinc-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
      <div>
        <h2 class="text-blue-400 font-bold text-xl mb-4">X Phones</h2>
        <p class="text-zinc-400 mb-4 text-sm sm:text-base">Built by Elon Musk. Powered by Grok.</p>
        <div class="flex flex-col gap-1">
          <a href="index.html" class="text-zinc-400 hover:text-white py-1.5 transition">Home</a>
          <a href="shop.html" class="text-zinc-400 hover:text-white py-1.5 transition">Shop</a>
          <a href="vision.html" class="text-zinc-400 hover:text-white py-1.5 transition">The Vision</a>
          <a href="cart.html" class="text-zinc-400 hover:text-white py-1.5 transition">Cart</a>
        </div>
      </div>
      <div class="sm:col-span-1">
        <h2 class="font-bold text-lg sm:text-xl mb-4 text-white">Models (Features)</h2>
        <div class="flex flex-col rounded-2xl bg-zinc-900/50 border border-white/5 p-1">
          ${modelLinks}
        </div>
      </div>
      <div>
        <h2 class="font-bold text-lg sm:text-xl mb-4 text-white">Explore</h2>
        <div class="flex flex-col gap-1">
          <a href="shop.html" class="text-zinc-400 hover:text-white py-1.5 transition">Shop All Phones</a>
          <a href="vision.html" class="text-zinc-400 hover:text-white py-1.5 transition">Our Vision</a>
        </div>
      </div>
    </div>
    <div class="border-t border-white/10 py-6 text-center text-zinc-500 text-sm px-4">
      © 2026 X Phones. All rights reserved.
    </div>
  </footer>`;
  }

  function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-nav');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('hidden') === false;
      btn.setAttribute('aria-expanded', String(open));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const navEl = document.getElementById('site-nav');
  const footerEl = document.getElementById('site-footer');

  if (navEl) {
    navEl.outerHTML = renderNav(navEl.dataset.active || 'product');
    initMobileMenu();
  }
  if (footerEl) {
    footerEl.outerHTML = renderFooter();
  }
})();
