/* Requirement mapping, not navigation or implementation status. */
(() => {
  const rows=[];
  const add=(area,group,name,old,change='保留',status='已确认',note='')=>rows.push({area,path:`${area} / ${group} / ${name}`,old,change,status,note});
  const service=(group,name,old,change,status,note)=>add('服务目录',group,name,old,change,status,note);
  add('公共入口','主菜单','个人中心','个人空间','新增入口','已确认','与服务目录平级，汇集个人知识、个人作品与个人日历。');
  [
    ['职能专家 / 职能专家管理','工作台 / 职能专家','文案调整','保留原业务卡片页；运行板块及实例入口已移除。'],
    ['智能团队 / 智能团队管理','工作台 / 智能团队','补充管理入口',''],
    ['Multi-Agent DAG','工作台 / 任务编排','命名调整','与职能专家、智能团队、AI Coding 并列；用于多 Agent 协作编排，不归入智能团队。当前提供入口说明，具体页面待按已有系统补充。'],
    ['AI Coding / 编程工作台','工作台 / Coding 空间','业务化改名','当前原型名为“编程工作台”；此前称 Coding 空间。']
  ].forEach(([n,o,c,m])=>service('构建',n,o,c,'已确认',m));
  service('业务连接','Skill 开发 / 技能构建','技能工厂','调整归属','已确认','作为连接中枢的业务连接第一项；点击后先展示说明，由用户点击按钮在新页签打开已有技能工厂；当前原型保留。');
  [['评估套件','评估套件'],['评估器','模板库'],['评测集','批次数据'],['评测任务','定时任务']].forEach(([n,o])=>service('评测',n,'数字分身能力评估 / '+o,n===o?'保留原名':'命名调整','已确认','根据用户提供的菜单对应图确认；复用对应旧系统功能，本轮已补齐入口，详细页面待补充。'));
  service('评测','评测报告','数字分身能力评估 / 评测记录','对应关系待确认','待确认','参考图保留“评测记录”但未明确标注新名称；暂按评测报告对应评测记录列出，待确认。');
  add('已移除','评测','原 Agent 评测入口','Worker 核心 / Worker 测试','移除目录入口','已确认','原 Worker 测试页面保留，不再将其误标为评估套件的旧系统来源。');
  [['专家实例 / 实例管理','实例管理'],['专家实例 / 实例模板','实例模板'],['专家实例 / 镜像管理','镜像管理']].forEach(([n,o])=>add('已移除','运行',n,'资源配置 / '+o,'后台归口','已确认','运行板块及实例入口已移除，保留底层原型。'));
  ['团队实例','Coding 实例'].forEach(n=>add('已移除','运行',n,'新增运行入口','参考图调整','已确认','运行板块及实例入口已移除。'));
  add('已移除','运行','版本管理','资源配置 / 版本管理','移除入口','已确认','按最新要求移除服务目录入口，原型页面保留。');
  service('开放集成','IM 渠道配置 / 渠道配置','渠道对接 / IM 渠道','保留原名','已确认','在服务目录工作台内复用后台渠道卡片、状态和操作入口；消息日志同样在工作台展示。新增、编辑等操作仍沿用后台原型的说明提示。');
  service('观测','IM 调用日志','渠道对接 / IM 日志','运行归类','已确认','移至观测，查看消息渠道的使用与调用记录。');
  add('已移除','运行','日历','个人空间 / 个人日历','移除入口','已确认','按最新要求移除服务目录入口，原型页面保留。');
  service('观测','运行看板','Worker 核心 / Worker 看板','观测归类','已确认','用于展示运行状态、集群拓扑与资源指标。');
  service('观测','指标监控','新增','新增入口','部分完成','位于运行看板下方；按参考截图复刻 Agent 基础分析，展示零数据指标卡片及性能、运营图表。其他页签待提供参考，不连接实时监控。');
  add('已移除','运行','专家实例 / Worker 管理','Worker 核心 / Worker 管理','运行管理归类','已确认','运行板块及 Worker 管理入口已移除，保留底层原型。');
  service('开放集成','智能体集成 / A2A 中心','Agent 纳管 / A2A 中心','归属已确认','已确认','归入企业连接中枢的开放集成；A2A 中心入口已预留，不与系统配置中的 A2A 纳管平台混用。');
  ['三方 Claw','三方 Claude Code'].forEach(n=>service('开放集成','智能体集成 / '+n,'三方纳管 / '+n,'迁移到服务目录','已确认','后台三方纳管分组已移除；页面与交互保留，旧链接转到服务目录入口。'));
  service('观测','价值分析 / Worker 价值','Worker 核心 / Worker 价值','文案调整','已确认','工作台内复用已核对的 /worker-value 概览及活跃排名；其他标签和时间范围尚未完整核对。');
  [['成员管理','用户管理'],['部门与组织','组织管理'],['菜单权限','菜单组管理']].forEach(([n,o])=>service('管理','组织与成员 / '+n,'系统配置 / 组织用户 / '+o,'保留业务侧入口','已确认','与安全、审计入口统一归类；Portal 管理及其他平台配置仍保留后台。'));
  ['安全中心','审计中心'].forEach(n=>service('观测','安全审计 / '+n,'系统管理 / '+n,'融合业务侧入口','已确认','工作台内展示本地原型；运营后台入口已移除。模型风险审计仍在 AI 模型。'));
  service('管理','客户端管理','系统管理 / 客户端设备','增加业务侧入口','已确认','在工作台内复用客户端设备管理页面及各配置标签；运营后台入口已移除。');
  service('管理','超管后台','左下角 / 运营后台','迁移并改名','已确认','从左下角移至管理板块，进入现有后台系统配置页面。');
  service('管理','模型配额','待核对已有系统对应功能','新增入口','已确认','按用户要求在管理下展示独立入口；详细计价规则及功能页面待补充。');
  service('观测','模型安全 / 风险审计','AI 模型 / 风险审计','归回模型管理','已确认','模型安全移至观测，保留风险审计页面。');
  service('管理','模型管理 / 推理模型','AI 模型 / 模型管理','菜单拆分','已确认','合并至治理的管理分组，以模型管理作为统一入口。');
  service('管理','模型管理 / 模型管控','AI 模型 / 网页模型可见性','业务化改名','已确认','在服务目录当前工作台展示，复用后台页面内容与样式。');
  service('管理','模型管理 / 多模态模型','AI 模型 / 多模态模型','重新归类','已确认','收纳到治理的模型管理统一入口。');
  ['模型调用日志','多模态调用日志','检索调用日志'].forEach(n=>service('观测','模型调用日志 / '+n,'AI 模型 / '+n,'增加业务侧入口','已确认','在服务目录当前工作台展示，复用后台日志内容与样式；风险审计归入模型管理的模型安全。'));
  service('知识资产','知识库','个人空间 / 个人知识','保留入口','已确认','知识资产仅保留知识库入口，移除待研发标签；不代表后台功能已完成研发。');
  service('Agent 资产','Agent Skill','内容 & 工具 / 技能广场','命名调整','已确认','与 Skill 开发区分：Skill 开发用于创建，Agent Skill 归入企业资产统一沉淀。');
  service('Agent 资产','Coding Skill','内容 & 工具 / Coding 技能','命名调整','已确认','从构建模块移入企业资产，统一沉淀可复用的 Coding Skill。');
  service('Agent 资产','能力命令库','内容 & 工具 / 能力命令广场','重新归类','已确认','作为可复用企业能力资产的管理入口。');
  service('Agent 资产','业务工作台','新增业务入口','新增菜单','已确认','归入企业资产，作为面向业务工作台能力的统一入口。');
  service('Agent 资产','智能团队模板','内容 & 工具 / 团队模板','文案调整','已确认','从构建模块移入企业资产，作为可复用团队配置资产。');
  service('Agent 资产','职能专家模板','Worker 核心 / 职能专家模板','重新归类','已确认','从构建模块移入企业资产，作为可复用职能专家模板。');
  [['数据连接器','连接器'],['数据查询器','查询器']].forEach(([n,o])=>service('业务连接',n,'企业连接 / '+o,'新页签跳转说明','已确认','归入企业连接中枢；点击仅展示“独立新页签打开”的说明，不绘制功能原型，不实际打开本地新页签。'));
  service('业务连接','业务集成器','企业连接 / 业务集成中心','文案调整','已确认','归入企业连接中枢；点击仅展示“独立新页签打开”的说明，不绘制功能原型，不实际打开本地新页签。');
  service('开放集成','MCP 工具','内容 & 工具 / MCP 工具','增加业务侧入口','已确认','归入企业连接中枢；工作台内复用按实际系统参考图绘制的工具管理页面、范围筛选与工具列表，不再使用通用示例表。');
  service('开放集成','回调配置','渠道对接 / 外部回调','命名调整','已确认','归入企业连接中枢；页面采用回调入口列表与配置工作区，支持创建本地草稿；后台渠道对接分组已移除。');
  [['新建任务','工作台 / 新建任务','保留'],['Skills 中心','技能广场','独立入口'],['创作中心','工作台 / 创作画布','改名'],['应用中心','工作台 / 价值应用','改名 / 调整应用']].forEach(([n,o,c])=>add('探索','左侧快捷入口',n,o,c,'已确认',n==='应用中心'?'移除能力评估系统卡片，新增 PivotCreation、PivotInsight。':''));
  const groups={
    '资源配置':['镜像管理','实例模板','实例管理'],
    '内容 & 工具':['文档','操作手册'],
    'Portal 管理':['租户管理','应用市场','首页设置','客户申请'],
    '系统管理':['PivotAdmin','系统配置']
  };
  Object.entries(groups).forEach(([g,names])=>names.forEach(n=>add('运营后台',g,n,g+' / '+n,'保留','已确认',g==='Portal 管理'?'仅保留运营后台入口，不放入服务目录。':g==='内容 & 工具'?'后台仅保留文档、操作手册；其余内容与工具菜单已迁入服务目录。':'当前后台仍保留此入口；服务目录如有对应入口，另行列出，不表示页面交互全部完成。')));
  const settings=[['',['我的 API 凭证','企业设置','基础配置','邮件发送']],['组织用户',['用户管理','组织管理','菜单组管理']],['认证配置',['第三方 OAuth2 登录','开放 OAuth2','OpenAPI 凭证（系统级）']],['自定义菜单',['独跳菜单']],['外部集成',['A2A 纳管平台','代理池','检索引擎','Gitea 代码仓库','Figma 设计集成','HiPPT']],['审计与安全',['审计日志','License 管理','平台版本']]];
  settings.forEach(([g,names])=>names.forEach(n=>add('运营后台','系统管理 / 系统配置',`${g?g+' / ':''}${n}`,`系统配置 / ${g?g+' / ':''}${n}`,'保留配置入口','已确认',g==='组织用户'?'服务目录系统管理另有成员、组织及菜单权限入口。':n==='A2A 纳管平台'?'平台级接入配置，不等同于服务目录的 A2A 中心。':n==='审计日志'?'Coding 项目域审计日志，不等同于系统管理的审计中心或 AI 模型的风险审计。':'按当前系统配置页面子菜单列出；不作为服务目录独立功能。')));
  add('公共入口','服务目录右上角','消息','已有系统消息入口','补充入口','待确认','原型已提供消息入口与本地抽屉；未核实线上通知分类及业务接口。');
  // Reverse inventory from the saved existing-system console navigation, not inferred from similar labels.
  const oldGroups={
    'Worker 核心':['Worker 管理','职能专家模板','Worker 看板','Worker 价值','Worker 测试'],
    '资源配置':['镜像管理','实例模板','实例管理','版本管理'],
    '三方纳管':['三方 Claw','三方 Claude Code'],
    'AI 模型':['模型管理','多模态模型','网页模型可见性','模型调用日志','多模态调用日志','检索调用日志','风险审计'],
    '渠道对接':['IM 渠道','IM 日志','外部回调'],
    '内容 & 工具':['团队模板','MCP 工具','Coding 技能','技能广场','能力命令广场','文档','操作手册'],
    'Portal 管理':['租户管理','应用市场','首页设置','客户申请'],
    '系统管理':['客户端设备','审计中心','安全中心','PivotAdmin','系统配置']
  };
  const search=document.querySelector('#search'),area=document.querySelector('#area'),status=document.querySelector('#status');
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const originals=Object.entries(oldGroups).flatMap(([g,names])=>names.map(n=>`${g} / ${n}`));
  const missing=originals.filter(old=>!rows.some(r=>r.old===old));
  document.querySelector('#coverage-summary').textContent=`原系统运营后台 ${originals.length} 个菜单已逐项核对：${originals.length-missing.length} 项有新版对应，${missing.length} 项待补充。含共享入口，不重复计算原菜单。`;
  document.querySelector('#reverse-rows').innerHTML=originals.map(old=>{const matches=rows.filter(r=>r.old===old);return `<tr><td>${esc(old)}</td><td>${matches.length?matches.map(r=>esc(r.path)).join('<br>'):'待确认：尚无对应入口'}</td></tr>`;}).join('');
  document.querySelector('#summary').textContent=`${rows.length} 项菜单对应 · 含跨区域共享入口`;
  function render(){const q=search.value.trim().toLowerCase();const list=rows.filter(r=>(!area.value||r.area===area.value)&&(!status.value||r.status===status.value)&&Object.values(r).join(' ').toLowerCase().includes(q));document.querySelector('#mapping-rows').innerHTML=list.map(r=>`<tr><td data-label="新版菜单路径">${esc(r.path)}</td><td data-label="已有系统对应菜单">${esc(r.old)}</td><td data-label="调整方式">${esc(r.change)}</td><td data-label="确认状态 / 说明"><span class="status ${r.status==='待确认'?'pending':''}">${esc(r.status)}</span>${r.note?`<p>${esc(r.note)}</p>`:''}</td></tr>`).join('');document.querySelector('#result-count').textContent=`显示 ${list.length} / ${rows.length} 项`;document.querySelector('#empty').hidden=list.length!==0;}
  search.addEventListener('input',render);area.addEventListener('change',render);status.addEventListener('change',render);document.querySelector('#reset').onclick=()=>{search.value='';area.value='';status.value='';render();search.focus();};render();
})();
