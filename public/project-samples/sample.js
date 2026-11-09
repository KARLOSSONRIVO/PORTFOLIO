// Local dashboard-only interactions. No fetch, storage, forms, or external navigation.
(() => {
  let toastTimer;
  const toast = document.querySelector('.sample-toast');
  document.querySelectorAll('[data-hint]').forEach(button => button.addEventListener('click', () => {
    clearTimeout(toastTimer);
    toast.textContent = button.dataset.hint;
    toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; }, 3000);
  }));

  let element = 'All';
  let noteKind = 'all';
  let service = '';
  const search = document.querySelector('[data-search]');
  function filter() {
    const query = search?.value.toLocaleLowerCase().trim() ?? '';
    const rows = [...document.querySelectorAll('[data-searchable]')];
    rows.forEach(row => {
      const matchesQuery = (row.dataset.searchText ?? '').toLocaleLowerCase().includes(query);
      const matchesElement = !row.dataset.palElement || element === 'All' || row.dataset.palElement === element;
      const matchesNote = !row.dataset.noteKind || noteKind === 'all' || row.dataset.noteKind === noteKind;
      const matchesService = !service || (row.dataset.searchText ?? '').toLocaleLowerCase().includes(service.toLocaleLowerCase());
      row.hidden = !(matchesQuery && matchesElement && matchesNote && matchesService);
    });
    document.querySelectorAll('.empty-search').forEach(message => {
      const scope = message.closest('.panel') ?? message.parentElement;
      const scopedRows = [...scope.querySelectorAll('[data-searchable]')];
      message.hidden = !scopedRows.length || scopedRows.some(row => !row.hidden);
    });
    const palCount = document.querySelector('.pal-count');
    if (palCount) palCount.textContent = `${rows.filter(row => !row.hidden).length} sample Pals`;
  }
  search?.addEventListener('input', filter);
  document.querySelectorAll('[data-element]').forEach(button => button.addEventListener('click', () => {
    element = button.dataset.element;
    document.querySelectorAll('[data-element]').forEach(other => {
      const selected = other === button;
      other.classList.toggle('selected', selected);
      other.setAttribute('aria-pressed', String(selected));
    });
    filter();
  }));
  document.querySelectorAll('[data-note-filter]').forEach(button => button.addEventListener('click', () => {
    noteKind = button.dataset.noteFilter;
    document.querySelectorAll('[data-note-filter]').forEach(other => {
      const selected = other === button;
      other.classList.toggle('selected', selected);
      other.setAttribute('aria-pressed', String(selected));
    });
    filter();
  }));
  document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
    service = service === button.dataset.service ? '' : button.dataset.service;
    document.querySelectorAll('[data-service]').forEach(other => {
      const selected = other.dataset.service === service;
      other.classList.toggle('selected', selected);
      other.setAttribute('aria-pressed', String(selected));
    });
    filter();
  }));
  const historyToggle = document.querySelector('[data-toggle-history]');
  historyToggle?.addEventListener('click', () => {
    const history = document.getElementById('expense-history');
    history.hidden = !history.hidden;
    historyToggle.setAttribute('aria-expanded', String(!history.hidden));
    if (!history.hidden) history.scrollIntoView({ block: 'nearest', behavior: 'auto' });
  });
})();
