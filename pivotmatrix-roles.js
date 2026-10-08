/* Local role demonstration: no authentication or data authorization API. */
(() => {
  const role=document.documentElement.dataset.role;
  const names={admin:'Admin',devops:'DevOps',business:'业务人员'};
  if(!names[role])return;
  document.querySelector('.account-name').textContent=names[role];
  document.querySelector('.account-avatar').textContent={admin:'A',devops:'D',business:'B'}[role];
  document.querySelector('#personal-hub-title').textContent='你好，'+names[role];
  document.querySelector('#new-task-title').textContent='今天，有什么需要协助？';
  const logout=document.querySelector('[aria-label="退出登录"]');
  let available;
  try{available=JSON.parse(sessionStorage.getItem('pivotmatrix-demo-available-roles'));}catch(_){}
  if(!Array.isArray(available))available=role==='admin'?['admin','devops','business']:['devops','business'];
  available=[...new Set(available.filter(r=>names[r]))];
  const switcher=document.createElement('button');switcher.type='button';switcher.className='role-switch-button';switcher.textContent='⇄ 切换角色';switcher.setAttribute('aria-haspopup','dialog');
  const account=document.querySelector('.account-name').closest('.account-bar')||document.querySelector('.account-name').parentElement;
  account.before(switcher);
  const chooser=document.createElement('dialog');chooser.className='role-switch-dialog';chooser.setAttribute('aria-labelledby','role-switch-title');
  chooser.innerHTML='<header><h2 id="role-switch-title">切换工作角色</h2><button type="button" data-role-close aria-label="关闭角色切换">×</button></header><p>当前角色：'+names[role]+'。切换后进入对应工作空间，无需退出登录</p><div>'+available.map(r=>'<button type="button" data-switch-role="'+r+'" '+(r===role?'aria-current="true"':'')+'><strong>'+names[r]+'</strong><span>'+(r===role?'当前使用':r==='business'?'任务、创作与个人工作空间':r==='devops'?'构建、评测、观测、连接与资产':'完整目录与平台管理')+'</span></button>').join('')+'</div><small>原型双角色演示；正式环境仅展示账号已被授权的角色，不通过切换授予新权限</small><p role="status"></p>';
  document.body.append(chooser);
  switcher.addEventListener('click',()=>chooser.showModal());
  chooser.addEventListener('click',e=>{
    if(e.target.closest('[data-role-close]')){chooser.close();return;}
    const b=e.target.closest('[data-switch-role]');if(!b)return;
    const next=b.dataset.switchRole;if(!available.includes(next))return;
    if(next===role){chooser.close();return;}
    try{sessionStorage.setItem('pivotmatrix-demo-available-roles',JSON.stringify(available));sessionStorage.setItem('pivotmatrix-demo-role',next);}catch(_){chooser.querySelector('[role=status]').textContent='无法保存角色，请允许浏览器存储后重试';return;}
    chooser.close();
    // A unique document URL ensures all role-dependent modules reinitialize,
    // even when the current page already carries the target role's query string.
    const target=new URL('pivotmatrix-home.html',location.href);
    target.searchParams.set('view',next);
    target.searchParams.set('roleSwitch',Date.now().toString());
    target.hash=next==='business'?'business-home':'service-catalog';
    location.replace(target.href);
  });
  chooser.addEventListener('close',()=>switcher.focus());
  logout.addEventListener('click',()=>{
    sessionStorage.removeItem('pivotmatrix-demo-role');
    sessionStorage.removeItem('pivotmatrix-demo-available-roles');
    location.replace('pivotmatrix-login.html#signed-out');
  });
  const management=document.querySelector('.catalog-section--management');
  const forbidden=new Set([...management.querySelectorAll('a[href]')].map(a=>new URL(a.href).hash));
  ['#operations-system-settings','#operations-models','#operations-multimodal-models','#operations-web-model-visibility'].forEach(h=>forbidden.add(h));
  const allowedBusiness=new Set(['#business-home','#new-task','#application-center','#creation-center','#personal-center','#personal-knowledge','#personal-works','#personal-calendar']);
  const welcome=document.createElement('section');
  welcome.className='business-welcome';welcome.hidden=true;
  welcome.innerHTML=`<header class="bh-heading"><span>首页</span><span>业务工作空间</span></header>
    <section class="bh-intro" aria-labelledby="bh-title"><div><h1 id="bh-title">让业务值得被 AI 重构</h1><p>欢迎来到 PivotMatrix。在这里，你可以用自然语言提出工作需求，通过任务对话整理信息、分析问题、起草方案，也可以进入创作中心开展内容创作。</p><div class="bh-actions"><a class="role-primary" href="#new-task">＋ 新建任务</a><a class="bh-secondary" href="#creation-center">进入创作中心 →</a></div></div><aside class="bh-example"><h2>从一个具体需求开始</h2><blockquote>“请把这份会议记录整理成行动清单，列出负责人、完成时间和待确认事项。”</blockquote><p>说清楚目标、提供背景、指定输出格式，让任务更容易执行</p></aside></section>
    <div class="bh-main"><section class="bh-guide" aria-labelledby="bh-guide-title"><h2 id="bh-guide-title">第一次使用？跟着这三步</h2><ol><li><span aria-hidden="true">01</span><div><h3>描述你要完成的任务</h3><p>点击「新建任务」，直接说明问题或预期结果，例如整理纪要、撰写方案、对比资料。</p><small>建议包含：工作目标 + 使用场景 + 输出要求</small></div></li><li><span aria-hidden="true">02</span><div><h3>补充资料与业务背景</h3><p>在对话中提供相关资料和限制条件，补充受众、时间范围、格式等信息；需要时继续追问和调整。</p><small>仅使用你有权访问和提供的业务资料</small></div></li><li><span aria-hidden="true">03</span><div><h3>检查结果，继续完善</h3><p>核对关键事实、数据和结论，再提出修改意见。涉及业务决策或对外发布时，请完成必要的人工审核。</p><small>AI 辅助完成工作，重要结果由你确认</small></div></li></ol></section>
    <aside class="bh-workspace"><h2>你的常用空间</h2><div class="bh-destination"><h3>创作中心</h3><p>进入内容创作工具，把想法转化为作品</p><a href="#creation-center">开始创作 →</a></div><div class="bh-destination"><h3>个人中心</h3><p>访问个人知识、个人作品和个人日历</p><a href="#personal-center">打开个人中心 →</a></div><div class="bh-tip"><h3>需要技术工作视图？</h3><p>如果同时拥有 DevOps 角色，可通过左下角「切换角色」进入构建、评测与观测工作空间。</p></div></aside></div>
    <footer class="bh-footer">工作提示：需求越具体，越便于确认结果；不要在任务中提供无权分享的信息</footer>`;
  document.querySelector('.main-content').append(welcome);
  if(role==='business'){
    const applications=document.querySelector('.primary-nav > a[href$="#application-center"]');
    const explore=document.querySelector('.explore-nav-group');
    if(applications&&explore)explore.querySelector('.nav-section-label').after(applications);
    const catalog=document.querySelector('.primary-nav > .nav-item');
    catalog.classList.add('business-catalog-hidden');
    const task=document.createElement('a');task.className='nav-item business-task-entry';task.href='#new-task';task.innerHTML='<span aria-hidden="true">＋</span><span>新建任务</span>';
    catalog.after(task);
    const homeLink=document.createElement('a');homeLink.className='nav-item business-home-entry';homeLink.href='#business-home';homeLink.innerHTML='<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v11h-6v-7H9v7H3Z"></path></svg><span>首页</span>';task.before(homeLink);
    document.querySelector('.brand-lockup').setAttribute('aria-label','PivotMatrix');
  }
  function denied(url){return role==='business'?!allowedBusiness.has(url.hash):role!=='admin'&&(url.hash.startsWith('#operations-pivotone-')||forbidden.has(url.hash)||url.pathname.endsWith('/settings.html'));}
  function sync(){
    const hash=location.hash;
    if(denied(new URL(location.href))){location.replace(role==='business'?'#business-home':'#service-catalog');return;}
    const home=role==='business'&&hash==='#business-home';
    welcome.hidden=!home;
    document.body.classList.toggle('is-business-home',home);
    if(home)document.querySelectorAll('.main-content > section:not(.business-welcome)').forEach(e=>e.hidden=true);
    if(role==='business'){
      document.querySelector('.business-task-entry').classList.toggle('is-active',hash==='#new-task');
      const entry=document.querySelector('.business-home-entry');entry.classList.toggle('is-active',home);if(home)entry.setAttribute('aria-current','page');else entry.removeAttribute('aria-current');
    }
  }
  document.addEventListener('click',e=>{
    const link=e.target.closest('a[href]');if(!link)return;
    const url=new URL(link.href);
    if(url.origin===location.origin&&denied(url)){e.preventDefault();e.stopImmediatePropagation();location.hash=role==='business'?'business-home':'service-catalog';}
  },true);
  window.addEventListener('hashchange',sync);
  window.addEventListener('pageshow',()=>{if(!sessionStorage.getItem('pivotmatrix-demo-role'))location.replace('pivotmatrix-login.html');else sync();});
  sync();
})();
