(() => {
  const form = document.getElementById('quote-form');
  if (!form) return;
  const taskList = document.getElementById('task-list');
  const addTaskButton = document.getElementById('add-task');
  const serviceChecks = [...form.querySelectorAll('input[name="service"]')];
  const errorBox = document.getElementById('form-error');
  const WHATSAPP_NUMBER = '5548991879755';
  const serviceNames = serviceChecks.map(input => input.value);

  function createTaskRow(service = '') {
    const row = document.createElement('div');
    row.className = 'task-row';
    const serviceLabel = document.createElement('label'); serviceLabel.textContent = 'Serviço';
    const select = document.createElement('select'); select.className = 'task-service';
    const empty = new Option('Selecione um serviço', ''); select.add(empty);
    serviceNames.forEach(name => select.add(new Option(name, name)));
    select.value = service;
    serviceLabel.append(select);
    const qtyLabel = document.createElement('label'); qtyLabel.textContent = 'Quantidade';
    const qty = document.createElement('input'); qty.className = 'task-quantity'; qty.type = 'number'; qty.min = '1'; qty.max = '99'; qty.value = '1'; qty.inputMode = 'numeric'; qtyLabel.append(qty);
    const complexityLabel = document.createElement('label'); complexityLabel.textContent = 'Complexidade';
    const complexity = document.createElement('select'); complexity.className = 'task-complexity';
    ['Não sei informar', 'Simples', 'Moderada', 'Precisa de avaliação'].forEach(v => complexity.add(new Option(v, v)));
    complexityLabel.append(complexity);
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'remove-task'; remove.textContent = '×'; remove.setAttribute('aria-label', 'Remover detalhe');
    remove.addEventListener('click', () => { if (taskList.children.length > 1) row.remove(); else { select.value=''; qty.value='1'; complexity.selectedIndex=0; } });
    row.append(serviceLabel, qtyLabel, complexityLabel, remove);
    return row;
  }

  addTaskButton.addEventListener('click', () => taskList.append(createTaskRow()));
  serviceChecks.forEach(check => check.addEventListener('change', () => {
    const name = check.value;
    if (!check.checked) {
      const matchingRows = [...taskList.querySelectorAll('.task-row')].filter(row => row.querySelector('.task-service').value === name);
      matchingRows.forEach(row => {
        if (taskList.children.length > 1) row.remove();
        else { row.querySelector('.task-service').value = ''; row.querySelector('.task-quantity').value = '1'; row.querySelector('.task-complexity').selectedIndex = 0; }
      });
      return;
    }
    const existing = [...taskList.querySelectorAll('.task-service')].map(item => item.value).filter(Boolean);
    if (!existing.includes(name)) {
      const firstEmpty = [...taskList.querySelectorAll('.task-service')].find(item => !item.value);
      if (firstEmpty) firstEmpty.value = name; else taskList.append(createTaskRow(name));
    }
  }));

  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
    const name = link.dataset.service;
    const checkbox = serviceChecks.find(item => item.value === name);
    if (checkbox) { checkbox.checked = true; checkbox.dispatchEvent(new Event('change')); }
    const empty = [...taskList.querySelectorAll('.task-service')].find(item => !item.value);
    if (empty) empty.value = name;
  }));

  function normalizePhone(value) { return value.replace(/\D/g, ''); }
  function showError(message) { errorBox.textContent = message; }
  form.addEventListener('submit', event => {
    event.preventDefault(); showError('');
    const name = document.getElementById('client-name').value.trim();
    const phone = normalizePhone(document.getElementById('client-phone').value);
    const city = document.getElementById('client-city').value;
    const description = document.getElementById('client-description').value.trim();
    const privacyAck = document.getElementById('privacy-ack').checked;
    const selected = serviceChecks.filter(item => item.checked).map(item => item.value);
    const tasks = [...taskList.querySelectorAll('.task-row')].map(row => ({
      service: row.querySelector('.task-service').value,
      quantity: Number(row.querySelector('.task-quantity').value),
      complexity: row.querySelector('.task-complexity').value
    })).filter(task => task.service);
    if (!name || !phone || !city || !description) return showError('Preencha seu nome, WhatsApp, cidade e descrição do serviço.');
    if (!privacyAck) return showError('Confirme a leitura do aviso de privacidade para continuar.');
    if (phone.length < 10 || phone.length > 13) return showError('Informe um número de WhatsApp válido com DDD.');
    if (!selected.length) return showError('Selecione pelo menos uma categoria de serviço.');
    if (tasks.some(task => !Number.isInteger(task.quantity) || task.quantity < 1 || task.quantity > 99)) return showError('Confira as quantidades informadas (de 1 a 99).');
    const day = document.getElementById('client-day').value;
    const time = document.getElementById('client-time').value;
    const notes = document.getElementById('client-notes').value.trim();
    const lines = [
      'Olá! Gostaria de solicitar um orçamento para a JABRI SERVIÇOS.', '',
      '*DADOS DO CLIENTE*', `Nome: ${name}`, `WhatsApp: ${document.getElementById('client-phone').value.trim()}`, `Cidade: ${city}`, '',
      '*SERVIÇOS SELECIONADOS*', ...selected.map(s => `• ${s}`), '',
      '*DETALHES*', ...(tasks.length ? tasks.map((t,i) => `${i+1}. ${t.service} | Quantidade: ${t.quantity} | Complexidade: ${t.complexity}`) : ['Detalhes específicos a combinar']), '',
      '*DESCRIÇÃO*', description,
      ...(day || time ? ['', '*PREFERÊNCIA DE ATENDIMENTO*', `Dia: ${day || 'A combinar'}`, `Horário: ${time || 'A combinar'}`] : []),
      ...(notes ? ['', '*OBSERVAÇÕES*', notes] : []), '',
      'Entendo que o orçamento depende de avaliação e confirmação de disponibilidade. Obrigado(a)!'
    ];
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    const opened = window.open(url, '_blank');
    if (!opened) { showError('O navegador bloqueou a nova janela. Use o botão de WhatsApp no rodapé da tela ou permita pop-ups para continuar.'); return; }
    opened.opener = null;
    if (window.JabriSite && window.JabriSite.toast) window.JabriSite.toast('Mensagem preparada. Revise e envie pelo WhatsApp.');
  });
})();
