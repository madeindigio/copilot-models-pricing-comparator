import { useState, useMemo } from 'react';
import {
  models,
  providerColors,
  categoryColors,
  type ModelPricing,
  type Provider,
  type Category,
  type Source,
} from './data/models';
import './index.css';

// ── Helpers ────────────────────────────────────────────────────────────────
const fmt = (n?: number) =>
  n === undefined ? '—' : `$${n % 1 === 0 ? n.toFixed(2) : n.toString()}`;

const maxInputPrice = Math.max(...models.map((m) => m.inputPrice));
const maxOutputPrice = Math.max(...models.map((m) => m.outputPrice));

type SortKey = 'name' | 'provider' | 'category' | 'inputPrice' | 'outputPrice';

const ALL = 'All';

const SortIndicator = ({
  k,
  sortKey,
  sortDir,
}: {
  k: SortKey;
  sortKey: SortKey;
  sortDir: 'asc' | 'desc';
}) => (
  <span className="sort-indicator">
    {sortKey === k ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
  </span>
);

// ── Non-frontier models details ───────────────────────────────────────────
interface NonFrontierDetail {
  id: string;
  creator: string;
  powerLevel: number;
  powerText: string;
  features: string;
  recommendedUse: string;
  prioritization: string;
}

const nonFrontierDetails: NonFrontierDetail[] = [
  {
    id: 'mimo-v2.5-pro',
    creator: 'Xiaomi',
    powerLevel: 1,
    powerText: 'Lightweight MoE (1.02T params)',
    features: 'Mixture-of-Experts (MoE) architecture optimized for ultra-fast generation speed.',
    recommendedUse: 'Fast text processing and basic code lookup over very large context windows.',
    prioritization: 'Prioritize when processing massive code repositories or log files (up to 1.05M tokens) on a tight budget, leveraging its ultra-cheap cached input ($0.0036/M).',
  },
  {
    id: 'minimax-m3',
    creator: 'MiniMax',
    powerLevel: 2,
    powerText: 'Versatile MSA MoE',
    features: 'Built on the MiniMax Sparse Attention (MSA) architecture, balancing performance and cost.',
    recommendedUse: 'General assistant chats, moderate coding tasks, and summaries of multi-file codebases.',
    prioritization: 'Prioritize over MiMo-V2.5-Pro for general assistant tasks where better instruction following is required at a very reasonable output price.',
  },
  {
    id: 'glm-5.1',
    creator: 'Z.ai',
    powerLevel: 3,
    powerText: 'Powerful Long-Horizon',
    features: 'Built for execution in extended autonomous developer sessions of up to 8 hours.',
    recommendedUse: 'System design, architecture planning, and long-running autonomous development loops.',
    prioritization: 'Prioritize for complex, autonomous long-duration tasks where loop stability and consistency are critical.',
  },
  {
    id: 'kimi-k2.6',
    creator: 'MoonshotAI',
    powerLevel: 4,
    powerText: 'Powerful MoE (1.04T params)',
    features: 'Model optimized for coding in long context windows and orchestrating autonomous agents.',
    recommendedUse: 'Complex coding logic, agent automation scripts, and multi-file software orchestration.',
    prioritization: 'Prioritize for multi-step agent workflows requiring strong logical reasoning and complex code orchestration at a mid-tier price.',
  },
  {
    id: 'deepseek-v4-pro',
    creator: 'DeepSeek',
    powerLevel: 5,
    powerText: 'Advanced Reasoning MoE (1.6T params)',
    features: 'Extremely strong logical and mathematical reasoning. Supports both thinking (deep reasoning) and non-thinking modes.',
    recommendedUse: 'Advanced software engineering, complex logical problem solving, deep debugging, and autonomous workflows.',
    prioritization: 'Excellent value-for-money for advanced tasks. Prioritize over Qwen3.7 Max when cached inputs are active ($0.003625/M) to dramatically save costs.',
  },
  {
    id: 'qwen3.7-max',
    creator: 'Qwen',
    powerLevel: 6,
    powerText: 'Flagship Agentic / Software Expert',
    features: 'Flagship agentic reasoning and top-tier expertise in code generation and legacy migration.',
    recommendedUse: 'End-to-end software development, complex legacy code migrations, and high-precision code generation.',
    prioritization: 'Prioritize when maximum reasoning accuracy, software planning, and codebase generation are required, and token cost is not a constraint.',
  },
];

function NonFrontierDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const enrichedModels = useMemo(() => {
    return nonFrontierDetails.map((detail) => {
      const model = models.find((m) => m.id === detail.id);
      return {
        ...detail,
        name: model ? model.name : detail.id,
        provider: model ? model.provider : 'OpenRouter',
        category: model ? model.category : 'Versatile',
        inputPrice: model ? model.inputPrice : 0,
        cachedInputPrice: model ? model.cachedInputPrice : undefined,
        outputPrice: model ? model.outputPrice : 0,
        contextWindow: model ? (model.contextWindow || '—') : '—',
      };
    });
  }, []);

  return (
    <div className="feature-dropdown-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="feature-dropdown-trigger"
        aria-expanded={isOpen}
      >
        <span className="trigger-left">
          <span className="trigger-icon">💡</span>
          <span className="trigger-title">Feature list of non frontier models</span>
          <span className="trigger-subtitle">({enrichedModels.length} models sorted by capability)</span>
        </span>
        <span className={`trigger-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="feature-dropdown-content">
          <div className="feature-dropdown-info">
            This section details models from alternative providers (excluding OpenAI, Google, and Anthropic), ordered from least to most powerful based on their technical specifications and reasoning capabilities. Use this guide to select the most cost-effective model depending on task complexity and token usage.
          </div>
          <div className="feature-models-list">
            {enrichedModels.map((m) => {
              const borderClass = m.provider === 'GitHub' ? 'border-github' : 'border-openrouter';
              const powerPercentage = (m.powerLevel / 6) * 100;
              return (
                <div key={m.id} className={`feature-model-card ${borderClass}`}>
                  <div className="card-header">
                    <div className="model-info-block">
                      <div className="model-rank-badge">{m.powerLevel}</div>
                      <div className="model-details">
                        <div className="model-name-text">{m.name}</div>
                        <div className="model-meta-badges">
                          <span className={`provider-badge provider-${m.provider.toLowerCase()}`}>
                            {m.provider}
                          </span>
                          <span className={`category-badge category-${m.category.toLowerCase()}`}>
                            {m.category}
                          </span>
                          <span className="hero-pill" style={{ padding: '0.1rem 0.5rem', fontSize: '0.7rem' }}>
                            {m.creator}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="power-indicator-block">
                      <span className="power-label">Power: {m.powerText}</span>
                      <div className="power-bar-bg">
                        <div className="power-bar-fill" style={{ width: `${powerPercentage}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="card-grid">
                    <div className="grid-item">
                      <span className="grid-label">Context</span>
                      <span className="grid-value">{m.contextWindow}</span>
                    </div>
                    <div className="grid-item">
                      <span className="grid-label">Input / 1M tokens</span>
                      <span className="grid-value">{fmt(m.inputPrice)}</span>
                    </div>
                    <div className="grid-item">
                      <span className="grid-label">Cached Input / 1M</span>
                      <span className="grid-value">
                        {m.cachedInputPrice !== undefined ? fmt(m.cachedInputPrice) : '—'}
                      </span>
                    </div>
                  </div>

                  <div className="card-descriptions">
                    <div className="desc-block">
                      <div className="desc-title">Key Features</div>
                      <div className="desc-text">{m.features}</div>
                    </div>
                    <div className="desc-block">
                      <div className="desc-title">Recommended Software Use</div>
                      <div className="desc-text">{m.recommendedUse}</div>
                    </div>
                    <div className="prioritization-block">
                      <div className="desc-title">
                        <span>🎯</span> When to prioritize this model
                      </div>
                      <div className="desc-text" style={{ color: '#a7f3d0' }}>{m.prioritization}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState<Source | typeof ALL>(ALL);
  const [providerFilter, setProviderFilter] = useState<Provider | typeof ALL>(ALL);
  const [categoryFilter, setCategoryFilter] = useState<Category | typeof ALL>(ALL);
  const [sortKey, setSortKey] = useState<SortKey>('inputPrice');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const providers: (Provider | typeof ALL)[] = [ALL, 'OpenAI', 'Anthropic', 'Google', 'GitHub', 'OpenRouter'];
  const categories: (Category | typeof ALL)[] = [ALL, 'Lightweight', 'Versatile', 'Powerful'];
  const sources: (Source | typeof ALL)[] = [ALL, 'GitHub Copilot', 'OpenRouter'];

  // Counts for source tabs
  const sourceCounts = useMemo(
    () => ({
      [ALL]: models.length,
      'GitHub Copilot': models.filter((m) => m.source === 'GitHub Copilot').length,
      OpenRouter: models.filter((m) => m.source === 'OpenRouter').length,
    }),
    [],
  );

  const filtered = useMemo(() => {
    let list = [...models];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.provider.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q),
      );
    }
    if (sourceFilter !== ALL) list = list.filter((m) => m.source === sourceFilter);
    if (providerFilter !== ALL) list = list.filter((m) => m.provider === providerFilter);
    if (categoryFilter !== ALL) list = list.filter((m) => m.category === categoryFilter);

    list.sort((a, b) => {
      let va: string | number;
      let vb: string | number;
      if (sortKey === 'name') { va = a.name; vb = b.name; }
      else if (sortKey === 'provider') { va = a.provider; vb = b.provider; }
      else if (sortKey === 'category') { va = a.category; vb = b.category; }
      else if (sortKey === 'inputPrice') { va = a.inputPrice; vb = b.inputPrice; }
      else { va = a.outputPrice; vb = b.outputPrice; }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [search, sourceFilter, providerFilter, categoryFilter, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  // Stats
  const cheapestInput = Math.min(...models.map((m) => m.inputPrice));
  const cheapestOutput = Math.min(...models.map((m) => m.outputPrice));
  const avgOutput = models.reduce((s, m) => s + m.outputPrice, 0) / models.length;

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">🤖</div>
            AI Model Pricing
          </div>
          <span className="header-badge">Updated June 2026</span>
        </div>
      </header>

      <main className="main">
        {/* ── Hero ── */}
        <section className="hero">
          <h1>AI Model Pricing Comparison</h1>
          <p>
            Compare token prices across GitHub Copilot and OpenRouter models.
            All prices in USD per 1 million tokens.
          </p>
          <div className="hero-meta">
            <span className="hero-pill">
              <span className="dot" style={{ background: '#22c55e' }} />
              GitHub Copilot
            </span>
            <span className="hero-pill">
              <span className="dot" style={{ background: '#9b59e8' }} />
              OpenRouter
            </span>
            <span className="hero-pill">📅 1 Jun 2026</span>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-label">Total Models</div>
            <div className="stat-value" style={{ color: 'var(--accent)' }}>{models.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Cheapest Input</div>
            <div className="stat-value" style={{ color: 'var(--lightweight-color)' }}>
              ${cheapestInput}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Cheapest Output</div>
            <div className="stat-value" style={{ color: 'var(--lightweight-color)' }}>
              ${cheapestOutput}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avg. Output</div>
            <div className="stat-value" style={{ color: 'var(--versatile-color)' }}>
              ${avgOutput.toFixed(2)}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Providers</div>
            <div className="stat-value">{providers.length - 1}</div>
          </div>
        </div>

        {/* ── Feature List of Non-Frontier Models ── */}
        <NonFrontierDropdown />

        {/* ── Source Tabs ── */}
        <div className="controls" style={{ marginBottom: '0.75rem' }}>
          <div className="source-tabs">
            {sources.map((s) => (
              <button
                key={s}
                id={`source-tab-${s.replace(/\s+/g, '-').toLowerCase()}`}
                className={`source-tab${sourceFilter === s ? ' active' : ''}`}
                onClick={() => setSourceFilter(s)}
              >
                {s}
                <span className="count">{sourceCounts[s as keyof typeof sourceCounts]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="controls">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              id="model-search"
              type="search"
              className="search-input"
              placeholder="Search models, providers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            {providers.map((p) => (
              <button
                key={p}
                id={`filter-provider-${p.toLowerCase()}`}
                className={`filter-btn${providerFilter === p ? ' active' : ''}`}
                onClick={() => setProviderFilter(p)}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="filter-group">
            {categories.map((c) => (
              <button
                key={c}
                id={`filter-category-${c.toLowerCase()}`}
                className={`filter-btn${categoryFilter === c ? ' active' : ''}`}
                onClick={() => setCategoryFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <select
            id="sort-select"
            className="sort-select"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
          >
            <option value="provider">Sort: Provider</option>
            <option value="name">Sort: Name</option>
            <option value="category">Sort: Category</option>
            <option value="inputPrice">Sort: Input Price</option>
            <option value="outputPrice">Sort: Output Price</option>
          </select>
        </div>

        {/* ── Table ── */}
        <div className="table-container">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th
                    id="th-model"
                    onClick={() => handleSort('name')}
                    className={sortKey === 'name' ? 'sorted' : ''}
                  >
                    Model <SortIndicator k="name" sortKey={sortKey} sortDir={sortDir} />
                  </th>
                  <th
                    id="th-provider"
                    onClick={() => handleSort('provider')}
                    className={sortKey === 'provider' ? 'sorted' : ''}
                  >
                    Provider <SortIndicator k="provider" sortKey={sortKey} sortDir={sortDir} />
                  </th>
                  <th
                    id="th-category"
                    onClick={() => handleSort('category')}
                    className={sortKey === 'category' ? 'sorted' : ''}
                  >
                    Category <SortIndicator k="category" sortKey={sortKey} sortDir={sortDir} />
                  </th>
                  <th>Status</th>
                  <th
                    id="th-input"
                    onClick={() => handleSort('inputPrice')}
                    className={sortKey === 'inputPrice' ? 'sorted' : ''}
                  >
                    Input /M <SortIndicator k="inputPrice" sortKey={sortKey} sortDir={sortDir} />
                  </th>
                  <th>Cached Input /M</th>
                  <th>Cache Write /M</th>
                  <th
                    id="th-output"
                    onClick={() => handleSort('outputPrice')}
                    className={sortKey === 'outputPrice' ? 'sorted' : ''}
                  >
                    Output /M <SortIndicator k="outputPrice" sortKey={sortKey} sortDir={sortDir} />
                  </th>
                  <th>Context</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={10}>
                      <div className="no-results">
                        <div className="emoji">🔍</div>
                        <p>No models match your filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((model) => (
                    <ModelRow
                      key={model.id}
                      model={model}
                      maxInput={maxInputPrice}
                      maxOutput={maxOutputPrice}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <span>
              {filtered.length} model{filtered.length !== 1 ? 's' : ''} shown
            </span>
            <span>All prices USD · per 1M tokens</span>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer>
        <p>
          Data from{' '}
          <a href="https://docs.github.com/en/copilot/reference/copilot-billing/model-pricing-for-github-copilot" target="_blank" rel="noreferrer">
            GitHub Copilot docs
          </a>{' '}
          and{' '}
          <a href="https://openrouter.ai/models" target="_blank" rel="noreferrer">
            OpenRouter
          </a>
          . Prices as of 1 June 2026. Not affiliated with GitHub or OpenRouter.
        </p>
      </footer>
    </div>
  );
}

// ── Model Row ──────────────────────────────────────────────────────────────
function ModelRow({
  model,
  maxInput,
  maxOutput,
}: {
  model: ModelPricing;
  maxInput: number;
  maxOutput: number;
}) {
  const inputPct = (model.inputPrice / maxInput) * 100;
  const outputPct = (model.outputPrice / maxOutput) * 100;
  const isGA = model.status === 'GA';

  const slug = model.openrouterSlug;
  const href = slug ? `https://openrouter.ai/${slug}` : undefined;

  return (
    <tr className="model-row" id={`row-${model.id}`}>
      {/* Model name */}
      <td>
        <div className="model-name-cell">
          <span className="model-name">
            {href ? (
              <a href={href} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                {model.name} ↗
              </a>
            ) : (
              model.name
            )}
          </span>
          <span className="model-source">{model.source}</span>
        </div>
      </td>

      {/* Provider */}
      <td>
        <span className={`provider-badge ${providerColors[model.provider]}`}>
          {model.provider}
        </span>
      </td>

      {/* Category */}
      <td>
        <span className={`category-badge ${categoryColors[model.category]}`}>
          {model.category}
        </span>
      </td>

      {/* Status */}
      <td>
        <span className={`status-badge ${isGA ? 'ga' : 'preview'}`}>
          <span className="status-dot" />
          {model.status}
        </span>
      </td>

      {/* Input price */}
      <td className="price-cell">
        <div className="price-main">{fmt(model.inputPrice)}</div>
        <div className="price-bar-wrapper">
          <div className="price-bar">
            <div
              className="price-bar-fill input-bar"
              style={{ width: `${inputPct}%` }}
            />
          </div>
        </div>
      </td>

      {/* Cached input */}
      <td className="price-cell">
        {model.cachedInputPrice !== undefined ? (
          <div className="price-main">{fmt(model.cachedInputPrice)}</div>
        ) : (
          <span className="price-cached">—</span>
        )}
      </td>

      {/* Cache write */}
      <td className="price-cell">
        {model.cacheWritePrice !== undefined ? (
          <div className="price-main">{fmt(model.cacheWritePrice)}</div>
        ) : (
          <span className="price-cached">—</span>
        )}
      </td>

      {/* Output price */}
      <td className="price-cell">
        <div className="price-main">{fmt(model.outputPrice)}</div>
        <div className="price-bar-wrapper">
          <div className="price-bar">
            <div
              className="price-bar-fill output-bar"
              style={{ width: `${outputPct}%` }}
            />
          </div>
        </div>
      </td>

      {/* Context */}
      <td className="context-cell">
        <div style={{ fontWeight: 500 }}>{model.contextWindow ?? '—'}</div>
        {model.supports1MContext && (
          <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.2rem' }}>
            ✨ +1M extra
          </div>
        )}
      </td>

      {/* Notes */}
      <td className="notes-cell">{model.notes ?? ''}</td>
    </tr>
  );
}
