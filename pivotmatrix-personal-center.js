/* Personal workspace: local UI demonstration, no account or calendar API. */
(() => {
  const root = document.querySelector('.personal-hub');
  if (!root) return;
  const icons = {
    book: '<path d="M12 5v15M3 4h5a4 4 0 0 1 4 2 4 4 0 0 1 4-2h5v15h-5a5 5 0 0 0-4 2 5 5 0 0 0-4-2H3Z"/>',
    work: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="9" r="1.5"/><path d="m3 17 6-5 4 3 3-4 5 6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 11h18M8 15h2M14 15h2"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
  root.setAttribute('aria-labelledby','personal-hub-title');
  root.innerHTML = `
    <header class="ph-header"><div><p class="ph-eyebrow">个人中心</p><h1 id="personal-hub-title">你好，Admin</h1><p class="ph-intro">让知识有序，让创作持续。</p></div></header>
    <nav class="ph-shortcuts" aria-label="个人资源">
      ${[['book','个人知识','整理资料，积累可复用的知识。','personal-knowledge'],['work','个人作品','集中查看你的创作与交付成果。','personal-works'],['calendar','个人日历','安排工作节奏，查看个人日程。','personal-calendar']].map(([i,title,desc,url])=>`<a href="#${url}" class="ph-shortcut"><span class="ph-shortcut-icon">${icon(i)}</span><span class="ph-shortcut-copy"><strong>${title}</strong><small>${desc}</small></span><span class="ph-arrow">${icon('arrow')}</span></a>`).join('')}
    </nav>
    `;
})();
