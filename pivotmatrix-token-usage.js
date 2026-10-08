/* Local prototype only: usage is synthetic and scoped to saved web access members. */
(() => {
  if(document.documentElement.dataset.role!=='admin')return;
  const route='#operations-pivotone-tokens';
  const nav=document.querySelector('a[href="#operations-pivotone-agents"]').parentElement;
  const link=document.createElement('a');link.href=route;link.dataset.operationsLink='';link.textContent='Token 消耗情况';nav.append(link);
  const page=document.createElement('section');page.className='pivotone-page token-page';page.hidden=true;
  document.querySelector('.main-content').append(page);
  const dialog=document.createElement('dialog');dialog.className='token-dialog';document.body.append(dialog);
  const people=['A','B','C','D'].map((letter,i)=>({id:'user-'+letter.toLowerCase(),name:'用户 '+letter,email:'user-'+letter.toLowerCase()+'@example.com',index:i}));
  let days=30,query='',sort='total',selected=null,grain='day',opener=null;
  const fmt=n=>n.toLocaleString('en-US');
  const date=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const sum=rows=>rows.reduce((a,r)=>({input:a.input+r.input,output:a.output+r.output,calls:a.calls+r.calls,total:a.total+r.input+r.output}),{input:0,output:0,calls:0,total:0});
  function records(person){return Array.from({length:days},(_,i)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-days+1+i);const seed=Math.floor(d.getTime()/86400000)+person.index*17;const calls=person.index===3?0:seed%13*7;return{date:date(d),input:calls*(2100+seed%19*650),output:calls*(150+seed%11*38),calls};});}
  function authorized(){let ids=[];try{ids=JSON.parse(localStorage.getItem('pivotone-demo-v1'))?.webMembers||[];}catch(_){}return people.filter(p=>ids.includes(p.id));}
  function cells(r){return `<td class="tu-total">${fmt(r.total)}</td><td class="tu-input">${fmt(r.input)}</td><td class="tu-output">${fmt(r.output)}</td><td>${fmt(r.calls)}</td>`;}
  function render(){
    page.innerHTML=`<header><h1>Token 消耗情况</h1><p>查看已开放 PivotOne 网页端成员的消耗与使用情况</p></header><p class="tu-notice">示例数据 · 按成员管理中已保存的开放名单展示，未接入真实用量服务</p><div class="tu-toolbar"><label>统计范围 <select data-range><option value="7">近 7 天</option><option value="30">近 30 天</option><option value="90">近 90 天</option></select></label><input type="search" aria-label="搜索用户邮箱或名称" placeholder="搜索用户邮箱 / 名称" data-search><label>排序 <select data-sort><option value="total">按总 Token</option><option value="calls">按调用次数</option></select></label></div><div class="tu-summary"></div><p class="tu-scope"></p><div class="po-table tu-table"><table><thead><tr><th>用户</th><th>总 Token</th><th>输入</th><th>输出</th><th>调用数</th><th>占比</th><th>操作</th></tr></thead><tbody></tbody></table></div><p class="tu-empty"></p>`;
    page.querySelector('[data-range]').value=days;page.querySelector('[data-search]').value=query;page.querySelector('[data-sort]').value=sort;update();
  }
  function update(){
    const all=authorized().map(p=>({...p,...sum(records(p))}));const totals=sum(all);
    page.querySelector('.tu-summary').innerHTML=[['总 Token','total'],['输入 Token','input'],['输出 Token','output'],['调用次数','calls']].map(([label,key])=>`<article><strong class="tu-${key}">${fmt(totals[key])}</strong><span>${label}</span></article>`).join('');
    const rows=all.filter(p=>(p.name+' '+p.email).toLowerCase().includes(query.toLowerCase())).sort((a,b)=>b[sort]-a[sort]);
    page.querySelector('.tu-scope').textContent=`近 ${days} 天 · 已开放 ${all.length} 位成员 · 当前显示 ${rows.length} 位（汇总与占比基于全部已开放成员）`;
    page.querySelector('tbody').innerHTML=rows.map(p=>`<tr><td><strong>${p.name}</strong><small>${p.email}</small></td>${cells(p)}<td>${totals.total?(p.total/totals.total*100).toFixed(1):'0.0'}%</td><td><button data-detail="${p.id}" aria-label="查看${p.name}消耗详情">详情</button></td></tr>`).join('');
    page.querySelector('.tu-empty').innerHTML=rows.length?'':all.length?'没有匹配的成员':'暂无已开放成员，请先在<a href="#operations-pivotone-users">成员管理</a>中选择成员并保存访问权限';
  }
  function buckets(){const grouped=new Map();records(selected).forEach(r=>{let key=r.date;if(grain==='month')key=key.slice(0,7);if(grain==='week'){const d=new Date(r.date+'T12:00:00');d.setDate(d.getDate()-(d.getDay()+6)%7);key=date(d);}if(!grouped.has(key))grouped.set(key,[]);grouped.get(key).push(r);});return [...grouped].map(([label,rows])=>({label,...sum(rows)}));}
  function detail(){
    const rows=buckets(),max=Math.max(1,...rows.map(r=>r.total));const x=i=>70+i*810/Math.max(1,rows.length-1),y=n=>220-n/max*180;
    const grid=Array.from({length:5},(_,i)=>{const n=max*i/4;return `<line x1="70" x2="880" y1="${y(n)}" y2="${y(n)}"/><text x="60" y="${y(n)+4}" text-anchor="end">${n>=1e6?(n/1e6).toFixed(1)+'M':Math.round(n/1000)+'K'}</text>`;}).join('');
    const lines=['input','output','total'].map(key=>`<polyline class="tu-line-${key}" points="${rows.map((r,i)=>`${x(i)},${y(r[key])}`).join(' ')}"/>`).join('');
    const labels=rows.map((r,i)=>i%Math.max(1,Math.ceil(rows.length/6))===0||i===rows.length-1?`<text x="${x(i)}" y="248" text-anchor="middle">${r.label.slice(5)||r.label}</text>`:'').join('');
    const title={day:'天',week:'周',month:'月'}[grain];
    dialog.innerHTML=`<header><div><h2 id="tu-detail-title">${selected.name}</h2><p>网页端 Token 消耗详情 · ${selected.email} · 近 ${days} 天</p></div><button data-close aria-label="关闭消耗详情">×</button></header><section class="tu-chart"><div><h3>消耗报表</h3><nav aria-label="统计粒度">${[['day','按天'],['week','按周'],['month','按月']].map(([key,label])=>`<button data-grain="${key}" aria-pressed="${grain===key}">${label}</button>`).join('')}</nav></div><svg viewBox="0 0 920 270" role="img" aria-label="${selected.name}按${title} Token 消耗趋势，具体数值见下方表格">${grid}${lines}${labels}</svg><div class="tu-legend"><span class="tu-input">● 输入</span><span class="tu-output">● 输出</span><span class="tu-total">● 总计</span></div></section><h3>按${title}明细</h3><p class="tu-scope">示例数据${grain==='week'?' · 周一为每周起始日':''} · 首尾周期仅统计所选范围内的数据</p><div class="po-table tu-table"><table><thead><tr><th>${grain==='week'?'周起始日期':'日期'}</th><th>总 Token</th><th>输入</th><th>输出</th><th>调用数</th></tr></thead><tbody>${[...rows].reverse().map(r=>`<tr><td>${r.label}</td>${cells(r)}</tr>`).join('')}</tbody></table></div>`;
    dialog.setAttribute('aria-labelledby','tu-detail-title');
  }
  page.addEventListener('input',e=>{if(e.target.matches('[data-search]')){query=e.target.value;update();}});
  page.addEventListener('change',e=>{if(e.target.matches('[data-range]'))days=Number(e.target.value);if(e.target.matches('[data-sort]'))sort=e.target.value;update();});
  page.addEventListener('click',e=>{const button=e.target.closest('[data-detail]');if(!button)return;selected=people.find(p=>p.id===button.dataset.detail);grain='day';opener=button;detail();dialog.showModal();});
  dialog.addEventListener('click',e=>{if(e.target.closest('[data-close]'))dialog.close();const button=e.target.closest('[data-grain]');if(button){grain=button.dataset.grain;detail();dialog.querySelector(`[data-grain="${grain}"]`).focus();}if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>opener?.isConnected&&opener.focus());
  function sync(){const active=location.hash===route;page.hidden=!active;if(dialog.open)dialog.close();if(!active)return;document.querySelectorAll('.main-content > section').forEach(el=>el.hidden=el!==page);document.querySelector('[data-operations-nav]').hidden=false;document.body.classList.add('is-operations-route');nav.querySelectorAll('a').forEach(a=>{a.classList.toggle('is-active',a===link);if(a===link)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});render();}
  window.addEventListener('hashchange',sync);sync();
})();
