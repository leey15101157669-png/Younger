/* Content and layout from user-supplied expert-template screenshot. */
(() => {
  const items = [
    {name:'应用开发',subtitle:'dev · claudecode',type:'claude_code',tags:['UI-design-generator','user-file-upload'],meta:'技能: 2　模型: 1　创建者: 北理工'},
    {name:'数据分析1',subtitle:'data-analyzer-1 · 自进化技能-echoclaw',type:'echoclaw',description:'该数字员工专注于基础数据分析与业务洞察，具备自进化能力。擅长处理日常数据查询、统计汇总及趋势分析任务，适合企业运营监控、报表生成及初步数据诊断场景，助力用户快速…',tags:[],meta:'模型: 1　创建者: 常孝文'},
    {name:'金虎建的职能专家',subtitle:'claw · pivotclaw-playwright',type:'pivotclaw',tags:['#80'],meta:'技能: 1　模型: 1　创建者: 上海知医'},
    {name:'企业财务分析',subtitle:'enterprise-insight · pivotclaw-playwright',type:'pivotclaw',description:'专注于企业财务数据的深度分析，能够进行损益洞察与财务指标解读，帮助识别经营中的盈亏关键因素。同时支持将分析报告等文件一键发送至平台个人知识库，便于成果沉淀与团队共…',tags:['loss-insight'],meta:'技能: 1　模型: 1　创建者: 李杨'}
  ];
  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const view=document.createElement('section');view.className='expert-templates-view';view.hidden=true;view.setAttribute('aria-labelledby','expert-templates-title');
  view.innerHTML=`<header class="expert-templates-header"><div><h1 id="expert-templates-title">职能专家模板</h1><p>预设角色配置，快速创建标准化 Worker</p></div><div class="expert-templates-actions"><div class="expert-templates-scope" aria-label="模板范围"><button data-scope="mine" aria-pressed="false">我创建的</button><button data-scope="all" aria-pressed="true">全部</button></div><button class="expert-create">+ 新建模板</button></div></header><div class="expert-templates-grid"></div><p class="expert-templates-empty" hidden>暂无我创建的模板</p><p class="expert-templates-status" role="status"></p>`;
  document.querySelector('.main-content').append(view);
  const dialog=document.createElement('dialog');dialog.className='expert-template-dialog';dialog.setAttribute('aria-labelledby','expert-dialog-title');document.body.append(dialog);
  let scope='all',focus;
  function render(){view.querySelectorAll('[data-scope]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scope===scope)));const shown=items.filter(i=>!i.deleted&&scope==='all');view.querySelector('.expert-templates-grid').innerHTML=shown.map(i=>`<article class="expert-template-card"><div class="expert-template-heading"><h2>${esc(i.name)}</h2><span>${esc(i.type)}</span></div><p class="expert-template-subtitle">${esc(i.subtitle)}</p>${i.description?`<p class="expert-template-description">${esc(i.description)}</p>`:''}<div class="expert-template-tags">${i.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div><p class="expert-template-meta">${esc(i.meta)}</p><footer><button data-edit="${items.indexOf(i)}">编辑</button><button data-delete="${items.indexOf(i)}">删除</button></footer></article>`).join('');view.querySelector('.expert-templates-empty').hidden=shown.length>0;view.querySelector('.expert-templates-empty').textContent=scope==='mine'?'暂无我创建的模板':'暂无模板';}
  function notice(title){focus=document.activeElement;dialog.innerHTML=`<h2 id="expert-dialog-title">${esc(title)}</h2><p>参考图未包含此弹窗，待提供对应页面后复刻。</p><button autofocus>关闭</button>`;dialog.querySelector('button').onclick=()=>dialog.close();dialog.showModal();}
  dialog.onclose=()=>focus?.isConnected&&focus.focus();
  view.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.scope){scope=b.dataset.scope;render();}if(b.matches('.expert-create'))notice('新建模板');if(b.hasAttribute('data-edit'))notice('编辑模板 · '+items[Number(b.dataset.edit)].name);if(b.hasAttribute('data-delete')){const item=items[Number(b.dataset.delete)];item.deleted=true;render();const status=view.querySelector('.expert-templates-status');status.innerHTML='已从本地原型移除。 <button>撤销</button>';status.querySelector('button').onclick=()=>{item.deleted=false;render();status.textContent='';};}};
  function sync(){view.hidden=location.hash!=='#build-expert-template';if(!view.hidden){document.querySelector('.proto-page').hidden=true;document.querySelector('.service-catalog').hidden=true;}if(dialog.open)dialog.close();}
  window.addEventListener('hashchange',sync);render();sync();
})();
