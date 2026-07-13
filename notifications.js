(function () {
  const style = document.createElement('style');
  style.textContent = `
    #purchase-popup {
      transform: translateY(0.75rem);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    #purchase-popup.is-visible {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
    }
  `;
  document.head.appendChild(style);

  const popupHtml = `
<div id="purchase-popup" class="fixed bottom-20 sm:bottom-4 left-4 z-40 w-[17.5rem] max-w-[calc(100vw-2rem)] bg-zinc-900/95 backdrop-blur border border-white/10 rounded-xl shadow-lg p-3 hidden" role="status" aria-live="polite">
  <div class="flex items-start gap-3">
    <div class="w-8 h-8 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center shrink-0">
      <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
    </div>
    <div class="flex-1 min-w-0 pr-1">
      <p id="popup-text" class="text-xs leading-snug text-zinc-200"></p>
      <p class="text-[10px] text-zinc-500 mt-1">Verified purchase · Just now</p>
    </div>
    <button type="button" id="popup-close" class="text-zinc-500 hover:text-white text-sm leading-none p-1 -mt-1 -mr-1" aria-label="Dismiss notification">&times;</button>
  </div>
</div>`;

  document.body.insertAdjacentHTML('beforeend', popupHtml);

  const firstNames = ['Emily', 'David', 'Sophia', 'Liam', 'Olivia', 'Noah', 'Isabella', 'James', 'Ava', 'Lucas', 'Mia', 'Ethan', 'Zoe', 'Henry', 'Luna', 'Alexander', 'Charlotte', 'Benjamin', 'Amelia', 'Daniel', 'Victoria', 'Samuel', 'Grace', 'Michael', 'Elena', 'Robert', 'Anna', 'William', 'Sophie', 'Thomas', 'Emma', 'Jack', 'Lily', 'Oliver', 'Aria', 'Leo', 'Scarlett', 'Nathan', 'Hannah', 'Gabriel'];
  const lastNames = ['Chen', 'Kim', 'Rodriguez', 'Patel', 'Thompson', 'Yamamoto', 'Garcia', 'Wilson', 'Martinez', 'Dubois', 'Andersson', 'Kowalski', 'Leclerc', 'Rossi', 'Schmidt', 'Volkov', 'Moreau', 'Novak', 'Santos', 'Ivanov', 'Nguyen', 'Silva', 'Khan', 'Weber', 'Morales'];
  const cities = ['San Francisco', 'Seoul', 'Barcelona', 'Toronto', 'Sydney', 'Tokyo', 'Mexico City', 'London', 'New York', 'Paris', 'Stockholm', 'Warsaw', 'Montreal', 'Milan', 'Berlin', 'Moscow', 'Geneva', 'Prague', 'Zurich', 'Vienna', 'Oslo', 'Helsinki', 'Brussels', 'Amsterdam', 'Copenhagen', 'Madrid', 'Rome', 'Athens', 'Lisbon', 'Dublin'];
  const models = [
    'X Phone (256GB)', 'X Phone Plus (512GB)', 'X Phone Pro (1TB)',
    'X Phone Max (1.5TB)', 'X Phone Elite (2TB)', 'X Phone Ultra (2TB Foldable)',
  ];

  const usedPeople = new Set();
  let hideTimer = null;

  function generateUniqueNotification() {
    let fullName;
    let attempts = 0;
    do {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)];
      const last = lastNames[Math.floor(Math.random() * lastNames.length)];
      fullName = `${first} ${last}`;
      attempts += 1;
      if (attempts > 200) {
        usedPeople.clear();
        break;
      }
    } while (usedPeople.has(fullName));

    usedPeople.add(fullName);

    const city = cities[Math.floor(Math.random() * cities.length)];
    const model = models[Math.floor(Math.random() * models.length)];

    return `<span class="font-medium text-white">${fullName}</span> from ${city} purchased ${model}`;
  }

  const popup = document.getElementById('purchase-popup');
  const textEl = document.getElementById('popup-text');
  const closeBtn = document.getElementById('popup-close');

  function hideNotification() {
    if (!popup) return;
    popup.classList.remove('is-visible');
    setTimeout(() => popup.classList.add('hidden'), 300);
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  }

  function showNotification() {
    if (!popup || !textEl) return;

    textEl.innerHTML = generateUniqueNotification();
    popup.classList.remove('hidden');
    requestAnimationFrame(() => popup.classList.add('is-visible'));

    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(hideNotification, 6000);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', hideNotification);
  }

  setInterval(showNotification, 30000);
  setTimeout(showNotification, 4000);
})();
