/* IM channel list observed from /im-channels. No credentials or real access links. */
(() => {
  const entries=[
    ['贾维斯','飞书','Jia助手','等待文本'],['项目风控-机器人','飞书','project-risk-tracker-managent',''],['CEO助手','钉钉','ceo助手',''],['星小栗一号','飞书','employee-01',''],['发票核验与数据同步专家-飞书（流式）','飞书（流式卡片）','发票核验与数据同步管家','必须文本'],['资讯收集员','Web','资讯收集员','',true],['测试','企业微信（智能机器人）','无',''],['幻影','企业微信（智能机器人·长连接）','Jia助手',''],['JIA_wx','企业微信（智能机器人·长连接）','无','等待文本'],['王的助手','飞书（流式卡片）','Jia助手','等待文本'],['JJ','飞书（流式卡片）','无',''],['元芳','飞书（流式卡片）','ceo助手','等待文本'],['合同回款(流式)','飞书（流式卡片）','合同提取回款提醒助手',''],['数字分身演示-Andrew','企业微信（智能机器人·长连接）','圣达销售助手',''],['圣达销售助手','企业微信（智能机器人·长连接）','圣达销售助手',''],['支点助手','飞书（流式卡片）','支点助手','等待文本'],['飞书','飞书','无',''],['测试sdk','Web SDK','xiaohongshu-writer','',true]
  ];
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const page=document.createElement('section');page.className='im-channel-view';page.hidden=true;document.querySelector('.main-content').append(page);
  const dialog=document.createElement('dialog');dialog.className='resource-dialog';dialog.setAttribute('aria-labelledby','im-channel-dialog-title');document.body.append(dialog);let focus;
  function notice(title,text){focus=document.activeElement;dialog.innerHTML=`<h2 id="im-channel-dialog-title">${esc(title)}</h2><p>${esc(text)}</p><button autofocus>关闭</button>`;dialog.querySelector('button').onclick=()=>dialog.close();dialog.showModal();}dialog.onclose=()=>focus?.isConnected&&focus.focus();
  page.innerHTML=`<header><div><h1>IM 渠道管理</h1><p>配置飞书、企业微信、钉钉、Telegram 等 IM 渠道，将外部消息路由到主 Agent 处理</p></div><button class="im-primary" data-add>+ 添加渠道</button></header><div class="im-channel-grid">${entries.map((r,i)=>`<article><div class="im-channel-top"><div class="im-channel-badges"><span>${esc(r[1])}</span><span class="im-channel-status ${r[4]?'running':''}">${r[4]?'运行中':'已启用未运行'}</span>${r[3]?`<span>${r[3]}</span>`:''}</div><div class="im-channel-actions">${[['消息日志','≡'],['重载','↺'],['编辑','✎'],['删除','✕']].map(([a,icon])=>`<button data-action="${a}" data-id="${i}" title="${a}" aria-label="${a} ${esc(r[0])}">${icon}</button>`).join('')}</div></div><h2>${esc(r[0])}</h2><p>默认协作方：<strong>${esc(r[2])}</strong></p>${r[4]?`<div class="im-channel-link">${r[1]==='Web SDK'?'<p>App ID：已脱敏</p>':''}<span>访问链接：已脱敏</span><button data-action="复制链接" data-id="${i}" aria-label="复制链接 ${esc(r[0])}">⎘</button></div>`:''}</article>`).join('')}</div><p class="im-channel-note">本地参考页面 · 访问链接及应用标识已脱敏，不连接消息渠道。</p>`;
  page.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-add'))notice('添加渠道','新增渠道表单尚未完成核对，原型暂不创建渠道。');else if(b.dataset.action){const name=entries[Number(b.dataset.id)][0];if(b.dataset.action==='消息日志'){window.dispatchEvent(new CustomEvent('im-channel-log-filter',{detail:name}));location.hash=location.hash==='#run-im-channel'?'operate-im-logs':'operations-im-logs';return;}const messages={重载:'此操作会重新连接渠道。本地原型仅展示入口，不重载线上服务。',编辑:'编辑配置尚未核对，原型不会读取或保存真实渠道凭据。',删除:'删除流程尚未核对，原型不会删除线上渠道或移除参考记录。',复制链接:'真实访问链接已脱敏，原型不复制可访问线上渠道的链接。'};notice(`${b.dataset.action} · ${name}`,messages[b.dataset.action]);}};
  function sync(){
    const serviceView=location.hash==='#run-im-channel';
    page.hidden=!serviceView&&location.hash!=='#operations-im-channels';
    back.hidden=!serviceView;
    if(dialog.open)dialog.close();
    if(!page.hidden){
      document.querySelector('[data-operations-development-view]').hidden=true;
      if(serviceView){document.querySelector('.service-catalog').hidden=true;document.querySelector('.proto-page').hidden=true;}
    }
  }window.addEventListener('hashchange',sync);sync();
})();
