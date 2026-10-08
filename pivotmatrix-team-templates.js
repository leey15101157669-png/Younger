/* Team-template market: visible page snapshot of one.pivotmartrix.com/#/team-templates, 2026-09-07. Local interactions only. */
(() => {
  const rows = [
    ['产品设计团队','三人产品设计团队：产品经理负责产品定义与路线规划，需求分析师负责需求收集与优先级排序，原型设计师负责交互设计与原型输出。适用于互联网产品、SaaS应用等场景。','互联网','产品设计',['产品设计','需求分析','原型'],1,11],
    ['VOC 新品洞察分析团队','四人 VOC（客户声音）新品洞察分析团队：数据工程师负责 CSV 数据读取、新品识别与打分排名；市场洞察分析师对 Top 新品进行深度分析与趋势提炼；产品概念创意师基于洞察生成新品 Concept；报告生成专员汇总全部结果输出 HTML 报告。适用于美妆、快消、食品等行业的社交媒体 VOC 数据分析与新品机会挖掘。','消费品/快消','数据分析',['VOC','新品洞察','客户声音'],3,8],
    ['法务合规团队','三人法务合规团队：合同审核员负责合同条款审核与风险识别，法规研究员负责法规检索与合规建议，风险评估师负责综合风险评估与报告输出。适用于企业法务部门、合规审查等场景。','法律','合规审查',['合同审核','法规研究','风险评估'],1,5],
    ['UX研究团队','三人用户体验研究团队：用户研究员负责用户调研与行为分析，数据分析师负责数据统计与趋势洞察，体验优化师负责优化建议与改进方案。适用于产品体验优化、用户增长等场景。','互联网','用户体验',['UX研究','用户调研','数据分析'],1,3],
    ['项目管理团队','三人项目管理团队：项目经理负责整体规划与协调，进度跟踪员负责任务拆解与进度监控，风险管理员负责风险识别与应对策略。适用于软件开发、工程项目等场景。','通用','项目管理',['项目管理','进度跟踪','风险管理'],1,3],
    ['培训课程开发团队','三人培训课程团队：课程设计师负责课程体系规划与教学设计，内容编写员负责课件与教材编写，评估设计师负责考核标准设计与效果评估。适用于企业培训、在线教育等场景。','教育','课程开发',['培训','课程设计','教学'],1,2],
    ['软件研发团队','四人软件研发团队模板：产品经理拆解需求，架构师设计技术方案，开发工程师编写代码，测试工程师编写测试用例并验收。适用于功能开发、技术方案评审、代码审查等场景。','科技','研发',['软件开发','代码审查','技术方案'],2,2],
    ['安全审计团队','三人安全审计团队：安全扫描员负责安全扫描与漏洞发现，漏洞分析师负责漏洞验证与风险评级，合规审计员负责合规检查与审计报告。适用于网络安全、等保合规等场景。','IT','安全审计',['安全审计','漏洞扫描','合规检查'],1,2],
    ['财务分析团队','三人财务分析团队：财务分析师负责财务数据分析与指标解读，预算规划师负责预算编制与资源分配，报表生成员负责报表生成与可视化输出。适用于财务管理、投资分析等场景。','金融','财务分析',['财务分析','预算规划','报表'],1,2],
    ['医疗咨询团队','三人医疗咨询团队：预诊分流员负责症状分析与科室推荐，健康顾问负责健康建议与生活指导，报告解读员负责体检/化验报告解读。适用于在线问诊、健康管理等场景。注意：本模板仅供辅助参考，不替代专业医疗诊断。','医疗','健康咨询',['医疗咨询','健康管理','在线问诊'],1,1],
    ['营销策划团队','四人营销策划团队模板：市场策略师负责市场分析和策略制定，创意总监负责创意方案和视觉方向，文案专员负责广告文案和传播素材，投放分析师负责渠道策略和效果评估。适用于品牌推广、活动策划、广告投放等场景。','营销','营销策划',['营销','品牌推广','广告'],2,1],
    ['知识库运营团队','三人知识库运营团队：知识采集员负责知识收集与整理，内容审核员负责质量审核与纠错，分类标注员负责知识分类与标签体系维护。适用于企业知识管理、FAQ运营等场景。','通用','知识管理',['知识库','知识管理','分类标注'],1,1]
  ].map(([name,description,industry,type,tags,more,installs],id)=>({id,name,description,industry,type,tags,more,installs}));
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const page=document.createElement('section');page.className='team-template-market';page.hidden=true;
  page.setAttribute('aria-labelledby','team-market-title');
  const options=(field,label)=>`<select aria-label="${label}" data-filter="${field}"><option value="">${label}</option>${[...new Set(rows.map(r=>r[field]))].map(x=>`<option>${esc(x)}</option>`).join('')}</select>`;
  page.innerHTML=`<header class="team-market-header"><div><h1 id="team-market-title">团队模板市场</h1><p>浏览并安装预置的团队协作模板</p></div><div class="team-market-tools"><input type="search" aria-label="搜索模板" placeholder="搜索模板…">${options('industry','全部行业')}${options('type','全部类型')}<select aria-label="全部等级"><option>全部等级</option><option>官方</option></select><button class="team-primary" data-import>⇩ 导入模板</button></div></header><div class="team-market-grid"></div><p class="team-market-empty" hidden>暂无匹配的模板</p><footer class="team-market-pagination"><button disabled>上一页</button><span>1 / 2</span><button data-next>下一页</button></footer><p class="team-market-feedback" role="status"></p>`;
  document.querySelector('.main-content').append(page);
  const dialog=document.createElement('dialog');dialog.className='team-market-dialog';dialog.setAttribute('aria-labelledby','team-dialog-title');document.body.append(dialog);
  let focus;
  function explain(title,text){focus=document.activeElement;dialog.innerHTML=`<h2 id="team-dialog-title">${esc(title)}</h2><p>${esc(text)}</p><button autofocus>关闭</button>`;dialog.querySelector('button').onclick=()=>dialog.close();dialog.showModal();}
  dialog.onclose=()=>focus?.isConnected&&focus.focus();
  const grid=page.querySelector('.team-market-grid');
  function render(){const q=page.querySelector('input').value.trim().toLowerCase();const filters=[...page.querySelectorAll('[data-filter]')];const list=rows.filter(r=>!r.deleted&&(r.name+r.description).toLowerCase().includes(q)&&filters.every(f=>!f.value||r[f.dataset.filter]===f.value));grid.innerHTML=list.map(r=>`<article class="team-market-card"><div class="team-card-title"><h3>${esc(r.name)}</h3><span class="team-official">官方</span></div><p class="team-card-description" title="${esc(r.description)}">${esc(r.description)}</p><div class="team-card-tags"><span class="team-industry">${esc(r.industry)}</span><span class="team-type">${esc(r.type)}</span>${r.tags.map(t=>`<span>${esc(t)}</span>`).join('')}<span>+${r.more}</span></div><footer><span class="team-version">v1.0.0</span><span class="team-install-count">安装 ${r.installs}</span><div><button class="team-primary" data-install="${r.id}">安装</button><button class="team-delete" data-delete="${r.id}">删除</button></div></footer></article>`).join('');page.querySelector('.team-market-empty').hidden=!!list.length;}
  page.querySelector('input').oninput=render;page.querySelectorAll('select').forEach(s=>s.onchange=render);
  page.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-install')){const r=rows[Number(b.dataset.install)];explain('安装 · '+r.name,'本地原型不安装到已有系统。安装弹窗尚未核对，暂不模拟其配置字段。');}if(b.hasAttribute('data-import'))explain('导入模板','导入入口已按原页面保留；导入格式与弹窗尚未核对，暂不接收文件。');if(b.hasAttribute('data-next'))explain('第二页模板','当前已复刻核对到的第一页内容。第二页尚未成功读取，暂不填入未经确认的模板。');if(b.hasAttribute('data-delete')){const r=rows[Number(b.dataset.delete)];r.deleted=true;render();const feedback=page.querySelector('.team-market-feedback');feedback.innerHTML='已从本地预览移除，不影响已有系统。 <button>撤销</button>';feedback.querySelector('button').onclick=()=>{r.deleted=false;render();feedback.textContent='';};}};
  function sync(){page.hidden=location.hash!=='#build-team-template';if(!page.hidden){document.querySelector('.proto-page').hidden=true;document.querySelector('.service-catalog').hidden=true;}if(dialog.open)dialog.close();}
  window.addEventListener('hashchange',sync);render();sync();
})();
