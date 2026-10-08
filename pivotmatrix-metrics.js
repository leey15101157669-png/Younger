/* PivotMatrix「指标监控」复刻：页面结构、文案与 ⓘ 提示说明取自线上参考页
   (hia.volcenginepaas.com .../metrics)。展示数值为本地生成的演示数据，
   不连接真实监控服务。两 Tab：Agent / Model。 */
(() => {
  const TIP = {
    'Token 输出速率': '输出 Token/请求耗时',
    '耗时': '一次用户 query 中各阶段的耗时',
    '请求成功、失败量': '成功：结果输出过程无error报错，失败：结果输出过程出现error并中断',
    '请求成功率': '成功请求/总请求',
    'Tokens': '模型输入输出 Tokens',
    '费用消耗': 'Σ各模型（token*单价）',
    'Tokens（按模型类型）': '各模型类型的Tokens消耗',
    '费用消耗（按模型类型）': '时间区间内各模型类型的费用消耗',
    'Tokens（按智能体名称）': '时间区间内各智能体的Tokens消耗',
    '费用消耗（按智能体名称）': '时间区间内各智能体的费用消耗',
    'Tokens（按模型名称）': '时间区间内各模型服务的Tokens消耗',
    '费用消耗（按模型名称）': '时间区间内各模型的费用消耗',
    '费用消耗（按Input,Outopt）': '时间区间内模型调用时input、output在单位时间粒度内总消耗费用',
    'Agent 消息数': '时间区间内 Agent 处理的消息总量变化趋势；默认获取 Top20 数据，其中后 10 名可以按需定位查看，查看更多通过搜索查询',
    '消息数 - Agent 分布': '时间区间内 各 Agent 处理的消息量占比；默认获取 Top20 数据，查看更多通过搜索查询',
    '各渠道消息数': '时间区间内所有渠道分类消息量变化趋势',
    '消息数 - 渠道分布': '时间区间内所有渠道消息量的占比',
    '调用数 - 模型服务分布': '时间区间内各模型服务的调用量占比；默认获取 Top20 数据，查看更多通过搜索查询',
    '调用数 - 渠道分布': '时间区间内所有渠道消息量的占比分布',
    '调用量': '时间区间内请求数',
    '活跃应用数': '时间区间内 活跃应用数',
    '活跃服务数': '时间区间内 活跃服务数',
    '平均会话互动数': '总消息/总会话数',
    '互动用户数': '终端用户 uv'
  };
  const EMPTY = '暂无数据，尝试修改更大的时间范围 / 过滤条件试试';
  Object.assign(TIP, {
    'Agent - 输出耗时':'时间周期内，各Agent调用总输出耗时',
    'Agent - 请求失败率':'时间周期内，各Agent请求失败率',
    'Agent - 请求失败率 TOP10':'时间周期内，基于所有Agent请求失败率降序，取前10',
    'Agent - 请求失败次数':'时间区间内，各Agent请求失败次数趋势',
    'Span Type - 输出耗时':'时间周期内，各类Span节点类型总耗时',
    'Span Type - 请求失败率':'时间周期内，各类Span节点类型请求失败率',
    'Span Type - 请求失败次数':'时间周期内，各类Span节点类型请求失败次数'
  });
  const DELAY = [
    {t:'Agent - 输出耗时',kind:'empty',ctrl:['stat'],statOptions:['Avg','PCT95','PCT99']},
    {t:'Agent - 最大耗时 Top10',kind:'rank',ctrl:['stat'],statOptions:['Avg','PCT95','PCT99']},
    {t:'Agent - 请求失败率',kind:'empty'},
    {t:'Agent - 请求失败率 TOP10',kind:'rank'},
    {t:'Agent - 请求失败次数',kind:'empty'},
    {t:'Span Type - 输出耗时',kind:'line',ctrl:['stat'],statOptions:['Avg','PCT95','PCT99'],legend:[],colors:['#7087a8']},
    {t:'Span Type - 请求失败率',kind:'line',legend:[],colors:['#7087a8']},
    {t:'Span Type - 请求失败次数',kind:'line',legend:[],colors:['#7087a8']}
  ];
  const AGENTS=['123','测试','111','中医中药遴选AI助手','接口调用','简历筛选助手'];
  const COST = [
    ['不同 Agent 费用消耗','empty','时间周期内，各Agent总费用消耗趋势'],
    ['Agent - 费用消耗 Top10','rank','时间周期内，各Agent总费用消耗Max降序，取前10'],
    ['模型服务 - 费用消耗','empty','时间周期内，各模型调用总费用消耗趋势'],
    ['模型服务 - 费用消耗 Top10','rank','时间周期内，各模型服务总费用消耗的降序，取前10'],
    ['每个消息费用消耗','empty','时间周期内，单个消息对话总费用消耗 avg/P95/P99',true],
    ['终端用户费用消耗','empty','时间周期内，服务单个用户总费用消耗 avg/P95/P99',true],
    ['各调用渠道消耗趋势','empty','时间周期内，各调用渠道总费用消耗趋势'],
    ['渠道 - 费用消耗分布','pie','时间周期内，各渠道总费用消耗分布']
  ].map(([t,kind,tip,stat])=>{TIP[t]=tip;return {t,kind,ctrl:stat?['stat']:[],statOptions:['Avg','PCT95','PCT99']};});
  const chartSelections = new Map();
  const MODEL_DELAY = [
    {t:'模型服务 - 输出耗时',kind:'line',ctrl:['stat'],statOptions:['Avg','PCT95','PCT99']},
    {t:'首 Token 输出耗时 Top10',kind:'rank',ctrl:['stat'],statOptions:['Avg','PCT95','PCT99']},
    {t:'模型服务 - 请求失败率',kind:'empty'},
    {t:'模型服务 - 请求失败率 TOP10',kind:'rank'},
    {t:'模型服务 - 请求失败次数',kind:'line'}
  ];
  const MODEL_COST = [
    {t:'不同模型服务费用消耗',kind:'line'},
    {t:'模型服务 - 费用消耗 Top10',kind:'rank'},
    {t:'渠道 - 费用消耗',kind:'line'},
    {t:'渠道 - 费用消耗分布',kind:'pie'}
  ];
  // These explanations describe the prototype's metric definitions, not captured source-site tooltips.
  Object.assign(TIP, {
    '模型服务 - 输出耗时':'模型请求开始到输出完成的耗时趋势；支持 Avg、PCT95、PCT99。当前为模拟数据。',
    '首 Token 输出耗时 Top10':'按模型首 Token 输出耗时降序展示前 10 个模型服务；当前为模拟数据。',
    '模型服务 - 请求失败率':'失败请求数 / 总请求数。没有有效样本时展示空态，而非将缺失数据视为 0。',
    '模型服务 - 请求失败率 TOP10':'按模型服务请求失败率降序展示前 10 项。当前为模拟数据。',
    '模型服务 - 请求失败次数':'所选时间范围内模型服务请求失败次数趋势。当前为模拟数据。',
    '不同模型服务费用消耗':'按模型服务分组展示费用趋势，单位为元。当前为模拟数据。',
    '渠道 - 费用消耗':'按调用渠道分组展示费用趋势，单位为元。当前为模拟数据。'
  });
  let analysisIndex=0, selectedAgents=[], conditions=[], draft=[];
  let toolbarState=[];
  const LOADING = '数据查询中，请耐心等待';
  const STAT_OPTS = ['Avg', 'Max', 'Min', 'PCT50', 'PCT90', 'PCT99'];
  const GRAN_OPTS = ['分', '时', '日', '月'];
  const RANGE_OPTS = ['近 3 天', '近 7 天', '近 30 天'];
  const ANALYSIS = ['基础分析', '延迟异常分析', '费用消耗分析'];
  const SERIES = ['#26b8ff', '#ff8a00', '#7b61ff', '#00c89b'];

  const TABS = [
    {
      key: 'Agent',
      kpis: [['活跃应用总量', '个'], ['应用总调用次数', '次'], ['应用 LLM Token 总量', ''], ['应用平均输出耗时', 'S'], ['应用平均首 Token 耗时', 'S']],
      search: '输入智能体名称搜索', hasAnalysis: true, hasScene: true,
      perf: [
        { t: 'Token 输出速率', kind: 'line', stats: true, unit: '/m', ctrl: ['metric:TPM', 'stat'], legend: ['Token 输出速率'] },
        { t: '耗时', kind: 'line', stats: true, unit: 's', ctrl: ['metric:总耗时', 'stat'], legend: ['总耗时'] },
        { t: '请求成功、失败量', kind: 'line', legend: ['Failed', 'Success'], colors: ['#ff8a00', '#26b8ff'] },
        { t: '请求成功率', kind: 'line', legend: ['请求成功率'] }
      ],
      ops: [
        { t: 'Tokens', kind: 'line', legend: ['Total', 'Input', 'Output'] },
        { t: '费用消耗', kind: 'line', legend: ['RMB'] },
        { t: 'Tokens（按模型类型）', kind: 'line', legend: ['大语言模型', '向量模型', '排序模型', '视觉模型'] },
        { t: '费用消耗（按模型类型）', kind: 'line', legend: ['大语言模型', '向量模型', '排序模型', '视觉模型'] },
        { t: 'Tokens（按智能体名称）', kind: 'empty' },
        { t: '费用消耗（按智能体名称）', kind: 'empty' },
        { t: '费用消耗（按Input,Outopt）', kind: 'line', legend: ['Total', 'Input', 'Output'] },
        { t: 'Agent 消息数', kind: 'empty' },
        { t: '消息数 - Agent 分布', kind: 'pie' },
        { t: '各渠道消息数', kind: 'empty' },
        { t: '消息数 - 渠道分布', kind: 'pie' }
      ],
      table: { first: 'Agent', cols: ['消息数', '会话数', '平均会话互动数', '互动用户数', '用户满意度-赞', '用户满意度-踩'] }
    },
    {
      key: 'Model',
      kpis: [['活跃模型服务总量', '个'], ['模型服务总调用次数', '次'], ['模型服务 LLM Token 总量', ''], ['模型服务平均输出耗时', 'S'], ['模型服务平均首 Token 耗时', 'S']],
      search: '输入模型名称搜索', hasAnalysis: true, hasScene: true,
      perf: [
        { t: 'Token 输出速率', kind: 'line', stats: true, unit: '/m', ctrl: ['metric:TPM', 'stat'], legend: ['Token 输出速率'] },
        { t: '调用量', kind: 'line', legend: ['调用量'] },
        { t: '请求成功率', kind: 'line', legend: ['请求成功率'] },
        { t: '耗时', kind: 'loading', stats: true, unit: 's', ctrl: ['metric:模型调用耗时', 'stat'], legend: ['模型调用耗时'] }
      ],
      ops: [
        { t: '活跃应用数', kind: 'loading', statLabels: ['总计', '成功率'] },
        { t: '活跃服务数', kind: 'loading', statLabels: ['总计', '成功率'] },
        { t: 'Tokens', kind: 'loading' },
        { t: '费用消耗（按Input,Outopt）', kind: 'loading' },
        { t: 'Tokens（按模型类型）', kind: 'loading' },
        { t: '费用消耗（按模型类型）', kind: 'loading' },
        { t: 'Tokens（按模型名称）', kind: 'loading' },
        { t: '费用消耗（按模型名称）', kind: 'loading' },
        { t: '调用数 - 模型服务分布', kind: 'loading' },
        { t: '各渠道消息数', kind: 'loading' },
        { t: '调用数 - 渠道分布', kind: 'loading' }
      ],
      table: null
    }
  ];

  const root = document.createElement('section');
  root.className = 'agent-metrics'; root.hidden = true; root.setAttribute('aria-label', '指标监控');
  document.querySelector('.main-content').append(root);
  const dialog = document.createElement('dialog');
  dialog.className = 'metrics-dialog'; document.body.append(dialog);

  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  function lineChart(legend, colors) {
    const cs = colors && colors.length ? colors : SERIES;
    const grid = [4, 3, 2, 1, 0].map((n, i) => `<text x="4" y="${10 + i * 51}">${n}</text><path d="M22 ${7 + i * 51}H550" stroke="#d7d7d7" stroke-dasharray="4 4"/>`).join('');
    const pts = [[45, '2026-10-04 13:07'], [166, '2026-10-05 13:07'], [287, '2026-10-06 13:07'], [408, '2026-10-07 13:07'], [530, '2026-10-08 13:07']];
    const axis = pts.map(([x, l]) => `<text x="${x}" y="229" text-anchor="middle">${l}</text>`).join('');
    const trace = `<path d="M45 211H530" stroke="${cs[0]}" fill="none"/>` + pts.map(([x]) => `<circle cx="${x}" cy="211" r="1.5" fill="${cs[0]}"/>`).join('');
    const legendHtml = legend.map((l, i) => `<span><i style="background:${cs[i % cs.length]}"></i>${esc(l)}</span>`).join('');
    return `<div class="metrics-plot"><svg class="metrics-svg" viewBox="0 0 560 240" preserveAspectRatio="none" role="img" aria-label="${esc(legend[0] || '图表')}（当前全部为零）"><g font-family="Arial,sans-serif" font-size="12" fill="#929292">${grid}<path d="M22 211H550" stroke="#bbb"/>${trace}${axis}<text x="532" y="215" fill="#666" font-size="10">Avg</text></g></svg><div class="metrics-zoom" aria-hidden="true"></div><div class="metrics-legend">${legendHtml}</div></div>`;
  }
  function emptyBlock(rank=false) {
    const graphic=rank?'<rect x="0" y="6" width="140" height="16" rx="2" fill="#dce1e9"/><rect x="0" y="30" width="114" height="16" rx="2" fill="#e9ecf1"/><rect x="0" y="54" width="94" height="16" rx="2" fill="#eff1f5"/><rect x="0" y="78" width="54" height="16" rx="2" fill="#f4f5f8"/>':'<path d="M0 40 28 28 67 48 113 11 140 20V96H0Z" fill="#dce1e9"/><path d="M0 63 28 43 67 62 113 43 140 52V96H0Z" fill="#f1f3f7"/>';
    return `<div class="metrics-empty" role="img" aria-label="${esc(EMPTY)}"><svg viewBox="0 0 140 100" width="140" height="100" aria-hidden="true">${graphic}</svg><p>${esc(EMPTY)}</p></div>`;
  }
  function pieBlock() {
    return `<div class="metrics-empty" role="img" aria-label="${esc(EMPTY)}"><svg viewBox="0 0 112 112" width="112" height="112" aria-hidden="true"><path d="M54 6A51 51 0 1 0 105 57H54Z" fill="#f1f3f7"/><path d="M60 0A51 51 0 0 1 111 51H60Z" fill="#dce1e9"/></svg><p>${esc(EMPTY)}</p></div>`;
  }
  function loadingBlock() {
    return `<div class="metrics-loading" role="status"><span class="metrics-spinner" aria-hidden="true"></span><p>${esc(LOADING)}</p></div>`;
  }
  function infoFor(t) {
    const tip = TIP[t];
    return tip ? `<span class="metrics-info" role="button" tabindex="0" aria-label="${esc(t)}说明" data-tip="${esc(tip)}">ⓘ</span>` : '';
  }
  function card(c) {
    const ctrls = (c.ctrl || []).map(x => {
      if (x === 'stat') return `<select aria-label="统计方式">${(c.statOptions||STAT_OPTS).map(o => `<option>统计方式 ${o}</option>`).join('')}</select>`;
      if (x.indexOf('metric:') === 0) { const cur = x.slice(7); const options=c.t==='Token 输出速率'?['TPM','TPS']:['总耗时','模型调用首 Token 耗时','模型调用耗时'];return `<select data-metric aria-label="${esc(c.t)}指标">${options.map(o=>`<option${o===cur?' selected':''}>${esc(o)}</option>`).join('')}</select>`; }
      return '';
    }).join('');
    const stats = c.stats
      ? `<aside class="metrics-stats"><small>Avg</small><strong class="metrics-average">0.00${esc(c.unit || '')}</strong><small>Max</small><strong>0.00${esc(c.unit || '')}</strong><small class="metrics-min">Min</small><strong>0.00${esc(c.unit || '')}</strong></aside>`
      : (c.statLabels ? `<aside class="metrics-stats">${c.statLabels.map((l, i) => `<small>${esc(l)}</small><strong${i ? ' class="metrics-min"' : ''}>-</strong>`).join('')}</aside>` : '');
    let body;
    if (c.kind === 'line') body = lineChart(c.legend || [], c.colors);
    else if (c.kind === 'pie') body = pieBlock();
    else if (c.kind === 'loading') body = loadingBlock();
    else body = emptyBlock(c.kind==='rank');
    return `<article class="metrics-card" data-chart="${esc(c.t)}"><header><h3>${esc(c.t)}${infoFor(c.t)}</h3><div class="metrics-chart-controls">${ctrls}<button class="metrics-expand" aria-label="放大${esc(c.t)}">⤢</button></div></header><div class="metrics-card-body">${stats}${body}</div></article>`;
  }
  function tableBlock(tb) {
    if (!tb) return '';
    const cols = tb.cols.map(c => `<th>${esc(c)}${infoFor(c)}</th>`).join('');
    return `<div class="metrics-table-wrap"><table class="metrics-table"><thead><tr><th>${esc(tb.first)}</th>${cols}</tr></thead><tbody><tr><td class="metrics-table-empty" colspan="${tb.cols.length + 1}" role="img" aria-label="${esc(EMPTY)}"><svg viewBox="0 0 64 44" width="64" height="44" aria-hidden="true"><path d="M6 40 20 26l12 8 12-16 14 22Z" fill="#eef2f8"/></svg><p>${esc(EMPTY)}</p></td></tr></tbody></table></div>`;
  }
  function tools(tab) {
    const range = `<select aria-label="时间范围">${RANGE_OPTS.map(o => `<option>${o}</option>`).join('')}</select>`;
    const gran = `<select class="metrics-granularity" aria-label="时间粒度">${GRAN_OPTS.map(o => `<option${o === '日' ? ' selected' : ''}>时间粒度 ${o}</option>`).join('')}</select>`;
    const analysis = tab.hasAnalysis ? `<div class="metrics-segments" aria-label="分析类型">${ANALYSIS.map((x, i) => `<button data-analysis="${i}" aria-pressed="${i===analysisIndex}">${x}</button>`).join('')}</div>` : '';
    const scene = tab.hasScene ? `<select aria-label="场景"><option>全部场景</option><option>评测场景</option><option>非评测场景</option></select>` : '';
    return `<div class="metrics-toolbar"><div class="metrics-tools">${range}${gran}${analysis}</div><div class="metrics-tools metrics-filter-tools">${scene}<div class="metrics-agent-picker"><input type="search" aria-label="名称搜索" aria-expanded="false" placeholder="${esc(tab.search)}"><div class="metrics-agent-options" hidden></div></div><button data-filter aria-expanded="false">⚲ 筛选器${conditions.length?' · '+conditions.length:''}</button><button data-saved>☑ 已保存条件⌄</button><button data-save aria-label="保存条件">▣</button><div class="metrics-filter-panel" hidden></div></div><button class="metrics-refresh" data-refresh aria-label="刷新">⟳</button></div>`;
  }

  let activeTab = 0;
  const MODEL_NAME='Doubao-Seed-2.0-mini';
  function modelSeries(title,metric) {
    const totals=[1762076,1762076,1800000,1630732];
    const input=totals.map(n=>Math.round(n*.79)),output=totals.map((n,i)=>n-input[i]);
    const costs=[1.02,1.02,1.04,.94];
    if(title==='Token 输出速率')return {labels:[title],values:[[7650,8002.49,7888.53,7363.26].map(n=>metric==='TPS'?n/60:n)],unit:metric==='TPS'?'/s':'/m',stats:true,area:true};
    if(title==='耗时')return {labels:[metric],values:[metric==='模型调用首 Token 耗时'?[1.05,1.02,1.06,1.11]:[32,30.86,31.64,33.54]],unit:'s',stats:true,area:true};
    if(title==='调用量'||title==='活跃服务数')return {labels:[title],values:[[92,92,94,87]],unit:'次',area:true,colors:[title==='调用量'?'#dd59ce':'#26b8ff']};
    if(title==='请求成功率')return {labels:[title],values:[[100,100,100,98.85]],unit:'%',area:true,colors:['#00c89b']};
    if(title==='模型服务 - 输出耗时')return {labels:[MODEL_NAME],values:[[32000,30860,31640,33540]],unit:'ms'};
    if(title==='模型服务 - 请求失败次数')return {labels:[MODEL_NAME],values:[[0,0,0,1]],unit:'次'};
    if(title==='各渠道消息数')return {labels:['数据集'],values:[[0,0,0,0]],unit:'条'};
    if(title==='Tokens')return {labels:['Total','Input','Output'],values:[totals,input,output],unit:'',area:true,colors:['#a161ff','#26b8ff','#00c89b']};
    if(title==='费用消耗（按Input,Outopt）')return {labels:['Total','Input','Output'],values:[costs,costs.map(n=>n*.28),costs.map(n=>n*.72)],unit:'元',area:true,colors:['#a161ff','#26b8ff','#00c89b']};
    const tokens=title.startsWith('Tokens');
    return {labels:[title.includes('类型')?'大语言模型':title.includes('渠道')?'数据集':MODEL_NAME],values:[tokens?totals:costs],unit:tokens?'':'元',area:title.includes('类型')};
  }
  function modelChart(el){
    const title=el.dataset.chart,body=el.querySelector('.metrics-card-body');
    const metric=el.querySelector('[data-metric]')?.value||'模型调用耗时';
    const stat=(el.querySelector('[aria-label="统计方式"]')?.value||'Avg').replace('统计方式 ','');
    const factor=stat==='PCT95'?1.35:stat==='PCT99'?1.6:stat==='Max'?1.7:stat==='Min'?.75:1;
    const fmt=n=>n.toLocaleString('zh-CN',{maximumFractionDigits:2});
    const side=(a,b)=>`<aside class="metrics-stats"><small>总计</small><strong class="metrics-average">${a}个</strong><small>成功率</small><strong>${b}%</strong></aside>`;
    const search=(toolbarState[3]||'').trim();
    const noMatch=search&&!MODEL_NAME.toLowerCase().includes(search.toLowerCase());
    if(noMatch){body.innerHTML=emptyBlock();return;}
    if(title==='活跃应用数'||title==='模型服务 - 请求失败率'){body.innerHTML=(title==='活跃应用数'?side(0,'0.00'):'')+emptyBlock();return;}
    if(/分布/.test(title)){
      const label=title.includes('渠道')?'数据集':MODEL_NAME;
      body.innerHTML=`<div class="metrics-model-donut"><div role="img" aria-label="${esc(label)}占比100%" title="${esc(label)}：100%（模拟）"></div><span><i></i>${esc(label)}</span></div>`;return;
    }
    if(/Top10/i.test(title)){
      const fail=title.includes('失败'),cost=title.includes('费用');
      const value=fail?100/365:cost?4.02:1060*factor,unit=fail?'%':cost?'元':'ms';
      const max=fail?.3:cost?4.5:Math.ceil(value/300)*300;
      const color=fail?'#ed7777':'#56cbe8',width=value/max*420;
      body.innerHTML=`<div class="metrics-plot"><svg class="metrics-model-rank" viewBox="0 0 620 290" role="img" aria-label="${esc(title)}：${MODEL_NAME} ${fmt(value)}${unit}（模拟）">${Array.from({length:5},(_,i)=>`<path d="M${115+i*105} 10V260" stroke="#e1e5ec" stroke-dasharray="4 4"/><text x="${115+i*105}" y="280" text-anchor="middle">${fmt(max*i/4)}</text>`).join('')}<text x="5" y="145">Doubao-Seed-2…</text><rect x="115" y="127" width="${width}" height="28" fill="${color}"><title>${MODEL_NAME}：${fmt(value)}${unit}（模拟）</title></rect><text x="${125+width}" y="145">${fmt(value)} ${unit}</text></svg></div>`;return;
    }
    const config=modelSeries(title,metric),colors=config.colors||['#56cbe8'];
    const values=config.values.map(arr=>arr.map(n=>n*(config.stats||title==='模型服务 - 输出耗时'?factor:1)));
    const high=Math.max(...values.flat());const step=high>=500000?500000:high>10000?10000:high>1000?2500:high>10?10:.3;const max=title==='请求成功率'?100:high===0?4:Math.ceil(high/step)*step;
    const dates=Array.from({length:4},(_,i)=>{const d=new Date();const days=(toolbarState[0]||'').includes('30')?30:(toolbarState[0]||'').includes('7')?7:3;d.setDate(d.getDate()-Math.round(days*(3-i)/3));return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;});
    const grid=Array.from({length:5},(_,i)=>`<text x="0" y="${18+i*45}">${fmt(max*(4-i)/4)}</text><path d="M60 ${14+i*45}H545" stroke="#d7dde6" stroke-dasharray="4 4"/>`).join('');
    const paths=values.map((arr,j)=>{const pts=arr.map((n,i)=>`${80+i*145},${194-n/max*180}`).join(' ');return (config.area?`<polygon points="80,194 ${pts} 515,194" fill="${colors[j%colors.length]}" opacity=".22"/>`:'')+`<polyline points="${pts}" fill="none" stroke="${colors[j%colors.length]}" stroke-width="1.8"/>`+arr.map((n,i)=>`<circle class="metrics-model-point" tabindex="0" data-tip="${esc(dates[i]+' · '+config.labels[j]+'：'+fmt(n)+config.unit+'（模拟）')}" cx="${80+i*145}" cy="${194-n/max*180}" r="3" fill="${colors[j%colors.length]}"><title>${esc(config.labels[j])}：${fmt(n)}${config.unit}</title></circle>`).join('');}).join('');
    const avg=values[0].reduce((a,b)=>a+b,0)/4;
    const stats=config.stats?`<aside class="metrics-stats"><small>${esc(stat)}</small><strong class="metrics-average">${fmt(avg)}${config.unit}</strong><small>Max</small><strong>${fmt(Math.max(...values[0]))}${config.unit}</strong><small class="metrics-min">Min</small><strong>${fmt(Math.min(...values[0]))}${config.unit}</strong></aside>`:title==='活跃服务数'?side(1,'99.73'):'';
    body.innerHTML=stats+`<div class="metrics-plot"><svg class="metrics-svg" viewBox="0 0 570 240" role="img" aria-label="${esc(title)}模拟趋势，单位${config.unit||'Token'}"><g font-size="11" fill="#89909b">${grid}${paths}<path d="M60 ${194-avg/max*180}H535" stroke="#8e99aa" stroke-dasharray="4 4"/><text x="538" y="${198-avg/max*180}">${esc(stat)}</text>${dates.map((d,i)=>`<text x="${80+i*145}" y="220" text-anchor="middle">${d}</text>`).join('')}</g></svg><div class="metrics-zoom" aria-hidden="true"></div><div class="metrics-legend">${config.labels.map((n,i)=>`<span><i style="background:${colors[i%colors.length]}"></i>${esc(n)}</span>`).join('')}</div></div>`;
  }
  // Deterministic demonstration data only; never sent to the reference service.
  function demoValues(title, series=0) {
    const scope=JSON.stringify([toolbarState,selectedAgents,conditions]);
    let seed=[...title+scope].reduce((n,c)=>(n*31+c.charCodeAt(0))>>>0,series+19);
    return Array.from({length:12},(_,i)=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return 25+(seed%45)+i*3;});
  }
  function demoChart(el) {
    if(activeTab===1){modelChart(el);return;}
    const title=el.dataset.chart,body=el.querySelector('.metrics-card-body');
    const metric=el.querySelector('[data-metric]')?.value;
    const stat=el.querySelector('[aria-label="统计方式"]')?.value||'Avg';
    const factor=stat.includes('99')?1.8:stat.includes('95')?1.5:stat.includes('Max')?1.9:stat.includes('Min')?.6:1;
    const cost=/费用|消耗趋势/.test(title),rate=/率/.test(title)&&!title.includes('Token'),duration=/耗时/.test(title),token=title.includes('Token');
    const unit=cost?'元':rate?'%':duration?'s':token&&title.includes('速率')?(metric==='TPS'?'/s':'/m'):'';
    const scale=duration?(metric==='模型调用首 Token 耗时'?.009:.05):cost?2.4:token?(metric==='TPS'?.8:48):rate?1:12;
    const names=selectedAgents.length?selectedAgents:['中医中药遴选AI助手','简历筛选助手','接口调用'];
    const format=n=>n.toLocaleString('zh-CN',{maximumFractionDigits:2});
    const values=demoValues(title).map(n=>rate?(title.includes('失败')?n/18:96+n/35):n*scale*factor);
    if(/Top10/i.test(title)){
      const labels=title.includes('模型')?['DeepSeek V3','Doubao Pro','Qwen Plus','Doubao Lite','Embedding']:[...names,'智能客服','知识问答','合同审核','数据分析','报告助手','营销助手','翻译助手'];
      const sorted=demoValues(title).slice(0,Math.min(10,labels.length)).sort((a,b)=>b-a);
      body.innerHTML='<div class="metrics-demo-rank">'+sorted.map((n,i)=>`<div title="${esc(labels[i])}：${format(n*scale)}${unit}"><span>${i+1}. ${esc(labels[i])}</span><i style="width:${n/sorted[0]*55}%"></i><b>${format(n*scale)}${unit}</b></div>`).join('')+'</div>';return;
    }
    if(/分布/.test(title)){
      const labels=title.includes('渠道')?['API 调用','Web 应用','调试预览','评测任务']:[...names,'其他智能体'].slice(0,4);while(labels.length<4)labels.push('其他应用 '+labels.length);
      body.innerHTML='<div class="metrics-demo-pie"><div role="img" aria-label="模拟占比：42%、28%、18%、12%"></div><ul>'+labels.slice(0,4).map((n,i)=>`<li><i style="background:${SERIES[i]}"></i>${esc(n)} <b>${[42,28,18,12][i]}%</b></li>`).join('')+'</ul></div>';return;
    }
    const multi=/Agent|模型|渠道|Tokens|成功、失败/.test(title)&&!title.includes('速率');
    const labels=multi?(title.includes('成功、失败')?['Success','Failed']:title.includes('Tokens')?['Input','Output']:title.includes('渠道')?['API 调用','Web 应用','评测任务']:names):[metric||title];
    const all=labels.map((_,j)=>values.map((n,i)=>j===0?n:n*(.65-j*.15)+(demoValues(title,j+1)[i]%8)*scale));
    const max=Math.ceil(Math.max(...all.flat())*1.15)||1;
    const grid=Array.from({length:5},(_,i)=>`<text x="0" y="${18+i*45}">${format(max*(4-i)/4)}</text><path d="M55 ${14+i*45}H555" stroke="#e1e5ec" stroke-dasharray="4 4"/>`).join('');
    const paths=all.map((arr,j)=>`<polyline points="${arr.map((n,i)=>`${55+i*45.45},${194-n/max*180}`).join(' ')}" fill="none" stroke="${SERIES[j%4]}" stroke-width="2.3"/>`+arr.map((n,i)=>`<circle cx="${55+i*45.45}" cy="${194-n/max*180}" r="3" fill="${SERIES[j%4]}"><title>${esc(labels[j])} · 第${i+1}时段：${format(n)}${unit}（模拟）</title></circle>`).join('')).join('');
    const avg=values.reduce((a,b)=>a+b,0)/values.length;
    const side=el.querySelector('[data-metric]')?`<aside class="metrics-stats"><small>${esc(stat.replace('统计方式 ',''))}</small><strong class="metrics-average">${format(avg)}${unit}</strong><small>Max</small><strong>${format(Math.max(...values))}${unit}</strong><small class="metrics-min">Min</small><strong>${format(Math.min(...values))}${unit}</strong></aside>`:'';
    body.innerHTML=side+`<div class="metrics-plot"><svg class="metrics-svg" viewBox="0 0 570 240" role="img" aria-label="${esc(title)}模拟趋势"><g font-size="11" fill="#9299a5">${grid}${paths}<text x="55" y="220">起始时段</text><text x="275" y="220">时间范围中段</text><text x="500" y="220">最新时段</text></g></svg><div class="metrics-zoom" aria-hidden="true"></div><div class="metrics-legend">${labels.map((n,j)=>`<span><i style="background:${SERIES[j%4]}"></i>${esc(n)}</span>`).join('')}</div></div>`;
  }
  function populateDemo(){
    root.querySelectorAll('.metrics-card').forEach(demoChart);
    const kpi=activeTab===1?['1','365','6,954,884','32.01','1.06']:['24','18,426','3,842,160','2.36','0.42'];
    root.querySelectorAll('.metrics-summary strong').forEach((el,i)=>{const unit=el.querySelector('small')?.outerHTML||'';el.innerHTML=kpi[i]+unit;});
    root.querySelector('.metrics-mode')?.insertAdjacentHTML('beforeend','<span class="metrics-demo-badge">模拟数据 · 非真实业务</span>');
    const tbody=root.querySelector('.metrics-table tbody');if(tbody){const count=root.querySelectorAll('.metrics-table th').length;tbody.innerHTML=['中医中药遴选AI助手','简历筛选助手','接口调用'].map((n,i)=>'<tr><td>'+n+'</td>'+Array.from({length:count-1},(_,j)=>'<td>'+[[6840,2100,3.26,1240,816,12],[4520,1850,2.44,965,645,8],[7066,2630,2.69,1540,962,15]][i][j]+'</td>').join('')+'</tr>').join('');}
    root.querySelector('.metrics-status').textContent='当前展示确定性模拟数据，用于界面演示，不代表真实业务统计或计费。筛选切换用于模拟不同视图。';
  }
  function render(i) {
    activeTab = i;
    const tab = TABS[i];
    const kpis = tab.kpis.length
      ? `<div class="metrics-summary">${tab.kpis.map(([n, u]) => `<article><span>${esc(n)}</span><strong>0<small>${esc(u)}</small></strong></article>`).join('')}</div>`
      : '';
    root.innerHTML = `<nav class="metrics-mode" aria-label="监控对象">${TABS.map((t, j) => `<button data-mode="${j}" aria-selected="${j === i}">${esc(t.key)}</button>`).join('')}</nav>${tools(tab)}${kpis}<button class="metrics-section-title" data-collapse="performance" aria-expanded="true">性能 ⌃</button><div class="metrics-grid" data-section="performance">${tab.perf.map(card).join('')}</div><button class="metrics-section-title" data-collapse="operations" aria-expanded="true">运营 ⌃</button><div class="metrics-grid" data-section="operations">${tab.ops.map(card).join('')}</div>${tableBlock(tab.table)}<p class="metrics-status" role="status">结构与提示说明复刻自线上参考页 · 零数据展示，未连接实时监控服务</p>`;
    if(i<2&&analysisIndex===1){const charts=i===1?MODEL_DELAY:DELAY;root.querySelector('.metrics-summary')?.remove();root.querySelector('.metrics-table-wrap')?.remove();root.querySelector('[data-collapse="performance"]').textContent='输出耗时 ⌃';root.querySelector('[data-section="performance"]').innerHTML=charts.slice(0,2).map(card).join('');root.querySelector('[data-collapse="operations"]').textContent='异常分析 ⌃';root.querySelector('[data-section="operations"]').innerHTML=charts.slice(2).map(card).join('');}
    if(i<2&&analysisIndex===2){root.querySelector('.metrics-summary')?.remove();root.querySelector('.metrics-table-wrap')?.remove();root.querySelector('[data-collapse="performance"]').textContent='费用消耗 ⌃';root.querySelector('[data-section="performance"]').innerHTML=(i===1?MODEL_COST:COST).map(card).join('');root.querySelector('[data-collapse="operations"]').remove();root.querySelector('[data-section="operations"]').remove();}
    root.querySelectorAll('.metrics-card select').forEach(select=>{const key=chartKey(select);if(chartSelections.has(key)){select.value=chartSelections.get(key);updateChart(select);}});
    root.querySelectorAll('.metrics-tools > select,.metrics-agent-picker > input').forEach((x,j)=>{if(toolbarState[j]!=null)x.value=toolbarState[j];});
    populateDemo();
  }

  function rememberTools(){toolbarState=[...root.querySelectorAll('.metrics-tools > select,.metrics-agent-picker > input')].map(x=>x.value);}
  function agentOptions(){const input=root.querySelector('.metrics-agent-picker input'),panel=root.querySelector('.metrics-agent-options');panel.hidden=false;input.setAttribute('aria-expanded','true');const list=AGENTS.filter(n=>n.toLowerCase().includes(input.value.toLowerCase()));panel.innerHTML=list.map(n=>`<label><input type="checkbox" data-agent="${esc(n)}" ${selectedAgents.includes(n)?'checked':''}><span class="metrics-agent-dot"></span>${esc(n)}</label>`).join('')||'<p>暂无匹配的智能体</p>';}
  function closeFilters(){root.querySelector('.metrics-filter-panel').hidden=true;root.querySelector('[data-filter]').setAttribute('aria-expanded','false');}
  function filterPanel(){const panel=root.querySelector('.metrics-filter-panel');panel.hidden=false;root.querySelector('[data-filter]').setAttribute('aria-expanded','true');panel.innerHTML=`<div class="metrics-filter-rows ${draft.length>1?'multiple':''}">${draft.length>1?'<span class="metrics-and">且</span>':''}${draft.map((r,i)=>`<div class="metrics-filter-row" data-row="${i}"><select data-field aria-label="筛选字段 ${i+1}"><option value="">请选择条件</option>${['模型服务名称','用户ID','状态','渠道'].map(n=>`<option ${r.field===n?'selected':''}>${n}</option>`).join('')}</select>${r.field?`<select data-op aria-label="匹配方式 ${i+1}"><option value="=" ${r.op==='='?'selected':''}>= 匹配</option><option value="!=" ${r.op==='!='?'selected':''}>≠ 不匹配</option></select>`:''}<input data-value aria-label="筛选值 ${i+1}" value="${esc(r.value)}" placeholder="${r.field==='模型服务名称'?'输入模型名称搜索':r.field?'请输入'+r.field:'请先选择条件再输入文本'}" ${r.field?'':'disabled'}><button data-remove="${i}" aria-label="删除条件 ${i+1}">⊖</button></div>`).join('')}</div><footer><button data-add>⊕ 添加条件</button><span></span><button data-cancel>取消</button><button class="metrics-confirm" data-apply>确定</button></footer><p class="metrics-filter-error" role="alert"></p>`;}
  root.addEventListener('focusin',e=>{if(activeTab===0&&e.target.matches('.metrics-agent-picker > input'))agentOptions();});
  document.addEventListener('click',e=>{if(!root.contains(e.target)||!e.target.closest('.metrics-agent-picker')){root.querySelector('.metrics-agent-options').hidden=true;root.querySelector('.metrics-agent-picker input').setAttribute('aria-expanded','false');}if(!e.target.closest('.metrics-filter-panel,[data-filter]'))closeFilters();});
  root.addEventListener('keydown',e=>{if(e.key==='Escape'){closeFilters();root.querySelector('.metrics-agent-options').hidden=true;root.querySelector('.metrics-agent-picker input').setAttribute('aria-expanded','false');}});

  const tip = document.createElement('div');
  tip.className = 'metrics-tooltip'; tip.id = 'metrics-help-tooltip'; tip.role = 'tooltip'; tip.hidden = true;
  document.body.append(tip);
  let tipTarget;
  function hideTip() { tip.hidden = true; if (tipTarget) tipTarget.removeAttribute('aria-describedby'); tipTarget = null; }
  function showTip(el) {
    hideTip(); tipTarget = el; tip.textContent = el.dataset.tip || ''; tip.hidden = false;
    el.setAttribute('aria-describedby', tip.id);
    const r = el.getBoundingClientRect(), b = tip.getBoundingClientRect();
    tip.style.left = Math.max(8, Math.min(r.left, innerWidth - b.width - 8)) + 'px';
    tip.style.top = (r.top > b.height + 12 ? r.top - b.height - 8 : r.bottom + 8) + 'px';
  }
  document.addEventListener('mouseover', e => { const el = e.target.closest('.metrics-info'); if (el && el !== tipTarget) showTip(el); });
  document.addEventListener('mouseout', e => { const el = e.target.closest('.metrics-info'); if (el && !el.contains(e.relatedTarget)) hideTip(); });
  document.addEventListener('focusin', e => { const el = e.target.closest('.metrics-info'); if (el) showTip(el); });
  document.addEventListener('focusout', hideTip);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hideTip(); if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.metrics-info')) { e.preventDefault(); showTip(e.target); } });
  document.addEventListener('click', e => { if (e.target.matches('.metrics-info')) showTip(e.target); else hideTip(); });
  window.addEventListener('scroll', hideTip, true);
  window.addEventListener('resize', hideTip);
  document.addEventListener('mouseover',e=>{const point=e.target.closest('.metrics-model-point');if(point)showTip(point);});
  document.addEventListener('mouseout',e=>{if(e.target.closest('.metrics-model-point'))hideTip();});
  document.addEventListener('focusin',e=>{if(e.target.matches('.metrics-model-point'))showTip(e.target);});

  let focus;
  const status = t => { if(/已应用|已刷新/.test(t))root.querySelectorAll('.metrics-card').forEach(demoChart);const el = root.querySelector('.metrics-status'); if (el) el.textContent = t.replace(/当前暂无监控数据|当前没有监控数据|当前没有匹配的.*监控数据/g,'当前展示模拟数据'); };
  function modal(content) { hideTip(); focus = document.activeElement; dialog.innerHTML = '<button data-close aria-label="关闭">×</button>' + content;dialog.append(tip);dialog.querySelector('.metrics-expand')?.remove(); dialog.showModal(); dialog.querySelector('[data-close]').onclick = () => dialog.close(); }
  dialog.addEventListener('close', () => {hideTip();document.body.append(tip);if (focus && focus.isConnected) focus.focus(); });
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.mode !== undefined) { rememberTools();analysisIndex=0;render(Number(b.dataset.mode)); return; }
    if (b.dataset.analysis !== undefined) {rememberTools();analysisIndex=Number(b.dataset.analysis);render(activeTab);return; }
    if (b.hasAttribute('data-expand') || b.classList.contains('metrics-expand')) { const c = b.closest('.metrics-card'); if (c) modal(c.outerHTML); return; }
    if (b.dataset.collapse) { const panel = root.querySelector('[data-section="' + b.dataset.collapse + '"]'); panel.hidden = !panel.hidden; b.setAttribute('aria-expanded', String(!panel.hidden)); b.textContent = (analysisIndex===2?'费用消耗':b.dataset.collapse === 'performance' ? (analysisIndex===1?'输出耗时':'性能') : (analysisIndex===1?'异常分析':'运营')) + (panel.hidden ? ' ⌄' : ' ⌃'); return; }
    if (b.hasAttribute('data-refresh')) status('已刷新 · 当前没有监控数据（本地复刻原型）');
    if (b.hasAttribute('data-filter')) {if(!root.querySelector('.metrics-filter-panel').hidden){closeFilters();return;}draft=conditions.length?conditions.map(r=>({...r})):[{field:'',op:'=',value:''}];filterPanel();return;}
    if(b.hasAttribute('data-add')){draft.push({field:'',op:'=',value:''});filterPanel();return;}
    if(b.dataset.remove!==undefined){draft.splice(Number(b.dataset.remove),1);filterPanel();return;}
    if(b.hasAttribute('data-cancel')){closeFilters();return;}
    if(b.hasAttribute('data-apply')){if(draft.some(r=>!r.field||!r.value.trim())){root.querySelector('.metrics-filter-error').textContent='请选择条件并填写筛选值';return;}conditions=draft.map(r=>({...r,value:r.value.trim()}));root.querySelector('[data-filter]').textContent='⚲ 筛选器'+(conditions.length?' · '+conditions.length:'');closeFilters();status('已应用 '+conditions.length+' 个条件（且） · 当前暂无监控数据');return;}
    if (b.hasAttribute('data-save')) {rememberTools();try { localStorage.setItem('pivot-metrics-agent-filters-v2', JSON.stringify({toolbarState,selectedAgents,conditions})); status('当前筛选条件已保存到本机'); } catch { status('浏览器不允许保存筛选条件'); } }
    if (b.hasAttribute('data-saved')) { try { const data = JSON.parse(localStorage.getItem('pivot-metrics-agent-filters-v2') || 'null'); if (data&&Array.isArray(data.toolbarState)&&Array.isArray(data.selectedAgents)&&Array.isArray(data.conditions)) {toolbarState=data.toolbarState;selectedAgents=data.selectedAgents;conditions=data.conditions;render(activeTab);status('已恢复本机保存条件 · 当前没有监控数据'); } else status('暂无已保存条件'); } catch { status('无法读取已保存条件'); } }
  });
  root.addEventListener('change', e => {
    const row=e.target.closest('[data-row]');if(row){const r=draft[Number(row.dataset.row)];if(e.target.hasAttribute('data-field')){r.field=e.target.value;r.value='';filterPanel();}else if(e.target.hasAttribute('data-op'))r.op=e.target.value;return;}
    if(e.target.dataset.agent){selectedAgents=e.target.checked?[...new Set([...selectedAgents,e.target.dataset.agent])]:selectedAgents.filter(n=>n!==e.target.dataset.agent);root.querySelectorAll('.metrics-card').forEach(demoChart);status('已选择 '+selectedAgents.length+' 个智能体 · 模拟数据展示');return;}
    if(e.target.closest('.metrics-card')){chartSelections.set(chartKey(e.target),e.target.value);updateChart(e.target);}
    if(!e.target.closest('.metrics-card')){rememberTools();root.querySelectorAll('.metrics-card').forEach(demoChart);}
    status('已更新模拟展示 · 非真实业务数据');
  });
  function chartKey(select){return [activeTab,analysisIndex,select.closest('.metrics-card').dataset.chart,select.getAttribute('aria-label')].join('|');}
  function updateChart(select){
    const card=select.closest('.metrics-card');
    // Keep selected attributes in sync so the expanded card preserves the current controls.
    [...select.options].forEach(o=>o.toggleAttribute('selected',o.value===select.value));
    demoChart(card);
  }
  dialog.addEventListener('change',e=>{if(!e.target.matches('.metrics-card select'))return;chartSelections.set(chartKey(e.target),e.target.value);updateChart(e.target);root.querySelectorAll('.metrics-card select').forEach(select=>{if(chartKey(select)===chartKey(e.target)){select.value=e.target.value;updateChart(select);}});});
  root.addEventListener('input', e => {if(e.target.hasAttribute('data-value')){draft[Number(e.target.closest('[data-row]').dataset.row)].value=e.target.value;return;}if (e.target.matches('.metrics-agent-picker input')){if(activeTab===0)agentOptions();status('当前没有匹配的' + TABS[activeTab].key + '监控数据');}});

  function sync() {
    const active = location.hash === '#observe-agent-metrics' && document.documentElement.dataset.role !== 'business';
    root.hidden = !active; document.body.classList.toggle('is-metrics-route', active);
    if (dialog.open) dialog.close();
    if (active) { const sc = document.querySelector('.service-catalog'); if (sc) sc.hidden = true; const pp = document.querySelector('.proto-page'); if (pp) pp.hidden = true; }
  }
  render(0);
  window.addEventListener('hashchange', sync); sync();
})();
