const CACHE_NAME = 'gemini-expense-tracker-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.ts',
  '/hooks/useLocalStorage.ts',
  '/components/Icons.tsx',
  '/components/Header.tsx',
  '/components/Dashboard.tsx',
  '/components/ExpenseList.tsx',
  '/components/ExpenseItem.tsx',
  '/components/AddExpenseModal.tsx',
  '/components/CategoryPieChart.tsx',
  '/components/Insights.tsx',
  '/services/geminiService.ts',
  '/icon.svg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // We use addAll to ensure the SW doesn't install unless all assets are cached.
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// "Cache falling back to network" strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
