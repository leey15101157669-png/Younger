const body = document.body;
const openButton = document.querySelector('[data-open-menu]');
const closeButton = document.querySelector('[data-close-menu]');
const searchInput = document.querySelector('[data-catalog-search]');
const catalogSections = [...document.querySelectorAll('[data-catalog-section]')];
const serviceGroups = [...document.querySelectorAll('[data-service-group]')];
const emptyState = document.querySelector('[data-catalog-empty]');
const contextNav = document.querySelector('[data-context-nav]');
const contextTitle = document.querySelector('[data-context-title]');
const contextItems = document.querySelector('[data-context-items]');
const serviceCatalog = document.querySelector('.service-catalog');
const workerManagementView = document.querySelector('[data-worker-management-view]');
const newTaskView = document.querySelector('[data-new-task-view]');
const skillsMarketplaceView = document.querySelector('[data-skills-view]');
const creationCenterView = document.querySelector('[data-creation-view]');
const applicationCenterView = document.querySelector('[data-application-view]');
const operationsView = document.querySelector('[data-operations-view]');
const operationsDevelopmentView = document.querySelector('[data-operations-development-view]');
const operationsDevelopmentTitle = document.querySelector('[data-operations-development-title]');
const operationsDevelopmentDescription = document.querySelector('[data-operations-development-description]');
const operationsNav = document.querySelector('[data-operations-nav]');
const operationsFilters = [...document.querySelectorAll('[data-operations-filter]')];
const operationsTools = [...document.querySelectorAll('[data-operations-tool]')];
const operationsEmpty = document.querySelector('[data-operations-empty]');
const operationsStatus = document.querySelector('[data-operations-status]');
const operationsCreateButton = document.querySelector('[data-operations-create]');
const historySearch = document.querySelector('[data-history-search]');
const workerSearch = document.querySelector('[data-worker-search]');
const newTaskButton = document.querySelector('[data-new-task-button]');
const taskFilePanel = document.querySelector('[data-task-file-panel]');
const skillSearch = document.querySelector('[data-skill-search]');
const skillCards = [...document.querySelectorAll('[data-skill-card]')];
const skillEmpty = document.querySelector('[data-skill-empty]');
const createCanvasButton = document.querySelector('[data-create-canvas]');
const creationGrid = document.querySelector('[data-creation-grid]');
const creationStatus = document.querySelector('[data-creation-status]');
let activeSkillCategory = '全部';
let taskFileTrigger = null;

