/* Pivot line icons: 24px grid, 1.7px rounded strokes. One symbol per semantic function.
 * Shared actions (search, close, expand) retain their meaning across pages. No network dependency. */
(() => {
  const paths = {
    '服务目录':'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 17h7M17.5 14v7',
    '应用中心':'M3 9h18l-2-5H5L3 9Zm1 0v11h16V9M9 20v-7h6v7M3 9c0 3 4 3 4 0 0 3 5 3 5 0 0 3 5 3 5 0 0 3 4 3 4 0',
    '新建任务':'M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 14h8M12 10v8',
    'Skills 中心':'m12 3 8 4v10l-8 4-8-4V7l8-4Zm0 0v18M4 7l8 4 8-4M8 5l8 4v4',
    '创作中心':'m4 16 3 4 13-13-3-3L4 16Zm11-10 3 3M4 16l-1 5 4-1M2 5h6M5 2v6',
    '个人中心':'M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6 17c1-5 11-5 12 0',
    'Skill 开发':'m8 5-5 7 5 7m8-14 5 7-5 7M14 3l-4 18M2 12h4M18 12h4',
    '职能专家':'M7 9V6a5 5 0 0 1 10 0v3M5 8h14v10H5zM9 12h.01M15 12h.01M9 15h6M9 18v3h6v-3M2 11v4M22 11v4',
    '智能团队':'M10 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm10 2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1 20v-3a5 5 0 0 1 10 0v3M13 20v-2a5 5 0 0 1 9-3M11 5h2M12 4v2',
    'AI Coding':'M3 4h18v16H3zM3 8h18M6 6h.01M9 6h.01m-2 6 3 3-3 3M13 17h5',
    'Multi-Agent DAG':'M2 9h5v6H2zM17 2h5v6h-5zM17 16h5v6h-5zM7 12h4V5h6M11 12v7h6',
    '评估套件':'M3 7h18v14H3zM8 7V3h8v4M3 12h18M9 10v4h6v-4',
    '评估器':'M6 3v18M18 3v18M3 8h6M15 16h6M3 8l3-3 3 3M15 16l3-3 3 3M10 4h4M10 12h4M10 20h4',
    '评测集':'M3 5c0-3 18-3 18 0s-18 3-18 0Zm0 0v7c0 3 18 3 18 0V5M3 12v7c0 3 18 3 18 0v-7M7 9h.01M7 16h.01',
    '评测任务':'M14 3H4v18h10M8 7h4M8 11h4M17 10l5 5-5 5V10Z',
    '评测报告':'M5 2h10l4 4v16H5zM15 2v5h4M8 18v-4M12 18v-7M16 18v-2',
    '专家实例':'M3 4h18v13H3zM8 21h8M12 17v4M14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 15c0-5 8-5 8 0',
    '团队实例':'M3 3h12v10H3zM9 13v8h12V11h-6M6 7h6M15 16h3M6 17H3v-1M18 7h3V3h-2',
    'Coding 实例':'M3 3h18v18H3zM3 8h18m-13 4-3 3 3 3m8-6 3 3-3 3M13 11l-2 8',
    '运行看板':'M3 3h18v18H3zM3 9h18M11 9v12M6 17v-3M15 17v-2M18 17v-5',
    '指标监控':'M3 12h4l3-7 4 14 3-7h4',
    '模型调用日志':'M5 3h14v18H5zM8 7h8M8 11h3M8 16l2-2 3 3 3-4',
    'IM 调用日志':'M3 3h18v14H9l-6 4V3ZM7 7h10M7 10h7M7 13h4',
    '价值分析':'M3 3v18h18M6 16l5-5 4 2 6-8M16 5h5v5',
    '安全审计':'m12 2 8 4v6c0 5-5 8-8 10-3-2-8-5-8-10V6l8-4Zm-4 10 3 3 5-6',
    '模型安全':'m12 2 9 5v10l-9 5-9-5V7l9-5ZM8 11h8v6H8zM10 11V8a2 2 0 0 1 4 0v3',
    '组织与成员':'M9 2h6v5H9zM2 17h6v5H2zM16 17h6v5h-6zM12 7v5M5 17v-5h14v5',
    '客户端管理':'M2 4h14v12H2zM5 20h8M9 16v4M18 9h4v12h-4zM20 18h.01',
    'IM 渠道配置':'M2 4h13v10H7l-5 4V4ZM18 8h4v12l-4-3h-7M5 8h7M5 11h4',
    '回调配置':'M7 4a4 4 0 1 0 4 4M17 20a4 4 0 1 0-4-4M7 8l10 8M4 8h3V5M20 16h-3v3',
    '模型配额':'M3 3h10l8 8-10 10-8-8V3Zm5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm5 6 3 3m-5-1 3 3',
    '超管后台':'M3 9l2-5 5 3 2-5 2 5 5-3 2 5-3 7H6L3 9ZM6 20h12',
    '数据连接器':'M6 2v5M12 2v5M4 7h10v5a5 5 0 0 1-10 0V7ZM9 17v2a3 3 0 0 0 3 3h5a4 4 0 0 0 4-4v-3',
    '数据查询器':'M3 5c0-3 13-3 13 0s-13 3-13 0ZM3 5v13c0 2 5 3 8 2M3 11c0 2 5 3 8 2M20 15a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-1 3 3 4',
    '业务集成器':'M3 3h6v6H3zM15 15h6v6h-6zM9 6h8a2 2 0 0 1 2 2v3m-3-3 3 3 3-3M15 18H7a2 2 0 0 1-2-2v-3m-3 3 3-3 3 3',
    'MCP 工具':'M3 3h6v4a3 3 0 1 1 6 0V3h6v6h-4a3 3 0 1 0 0 6h4v6H3v-6h4a3 3 0 1 0 0-6H3z',
    '智能体集成':'M3 7h6v10H3zM15 7h6v10h-6zM5 10h2M17 10h2M9 12h6m-3-3 3 3-3 3M6 4v3M18 4v3M6 17v3M18 17v3',
    '推理模型':'M8 5a4 4 0 0 0-6 4 4 4 0 0 0 1 7 4 4 0 0 0 5 4V5Zm8 0a4 4 0 0 1 6 4 4 4 0 0 1-1 7 4 4 0 0 1-5 4V5ZM5 10h3M16 14h3M8 8h8M8 17h8',
    '多模态模型':'M2 3h14v11H2zM4 11l4-4 3 3 2-2M6 6h.01M9 17h12M12 14v6M16 12v10M20 15v4',
    '模型管控':'M3 4h18v16H3zM3 9h18M7 13v4M12 11v6M17 13v4M5 15h4M10 13h4M15 16h4',
    '知识库':'M2 4h5v17H2zM9 4h5v17H9zM16 5l4-1 3 16-4 1-3-16ZM3 8h3M10 8h3',
    'Agent Skill':'m12 2 9 5v10l-9 5-9-5V7l9-5ZM8 9h8v7H8zM10 12h.01M14 12h.01M12 6v3M10 18h4',
    'Coding Skill':'M5 3h10l4 4v14H5zM15 3v5h4m-9 3-3 3 3 3m4-6 3 3-3 3',
    '能力命令库':'M3 4h18v16H3zM6 8l4 4-4 4M13 15h5M5 23h14',
    '业务工作台':'M2 3h20v14H2zM2 8h20M8 8v9M8 21h8M12 17v4M11 11h8M11 14h5',
    '智能团队模板':'M3 2h15v17H3zM6 22h15V5M8 8a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM6 15c0-5 9-5 9 0M14 7h1',
    '职能专家模板':'M4 2h12l4 4v16H4zM16 2v5h4M8 11h8v6H8zM10 14h.01M14 14h.01M12 9v2M10 19h4',
    '镜像管理':'M12 2 3 7l9 5 9-5-9-5ZM3 7v10l9 5 9-5V7M12 12v10M7 5l9 5v5',
    '实例模板':'M3 3h13v13H3zM8 20h13V8M6 7h7M6 11h4',
    '实例管理':'M3 3h18v7H3zM3 14h18v7H3zM6 6h.01M6 17h.01M10 6h7M10 17h7',
    '文档':'M4 2h11l5 5v15H4zM15 2v6h5M8 12h8M8 16h8M8 19h4',
    '操作手册':'M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3V4ZM12 6v16M6 8h3M6 12h3M15 8h3M15 12h3',
    '租户管理':'M4 21V3h11v18M15 9h5v12M2 21h20M7 7h2M7 11h2M7 15h2M12 21v-4',
    '应用市场':'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7zM6 6h1M17 6h1M6 17h1M17 17h1',
    '首页设置':'m2 10 10-8 10 8M5 8v13h14V8M9 21v-7h6v7M10 7h4',
    '客户申请':'M4 3h13v18H4zM8 7h5M8 11h3M14 15h8M18 11v8',
    'PivotAdmin':'M4 8h16v14H4zM8 8V5a4 4 0 0 1 8 0v3M12 13v5M10 15h4',
    '系统配置':'M4 3v18M12 3v18M20 3v18M1 7h6v4H1zM9 13h6v4H9zM17 5h6v4h-6z',
    '个人知识':'M3 3h13v18H3zM7 3v7l3-2 3 2V3M19 6h3v15h-3',
    '个人作品':'M3 4h18v17H3zM7 14l3-3 3 3 3-5 4 8M9 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z',
    '个人日历':'M3 5h18v16H3zM7 2v6M17 2v6M3 10h18M7 14h3v3H7zM14 14h3M14 17h3',
    '消息':'M5 17h14l-2-4V8a5 5 0 0 0-10 0v5l-2 4ZM10 21h4M12 1v2',
    '消息中心':'M5 17h14l-2-4V8a5 5 0 0 0-10 0v5l-2 4ZM10 21h4M12 1v2',
    '切换主题':'M12 3v2M12 19v2M3 12h2M19 12h2M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
    '退出登录':'M10 3H3v18h7M9 12h13m-5-5 5 5-5 5',
    '使用教程':'M3 3h18v18H3zM10 7l7 5-7 5V7Z',
    '服务协议':'M4 2h11l5 5v15H4zM15 2v5h5M8 11h8M8 15h4m0 4 2-2 2 1 2-3',
    '隐私协议':'M4 4h16v17H4zM8 14h8v4H8zM10 14v-3a2 2 0 0 1 4 0v3M8 7h8',
    '法律文档':'M12 2v19M7 22h10M4 6h16M6 6l-4 8h8L6 6Zm12 0-4 8h8l-4-8',
    '版本信息':'M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM12 7h.01M10 11h2v6h2',
    '资源配置':'M3 4h18v6H3zM3 14h18v6H3zM7 7h.01M7 17h.01M12 7h6M12 17h6M12 10v4',
    '内容 & 工具':'M3 3h8v8H3zM14 3h7v7h-7zM3 14h7v7H3zM15 14l6 6m-6-2 5-5',
    'Portal 管理':'M3 3h18v18H3zM3 8h18M8 8v13M12 12h5M12 16h5',
    '系统管理':'M12 2 4 6v12l8 4 8-4V6l-8-4ZM8 10h8v6H8zM10 8v2M14 8v2M10 16v2M14 16v2',
    '搜索':'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6',
    '编辑':'m3 17 1 4 4-1L21 7l-4-4L3 17Zm11-11 4 4',
    '分享':'M7 12 17 6M7 12l10 6M7 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm14-7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm0 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
    '复制':'M8 8h13v13H8zM4 16H2V2h14v2',
    '删除':'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7',
    '关闭':'m5 5 14 14M19 5 5 19',
    '添加':'M12 3v18M3 12h18',
    '上传':'M12 16V3m-5 5 5-5 5 5M3 16v5h18v-5',
    '下载':'M12 3v13m-5-5 5 5 5-5M3 16v5h18v-5',
    '发送任务':'m3 3 19 9-19 9 4-9-4-9Zm4 9h15',
    '添加附件':'m8 13 7-7a3 3 0 0 1 4 4L9 20a5 5 0 0 1-7-7L12 3M6 15l9-9',
    '返回工作台首页':'M21 12H3m7-7-7 7 7 7',
    '打开移动端入口':'M6 2h12v20H6zM10 5h4M11 19h2',
    '打开左侧菜单':'M3 5h18M3 12h13M3 19h18',
    '收起菜单':'m11 6-6 6 6 6m8-12-6 6 6 6',
    '展开分组':'m6 9 6 6 6-6',
    '协作方':'M8 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM2 21v-3a6 6 0 0 1 12 0v3M18 10v8M14 14h8',
    '连接中心':'M12 8V3M8 3h8M4 18v-5h16v5M12 13V8M1 18h6v4H1zM17 18h6v4h-6z',
    '新建画布':'M3 3h18v18H3zM7 12h10M12 7v10'
  };
  const signatures = new Set(Object.values(paths));
  if(signatures.size!==Object.keys(paths).length) throw new Error('Duplicate functional icon');
  function apply(svg,key){
    if(!paths[key]||svg.dataset.pivotIcon===key)return;
    svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.7');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');
    svg.innerHTML=`<path d="${paths[key]}"></path>`;svg.dataset.pivotIcon=key;svg.classList.add('pivot-line-icon');
  }
  const selectors='.service-link--parent,.context-service-item,.primary-nav .nav-item,[data-operations-link],.operations-group-toggle,.ph-shortcut,.personal-menu a,.personal-menu button,.footer-action,[data-message-open]';
  function refresh(){
    document.querySelectorAll(selectors).forEach(control=>{
      const key=control.dataset.personalInfo==='version'?'版本信息':control.getAttribute('aria-label')||control.querySelector('.ph-shortcut-copy strong')?.textContent||control.textContent.trim();
      const svg=control.querySelector('svg');if(svg)apply(svg,key.trim());
    });
    document.querySelectorAll('svg:not(.pivot-line-icon)').forEach(svg=>{
      if(svg.closest('.brand-mark,.brand-logo')||svg.getAttribute('viewBox')==='0 0 36 36')return;
      const control=svg.closest('button,a,label');
      const label=(control?.getAttribute('aria-label')||control?.textContent||'').trim();
      let key=paths[label]?label:null;
      if(svg.classList.contains('operations-group-chevron'))key='展开分组';
      else if(svg.closest('.brand-collapse-icon'))key='收起菜单';
      else if(/^搜索/.test(label))key='搜索';
      else if(/^编辑/.test(label))key='编辑';
      else if(/^分享/.test(label))key='分享';
      else if(/^复制/.test(label))key='复制';
      else if(/^删除/.test(label))key='删除';
      else if(/^关闭/.test(label))key='关闭';
      else if(/^上传/.test(label))key='上传';
      else if(/^下载/.test(label))key='下载';
      else if(label==='新建工具'||label==='添加工具')key='添加';
      else if(label==='打开知识库')key='知识库';
      else if(label==='开始创建技能')key='Skill 开发';
      if(key)apply(svg,key);
    });
  }
  refresh();
  let queued=false;
  new MutationObserver(records=>{
    if(!records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1 && n.tagName.toLowerCase()!=='path')))return;
    if(!queued){queued=true;queueMicrotask(()=>{queued=false;refresh();});}
  }).observe(document.body,{childList:true,subtree:true});
})();
