/* Local message entry. */
(() => {
  const triggers=[...document.querySelectorAll('[data-message-open]')];
  if(!triggers.length)return;
  let trigger=triggers[0];
  const dialog=document.createElement('dialog');
  dialog.id='message-center';dialog.className='message-center';dialog.setAttribute('aria-labelledby','message-center-title');
  dialog.innerHTML='<header><h2 id="message-center-title">消息中心</h2><button type="button" data-close aria-label="关闭消息中心" autofocus>关闭</button></header><nav aria-label="消息筛选"><button type="button" data-filter="all" aria-pressed="true">全部</button><button type="button" data-filter="unread" aria-pressed="false">未读</button></nav><div class="message-empty" role="status"><strong data-empty-title>暂无消息</strong><p>本地原型尚未接入消息数据。</p></div>';
  document.body.append(dialog);
  triggers.forEach(button=>{button.onclick=()=>{trigger=button;if(!dialog.open)dialog.showModal();triggers.forEach(item=>item.setAttribute('aria-expanded','true'));};});
  dialog.onclick=e=>{
    if(e.target.closest('[data-close]'))dialog.close();
    const filter=e.target.closest('[data-filter]');
    if(filter){dialog.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===filter)));dialog.querySelector('[data-empty-title]').textContent=filter.dataset.filter==='unread'?'暂无未读消息':'暂无消息';}
    if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}
  };
  dialog.onclose=()=>{triggers.forEach(item=>item.setAttribute('aria-expanded','false'));if(trigger.isConnected)trigger.focus();};
  window.addEventListener('hashchange',()=>{if(dialog.open)dialog.close();});
})();