const operationsDevelopmentRoutes = {
  '#operations-worker-management': ['Worker 管理', '统一管理 Worker 的创建、状态与使用范围。'],
  '#operations-worker-template': ['职能专家模板', '沉淀可复用的职能专家配置与业务模板。'],
  '#operations-worker-dashboard': ['Worker 看板', '查看 Worker 的运行情况与关键业务指标。'],
  '#operations-worker-value': ['Worker 价值', '评估 Worker 在不同业务场景中的应用价值。'],
  '#operations-worker-test': ['Worker 测试', '验证 Worker 的能力表现与业务可用性。'],
  '#operations-images': ['镜像管理', '管理 Worker 运行所需的基础镜像。'],
  '#operations-instance-templates': ['实例模板', '配置可复用的实例规格与运行策略。'],
  '#operations-instances': ['实例管理', '管理 Worker 实例的运行状态与配置。'],
  '#operations-versions': ['版本管理', '维护 Worker 版本、发布状态与升级记录。'],
  '#operations-thirdparty-claw': ['三方 Claw', '管理第三方 Claw 能力的接入与运行配置。'],
  '#operations-thirdparty-claude-code': ['三方 Claude Code', '管理第三方 Claude Code 能力的接入与运行配置。'],
  '#operations-model-management': ['推理模型', '管理平台可用推理模型的接入与配置。'],
  '#operations-multimodal-models': ['多模态模型', '管理支持文本、图像、音视频等能力的多模态模型。'],
  '#operations-web-model-visibility': ['模型管控', '配置网页端可用模型及其用户可见范围。'],
  '#operations-model-call-logs': ['模型调用日志', '查看通用模型的调用记录与运行结果。'],
  '#operations-multimodal-call-logs': ['多模态调用日志', '查看多模态模型的调用记录与运行结果。'],
  '#operations-retrieval-call-logs': ['检索调用日志', '查看检索模型的调用记录与运行结果。'],
  '#operations-risk-audit': ['风险审计', '审查模型调用过程中的风险事件与处理记录。'],
  '#operations-im-channels': ['IM 渠道', '管理即时通信渠道及其接入配置。'],
  '#operations-im-logs': ['IM 日志', '查看即时通信渠道的消息与运行日志。'],
  '#operations-external-callbacks': ['回调配置', '配置外部事件回调地址与调用状态。'],
  '#operations-team-templates': ['团队模板', '管理可复用的智能团队配置与业务模板。'],
  '#operations-coding-skills': ['Coding 技能', '管理面向 AI Coding 场景的技能能力。'],
  '#operations-skill-market': ['技能广场', '管理平台技能的发布、展示与可用范围。'],
  '#operations-command-market': ['能力命令库', '管理可供业务调用的标准能力命令。'],
  '#operations-documents': ['文档', '管理平台相关文档与内容资料。'],
  '#operations-manual': ['操作手册', '管理平台操作说明与使用指引。'],
  '#operations-tenant-management': ['租户管理', '管理平台租户及其基础配置。'],
  '#operations-app-market': ['应用市场', '管理 Portal 中展示的业务应用。'],
  '#operations-home-settings': ['首页设置', '配置 Portal 首页内容与入口展示。'],
  '#operations-customer-applications': ['客户申请', '管理客户提交的申请与处理状态。'],
  '#operations-client-devices': ['客户端设备', '管理接入平台的客户端设备与使用状态。'],
  '#operations-audit-center': ['审计中心', '集中查看平台操作记录与审计结果。'],
  '#operations-security-center': ['安全中心', '管理平台安全策略、风险事件与处置记录。'],
  '#operations-pivot-admin': ['PivotAdmin', '管理 PivotMatrix 平台级运营与管理能力。'],
  '#operations-system-settings': ['系统配置', '管理平台级参数、权限与基础设置。'],
  '#operations-evaluation': ['数字分身能力评估', '评估 Worker 与数字分身的业务能力。']
};

function getBranchControl(branch) {
  return branch.querySelector(':scope > .service-link--parent');
}

function createContextItem(sourceControl, selected) {
  const destination = sourceControl.matches('a') ? sourceControl : sourceControl.closest('[data-service-item]')?.querySelector('.service-subtree a');
  const item = document.createElement(destination ? 'a' : 'button');
  const icon = sourceControl.querySelector('.service-icon')?.cloneNode(true);
  const label = sourceControl.querySelector('span')?.cloneNode(true);

  item.className = 'context-service-item';
  item.classList.toggle('is-active', selected);

  if (destination) {
    item.href = destination.href;
  } else {
    item.type = 'button';
    item.addEventListener('click', () => {
      showBranchMenu(sourceControl.closest('[data-service-item]'));
      contextItems.querySelector('[aria-current="page"]')?.focus({ preventScroll: true });
    });
  }

  if (selected) item.setAttribute('aria-current', 'page');
  if (icon) item.append(icon);
  if (label) item.append(label);

  return item;
}

function showBranchMenu(branch) {
  const selectedControl = getBranchControl(branch);
  const group = branch.closest('[data-service-group]');
  if (!selectedControl || !group) return;

  document.querySelectorAll('[data-service-item]').forEach(item => {
    const selected = item === branch;
    item.classList.toggle('is-selected', selected);
    item.querySelector(':scope > [data-service-toggle]')?.setAttribute('aria-expanded', String(selected));
  });

  const contextFragment = document.createDocumentFragment();
  group.querySelectorAll(':scope > nav > [data-service-item]').forEach(item => {
    const control = getBranchControl(item);
    if (!control) return;

    contextFragment.append(createContextItem(control, item === branch));
  });

  contextTitle.textContent = group.querySelector(':scope > h4')?.textContent.trim() || '';
  contextItems.replaceChildren(contextFragment);
  contextNav.hidden = false;
}

document.querySelectorAll('[data-service-toggle]').forEach(toggle => {
  toggle.setAttribute('aria-controls', 'context-menu-panel');
});

document.addEventListener('click', event => {
  const control = event.target.closest('[data-service-item] > .service-link--parent');
  if (!control || control.closest('[data-context-nav]')) return;

  const branch = control.closest('[data-service-item]');
  showBranchMenu(branch);
});

