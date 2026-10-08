/* PivotOne configuration demo. All changes remain in this browser. */
(() => {
  const prefix='#operations-pivotone-';
  const admin=document.documentElement.dataset.role==='admin';
  if(!admin)return;
  const menu=document.createElement('section');menu.className='operations-menu-group';
  menu.innerHTML='<details open><summary>PivotOne 网页端配置</summary><div class="operations-submenu"><a href="'+prefix+'users" data-operations-link>用户管理</a><a href="'+prefix+'agents" data-operations-link>Agent 管理</a></div></details>';
  document.querySelector('.operations-nav-list').append(menu);
  const page=document.createElement('section');page.className='pivotone-page';page.hidden=true;document.querySelector('.main-content').append(page);
  const defaults={models:{},members:[],experts:[['需求分析','专注业务需求分析与梳理，明确功能需求与用户场景。',false],['应用开发','暂无描述',false],['数据分析1','专注基础数据分析与业务洞察，支持数据查询、统计汇总与趋势分析。',true],['金虎建的职能专家','暂无描述',false],['企业财务分析','分析财务数据与经营指标，支持财务复盘与成果沉淀。',false]],teams:[]};
  let state;try{state=JSON.parse(localStorage.getItem('pivotone-demo-v1'))||defaults;}catch(_){state=defaults;}
  // Only seed the 15 teams visible in the reference; preserve existing listing states.
  const referenceTeams=[
    ['产品设计团队','三人产品设计团队：产品经理负责产品定义与路线规划，需求分析师负责需求收集与优先级排序，原型设计师负责交互设计与原型输出。适用于互联网产品、SaaS 应用等场景。'],
    ['VOC 新品洞察分析团队','四人 VOC（客户声音）新品洞察分析团队：数据工程师负责 CSV 数据读取、新品识别与打分排序；市场洞察分析师分析趋势；产品概念创意师生成新品概念，协同输出洞察成果。'],
    ['法务合规团队','三人法务合规团队：合同审核员负责合同条款审核与风险识别，法规研究员负责法规检索与合规建议，风险评估师负责综合风险评估与报告输出。适用于企业法务部门、合规审查等场景。'],
    ['UX研究团队','三人用户体验研究团队：用户研究员负责用户调研与行为分析，数据分析师负责数据统计与趋势洞察，体验优化师负责优化建议与改进方案。适用于产品体验优化、用户增长等场景。'],
    ['项目管理团队','三人项目管理团队：项目经理负责整体规划与协调，进度跟踪员负责任务拆解与进度监控，风险管理员负责风险识别与应对策略。适用于软件开发、工程项目等场景。'],
    ['培训课程开发团队','三人培训课程团队：课程设计师负责课程体系规划与教学设计，内容编写员负责课件与教材编写，评估设计师负责考核标准设计与效果评估。适用于企业培训、在线教育等场景。'],
    ['软件研发团队','四人软件研发团队模板：产品经理拆解需求，架构师设计技术方案，开发工程师编写代码，测试工程师编写测试用例并验收。适用于功能开发、技术方案评审、代码审查等场景。'],
    ['安全审计团队','三人安全审计团队：安全扫描员负责安全扫描与漏洞发现，漏洞分析师负责漏洞验证与风险评级，合规审计员负责合规检查与审计报告。适用于网络安全、等保合规等场景。'],
    ['财务分析团队','三人财务分析团队：财务分析师负责财务数据分析与指标解读，预算规划师负责预算编制与资源分配，报表生成员负责报表生成与可视化输出。适用于财务管理、投资分析等场景。'],
    ['医疗咨询团队','三人医疗咨询团队：预诊分流员负责症状分析与科室推荐，健康顾问负责健康建议与生活指导，报告解读员负责体检化验报告解读。仅供辅助参考，不替代专业医疗诊断。'],
    ['营销策划团队','四人营销策划团队模板：市场策略师负责市场分析和策略制定，创意总监负责创意方案和视觉方向，文案专员负责广告文案和传播素材，投放分析师负责渠道策略和效果评估。'],
    ['知识库运营团队','三人知识库运营团队：知识采集员负责知识收集与整理，内容审核员负责质量审核与纠错，分类标注员负责知识分类与标签体系维护。适用于企业知识管理、FAQ 运营等场景。'],
    ['HR 招聘团队','三人招聘流程团队模板：招聘专员负责职位分析和简历初筛，面试官负责技术与业务能力评估，HR 主管负责综合评估和薪酬建议。适用于批量招聘、校招、社招等场景。'],
    ['数据分析团队','三人数据分析团队模板：需求分析师负责理解业务问题并转化为分析任务，数据工程师负责数据提取和清洗，分析专家负责建模分析和报告撰写。适用于 BI 报表、经营分析、用户行为分析等场景。'],
    ['销售支持团队','三人销售支持团队：线索分析师负责销售线索评分与筛选，话术优化师负责销售话术设计与优化，CRM 管理员负责客户数据管理与跟进策略。适用于 ToB 销售、渠道管理等场景。']
  ];
  state.teams??=[];
  referenceTeams.forEach(([name,description])=>{if(!state.teams.some(row=>row[0]===name))state.teams.push([name,description,false]);});
  let tab='members',category='experts',group='全部',department='全部';
  // Directory placeholders, not real organization records. No member creation here.
  const directory=[{id:'user-a',name:'用户 A',group:'业务用户组',department:'业务部'},{id:'user-b',name:'用户 B',group:'业务用户组',department:'财务部'},{id:'user-c',name:'用户 C',group:'技术用户组',department:'研发部'},{id:'user-d',name:'用户 D',group:'技术用户组',department:'运维部'}];
  state.webMembers??=[];state.webModels??={reasoning:[],multimodal:[]};
  const memberDraft=new Set(state.webMembers);
  const modelDraft={reasoning:new Set(state.webModels.reasoning),multimodal:new Set(state.webModels.multimodal)};
  const multimodal=[['wcnbai-gpt-image-2','图片生成'],['wcnbai-gemini-3-pro-image','图片生成'],['doubao-seedance-2-0-mini-260615','视频生成']];
  const models=[['qwen3.7-plus','openai'],['Claude-Opus-4.8-PackAPI','anthropic'],['Claude-Opus-5-PackAPI','anthropic'],['GLM-4.7','anthropic'],['GLM-5.2','anthropic'],['claude-opus-4.8-zenmux','anthropic'],['claude-opus-5-zenmux','anthropic'],['wcnba-gemini-3.1-pro-preview','anthropic']];
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const filter=(label,key,values,current)=>'<label>'+label+'<select data-directory-filter="'+key+'">'+['全部',...values].map(v=>'<option '+(v===current?'selected':'')+'>'+esc(v)+'</option>').join('')+'</select></label>';
  function save(){try{localStorage.setItem('pivotone-demo-v1',JSON.stringify(state));return true;}catch(_){return false;}}
  function status(text){page.querySelector('[role=status]').textContent=text;}
  function render(){
    const agents=location.hash===prefix+'agents';
    page.innerHTML='<header><h1>'+(agents?'Agent 管理':'用户管理')+'</h1><p>PivotOne 网页端配置 · 本地演示，不影响线上配置</p></header><div class="po-layout"><nav aria-label="配置分类">'+(agents?'<button data-category="experts" aria-pressed="'+(category==='experts')+'">职能专家</button><button data-category="teams" aria-pressed="'+(category==='teams')+'">智能团队</button>':'<button data-tab="members" aria-pressed="'+(tab==='members')+'">成员管理</button><button data-tab="models" aria-pressed="'+(tab==='models')+'">模型配置</button>')+'</nav><div class="po-content"></div></div><p class="po-status" role="status"></p>';
    const content=page.querySelector('.po-content');
    if(agents){const rows=state[category];content.innerHTML='<div class="po-heading"><div><h2>'+(category==='experts'?'职能专家':'智能团队')+'上架管理</h2><p>上架后供已获网页端访问权限的成员使用</p></div><span>已上架 '+rows.filter(r=>r[2]).length+'/'+rows.length+'</span></div><div class="po-cards">'+rows.map((r,i)=>'<article><div><h3>'+esc(r[0])+'</h3><span class="'+(r[2]?'po-live':'')+'">'+(r[2]?'✓ 已上架':'○ 未上架')+'</span></div><p title="'+esc(r[1])+'">'+esc(r[1])+'</p><button data-publish="'+i+'" class="'+(r[2]?'':'po-primary')+'">'+(r[2]?'下架':'上架')+'</button></article>').join('')+'</div>'+(rows.length?'':'<div class="po-empty">暂无智能团队可上架</div>')+'<small>卡片为参考图示例，未加载真实 Agent 数据</small>';}
    else if(tab==='models'){content.innerHTML='<h2>模型配置</h2><p>选择 PivotOne 网页端开放的模型，推理模型与多模态模型分别配置</p><form data-model-form><div class="po-model-columns">'+[['reasoning','推理模型',models],['multimodal','多模态模型',multimodal]].map(([key,title,rows])=>'<section><h3>'+title+'</h3><div class="po-models">'+rows.map(([name,provider])=>'<label><input type="checkbox" data-model-kind="'+key+'" value="'+esc(name)+'" '+(modelDraft[key].has(name)?'checked':'')+'><strong>'+esc(name)+'</strong><span>'+provider+'</span></label>').join('')+'</div></section>').join('')+'</div><footer><button class="po-primary" type="submit">保存模型配置</button></footer></form><small>模型来自现有原型示例，未连接真实模型服务；配置仅控制网页端模型演示</small>';}
    else{const rows=directory.filter(m=>(group==='全部'||m.group===group)&&(department==='全部'||m.department===department));content.innerHTML='<h2>成员管理</h2><p>从用户组与组织部门中选择成员，勾选后开放 PivotOne 网页端访问</p><div class="po-directory-filters">'+filter('用户组','group',[...new Set(directory.map(m=>m.group))],group)+filter('组织部门','department',[...new Set(directory.map(m=>m.department))],department)+'</div><form data-access-form><div class="po-table"><table><thead><tr><th>开放网页端</th><th>成员</th><th>用户组</th><th>组织部门</th></tr></thead><tbody>'+rows.map(m=>'<tr><td><input type="checkbox" data-member-access="'+m.id+'" aria-label="向'+esc(m.name)+'开放网页端" '+(memberDraft.has(m.id)?'checked':'')+'></td><td>'+esc(m.name)+'</td><td>'+esc(m.group)+'</td><td>'+esc(m.department)+'</td></tr>').join('')+'</tbody></table></div>'+(rows.length?'':'<div class="po-empty">当前筛选条件下暂无成员</div>')+'<footer><span>已选择 '+memberDraft.size+' 位成员（含其他筛选条件下的成员）</span><button class="po-primary" type="submit">保存访问权限</button></footer></form><small>用户组、部门和成员为演示占位；正式接入已有组织目录，不在此新增用户</small>';}
  }
  page.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.tab){tab=b.dataset.tab;render();}if(b.dataset.category){category=b.dataset.category;render();}if(b.hasAttribute('data-publish')){const row=state[category][Number(b.dataset.publish)];row[2]=!row[2];const ok=save();render();status(ok?'已'+(row[2]?'上架':'下架')+'（仅本地演示）':'浏览器存储不可用，变更仅在当前页面有效');}if(b.dataset.remove){state.members=state.members.filter(m=>m.id!==b.dataset.remove);const ok=save();render();status(ok?'已移除本地演示成员':'仅在当前页面移除，未保存');}});
  page.addEventListener('change',e=>{const t=e.target;if(t.dataset.directoryFilter){if(t.dataset.directoryFilter==='group')group=t.value;else department=t.value;render();}if(t.dataset.memberAccess){if(t.checked)memberDraft.add(t.dataset.memberAccess);else memberDraft.delete(t.dataset.memberAccess);render();}if(t.dataset.modelKind){if(t.checked)modelDraft[t.dataset.modelKind].add(t.value);else modelDraft[t.dataset.modelKind].delete(t.value);}});
  page.addEventListener('submit',e=>{e.preventDefault();if(e.target.matches('[data-model-form]'))state.webModels={reasoning:[...modelDraft.reasoning],multimodal:[...modelDraft.multimodal]};else if(e.target.matches('[data-access-form]'))state.webMembers=[...memberDraft];else return;const ok=save();status(ok?'已保存本地配置，未修改线上权限':'浏览器存储不可用，未持久保存');});
  function sync(){const active=[prefix+'users',prefix+'agents'].includes(location.hash);page.hidden=!active;if(!active)return;document.querySelectorAll('.main-content > section').forEach(el=>el.hidden=el!==page);document.querySelector('[data-operations-nav]').hidden=false;document.body.classList.add('is-operations-route');menu.querySelectorAll('a').forEach(a=>{a.classList.toggle('is-active',a.hash===location.hash);if(a.hash===location.hash)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});render();}
  window.addEventListener('hashchange',sync);sync();
})();
