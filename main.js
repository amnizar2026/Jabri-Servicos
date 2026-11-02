(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav-principal');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menu');
    }));
  }
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
  const dayInput = document.getElementById('client-day');
  if (dayInput) dayInput.min = new Date().toISOString().slice(0,10);
  let toastTimer;
  function toast(message) {
    const el = document.getElementById('toast'); if (!el) return;
    el.textContent = message; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 3600);
  }
  window.JabriSite = { toast };
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(err => console.warn('Service Worker não registrado:', err)));
  }
})();