function setMenu(open) {
  body.classList.toggle('is-menu-open', open);
  openButton.setAttribute('aria-expanded', String(open));
}

openButton.addEventListener('click', () => setMenu(true));
closeButton.addEventListener('click', () => setMenu(false));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenu(false);
});

window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 60rem)').matches) setMenu(false);
});

function normalizeSearchText(value) {
  return value.trim().toLocaleLowerCase('zh-CN');
}

function filterCatalog() {
  const query = normalizeSearchText(searchInput.value);
  let visibleItems = 0;

  serviceGroups.forEach(group => {
    const items = [...group.querySelectorAll('[data-service-item]')];

    items.forEach(item => {
      const searchText = normalizeSearchText(`${item.dataset.search || ''} ${item.textContent}`);
      const matches = !query || searchText.includes(query);

      item.hidden = !matches;
      if (matches) visibleItems += 1;
    });

    group.hidden = items.every(item => item.hidden);
  });

  catalogSections.forEach(section => {
    const groups = [...section.querySelectorAll('[data-service-group]')];
    section.hidden = groups.every(group => group.hidden);
  });

  emptyState.hidden = visibleItems !== 0;

  const selectedBranch = document.querySelector('.service-branch.is-selected');
  if (selectedBranch?.hidden) {
    selectedBranch.classList.remove('is-selected');
    selectedBranch.querySelector('[data-service-toggle]')?.setAttribute('aria-expanded', 'false');
    contextNav.hidden = true;
    contextTitle.textContent = '';
    contextItems.replaceChildren();
  }
}

searchInput.addEventListener('input', filterCatalog);

