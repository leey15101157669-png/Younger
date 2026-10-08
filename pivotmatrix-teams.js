/* Intelligent teams: transcribed from the user's reference screenshot. Local preview only. */
(() => {
  const descriptions={
    hr:'三人招聘流程团队模板：招聘专员负责职位分析和简历初筛，面试官负责技术/业务能力评估，HR 主管负责综合评估和薪酬建议。适用于批量招聘、校招、社招等场景。',
    finance:'三人财务分析团队：财务分析师负责财务数据分析与指标解读，预算规划师负责预算编制与资源分配，报表生成员负责报表生成与可视化输出。适用于财务管理、投资分析等场景。',
    training:'三人培训课程团队：课程设计师负责课程体系规划与教学设计，内容编写员负责课件与教材编写，评估设计师负责考核标准设计与效果评估。适用于企业培训、在线教育等场景。',
    product:'三人产品设计团队：产品经理负责产品定义与路线规划，需求分析师负责需求收集与优先级排序，原型设计师负责交互设计与原型输出。适用于互联网产品、SaaS应用等场景。',
    legal:'三人法务合规团队：合同审核员负责合同条款审核与风险识别，法规研究员负责法规检索与合规建议，风险评估师负责综合风险评估与报告输出。适用于企业法务部门、合规审查等场景。',
    marketing:'四人营销策划团队模板：市场策略师负责市场分析和策略制定，创意总监负责创意方案和视觉方向，文案专员负责广告文案和传播素材，投放分析师负责渠道策略和效果评估。适用于品牌推广、活动策划、广告投放等场景。',
    voc:'四人 VOC（客户声音）新品洞察分析团队：数据工程师负责 CSV 数据读取、新品识别与打分排名；市场洞察分析师对 Top 新品进行深度分析与趋势提炼；产品概念创意师基于洞察生成新品 Concept；报告生成专员汇总全部…',
    data:'三人数据分析团队模板：需求分析师负责理解业务问题并转化为分析任务，数据工程师负责数据提取和清洗，分析专家负责建模分析和报告撰写。适用于BI报表、经营分析、用户行为分析等场景。',
    software:'四人软件研发团队模板：产品经理拆解需求，架构师设计技术方案，开发工程师编写代码，测试工程师编写测试用例并验收。适用于功能开发、技术方案评审、代码审查等场景。',
    ux:'三人用户体验研究团队：用户研究员负责用户调研与行为分析，数据分析师负责数据统计与趋势洞察，体验优化师负责优化建议与改进方案。适用于产品体验优化、用户增长等场景。'
  };
  const teams=[
    ['HR 招聘团队','hr',3,0],['财务分析团队','finance',3,1],['培训课程开发团队','training',3,2],
    ['产品设计团队','product',3,1],['法务合规团队','legal',3,0],['营销策划团队','marketing',4,0],
    ['法务合规团队','legal',3,0],['VOC 新品洞察分析团队','voc',4,0],['test','',1,2],
    ['法务合规团队','legal',3,0],['数据分析团队','data',3,1],['财务分析团队','finance',3,0],
    ['产品设计团队','product',3,8],['软件研发团队','software',4,1],['UX研究团队','ux',3,1],
    ['产品设计团队','product',3,7],['产品设计团队','product',3,1],['法务合规团队','legal',3,3],
    ['软件研发团队','software',4,3],['金虎建的团队','',1,0],['001产品设计团队','product',3,2]
  ].map(([name,kind,members,tasks],id)=>({name,description:descriptions[kind]||'',members,tasks,id}));
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icons={share:'<circle cx="6" cy="12" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="m8 11 8-5M8 13l8 5"/>',edit:'<path d="M13 5H5v14h14v-8M10 14l1-4 8-8 3 3-8 8-4 1Z"/>',delete:'<path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7"/>'};
  const view=document.createElement('section');view.className='intelligent-teams-view';view.hidden=true;view.setAttribute('aria-labelledby','intelligent-teams-title');
  view.innerHTML=`<header class="intelligent-teams-header"><div class="intelligent-teams-heading"><h1 id="intelligent-teams-title">智能团队</h1><div class="intelligent-teams-tabs" aria-label="团队范围"><button data-scope="mine" aria-pressed="true">我的</button><button data-scope="shared" aria-pressed="false">共享</button></div></div><div class="intelligent-teams-create"><a href="#build-team-template">⊞ 从模板创建</a><button data-create>+ 新建团队</button></div></header><div class="intelligent-teams-grid"></div><p class="intelligent-teams-empty" hidden>暂无共享团队</p><p class="intelligent-teams-feedback" role="status"></p>`;
  document.querySelector('.main-content').append(view);
  const dialog=document.createElement('dialog');dialog.className='intelligent-team-dialog';dialog.setAttribute('aria-labelledby','team-action-title');document.body.append(dialog);let scope='mine',focus;
  function notice(title){focus=document.activeElement;dialog.innerHTML=`<h2 id="team-action-title">${esc(title)}</h2><p>参考图未包含此页面，待提供对应截图后复刻。</p><button autofocus>关闭</button>`;dialog.querySelector('button').onclick=()=>dialog.close();dialog.showModal();}dialog.onclose=()=>focus?.isConnected&&focus.focus();
  function render(){const list=teams.filter(t=>!t.deleted&&scope==='mine');view.querySelectorAll('[data-scope]').forEach(b=>b.setAttribute('aria-pressed',String(scope===b.dataset.scope)));view.querySelector('.intelligent-teams-grid').innerHTML=list.map(t=>`<article class="intelligent-team-card"><header><h2>${esc(t.name)}</h2><span>active</span></header><p class="intelligent-team-description">${esc(t.description)}</p><footer><span>成员: ${t.members}　任务: ${t.tasks}</span><div class="intelligent-team-actions">${Object.entries(icons).map(([action,svg])=>`<button data-action="${action}" data-id="${t.id}" aria-label="${{share:'共享',edit:'编辑',delete:'删除'}[action]}${esc(t.name)}"><svg viewBox="0 0 24 24" aria-hidden="true">${svg}</svg></button>`).join('')}</div></footer></article>`).join('');view.querySelector('.intelligent-teams-empty').hidden=!!list.length;view.querySelector('.intelligent-teams-empty').textContent=scope==='shared'?'暂无共享团队':'暂无团队';}
  view.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.scope){scope=b.dataset.scope;render();}if(b.hasAttribute('data-create'))notice('新建团队');if(b.dataset.action){const t=teams[Number(b.dataset.id)];if(b.dataset.action==='delete'){t.deleted=true;render();const feedback=view.querySelector('.intelligent-teams-feedback');feedback.innerHTML='已从本地原型移除，不影响已有系统。 <button>撤销</button>';feedback.querySelector('button').onclick=()=>{t.deleted=false;render();feedback.textContent='';};}else notice((b.dataset.action==='edit'?'编辑':'共享')+' · '+t.name);}};
  function sync(){view.hidden=location.hash!=='#build-team-management';if(!view.hidden){document.querySelector('.proto-page').hidden=true;document.querySelector('.service-catalog').hidden=true;}if(dialog.open)dialog.close();}window.addEventListener('hashchange',sync);render();sync();
})();
