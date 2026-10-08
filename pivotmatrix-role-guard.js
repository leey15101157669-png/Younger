/* Prototype-only role gate. Production permissions must be enforced server-side. */
(() => {
  let role;
  try { role=sessionStorage.getItem('pivotmatrix-demo-role'); } catch (_) {}
  if(role==='it'){role='devops';try{sessionStorage.setItem('pivotmatrix-demo-role',role);}catch(_) {}}
  if(!['admin','devops','business'].includes(role)){
    document.documentElement.dataset.role='signed-out';
    location.replace('pivotmatrix-login.html');
    return;
  }
  document.documentElement.dataset.role=role;
  if(location.pathname.endsWith('/settings.html')&&role!=='admin')location.replace('pivotmatrix-home.html');
})();