function syncMainView() {
  // Model administration now belongs to the service workspace. Keep old bookmarks usable.
  const migratedModelRoutes = {
    '#operations-models': '#asset-reasoning-model',
    '#operations-model-management': '#asset-reasoning-model',
    '#operations-multimodal-models': '#asset-multimodal-model',
    '#operations-web-model-visibility': '#asset-web-model-visibility',
    '#operations-model-call-logs': '#asset-model-call-logs',
    '#operations-multimodal-call-logs': '#asset-multimodal-call-logs',
    '#operations-retrieval-call-logs': '#asset-retrieval-call-logs',
    '#operations-risk-audit': '#govern-risk-audit',
    '#operations-channels': '#run-im-channel',
    '#operations-im-channels': '#run-im-channel',
    '#operations-im-logs': '#operate-im-logs',
    '#operations-external-callbacks': '#asset-external-callback',
    '#operations-admin': '#asset-mcp-tools',
    '#operations-team-templates': '#build-team-template',
    '#operations-coding-skills': '#build-coding-skills',
    '#operations-command-market': '#build-command-market',
    '#operations-partners': '#run-thirdparty-claw',
    '#operations-thirdparty-claw': '#run-thirdparty-claw',
    '#operations-thirdparty-claude-code': '#run-thirdparty-claude-code',
    '#operations-skill-market': '#build-skill-management'
  };
  const migratedRoute = migratedModelRoutes[window.location.hash];
  if (migratedRoute) window.history.replaceState(null, '', migratedRoute);
  const showWorkerManagement = window.location.hash === '#build-worker-management';
  const showNewTask = window.location.hash === '#new-task';
  const showSkillsMarketplace = window.location.hash === '#skills-center';
  const showCreationCenter = window.location.hash === '#creation-center';
  const showApplicationCenter = window.location.hash === '#application-center';
  const operationsAliases = {
    '#operations-partners': '#operations-thirdparty-claw',
    '#operations-models': '#operations-model-management',
    '#operations-channels': '#operations-im-channels',
    '#operations-portal': '#operations-tenant-management',
    '#operations-system': '#operations-system-settings'
  };
  const operationsHash = operationsAliases[window.location.hash] || window.location.hash;
  const developmentPage = operationsDevelopmentRoutes[operationsHash];
  const showOperationsAdmin = operationsHash === '#operations-admin';
  const showOperationsDevelopment = Boolean(developmentPage);
  const showOperations = showOperationsAdmin || showOperationsDevelopment;

  serviceCatalog.hidden = showWorkerManagement || showNewTask || showSkillsMarketplace || showCreationCenter || showApplicationCenter || showOperations;
  workerManagementView.hidden = !showWorkerManagement;
  newTaskView.hidden = !showNewTask;
  if (!showNewTask) closeTaskFileWorkspace(false);
  skillsMarketplaceView.hidden = !showSkillsMarketplace;
  creationCenterView.hidden = !showCreationCenter;
  applicationCenterView.hidden = !showApplicationCenter;
  operationsView.hidden = !showOperationsAdmin;
  operationsDevelopmentView.hidden = !showOperationsDevelopment;
  operationsNav.hidden = !showOperations;
  body.classList.toggle('is-worker-route', showWorkerManagement);
  body.classList.toggle('is-new-task-route', showNewTask);
  body.classList.toggle('is-skills-route', showSkillsMarketplace);
  body.classList.toggle('is-creation-route', showCreationCenter);
  body.classList.toggle('is-application-route', showApplicationCenter);
  body.classList.toggle('is-operations-route', showOperations);

  const catalogNavItem = document.querySelector('.primary-nav > .nav-item');
  const newTaskNavItem = document.querySelector('.explore-nav-group .nav-item[href$="#new-task"]');
  const skillsNavItem = document.querySelector('.explore-nav-group .nav-item[href$="#skills-center"]');
  const creationNavItem = document.querySelector('.explore-nav-group .nav-item[href$="#creation-center"]');
  const applicationNavItem = document.querySelector('.primary-nav > .nav-item[href$="#application-center"]');
  const operationsNavItem = document.querySelector('[data-super-admin-link]');
  const hasDedicatedView = showNewTask || showSkillsMarketplace || showCreationCenter || showApplicationCenter || showOperations || location.hash.startsWith('#personal-');
  catalogNavItem?.classList.toggle('is-active', !hasDedicatedView);
  newTaskNavItem?.classList.toggle('is-active', showNewTask);
  skillsNavItem?.classList.toggle('is-active', showSkillsMarketplace);
  creationNavItem?.classList.toggle('is-active', showCreationCenter);
  applicationNavItem?.classList.toggle('is-active', showApplicationCenter);
  operationsNavItem?.classList.toggle('is-active', showOperations);
  if (hasDedicatedView) {
    catalogNavItem?.removeAttribute('aria-current');
    contextNav.hidden = true;
  } else {
    catalogNavItem?.setAttribute('aria-current', 'page');
  }
  newTaskNavItem?.toggleAttribute('aria-current', showNewTask);
  if (showNewTask) newTaskNavItem?.setAttribute('aria-current', 'page');
  skillsNavItem?.toggleAttribute('aria-current', showSkillsMarketplace);
  if (showSkillsMarketplace) skillsNavItem?.setAttribute('aria-current', 'page');
  creationNavItem?.toggleAttribute('aria-current', showCreationCenter);
  if (showCreationCenter) creationNavItem?.setAttribute('aria-current', 'page');
  applicationNavItem?.toggleAttribute('aria-current', showApplicationCenter);
  if (showApplicationCenter) applicationNavItem?.setAttribute('aria-current', 'page');
  operationsNavItem?.toggleAttribute('aria-current', showOperations);
  if (showOperations) operationsNavItem?.setAttribute('aria-current', 'page');

  if (developmentPage) {
    operationsDevelopmentTitle.textContent = developmentPage[0];
    operationsDevelopmentDescription.textContent = developmentPage[1];
  }

  document.querySelectorAll('[data-operations-link]').forEach(item => {
    const selected = item.getAttribute('href') === operationsHash;
    item.classList.toggle('is-active', selected);
    item.toggleAttribute('aria-current', selected);
    if (selected) item.setAttribute('aria-current', 'page');
  });

  document.querySelectorAll('[data-operations-menu-group]').forEach(group => {
    const hasActiveItem = Boolean(group.querySelector('[data-operations-link].is-active'));
    group.classList.toggle('has-active-item', hasActiveItem);
    if (hasActiveItem) {
      const toggle = group.querySelector('[data-operations-group-toggle]');
      const submenu = group.querySelector('[data-operations-submenu]');
      toggle?.setAttribute('aria-expanded', 'true');
      if (submenu) submenu.hidden = false;
    }
  });

  const activeOperationsLink = document.querySelector('[data-operations-link].is-active');
  if (activeOperationsLink) {
    window.requestAnimationFrame(() => {
      activeOperationsLink.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  }

  if (showWorkerManagement) {
    const sourceLink = document.querySelector('.service-catalog a[href$="#build-worker-management"]');
    const branch = sourceLink?.closest('[data-service-item]');
    if (branch) showBranchMenu(branch);
  }
}

document.addEventListener('click', event => {
  const fileOpen = event.target.closest('[data-task-file-open]');
  if (fileOpen) {
    openTaskFileWorkspace(fileOpen);
    return;
  }

  const fileClose = event.target.closest('[data-task-file-close]');
  if (fileClose) {
    closeTaskFileWorkspace();
    return;
  }

  const workerAction = event.target.closest('[data-worker-action]');
  if (workerAction) {
    const card = workerAction.closest('.worker-card');
    if (workerAction.dataset.workerAction === 'copy') {
      copyWorkerLink(card, workerAction);
      return;
    }
    openWorkerDialog(card, workerAction.dataset.workerAction);
    return;
  }

  const scopeTab = event.target.closest('[data-worker-scope]');
  if (scopeTab) {
    document.querySelectorAll('[data-worker-scope]').forEach(tab => {
      const selected = tab === scopeTab;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-pressed', String(selected));
    });
    filterWorkerCards();
  }

  const historyTab = event.target.closest('[data-history-tab]');
  if (historyTab) {
    document.querySelectorAll('[data-history-tab]').forEach(tab => {
      const selected = tab === historyTab;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-pressed', String(selected));
    });
  }

  const prompt = event.target.closest('[data-task-prompt]');
  if (prompt) {
    const taskInput = document.querySelector('[data-task-input]');
    taskInput.value = prompt.dataset.taskPrompt;
    taskInput.focus({ preventScroll: true });
  }
});

function openTaskFileWorkspace(trigger) {
  if (!taskFilePanel || !newTaskView) return;
  taskFileTrigger = trigger;
  taskFilePanel.hidden = false;
  newTaskView.classList.add('is-file-workspace-open');
  document.querySelectorAll('[data-task-file-open]').forEach(button => button.setAttribute('aria-expanded', String(button === trigger)));
  taskFilePanel.querySelector('[data-task-file-close]')?.focus({ preventScroll: true });
}

function closeTaskFileWorkspace(restoreFocus = true) {
  if (!taskFilePanel || taskFilePanel.hidden) return;
  taskFilePanel.hidden = true;
  newTaskView?.classList.remove('is-file-workspace-open');
  document.querySelectorAll('[data-task-file-open]').forEach(button => button.setAttribute('aria-expanded', 'false'));
  if (restoreFocus && taskFileTrigger?.isConnected) taskFileTrigger.focus({ preventScroll: true });
  taskFileTrigger = null;
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && taskFilePanel && !taskFilePanel.hidden) {
    event.preventDefault();
    closeTaskFileWorkspace();
  }
});

