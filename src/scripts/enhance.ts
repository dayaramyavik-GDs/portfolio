// Optional enhancements only. Every feature here has a no-JavaScript fallback:
// the nav stays visible, and the email address is always shown as a link.

function setupMenu(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  const button = header?.querySelector<HTMLButtonElement>('.menu-toggle');
  const nav = header?.querySelector<HTMLElement>('nav');
  if (!header || !button || !nav) return;

  const narrow = window.matchMedia('(max-width: 47.99rem)');
  header.classList.add('js-menu');
  button.hidden = false;

  const setOpen = (open: boolean) => {
    header.dataset.menu = open ? 'open' : 'closed';
    button.setAttribute('aria-expanded', String(open));
  };
  setOpen(!narrow.matches);

  button.addEventListener('click', () => setOpen(header.dataset.menu !== 'open'));
  narrow.addEventListener('change', (e) => setOpen(!e.matches));

  // Close after choosing a link or pressing Escape on small screens.
  nav.addEventListener('click', (e) => {
    if (narrow.matches && (e.target as HTMLElement).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && narrow.matches && header.dataset.menu === 'open') {
      setOpen(false);
      button.focus();
    }
  });
}

function setupCopyEmail(): void {
  document.querySelectorAll<HTMLButtonElement>('.copy-email').forEach((button) => {
    const email = button.dataset.email;
    const status = document.getElementById(button.dataset.status ?? '');
    if (!email || !status || !navigator.clipboard) return; // stays hidden: manual copy fallback
    button.hidden = false;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
        status.textContent = 'Email address copied.';
      } catch {
        status.textContent = 'Copy failed — please select the address and copy it manually.';
      }
      window.setTimeout(() => { status.textContent = ''; }, 5000);
    });
  });
}

setupMenu();
setupCopyEmail();
