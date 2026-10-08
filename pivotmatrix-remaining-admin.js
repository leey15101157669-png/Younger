/* Remaining admin screens reconstructed from the public production frontend
 * index-CatH2OAW.js (2026-09-07). No production APIs, tokens, or private records. */
(() => {
  const host=document.querySelector('.main-content');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const btn=(s,action='',primary=false)=>`<button type="button" ${action?`data-action="${esc(action)}"`:''} class="${primary?'ra-primary':''}">${esc(s)}</button>`;
  const input=(label,value='',type='text',required=false)=>`<label>${esc(label)}<input name="${esc(label)}" type="${type}" value="${esc(value)}" ${required?'required':''}></label>`;
  const select=(label,items)=>`<label>${esc(label)}<select name="${esc(label)}">${items.map(x=>`<option>${esc(x)}</option>`).join('')}</select></label>`;
  const check=(label,on=false)=>`<label class="ra-check"><input type="checkbox" name="${esc(label)}" ${on?'checked':''}>${esc(label)}</label>`;
  const textarea=(label,value='')=>`<label>${esc(label)}<textarea name="${esc(label)}" rows="4">${esc(value)}</textarea></label>`;
  const empty=(s='暂无数据')=>`<div class="ra-empty">${esc(s)}</div>`;
  const table=(cols,rows=[],actions=[])=>`<div class="ra-table-wrap"><table><thead><tr>${cols.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.map((r,i)=>`<tr>${r.map(x=>`<td>${esc(x)}</td>`).join('')}${actions.length?`<td>${actions.map(a=>btn(a,`${a}:${i}`)).join(' ')}</td>`:''}</tr>`).join(''):`<tr><td colspan="${cols.length}">${empty()}</td></tr>`}</tbody></table></div>`;
  const stats=labels=>`<div class="ra-stats">${labels.map(x=>`<article><span>${esc(x)}</span><strong>—</strong><small>未载入线上数据</small></article>`).join('')}</div>`;
  const box=(title,html)=>`<section class="ra-box"><h3>${esc(title)}</h3>${html}</section>`;
  const filters=(html)=>`<div class="ra-filters">${html}</div>`;
  const pager=()=>'<footer class="ra-pager">共 0 条 <button disabled>上一页</button><span>1 / 1</span><button disabled>下一页</button></footer>';
  const form=(html,submit='保存')=>`<form class="ra-form">${html}<footer><button class="ra-primary" type="submit">${esc(submit)}</button><span role="status"></span></footer></form>`;
  const panels={};
  const policyItems=[['agreement','用户协议','协议链接'],['privacy','隐私政策','政策链接'],['icp','ICP备案号','备案查询链接'],['police','公安备案号','备案查询链接']];
  function policyPanel(s){
    if(!s.clientPolicies){try{s.clientPolicies=JSON.parse(localStorage.getItem('pivotmatrix-client-policies'))||{};}catch(_){s.clientPolicies={};}}
    return '<form class="ra-form client-policy-form"><p>分别控制客户端登录页、设置页等位置的协议与备案信息展示。关闭展示不会删除已填写的内容。</p>'+policyItems.map(([id,label,urlLabel])=>{const v=s.clientPolicies[id]||{};return box(label,`<label class="ra-check"><input type="checkbox" role="switch" name="${id}-enabled" ${v.enabled?'checked':''}>在客户端展示${label}</label><div class="ra-two">${input(id==='icp'||id==='police'?'备案号（'+label+'）':'展示名称（'+label+'）',v.text||((id==='agreement'||id==='privacy')?label:'')).replace('<input name="','<input data-policy-text="'+id+'" name="')}${input(urlLabel+'（'+label+'）',v.url||'','url').replace('<input name="','<input data-policy-url="'+id+'" name="')}</div>`);}).join('')+box('客户端展示预览','<div class="client-policy-preview">'+policyPreview(s.clientPolicies)+'</div>')+'<footer><button class="ra-primary" type="submit">保存展示配置</button><span role="status"></span></footer><small>仅保存本地原型配置，未下发真实客户端；展示开关不代表协议同意状态。</small></form>';
  }
  function policyPreview(values){const shown=policyItems.filter(([id])=>values[id]?.enabled);return shown.length?shown.map(([id,label])=>'<span style="display:inline-block;margin:6px 20px 6px 0;color:var(--color-accent)">'+esc(values[id].text||label)+'</span>').join(''):'<span>所有展示项已关闭，客户端不显示协议与备案信息</span>';}
  function readPolicies(f){return Object.fromEntries(policyItems.map(([id])=>[id,{enabled:f.elements[id+'-enabled'].checked,text:f.querySelector('[data-policy-text="'+id+'"]').value.trim(),url:f.querySelector('[data-policy-url="'+id+'"]').value.trim()}]));}
  const dialog=document.createElement('dialog');dialog.className='ra-dialog';document.body.append(dialog);let lastFocus;
  function modal(title,html,onSubmit){lastFocus=document.activeElement;dialog.innerHTML=`<header><h2>${esc(title)}</h2>${btn('关闭','close')}</header>${html}`;dialog.querySelector('[data-action=close]').onclick=()=>dialog.close();const f=dialog.querySelector('form');if(f)f.onsubmit=e=>{e.preventDefault();if(onSubmit)onSubmit(Object.fromEntries(new FormData(f)));dialog.close();};dialog.showModal();}dialog.onclose=()=>lastFocus?.isConnected&&lastFocus.focus();
  function notice(title){modal(title,`<p>此入口已按原系统保留。当前为本地原型，不连接线上服务；该操作的后续流程尚未核对。</p>`);}
  function screen(route,title,subtitle,tabs,render,actions){const el=document.createElement('section');el.className='remaining-admin-page';el.hidden=true;host.append(el);let active=tabs[0]||'';const state={};function draw(){el.innerHTML=`<header class="ra-page-header"><div><h1>${esc(title)}</h1>${subtitle?`<p>${esc(subtitle)}</p>`:''}</div><div>${(actions||[]).map(x=>btn(x,x,true)).join(' ')}</div></header>${tabs.length?`<nav class="ra-tabs" aria-label="${esc(title)}分类">${tabs.map(x=>`<button data-tab="${esc(x)}" aria-selected="${x===active}" class="${x===active?'active':''}">${esc(x)}</button>`).join('')}</nav>`:''}<div class="ra-body">${render(active,state)}</div><p class="ra-footnote">本地交互原型 · 按已有系统页面结构复刻，未载入线上业务数据。</p><p class="ra-status" role="status"></p>`;}
    if(route==='operations-coding-skills')state.rows=[{'显示名称':'演示技能','标识（目录名）':'demo-skill','分类':'通用','描述':'本地交互示例','公开可见':false}];
    if(route==='operations-manual')Object.assign(state,{spaces:['演示手册空间'],docs:[{name:'README.md',text:'# 操作手册（本地示例）\n\n此处展示文档编辑与保存流程，不代表线上手册正文。\n\n可从左侧新建文档，在此编辑 Markdown 后保存本地草稿。'}],selected:0});
    const baseDraw=draw;
    draw=()=>{baseDraw();const completed=completedPanel(route,active,state);if(completed!==null)el.querySelector('.ra-body').innerHTML=completed;if(route==='operations-skill-market')skillManagementNavigation(el,active,state);if(route==='operations-system-settings'){el.querySelector('.ra-tabs').innerHTML=settingsNavigation(active,state);el.querySelector('.ra-page-header h1').textContent=active;}};
    const api={el,state,draw,get active(){return active;},tab:x=>{active=x;draw();},action:null};panels[route]=api;
    el.addEventListener('input',e=>{const f=e.target.closest('.client-policy-form');if(!f)return;state.clientPolicies=readPolicies(f);f.querySelector('.client-policy-preview').innerHTML=policyPreview(state.clientPolicies);});
    el.addEventListener('submit',e=>{const f=e.target;if(!f.matches('.client-policy-form'))return;e.preventDefault();e.stopImmediatePropagation();const values=readPolicies(f);const status=f.querySelector('[role=status]');for(const [id,label] of policyItems){const v=values[id];if(v.enabled&&(!v.text||!/^https?:\/\//i.test(v.url))){status.textContent='请为已开启的'+label+'填写展示名称或备案号，以及有效的 http/https 链接';return;}}try{localStorage.setItem('pivotmatrix-client-policies',JSON.stringify(values));state.clientPolicies=values;status.textContent='已保存本地展示配置，未下发真实客户端';}catch(_){status.textContent='浏览器存储不可用，配置未保存';}});
    el.addEventListener('toggle',e=>{if(e.target.matches('.ra-settings-group')){state.collapsed??={};state.collapsed[e.target.dataset.group]=!e.target.open;}},true);
    el.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.tab){active=b.dataset.tab;draw();return;}if(b.dataset.action){if(completionAction(b.dataset.action,api))return;if(api.action?.(b.dataset.action,e)===true)return;notice(b.textContent);}};
    el.addEventListener('submit',e=>{e.preventDefault();if(e.target.classList.contains('ra-query')){el.querySelector('.ra-status').textContent='已按当前条件查询本地记录';return;}const values=Object.fromEntries(new FormData(e.target));const url=values['登录跳转地址'];if(url&&!/^https?:\/\//i.test(url)){e.target.querySelector('[role=status]').textContent='登录跳转地址必须以 http:// 或 https:// 开头';return;}e.target.querySelector('[role=status]').textContent='已保存本地演示设置，未修改线上配置';state.formValues=values;});draw();return api;}

  // Detailed panels use verified source fields. Demo rows are explicitly marked.
  function skillManagementNavigation(el,active,state){
    el.classList.add('ra-skill-management');
    const scopes=['公共广场','我的技能','分享给我'];
    const browsing=scopes.includes(active);
    if(browsing)state.browseScope=active;
    const nav=el.querySelector('.ra-tabs');
    nav.setAttribute('aria-label','技能管理栏目');
    nav.innerHTML=[['技能列表',state.browseScope||'公共广场',browsing],...['审核中心','冲突处理','升级与灰度'].map(t=>[t,t,active===t])].map(([label,target,selected])=>`<button type="button" data-tab="${esc(target)}" aria-pressed="${selected}" class="${selected?'active':''}">${label}</button>`).join('');
    el.querySelector('.ra-page-header h1').textContent='技能管理';
    el.querySelector('.ra-page-header > div:last-child').hidden=!browsing;
    if(browsing){
      const secondary=document.createElement('div');secondary.className='ra-skill-scopes';secondary.setAttribute('role','group');secondary.setAttribute('aria-label','技能可见范围');
      secondary.innerHTML=scopes.map(t=>`<button type="button" data-tab="${t}" aria-pressed="${active===t}" class="${active===t?'active':''}">${t}</button>`).join('');
      const body=el.querySelector('.ra-body');
      const toolbar=document.createElement('div');toolbar.className='ra-skill-toolbar';
      toolbar.append(secondary);
      const filters=body.querySelector('.ra-filters');
      if(filters)toolbar.append(filters);
      body.prepend(toolbar);
    }
  }
  function demoNote(){return '<p class="ra-sample-note">以下为本地示例数据，仅展示界面与交互，不代表线上配置。</p>';}
  function fields(list){return list.map(f=>Array.isArray(f)?select(f[0],f[1]):input(f,'',/密码|Secret|Token|SK/.test(f)?'password':'text')).join('');}
  function configurationSchemas(){return {
    '我的 API 凭证':['渠道名','备注'],
    '第三方 OAuth2 登录':['Key（如 github）','显示名称','Client ID','Client Secret','User ID 字段','User Email 字段'],
    '开放 OAuth2（client_id / client_secret）':['渠道名','回调 Redirect URI','备注'],
    'OpenAPI 凭证（系统级 AK / SK）':['渠道名','备注'],
    '独跳菜单':['菜单名称','链接地址（URL 或相对路径）',['打开方式',['新窗口打开','内嵌 Iframe','内部路由跳转（相对路径）']],['是否启用',['显示','隐藏']],['显示位置',['工作台首页侧边栏','运营后台侧边栏','价值应用']],'卡片图片'],
    'A2A 纳管平台':['平台名称','网关地址 (BaseURL)','A2A 路径','Access Key','Secret Key',['用户ID映射',['直接使用本平台 user.id','使用员工工号 (user_code)']]],
    '代理池':['名称',['类型',['http','socks5']],'地址','用户名（可选）','密码（可选）','额外 NO_PROXY（可选）'],
    '检索引擎管理':['名称','类型','API Key','优先级（越小越优先）','Base URL（可选）','最大结果数',['关联代理（可选）',['无']]],
    'Gitea 代码仓库':['Gitea 地址','管理员 Token','管理员用户名','管理员密码'],
    'Figma 设计集成':['Figma App 的 client_id','Figma App 的 client_secret','回调地址覆盖（可选）','Scope（可选，留空用默认）','允许嵌入域名（可选，逗号分隔）'],
    'HiPPT':['Base URL','Access Key','Secret Key'],
    '用户管理':['邮箱','姓名','员工ID','岗位',['角色',['普通用户','管理员']]],
    '平台版本':['版本号','标题','发布日期']
  };}
  function completionAction(a,p){
    if(a==='示例全选'||a==='示例全不选'){p.el.querySelectorAll('.ra-model-options input').forEach(e=>e.checked=a==='示例全选');return true;}
    if(a.startsWith('配置新增:')){const key=a.slice(5),schema=configurationSchemas()[key];if(!schema)return false;modal(`新增${key}（本地）`,form(fields(schema)+`<p>仅在本地原型中保存，不生成真实凭据或发送邀请。</p>`),r=>{p.state.configs??={};p.state.configs[key]??=[];p.state.configs[key].push(r);p.draw();});return true;}
    if(a==='邀请演示'){modal('发送邀请（本地演示）',form(input('邮箱','','email',true)+select('角色',['成员','管理员'])) ,r=>{p.state.invites??=[];p.state.invites.push([r['邮箱'],r['角色'],'待接受','示例有效期']);p.draw();});return true;}
    if(a==='邀请列表'){modal('邀请记录',table(['邮箱','角色','状态','过期时间'],p.state.invites||[['member@example.com','成员','待接受','示例有效期']]));return true;}
    if(a==='租户添加模板'){modal('添加模版配置',form(select('类型',['职能专家','职能团队'])+select('选择模版',['应用开发','数据分析1','企业财务分析','HR 招聘团队'])+input('显示名称')+check('自动启动')+check('已启用',true)),r=>{p.state.templates??=[];p.state.templates.push([r['显示名称']||r['选择模版'],r['类型'],r['自动启动']?'自动启动':'手动启动','已启用','未拉起']);p.draw();});return true;}
    if(a==='配置保存'){p.el.querySelector('.ra-status').textContent='已保存本地演示配置；未修改线上设置';return true;}
    if(a==='升级演示'){modal('创建升级任务（本地）',form(select('类型',['PivotClaw','EchoClaw','TeamsClaw'])+input('目标版本号','','text',true)+input('下载地址')+input('批次大小','1','number')+input('批次间隔 (秒)','30','number'),'确认创建'),r=>{p.state.upgrades??=[];p.state.upgrades.push([r['类型'],r['目标版本号'],'本地草稿',r['批次大小']]);p.draw();});return true;}
    return false;
  }
  function completedPanel(route,tab,s){
    const modelList=()=>form('<div class="ra-toolbar">'+btn('全选','示例全选')+btn('全不选','示例全不选')+'</div><div class="ra-model-options">'+['qwen3.7-plus','gpt-4.1','DeepSeek-V3'].map(m=>check(m,true)).join('')+'</div>');
    const demoStats=items=>'<div class="ra-stats">'+items.map(([label,value])=>`<article><span>${esc(label)}</span><strong>${esc(value)}</strong><small>演示数据</small></article>`).join('')+'</div>';
    if(route==='operations-customer-applications')return demoNote()+filters(select('状态',['全部','待处理','已联系','已通过','已拒绝']))+table(['企业名称','联系人','联系方式','需求','状态','时间','操作'],[['演示企业','示例联系人','contact@example.com','企业智能助手试用','待处理','示例日期','—']]);
    if(route==='operations-audit-center')return demoNote()+`<form class="ra-query ra-filters">${select('用户',['全部用户','演示成员'])}${select('动作',tab==='登录日志'?['全部','密码登录','登录失败','注册','OAuth2 登录']:['全部','创建','更新','删除','执行'])}${input('起始时间','','datetime-local')}${input('结束时间','','datetime-local')}<button>查询</button><button type="reset">重置</button></form>`+table(tab==='登录日志'?['时间','用户','动作','认证方式','IP','状态','失败原因']:['时间','用户','模块','动作','操作对象','方法','路径','状态码','详情'],tab==='登录日志'?[['示例时间','member@example.com','密码登录','邮箱','192.0.2.1','成功','—']]:[['示例时间','member@example.com','系统配置','更新','示例配置','PUT','/demo/config','200','本地示例']]);
    if(route==='operations-risk-audit'){
      if(tab==='数据概览')return demoNote()+demoStats([['待处理',1],['高危告警',1],['处置率','50%'],['平均处置时间','2 分钟']])+`<div class="ra-two">${box('告警趋势（近 14 天）',table(['日期','告警数量'],[['演示第 1 天','1'],['演示第 2 天','2']]))}${box('规则命中排行 Top 10',table(['规则','命中次数'],[['危险命令（示例）','2'],['敏感关键词（示例）','1']]))}</div>`+box('处置效率',demoStats([['总告警数',2],['已处置',1]]));
      if(tab==='告警列表')return demoNote()+filters(select('状态',['全部状态','待处理','已解决'])+select('等级',['全部等级','高危','中危','低危'])+btn('刷新','配置保存'))+box('危险命令（示例）','<p>状态：待处理　风险等级：高危</p><p>命中详情：演示风险事件，未包含真实请求或工具调用。</p>'+btn('查看原始日志','查看原始日志'));
      if(tab==='检测规则')return demoNote()+form(table(['状态','规则名称','风险等级','检测说明'],[['示例启用','危险命令（示例）','高危','检测危险工具调用'],['示例启用','敏感关键词（示例）','中危','检测输出中的敏感关键词']])+check('启用本地规则演示',true),'保存更改');
    }
    if(route==='operations-security-center'){
      if(tab==='安全总览')return demoNote()+demoStats([['已接管实例',1],['活跃告警',1],['扫描通过率','100%'],['待升级实例',0]])+`<div class="ra-two">${box('版本分布',table(['版本','实例数'],[['demo-1.0','1']]))}${box('最近告警',table(['实例','消息'],[['演示实例','演示告警记录']]))}</div>`;
      if(tab==='实例管理')return demoNote()+filters(input('搜索实例名称')+select('类型',['全部类型','PivotClaw']))+box('演示实例','<p>类型：PivotClaw　版本：demo-1.0</p><p>运行状态：本地演示</p>'+btn('实时状态','实时状态')+btn('安全扫描','安全扫描')+btn('告警记录','告警记录'));
      if(tab==='安全告警')return demoNote()+filters(select('类型',['全部'])+check('显示已解决'))+table(['实例','类型','等级','消息','时间','操作'],[['演示实例','本地演示','低','示例安全事件','示例时间','—']]);
    }
    if(route==='operations-system-settings'){
      if(['企业设置','基础配置','邮件发送（SMTP）'].includes(tab))return null;
      if(tab==='用户管理')return demoNote()+filters(input('搜索邮箱 / 姓名')+btn('添加用户','配置新增:用户管理',true))+table(['邮箱','姓名','员工ID','岗位','登录来源','角色','状态','创建时间'],[['member@example.com','演示成员','DEMO-001','示例岗位','邮箱','普通用户','正常','示例日期'],...(s.configs?.[tab]||[]).map(r=>[r['邮箱'],r['姓名'],r['员工ID'],r['岗位'],'本地','普通用户','正常','本次会话'])]);
      if(tab==='组织管理')return demoNote()+filters(input('搜索部门 / 成员 / 用户组'))+`<div class="ra-two">${box('组织部门',table(['部门','成员'],[['示例组织','1']]))}${box('用户组',table(['名称','成员'],[['演示用户组','1']]))}</div>`;
      if(tab==='菜单组管理')return demoNote()+`<div class="ra-two">${box('菜单组',table(['名称','描述'],[['默认菜单组（示例）','本地演示']]))}${box('可见菜单项',form('<h3>运营后台菜单</h3>'+check('Worker 核心',true)+check('资源配置',true)+check('系统管理',true)+'<h3>用户工作台菜单</h3>'+check('新建任务',true)+check('Skills 中心',true)))}</div>`;
      if(tab==='审计日志（Coding 项目域）')return demoNote()+filters(input('项目')+input('操作人')+select('动作',['全部','读取','下载'])+select('决策',['全部','允许','拦截'])+input('起始时间','','datetime-local')+input('结束时间','','datetime-local'))+table(['时间','项目','操作人','动作','目标类型','决策'],[['示例时间','演示项目','示例成员','读取','文档','允许']]);
      if(tab==='License 管理')return demoNote()+stats(['运行模式','到期时间','剩余天数'])+box('功能权限',table(['功能','授权'],[['本地演示','未连接 License 服务']]))+box('资源配额',table(['资源','配额'],[['实例','未载入真实授权']]))+box('License 操作',input('上传 license.dat','','file')+btn('刷新 License','刷新 License'));
      if(tab==='平台版本')return demoNote()+btn('新建','配置新增:平台版本',true)+table(['版本号','标题','发布日期','状态'],[['demo-1.0','演示版本','示例日期','草稿'],...(s.configs?.[tab]||[]).map(r=>[r['版本号'],r['标题'],r['发布日期'],'草稿'])]);
      const schema=configurationSchemas()[tab];if(schema){const list=['我的 API 凭证','第三方 OAuth2 登录','开放 OAuth2（client_id / client_secret）','OpenAPI 凭证（系统级 AK / SK）','独跳菜单','A2A 纳管平台','代理池','检索引擎管理'].includes(tab);return demoNote()+(list?btn('新增','配置新增:'+tab,true):'')+form(box(tab,fields(schema)+check('启用',false)))+((s.configs?.[tab]||[]).length?table(['本地新增配置','状态'],s.configs[tab].map(r=>[Object.values(r)[0]||'未命名','本地草稿'])):'');}
    }
    if(route==='operations-tenant-management'){
      s.rows??=[{'租户名称':'演示企业',Slug:'demo-company','Owner 邮箱':'owner@example.com'}];
      if(tab==='租户列表')return demoNote()+btn('创建租户','创建租户',true)+`<div class="ra-card-grid">${s.rows.map((r,i)=>box(r['租户名称'],`<p>${esc(r.Slug)}</p><p>Owner：${esc(r['Owner 邮箱'])}</p><span class="ra-badge">试用</span><p>${btn('管理',`管理:${i}`)} ${btn('删除',`删除:${i}`)}</p>`)).join('')}</div>`;
      const head=demoNote()+filters(select('选择租户',s.rows.map(r=>r['租户名称'])));
      if(tab==='成员管理')return head+btn('邀请记录','邀请列表')+btn('发送邀请','邀请演示',true)+table(['邮箱','姓名','角色','加入时间','操作'],[['owner@example.com','演示管理员','所有者','示例时间','—']]);
      if(tab==='模版配置')return head+btn('添加模版','租户添加模板',true)+table(['显示名称','类型','启动方式','状态','实例'],[['应用开发（示例）','职能专家','手动启动','已启用','未拉起'],...(s.templates||[])]);
      if(tab==='模型配置')return head+box('勾选租户可使用的模型',modelList());
    }
    if(route==='operations-client-devices'){
      if(tab==='协议政策管理')return policyPanel(s);
      if(tab==='设备列表')return demoNote()+demoStats([['总设备数',1],['在线',1],['离线',0],['繁忙',0]])+filters(input('搜索设备名或用户')+select('平台',['全部平台','macOS','Windows','Linux'])+select('状态',['全部状态','在线','离线','繁忙']))+table(['设备名称','所属用户','平台','状态','版本','最后活跃','操作'],[['演示设备','member@example.com','macOS','在线（示例）','demo-1.0','示例时间','—']]);
      if(tab==='Token消耗')return demoNote()+filters(select('时间范围',['近 7 天','近 30 天','本月','自定义'])+input('搜索用户邮箱/名称'))+demoStats([['总 Token',1500],['输入 Token',1000],['输出 Token',500],['调用次数',3]])+table(['用户','输入','输出','总 Token','调用数','占比'],[['member@example.com','1000','500','1500','3','100%']]);
      if(tab==='开放模型'||tab==='开放多模态')return demoNote()+box(tab,tab==='开放模型'?modelList():form('<div class="ra-model-options">'+['图片生成（示例）','视频生成（示例）'].map(x=>check(x,true)).join('')+'</div>'));
      if(tab==='用户组织模型')return demoNote()+`<div class="ra-two">${box('用户组 / 组织部门',select('组织',['演示用户组','示例组织']))}${box('用户组织模型配置',check('开启独立配置')+modelList())}</div>`;
      if(tab==='版本管理')return demoNote()+btn('发官网客户端','发官网客户端')+btn('发布新版本','发布新版本',true)+box('近 7 天版本分布（在线设备）',table(['版本','设备','用户'],[['demo-1.0','1','1']]))+table(['当前 Latest','灰度中','官网客户端'],[['演示版本','未设置','未设置']]);
    }
    if(route==='operations-documents'&&tab==='在线调试')return box('在线调试',form(select('接口',['认证与换 Token','查询分类','发布技能'])+input('Base URL','/api/openapi/v1')+input('Authorization','','password')+textarea('请求参数（JSON）','{}'),'本地预览'))+'<p>仅编辑与预览请求参数，不发送网络请求。</p>';
    if(route==='operations-documents'&&tab==='全量 API 参考')return box('全量 API 参考',table(['功能','认证','用途'],[['认证与换 Token','AK / SK','获取短期 access_token'],['查询分类','Bearer Token','读取技能分类'],['发布技能','Bearer Token','发布技能包']]))+'<p>当前展示已核对接口目录；完整服务端动态文档未下载。</p>';
    if(route==='operations-security-center'&&tab==='滚动升级')return demoNote()+box('滚动升级','<p>通过 ClawGuard 对实例进行不停机的二进制热升级。</p>'+btn('创建升级任务','升级演示',true)+table(['类型','目标版本','状态','批次大小'],s.upgrades||[['PivotClaw','demo-1.0','演示草稿','1']]));
    if(route==='operations-skill-market'){
      if(tab==='升级与灰度')return box('升级与灰度',filters(input('搜索技能'))+demoNote()+table(['技能','版本','状态'],[['演示技能','1.0.0','本地示例，未发布']]));
      if(tab==='我的技能'||tab==='分享给我')return demoNote()+filters(input('搜索技能'))+box('演示技能','<p>用于展示本地技能记录，不代表真实归属或共享授权。</p><span class="ra-badge">1.0.0 · 示例</span>');
      if(tab==='审核中心')return demoNote()+filters(select('范围',['我的待审','公开待审（管理员）']))+box('演示技能 · 待审核','<p>提交者：演示用户　版本：1.0.0</p>'+btn('通过','通过')+btn('拒绝','拒绝'));
      if(tab==='冲突处理')return demoNote()+filters(check('含已处理')+btn('重新扫描','重新扫描'))+table(['名称','归属','可见','版本','下载','操作'],[['demo-skill','演示用户','私有（示例）','1.0.0','—','—']]);
    }
    return null;
  }

  // Coding skills: production table, category/source filters and basic edit fields.
  const coding=screen('operations-coding-skills','Coding 技能管理','',[],(_,s)=>filters(input('搜索名称/描述')+select('分类',['全部分类','通用','文档','埋点','分析','技能包'])+select('来源',['全部来源','内置','上传','提升','手动'])+btn('刷新','刷新'))+table(['名称','标识','分类','来源','版本','安装次数','公开','操作'],(s.rows||[]).map(r=>[r['显示名称'],r['标识（目录名）'],r['分类'],'手动','—','0',r['公开可见']?'是':'否']),['编辑','删除'])+((s.rows||[]).length?'':pager()),['批量上传 ZIP','新建技能']);
  coding.action=(a)=>{if(a==='刷新'){coding.draw();return true;}if(a==='新建技能'||a.startsWith('编辑:')){const index=a.includes(':')?+a.split(':')[1]:-1,r=coding.state.rows?.[index]||{};modal(index<0?'新建技能':'编辑技能',form(input('标识（目录名）',r['标识（目录名）']||'','text',true)+input('显示名称',r['显示名称']||'','text',true)+textarea('描述',r['描述']||'')+select('分类',['通用','文档','埋点','分析','技能包'])+check('公开可见',!!r['公开可见'])),values=>{coding.state.rows??=[];if(index<0)coding.state.rows.push(values);else coding.state.rows[index]=values;coding.draw();});return true;}if(a.startsWith('删除:')){const i=+a.split(':')[1];modal('删除本地演示技能',form('<p>仅移除此原型中的演示记录。</p>','确认删除'),()=>{coding.state.rows.splice(i,1);coding.draw();});return true;}return false;};
  coding.el.addEventListener('input',()=>{const q=coding.el.querySelector('input').value.toLowerCase();const sels=coding.el.querySelectorAll('select');coding.el.querySelectorAll('tbody tr').forEach(tr=>{if(tr.cells.length<2)return;tr.hidden=!tr.textContent.toLowerCase().includes(q)||(sels[0].selectedIndex>0&&tr.cells[2].textContent!==sels[0].value)||(sels[1].selectedIndex>0&&tr.cells[3].textContent!==sels[1].value);});});
  const referenceSkills=[...document.querySelectorAll('[data-skill-card]')].map(c=>({name:c.querySelector('h2').textContent,description:c.querySelector('p').textContent,category:c.dataset.category,meta:c.querySelector('footer').textContent}));
  const market=screen('operations-skill-market','技能广场','',['公共广场','我的技能','分享给我','审核中心','冲突处理','升级与灰度'],tab=>tab==='审核中心'?filters(select('范围',['我的待审','公开待审（管理员）']))+empty('暂无待审核版本'):tab==='冲突处理'?filters(check('含已处理')+btn('重新扫描','重新扫描'))+table(['名称','归属','可见','版本','下载','操作']):tab==='升级与灰度'?empty('本地未载入升级与灰度数据'):filters(input('搜索技能')+select('分类',['全部','AI 智能','开发工具','搜索与知识','效率提升','数据与分析','内容创作','安全合规']))+(tab==='公共广场'?'<p class="ra-sample-note">沿用此前已核对的技能广场参考数据，不代表实时发布状态。</p><div class="ra-card-grid">'+referenceSkills.map(r=>`<article class="ra-box" data-market-category="${esc(r.category)}"><h3>${esc(r.name)}</h3><p>${esc(r.description)}</p><small>${esc(r.meta)}</small></article>`).join('')+'</div>':empty('暂无本地记录')),['上传技能','分类管理']);
  market.el.addEventListener('input',()=>{const q=market.el.querySelector('input')?.value.toLowerCase()||'',cat=market.el.querySelector('select')?.value||'全部';market.el.querySelectorAll('[data-market-category]').forEach(c=>c.hidden=!c.textContent.toLowerCase().includes(q)||(cat!=='全部'&&!c.dataset.marketCategory.includes(cat)));});

  const tenants=screen('operations-tenant-management','租户管理','',['租户列表','成员管理','模版配置','模型配置'],(tab,s)=>tab==='租户列表'?`<div class="ra-toolbar">${btn('创建租户','创建租户',true)}</div><div class="ra-card-grid">${(s.rows||[]).map((r,i)=>`<article class="ra-box"><h3>${esc(r['租户名称'])}</h3><p>${esc(r.Slug)}</p><span class="ra-badge">试用</span><p>Owner：${esc(r['Owner 邮箱'])}</p>${btn('管理',`管理:${i}`)} ${btn('删除',`删除:${i}`)}</article>`).join('')||empty('暂无租户')}</div>`:filters(select('选择租户',['请选择...',...(s.rows||[]).map(r=>r['租户名称'])]))+(tab==='成员管理'?`<div class="ra-toolbar">${btn('邀请记录','邀请记录')}${btn('发送邀请','发送邀请',true)}</div>`+table(['邮箱','姓名','角色','加入时间','操作']):tab==='模版配置'?btn('添加模版','添加模版',true)+empty('请先选择租户'):box('勾选租户可使用的模型',empty('本地未载入全局模型'))),[]);
  tenants.action=a=>{if(a==='创建租户'){modal(a,form(input('租户名称','','text',true)+input('Slug','','text',true)+input('Owner 邮箱','','email',true),'创建'),r=>{tenants.state.rows??=[];tenants.state.rows.push(r);tenants.draw();});return true;}if(a.startsWith('管理:')){tenants.tab('成员管理');return true;}if(a.startsWith('删除:')){modal('删除本地租户',form('<p>仅删除本地演示记录。</p>','确认删除'),()=>{tenants.state.rows.splice(+a.split(':')[1],1);tenants.draw();});return true;}if(a==='邀请记录'){modal(a,table(['邮箱','角色','状态','过期时间']));return true;}return false;};
  const appReferences={'职能专家':[...document.querySelectorAll('.expert-template-card')].map(c=>({name:c.querySelector('h2').textContent,description:c.querySelector('.expert-template-description')?.textContent||'暂无描述'})),'职能团队':[...document.querySelectorAll('.team-market-card')].map(c=>({name:c.querySelector('h3').textContent,description:c.querySelector('.team-card-description').textContent}))};
  const appMarket=screen('operations-app-market','应用市场','上架后，租户可在「租户管理 → 模版配置」中选择这些应用，Portal 用户即可使用。',['职能专家','职能团队'],(tab,s)=>`<h3>${tab}上架管理</h3><p class="ra-sample-note">模板沿用已核对参考数据；上下架仅为本地演示，不代表线上状态。</p><div class="ra-card-grid">${appReferences[tab].map((r,i)=>`<article class="ra-box"><h3>${esc(r.name)}</h3><span class="ra-badge">${s[`${tab}:${i}`]?'已上架':'未上架'}</span><p>${esc(r.description)}</p>${btn(s[`${tab}:${i}`]?'下架':'上架',`上架:${i}`,!s[`${tab}:${i}`])}</article>`).join('')}</div>`);
  appMarket.action=a=>{if(a.startsWith('上架:')){const key=`${appMarket.active}:${a.split(':')[1]}`;appMarket.state[key]=!appMarket.state[key];appMarket.draw();return true;}return false;};
  screen('operations-home-settings','首页设置','',[],()=>form(box('开放登录',check('开启后 Portal 首页显示「登录」入口按钮')+input('登录跳转地址')+'<p>填写后官网「登录」跳转到该地址；留空则使用门户自身登录页。</p>')+box('开放租户成员注册',check('开启后登录页显示「去注册」链接，用户可凭租户标识自助注册加入对应租户'))));
  screen('operations-customer-applications','客户申请','',[],()=>filters(select('状态',['全部','待处理','已联系','已通过','已拒绝']))+table(['企业名称','联系人','联系方式','需求','状态','时间','操作'])+pager());

  // Documentation is intentionally not an invented business management table.
  const docsText={
    '通用介绍':'<h2>OpenAPI 通用介绍</h2><p>用于第三方系统通过 AK/SK 换取短期 Token 接入技能广场能力，当前支持查询技能分类与发布技能。</p><h3>基础信息</h3><p>Base URL：<code>/api/openapi/v1</code></p><ol><li>用 channel + AK + SK 调用 /auth/token 获取 access_token。</li><li>业务接口使用 Authorization: Bearer &lt;access_token&gt;。</li></ol><pre>{\n  "code": 0,\n  "message": "ok",\n  "request_id": "req-xxx",\n  "data": {}\n}</pre><p>非 0 的 code 表示失败，请根据 message 排查。</p>',
    '认证与换 Token':'<h2>认证与换 Token</h2><p>使用 channel、AK、SK 换取短期 access_token；业务请求携带 Bearer Token。</p><pre>POST /api/openapi/v1/auth/token</pre>',
    '查询分类':'<h2>查询分类</h2><p>通过技能广场开放接口查询技能分类，使用 Bearer Token 鉴权。</p>',
    '发布技能':'<h2>发布技能</h2><p>支持发布 .zip / .skill / .skll 技能包。原型不上传文件或提交真实发布请求。</p>'};
  const docs=screen('operations-documents','文档','',['通用介绍','认证与换 Token','查询分类','发布技能','全量 API 参考','在线调试'],tab=>`<div class="ra-doc-layout"><aside><h3>文档目录</h3><p>OpenAPI</p><p>技能广场</p><h3>工具</h3><p>全量 API 参考</p><p>在线调试</p></aside><article class="ra-prose">${docsText[tab]||box(tab,tab==='全量 API 参考'?'<p>全量 API 参考由服务器动态提供，当前原型未载入该文档。</p>':'<p>在线调试需要真实接口与凭证。本地原型保留入口，不发送网络请求。</p>')}</article></div>`);
  const manual=screen('operations-manual','操作手册知识库','维护 Markdown、发布索引、嵌入第三方页面',[],(_,s)=>filters(select('空间',['请选择空间',...(s.spaces||[])])+btn('新建空间','新建空间')+btn('导入本地手册','导入本地手册')+btn('导出备份','导出备份')+btn('导入备份包','导入备份包')+btn('发布草稿','发布草稿')+btn('重建索引','重建索引'))+`<div class="ra-doc-layout ra-manual"><aside><h3>文档树</h3>${btn('新建','新建文档')}${(s.docs||[]).map((d,i)=>`<button class="ra-doc-item" data-action="文档:${i}">${esc(d.name)}</button>`).join('')||empty('暂无文档')}</aside><div><div class="ra-toolbar">${btn('编辑','编辑文档')}${btn('预览','预览文档')}${btn('保存','保存文档')}</div><textarea class="ra-editor" aria-label="Markdown 文档" placeholder="选择或新建文档后编辑" ${s.selected==null?'disabled':''}>${esc(s.docs?.[s.selected]?.text||'')}</textarea><pre class="ra-preview" hidden></pre></div><aside><h3>空间配置</h3>${select('问答模型',['（默认）'])}${textarea('欢迎语')}<h3>嵌入代码</h3><p>未选择知识空间</p><h3>未覆盖 / 差评问题</h3>${empty('暂无')}</aside></div>`,[]);
  manual.action=a=>{const s=manual.state;if(a==='新建空间'){modal('新建知识空间',form(input('名称','','text',true)+input('标识 slug','','text',true)+select('受众',['user','admin']),'创建'),r=>{s.spaces??=[];s.spaces.push(r['名称']);manual.draw();});return true;}if(a==='新建文档'){if(!s.spaces?.length){modal('新建文档','<p>请先新建知识空间。</p>');return true;}modal('新建文档',form(input('新文档路径','document.md','text',true),'创建'),r=>{s.docs??=[];s.docs.push({name:r['新文档路径'].endsWith('.md')?r['新文档路径']:r['新文档路径']+'.md',text:''});s.selected=s.docs.length-1;manual.draw();});return true;}if(a.startsWith('文档:')){s.selected=+a.split(':')[1];manual.draw();return true;}if(['保存文档','预览文档','编辑文档'].includes(a)){if(s.selected==null)return true;const ed=manual.el.querySelector('.ra-editor'),pre=manual.el.querySelector('.ra-preview');s.docs[s.selected].text=ed.value;if(a==='预览文档'){pre.textContent=ed.value||'空文档';pre.hidden=false;ed.hidden=true;}else{pre.hidden=true;ed.hidden=false;}manual.el.querySelector('.ra-status').textContent=a==='保存文档'?'已保存本地文档草稿，刷新后清除':'';return true;}return false;};

  // Audit, risk and security pages use real field names, without fabricated metrics.
  screen('operations-audit-center','审计中心','记录平台所有登录事件和关键操作行为，用于安全审计和行为追溯',['登录日志','操作日志'],tab=>`<form class="ra-query ra-filters">${select('用户',['全部用户'])}${tab==='登录日志'?select('动作',['全部','密码登录','登录失败','注册','OAuth2 登录','OAuth2 失败'])+select('状态',['全部','成功','失败']):select('模块',['全部','实例管理','职能专家模板','模型管理','用户管理','系统配置','智能团队','任务编排','画布','资料库','IM 渠道'])+select('动作',['全部','创建','更新','删除','启动','停止','重启','部署','执行','更新配置'])}${input('起始时间','','datetime-local')}${input('结束时间','','datetime-local')}<button class="ra-primary">查询</button><button type="reset">重置</button></form>`+table(tab==='登录日志'?['时间','用户','动作','认证方式','IP','状态','失败原因']:['时间','用户','模块','动作','操作对象','方法','路径','状态码','详情'])+pager());
  screen('operations-risk-audit','LLM 输出风险审计','自动检测 LLM 每次响应中的工具调用风险、敏感信息泄露、注入攻击等安全威胁。两级检测架构：L1 规则引擎实时扫描 + L2 AI Agent 深度分析。',['数据概览','告警列表','检测规则','系统配置'],tab=>tab==='数据概览'?stats(['待处理','高危告警','处置率','平均处置时间'])+`<div class="ra-two">${box('告警趋势（近 14 天）',empty())}${box('规则命中排行 Top 10',empty())}</div>`+box('处置效率',stats(['总告警数','已处置'])):tab==='告警列表'?filters(select('状态',['全部状态','待处理','已解决','误报'])+select('等级',['全部等级','高危','中危','低危'])+btn('扫描历史日志','扫描历史日志')+btn('刷新','刷新'))+empty('本地未载入风险告警')+pager():tab==='检测规则'?box('检测规则总览',btn('保存更改','保存更改')+table(['状态','规则名称','风险等级','检测说明'])):form(box('基本设置',check('启用风险审计')+check('L2 AI Agent 深度分析')+select('L2 分析使用的模型',['使用系统默认模型']))+box('阈值配置',input('Token 异常阈值（单次调用）','','number')+input('高频调用阈值（次/分钟）','','number')+input('误报自动禁用阈值','','number'))+box('自定义敏感关键词',textarea('响应内容中如包含以下关键词将触发告警'))+box('自定义危险工具模式',textarea('工具模式'))));
  screen('operations-security-center','安全中心','ClawGuard 安全监控：实例安全态势、告警事件和滚动热升级管理',['安全总览','实例管理','安全告警','滚动升级'],tab=>tab==='安全总览'?`<div class="ra-toolbar">${btn('全部扫描','全部扫描',true)}${btn('刷新','刷新')}</div>`+stats(['已接管实例','活跃告警','扫描通过率','待升级实例'])+`<div class="ra-two">${box('版本分布',empty())}${box('最近告警',empty())}</div>`:tab==='实例管理'?filters(input('搜索实例名称')+select('类型',['全部类型','PivotClaw','OpenClaw','EchoClaw','TeamsClaw'])+select('版本',['全部版本','未升级']))+empty('本地未载入已接管实例'):tab==='安全告警'?filters(select('类型',['全部'])+check('显示已解决')+btn('全部标记已解决','全部标记已解决'))+table(['实例','类型','等级','消息','时间','操作']):box('滚动升级','<p>通过 ClawGuard 对实例进行不停机的二进制热升级，无需重建容器，技能依赖不丢失。</p>'+btn('创建升级任务','创建升级任务',true)+empty('暂无本地升级任务')));
  screen('operations-client-devices','客户端设备','管理所有用户的 ForgeCode 客户端设备，查看在线状态与策略配置',['设备列表','Token消耗','版本管理','开放模型','开放多模态','用户组织模型','全局策略','协议政策管理'],tab=>tab==='设备列表'?stats(['总设备数','在线','离线','繁忙'])+filters(input('搜索设备名或用户')+select('平台',['全部平台','macOS','Windows','Linux'])+select('状态',['全部状态','在线','离线','繁忙']))+table(['设备名称','所属用户','平台','状态','版本','最后活跃','操作'])+pager():tab==='Token消耗'?filters(select('时间范围',['近 7 天','近 30 天','本月','自定义'])+input('搜索用户邮箱/名称')+select('排序',['按总 Token','按输入 Token','按输出 Token','按调用数']))+stats(['总 Token','输入 Token','输出 Token','调用次数'])+table(['用户','输入','输出','总 Token','调用数','占比','详情']):tab==='全局策略'?form(box('全局设备策略',input('每用户最大设备数','','number')+input('每设备最大连接数','','number')+input('离线自动清理天数','','number')),'保存策略'):box(tab,empty('未载入客户端配置数据')));

  const settingsGroups=[['组织用户',[['用户管理'],['组织管理'],['菜单组管理']]],['认证配置',[['第三方 OAuth2 登录'],['开放 OAuth2','开放 OAuth2（client_id / client_secret）'],['OpenAPI 凭证（系统级）','OpenAPI 凭证（系统级 AK / SK）']]],['自定义菜单',[['独跳菜单']]],['外部集成',[['A2A 纳管平台'],['代理池'],['检索引擎','检索引擎管理'],['Gitea 代码仓库'],['Figma 设计集成'],['HiPPT']]],['审计与安全',[['审计日志','审计日志（Coding 项目域）'],['License 管理'],['平台版本']]]];
  function settingsNavigation(active,state){const item=([label,target=label])=>`<button type="button" data-tab="${esc(target)}" class="${active===target?'active':''}" ${active===target?'aria-current="page"':''}>${esc(label)}</button>`;return '<p class="ra-settings-caption">系统配置</p>'+[['我的 API 凭证'],['企业设置'],['基础配置'],['邮件发送','邮件发送（SMTP）']].map(item).join('')+settingsGroups.map(([name,items])=>`<details class="ra-settings-group" data-group="${esc(name)}" ${state.collapsed?.[name]?'':'open'}><summary>${esc(name)}</summary><div>${items.map(item).join('')}</div></details>`).join('');}
  const settingsTabs=['企业设置','我的 API 凭证','基础配置','邮件发送（SMTP）',...settingsGroups.flatMap(([,items])=>items.map(([label,target=label])=>target))];
  const settings=screen('operations-system-settings','系统配置','',settingsTabs,tab=>tab==='企业设置'?form(box('企业信息','<p>企业简称将替换产品左上角的品牌名称。留空则保留默认名称。</p>'+input('企业简称（产品名称）'))+box('企业 Logo','<p>仅支持图片格式（PNG / JPG / WebP / SVG）。</p>'+input('选择图片上传','','file'))):tab==='基础配置'?form(box('基础配置','<p>配置实例部署所需的基础网络和路径信息。</p>'+input('默认网络')+input('域名后缀')+input('工作空间目录')+check('teamsclaw 关闭沙箱')+check('启用 EchoClaw 高级面板（实验中）')+select('工具输出显示级别',['仅状态（不输出工具内容）','摘要（截取前 N 字符）','完整输出'])+input('最大字符数','','number')+check('开放用户自主注册'))):tab==='邮件发送（SMTP）'?form(box(tab,input('SMTP 服务器')+input('端口','','number')+input('用户名（通常是邮箱）')+input('密码 / 授权码','','password')+input('发件人地址')+input('发件人名称'))):tab==='外部回调（Inbound Webhook）'?box(tab,'<p>配置外部系统的事件回调入口。</p><a href="#operations-external-callbacks">进入外部回调配置 →</a>'):tab.includes('OAuth2')||tab.startsWith('OpenAPI')?box(tab,'<p>本地原型不生成或保存真实凭证。</p>'+filters(input('渠道名')+input('备注'))+btn('生成新凭证','生成新凭证')):box(tab,empty('此配置子项未载入线上数据；细分表单待核对')));
  settings.el.classList.add('ra-settings');
  const admin=screen('operations-pivot-admin','PivotAdmin','数据库与实例巡检 Agent',[],(_,s)=>`<div class="ra-admin-layout"><aside>${btn('新建会话','新建会话',true)}${(s.sessions||[]).map((x,i)=>`<button data-action="会话:${i}" class="ra-doc-item">${esc(x)}</button>`).join('')}</aside><div class="ra-admin-chat"><div class="ra-chat-history">${(s.messages||[]).map(m=>`<p>${esc(m)}</p>`).join('')||empty('请先新建或选择会话')}</div><form class="ra-admin-input"><textarea aria-label="巡检需求" name="需求" placeholder="输入需求（如：查询 users 最近 10 条）" ${s.selected==null?'disabled':''}></textarea><button type="submit" ${s.selected==null?'disabled':''}>发送</button></form></div></div>`);
  admin.action=a=>{if(a==='新建会话'){admin.state.sessions??=[];admin.state.sessions.push(`本地会话 ${admin.state.sessions.length+1}`);admin.state.selected=admin.state.sessions.length-1;admin.state.messages=[];admin.draw();return true;}if(a.startsWith('会话:')){admin.state.selected=+a.split(':')[1];admin.state.messages=[];admin.draw();return true;}return false;};
  admin.el.addEventListener('submit',e=>{if(!e.target.classList.contains('ra-admin-input'))return;e.stopImmediatePropagation();e.preventDefault();const text=e.target.elements['需求'].value.trim();if(!text)return;admin.state.messages.push(text,'本地演示：已展示巡检需求。不会连接数据库、执行 SQL、重置密码或操作实例。');admin.draw();},true);
  const evaluation=screen('operations-evaluation','数字分身能力评估','数字分身能力持续评估',['总览','评估套件','模板库','批次数据','评测记录','定时任务','使用文档'],(tab,s)=>tab==='总览'?stats(['评测总数','平均得分','活跃实例'])+`<div class="ra-two">${box('近期评测',table(['实例名称','套件','得分','状态','时间'])+btn('发起首次评测','发起首次评测',true))}${box('实例得分排行',empty('完成首次评测后将在此展示排行'))}</div>`:tab==='评估套件'?btn('新建套件','新建套件',true)+table(['名称','类型','描述','标签'],(s.suites||[]).map(r=>[r['名称'],r['类型'],r['描述'],r['标签（逗号分隔）']])):tab==='模板库'?filters(input('搜索用例名称或描述')+select('类型',['全部'])+btn('新增模板','新增模板',true))+empty('本地模板库为空'):tab==='批次数据'?table(['用例 / 维度','输入消息','期望路由','操作']):tab==='评测记录'?btn('刷新','刷新')+btn('开始评估','开始评估',true)+table(['实例','套件','评分','状态','进度','触发','时间']):tab==='定时任务'?btn('新建调度','新建调度',true)+empty('暂无本地调度'):box('使用文档','<p>通过评估套件组织用例，发起评测后查看评分和评测记录。模板库、批次数据与定时任务用于复用和持续评估。</p><p>本地原型不触发模型调用或定时任务。</p>'));
  evaluation.action=a=>{if(a==='发起首次评测'){evaluation.tab('评估套件');return true;}if(a==='新建套件'){modal(a,form(input('名称','','text',true)+input('类型')+textarea('描述')+input('标签（逗号分隔）'),'保存套件信息'),r=>{evaluation.state.suites??=[];evaluation.state.suites.push(r);evaluation.draw();});return true;}return false;};
  const mcpView=document.querySelector('[data-operations-view]');
  function sync(){
    const serviceRisk=location.hash==='#govern-risk-audit';
    const serviceCoding=location.hash==='#build-coding-skills';
    const serviceSkills=location.hash==='#build-skill-management';
    const serviceGovern={'#govern-security-center':'operations-security-center','#govern-audit-center':'operations-audit-center','#govern-client-device':'operations-client-devices'}[location.hash];
    const serviceMcp=location.hash==='#asset-mcp-tools';
    mcpView.hidden=!serviceMcp&&location.hash!=='#operations-admin';
    if(serviceMcp){document.querySelector('.service-catalog').hidden=true;document.querySelector('.proto-page').hidden=true;}
    const key=serviceGovern||(serviceSkills?'operations-skill-market':serviceRisk?'operations-risk-audit':serviceCoding?'operations-coding-skills':location.hash.slice(1));
    for(const [route,p] of Object.entries(panels))p.el.hidden=key!==route;
    if(panels[key]){
      document.querySelector('[data-operations-development-view]').hidden=true;
      if(serviceRisk||serviceCoding||serviceGovern||serviceSkills){
        document.querySelector('.service-catalog').hidden=true;
        document.querySelector('.proto-page').hidden=true;
      }
      requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'instant'}));
    }
    if(dialog.open)dialog.close();
  }window.addEventListener('hashchange',sync);sync();
})();