const workerProfiles = {
  'ceo助手': { starter: '帮我整理这个网页中的关键信息。' },
  '空调技术方案智能分析': { starter: '请帮我审阅这份空调技术方案。' },
  '企业财务分析-13': { starter: '请分析这份财务数据中的经营变化。' },
  '企业财务分析-12': { starter: '请识别本期经营中的盈亏关键因素。' },
  '企业财务分析-11': { starter: '请将这份分析结果整理为可沉淀的报告。' },
  '数据分析1-2': { starter: '请帮我完成一项日常数据查询与统计。' },
  '数据分析1-1': { starter: '请基于这份数据生成运营监控摘要。' },
  'employee-01': { starter: '请将这份需求拆解为可执行任务并排序。' }
};

function getWorkerCardData(card) {
  const name = card.querySelector('.worker-identity h2')?.textContent.trim() || '当前助手';
  const serviceType = card.dataset.workerServiceType || card.querySelector('.worker-identity p')?.textContent.trim() || '智能助手';
  const description = card.querySelector('.worker-description')?.textContent.trim() || '';
  const incomplete = card.dataset.profileIncomplete === 'true' || /尚未补充业务描述/.test(description);
  const profile = workerProfiles[name] || {};

  return {
    name,
    serviceType,
    incomplete,
    description: incomplete ? '能力信息待补充。补充业务说明后，使用者可以更准确地判断是否适合当前任务。' : description,
    starter: profile.starter || '请描述你希望这个助手协助完成的任务。'
  };
}

