(function () {
  const popupHtml = `
<div id="purchase-popup" class="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 bg-zinc-900 border border-emerald-500 rounded-2xl shadow-2xl p-5 sm:max-w-xs hidden items-start gap-4 z-50">
  <div class="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">👤</div>
  <div class="min-w-0">
    <p id="popup-text" class="text-sm text-zinc-300"></p>
    <p class="text-xs text-emerald-400 mt-1">Just now</p>
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

    return `${fullName} in ${city} just bought ${model}`;
  }

  const popup = document.getElementById('purchase-popup');
  const textEl = document.getElementById('popup-text');

  function showNotification() {
    if (!popup || !textEl) return;

    textEl.textContent = generateUniqueNotification();
    popup.classList.remove('hidden');
    popup.classList.add('flex');

    setTimeout(() => {
      popup.classList.add('hidden');
      popup.classList.remove('flex');
    }, 5000);
  }

  setInterval(showNotification, 30000);
  setTimeout(showNotification, 2500);
})();
