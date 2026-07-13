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
    return `
  <footer class="border-t border-white/10 bg-zinc-950">
    <div class="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
      <div>
        <h2 class="text-blue-400 font-bold text-xl mb-4">X Phones</h2>
        <p class="text-zinc-400 mb-4">Built by Elon Musk. Powered by Grok.</p>
        <div class="flex flex-col gap-2">
          <a href="index.html" class="text-zinc-400 hover:text-white">Home</a>
          <a href="shop.html" class="text-zinc-400 hover:text-white">Shop</a>
          <a href="vision.html" class="text-zinc-400 hover:text-white">The Vision</a>
          <a href="cart.html" class="text-zinc-400 hover:text-white">Cart</a>
        </div>
      </div>
      <div>
        <h2 class="font-bold text-lg mb-4">Models</h2>
        <div class="flex flex-col gap-2 text-zinc-400">
          <a href="x-phone.html" class="hover:text-white">X Phone</a>
          <a href="x-phone-plus.html" class="hover:text-white">X Phone Plus</a>
          <a href="x-phone-pro.html" class="hover:text-white">X Phone Pro</a>
          <a href="x-phone-max.html" class="hover:text-white">X Phone Max</a>
          <a href="x-phone-elite.html" class="hover:text-white">X Phone Elite</a>
          <a href="x-phone-ultra.html" class="hover:text-white">X Phone Ultra</a>
        </div>
      </div>
      <div>
        <h2 class="font-bold text-lg mb-4">Explore</h2>
        <div class="flex flex-col gap-2 text-zinc-400">
          <a href="shop.html" class="hover:text-white">Shop All Phones</a>
          <a href="vision.html" class="hover:text-white">Our Vision</a>
        </div>
      </div>
    </div>
    <div class="border-t border-white/10 py-6 text-center text-zinc-500 text-sm">
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