function createWorkerDialog() {
  const dialog = document.createElement('dialog');
  dialog.className = 'worker-use-dialog';
  dialog.dataset.workerDialog = '';
  dialog.innerHTML = `
    <div class="worker-dialog-content">
      <div class="worker-dialog-header">
        <div>
          <p class="worker-dialog-kicker" data-worker-dialog-type></p>
          <h2 class="worker-dialog-title" data-worker-dialog-title></h2>
        </div>
        <button class="worker-dialog-close" type="button" data-worker-dialog-close>关闭</button>
      </div>
      <p class="worker-dialog-description" data-worker-dialog-description></p>
      <form class="worker-dialog-form" data-worker-dialog-form novalidate>
        <label class="worker-dialog-label" for="worker-task-input">你想让它帮你做什么？
          <textarea class="worker-dialog-input" id="worker-task-input" data-worker-dialog-input aria-describedby="worker-task-helper worker-task-message" required placeholder="例如：整理本周的经营数据并列出异常项"></textarea>
        </label>
        <p class="worker-dialog-helper" id="worker-task-helper" data-worker-dialog-helper></p>
        <p class="worker-dialog-message" id="worker-task-message" data-worker-dialog-message role="status" aria-live="polite"></p>
        <div class="worker-dialog-footer">
          <button class="worker-dialog-close" type="button" data-worker-dialog-cancel>暂不创建</button>
          <button class="worker-dialog-button" type="submit" data-worker-dialog-submit>创建会话草稿</button>
        </div>
      </form>
    </div>`;
  document.body.append(dialog);

  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
    if (event.target.closest('[data-worker-dialog-close], [data-worker-dialog-cancel]')) dialog.close();
  });

  dialog.querySelector('[data-worker-dialog-form]').addEventListener('submit', event => {
    event.preventDefault();
    const input = dialog.querySelector('[data-worker-dialog-input]');
    const message = dialog.querySelector('[data-worker-dialog-message]');
    const submit = dialog.querySelector('[data-worker-dialog-submit]');
    const card = dialog._workerCard;
    const request = input.value.trim();

    if (request.length < 2) {
      input.setAttribute('aria-invalid', 'true');
      message.dataset.state = 'error';
      message.textContent = '请补充想完成的任务，至少输入两个字。';
      return;
    }

    input.removeAttribute('aria-invalid');
    submit.disabled = true;
    submit.dataset.state = 'loading';
    submit.textContent = '正在创建…';
    message.dataset.state = '';
    message.textContent = '';

    window.setTimeout(() => {
      submit.disabled = false;
      submit.dataset.state = 'success';
      submit.textContent = '已创建草稿';
      message.dataset.state = 'success';
      message.textContent = '会话草稿已创建，可继续在任务工作台中完善。';
      const action = card?.querySelector('[data-worker-action="start"]');
      if (action) {
        action.dataset.state = 'success';
        action.textContent = '已创建草稿';
      }
      window.setTimeout(() => dialog.close(), 1200);
    }, 360);
  });

  dialog.addEventListener('close', () => {
    const input = dialog.querySelector('[data-worker-dialog-input]');
    const message = dialog.querySelector('[data-worker-dialog-message]');
    const submit = dialog.querySelector('[data-worker-dialog-submit]');
    input.value = '';
    input.removeAttribute('aria-invalid');
    message.textContent = '';
    message.dataset.state = '';
    submit.disabled = false;
    submit.dataset.state = '';
    submit.textContent = '创建会话草稿';
  });

  return dialog;
}

