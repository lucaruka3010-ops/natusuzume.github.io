;(function(){
  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Recent updates on top page from characters.json timestamps
  fetch('/data/characters.json')
    .then(r=>r.ok ? r.json() : [])
    .then(list=>{
      const updates = document.getElementById('recent-updates');
      if (!updates) return;
      try {
        list.sort((a,b)=>new Date(b.updatedAt||0)-new Date(a.updatedAt||0));
        for (const item of list.slice(0,5)) {
          const li = document.createElement('li');
          const date = item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('ja-JP') : '';
          li.innerHTML = `<a href="${item.url}">${item.name}</a> <span class="meta">（更新: ${date}）</span>`;
          updates.appendChild(li);
        }
      } catch(e){ /* no-op */ }
    }).catch(()=>{});

  // Characters list
  const listEl = document.getElementById('char-list');
  if (listEl) {
    const search = document.getElementById('search');
    const sortSel = document.getElementById('sort');

    let data = [];
    function render() {
      const q = (search?.value || '').toLowerCase();
      let arr = data.filter(c => {
        const hay = (c.name + ' ' + (c.tags||[]).join(' ')).toLowerCase();
        return hay.includes(q);
      });
      // sort
      const sort = sortSel?.value || 'name-asc';
      arr.sort((a,b)=>{
        if (sort==='name-asc') return a.name.localeCompare(b.name, 'ja');
        if (sort==='name-desc') return b.name.localeCompare(a.name, 'ja');
        const au = new Date(a.updatedAt||0).getTime();
        const bu = new Date(b.updatedAt||0).getTime();
        if (sort==='updated-desc') return bu - au;
        if (sort==='updated-asc') return au - bu;
        return 0;
      });

      listEl.innerHTML='';
      for (const c of arr) {
        const card = document.createElement('article');
        card.className='char-card';
        const img = document.createElement('img');
        img.src = c.image || '/assets/img/placeholder.svg';
        img.alt = c.name;
        const body = document.createElement('div');
        body.className='body';
        const name = document.createElement('div');
        name.className='name';
        name.textContent = c.name;
        const meta = document.createElement('div');
        meta.className='meta';
        meta.textContent = c.subtitle || '';
        const tags = document.createElement('div');
        tags.className='tags';
        for (const t of (c.tags || [])) {
          const span = document.createElement('span');
          span.className='tag';
          span.textContent = '#' + t;
          tags.appendChild(span);
        }
        const link = document.createElement('a');
        link.href = c.url;
        link.textContent = '詳しく見る →';
        link.className = 'button';
        link.style.marginTop = '8px';

        body.appendChild(name);
        body.appendChild(meta);
        body.appendChild(tags);
        body.appendChild(link);

        card.appendChild(img);
        card.appendChild(body);
        listEl.appendChild(card);
      }
    }

    fetch('/data/characters.json')
      .then(r=>r.json())
      .then(json=>{ data = json; render(); })
      .catch(()=>{ listEl.innerHTML = '<p class="meta">キャラクター情報がまだありません。</p>'; });

    search?.addEventListener('input', render);
    sortSel?.addEventListener('change', render);
  }

  // Timeline (optional future enhancement)
  const tl = document.getElementById('timeline');
  if (tl) {
    // Placeholder items
    const items = [
      { date: '0012-春', text: '森の怪物が村に現れる' },
      { date: '0012-夏', text: '灯火の儀式が中止される' }
    ];
    for (const it of items) {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${it.date}</strong> — ${it.text}`;
      tl.appendChild(li);
    }
  }
})();