function enrichWorkerCards() {
  const cards = [...document.querySelectorAll('[data-worker-management-view] .worker-card')];
  if (!cards.length) return;

  cards.forEach((card, index) => {
    const data = getWorkerCardData(card);
    const description = card.querySelector('.worker-description');
    const serviceType = card.querySelector('.worker-identity p');
    card.dataset.workerName = data.name;
    card.dataset.workerServiceType = data.serviceType;
    card.dataset.workerScopes = index % 4 === 0 ? 'favorite recent' : index % 4 === 1 ? 'submitted' : index % 4 === 2 ? 'recent' : 'favorite';
    card.dataset.profileIncomplete = String(data.incomplete);
    card.classList.toggle('is-profile-incomplete', data.incomplete);
    description.textContent = data.description;
    // Keep the instance identifier visible under the assistant name so users can distinguish deployments.
    serviceType.textContent = data.serviceType;
    const hasAdvancedPanel = data.serviceType.includes('自进化');

    card.insertAdjacentHTML('beforeend', `
      <p class="worker-card-meta" aria-label="${data.name}的实例信息"><span>技能：2</span><span>模型：1</span><span>创建者：北里王</span></p>
      <div class="worker-card-actions">
        <div class="worker-card-quick-actions" role="group" aria-label="${data.name}的操作">
          <button class="worker-card-action worker-card-icon-action" type="button" data-worker-action="edit" aria-label="编辑${data.name}" title="编辑">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 16.5-.5 4 4-.5L18 9.5 14.5 6 4 16.5Z"></path><path d="m13.5 7 3.5 3.5"></path></svg>
          </button>
          <button class="worker-card-action worker-card-icon-action" type="button" data-worker-action="share" aria-label="分享${data.name}" title="分享">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5"></circle><circle cx="6" cy="12" r="2.5"></circle><circle cx="18" cy="19" r="2.5"></circle><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"></path></svg>
          </button>
          <button class="worker-card-action worker-card-icon-action" type="button" data-worker-action="copy" aria-label="复制${data.name}链接" title="复制链接">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 13.5 8 16a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5 0"></path><path d="m13.5 10.5 2.5-2.5a3.5 3.5 0 0 1 5 5l-3 3a3.5 3.5 0 0 1-5 0"></path><path d="m8.5 15.5 7-7"></path></svg>
          </button>
        </div>
        ${hasAdvancedPanel ? '<button class="worker-card-action worker-card-panel-action" type="button" data-worker-action="panel">高级面板</button>' : ''}
      </div>`);
  });
}

function filterWorkerCards() {
  const query = normalizeSearchText(workerSearch?.value || '');
  const activeFilter = document.querySelector('[data-worker-scope].is-active')?.dataset.workerFilter || 'all';
  document.querySelectorAll('[data-worker-management-view] .worker-card').forEach(card => {
    const searchable = normalizeSearchText(`${card.dataset.workerName || ''} ${card.dataset.workerServiceType || ''} ${card.textContent}`);
    const scopes = card.dataset.workerScopes?.split(' ') || [];
    const scopeMatches = activeFilter === 'all' || scopes.includes(activeFilter);
    card.hidden = !scopeMatches || (Boolean(query) && !searchable.includes(query));
  });
}

function copyWorkerLink(card, trigger) {
  const data = getWorkerCardData(card);
  const link = `${window.location.href.split('#')[0]}#build-worker-management?worker=${encodeURIComponent(data.name)}`;
  const restoreLabel = trigger.getAttribute('aria-label');
  const showSuccess = () => {
    trigger.dataset.state = 'success';
    trigger.setAttribute('aria-label', `${data.name}链接已复制`);
    window.setTimeout(() => {
      trigger.dataset.state = '';
      trigger.setAttribute('aria-label', restoreLabel || '复制链接');
    }, 1400);
  };

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(link).then(showSuccess).catch(showSuccess);
  } else {
    showSuccess();
  }
}

function openWorkerDialog(card, action) {
  if (!card) return;
  const data = getWorkerCardData(card);
  const dialog = document.querySelector('[data-worker-dialog]') || createWorkerDialog();
  const type = dialog.querySelector('[data-worker-dialog-type]');
  const title = dialog.querySelector('[data-worker-dialog-title]');
  const description = dialog.querySelector('[data-worker-dialog-description]');
  const input = dialog.querySelector('[data-worker-dialog-input]');
  const helper = dialog.querySelector('[data-worker-dialog-helper]');
  const form = dialog.querySelector('[data-worker-dialog-form]');

  dialog._workerCard = card;
  const actionCopy = {
    edit: { kicker: '编辑助手', title: `${data.name} · 编辑`, description: '在正式系统中可维护实例信息、能力说明与可用范围。' },
    share: { kicker: '分享助手', title: data.name, description: '可将该助手的访问链接分享给团队成员，便于协作使用。' },
    panel: { kicker: '高级面板', title: data.name, description: '查看实例配置、运行状态与更多高级管理操作。' },
    detail: { kicker: `实例名称：${data.serviceType}`, title: data.name, description: data.description },
    start: { kicker: '准备开始一项新任务', title: data.name, description: data.description }
  };
  const copy = actionCopy[action] || actionCopy.detail;
  type.textContent = copy.kicker;
  title.textContent = copy.title;
  description.textContent = copy.description;
  input.value = action === 'start' ? data.starter : '';
  helper.textContent = action === 'start' ? '可以修改这条任务说明，再创建会话草稿。' : '这是本地原型交互，不会调用实际服务。';
  form.hidden = action === 'detail';

  if (!dialog.open) dialog.showModal();
  if (action === 'start') input.focus({ preventScroll: true });
}

enrichWorkerCards();
workerSearch?.addEventListener('input', filterWorkerCards);

historySearch?.addEventListener('input', () => {
  const query = normalizeSearchText(historySearch.value);
  const historyItems = [...document.querySelectorAll('[data-history-item]')];
  let visibleCount = 0;

  historyItems.forEach(item => {
    const matches = !query || normalizeSearchText(item.textContent).includes(query);
    item.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  document.querySelector('[data-history-empty]').hidden = visibleCount !== 0;
});

newTaskButton?.addEventListener('click', () => {
  closeTaskFileWorkspace(false);
  const taskInput = document.querySelector('[data-task-input]');
  if (!taskInput) return;
  taskInput.value = '';
  taskInput.focus({ preventScroll: true });
});

function filterSkills() {
  const query = normalizeSearchText(skillSearch?.value || '');
  let visibleCount = 0;

  skillCards.forEach(card => {
    const matchesQuery = !query || normalizeSearchText(card.textContent).includes(query);
    const matchesCategory = activeSkillCategory === '全部' || card.dataset.category.split(' ').join(' ').includes(activeSkillCategory);
    const visible = matchesQuery && matchesCategory;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  if (skillEmpty) skillEmpty.hidden = visibleCount !== 0;
}

skillSearch?.addEventListener('input', filterSkills);

document.querySelectorAll('[data-skill-filter]').forEach(filter => {
  filter.addEventListener('click', () => {
    activeSkillCategory = filter.dataset.skillFilter;
    document.querySelectorAll('[data-skill-filter]').forEach(item => {
      const selected = item === filter;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    filterSkills();
  });
});

createCanvasButton?.addEventListener('click', () => {
  const card = document.createElement('button');
  card.className = 'creation-card creation-card--empty is-new';
  card.type = 'button';
  card.setAttribute('aria-label', '打开新画布，0 卡片');
  card.innerHTML = '<span class="creation-preview" aria-hidden="true"><span class="empty-cross"></span></span><span class="creation-card-body"><strong><span class="creation-card-icon creation-card-icon--cyan"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="6" height="6" rx="1"></rect><rect x="14" y="4" width="6" height="6" rx="1"></rect><rect x="4" y="14" width="6" height="6" rx="1"></rect><rect x="14" y="14" width="6" height="6" rx="1"></rect></svg></span>新画布</strong><span class="creation-meta"><span>0 卡片</span><time>刚刚</time></span></span>';
  creationGrid.prepend(card);
  creationStatus.textContent = '已创建新画布';
  card.focus({ preventScroll: true });
  window.setTimeout(() => card.classList.remove('is-new'), 180);
});

function filterOperations(scope) {
  let visibleCount = 0;

  operationsTools.forEach(tool => {
    const scopes = (tool.dataset.scope || '').split(/\s+/);
    const visible = scope === '全部' || scopes.includes(scope);
    tool.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  if (operationsEmpty) operationsEmpty.hidden = visibleCount !== 0;
  if (operationsStatus) operationsStatus.textContent = `已显示 ${visibleCount} 个工具`;
}

operationsFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    operationsFilters.forEach(item => {
      const selected = item === filter;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    filterOperations(filter.dataset.operationsFilter);
  });
});

operationsCreateButton?.addEventListener('click', () => {
  operationsStatus.textContent = '新建工具流程已预留，将在下一步接入表单。';
});

document.querySelectorAll('[data-operations-group-toggle]').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    const submenu = document.getElementById(toggle.getAttribute('aria-controls'));
    toggle.setAttribute('aria-expanded', String(!expanded));
    if (submenu) submenu.hidden = expanded;
  });
});

document.addEventListener('click', event => {
  const toolAction = event.target.closest('[data-tool-action]');
  if (toolAction) {
    const toolName = toolAction.closest('[data-operations-tool]')?.querySelector('h2')?.textContent || '当前工具';
    operationsStatus.textContent = `${toolAction.dataset.toolAction}：${toolName}（框架交互）`;
  }

});

window.addEventListener('hashchange', syncMainView);
syncMainView();
