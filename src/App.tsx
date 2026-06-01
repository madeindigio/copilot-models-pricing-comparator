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

export default function App() {
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState<Source | typeof ALL>(ALL);
  const [providerFilter, setProviderFilter] = useState<Provider | typeof ALL>(ALL);
  const [categoryFilter, setCategoryFilter] = useState<Category | typeof ALL>(ALL);
  const [sortKey, setSortKey] = useState<SortKey>('provider');
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

  const SortIndicator = ({ k }: { k: SortKey }) => (
    <span className="sort-indicator">
      {sortKey === k ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );

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
                    Model <SortIndicator k="name" />
                  </th>
                  <th
                    id="th-provider"
                    onClick={() => handleSort('provider')}
                    className={sortKey === 'provider' ? 'sorted' : ''}
                  >
                    Provider <SortIndicator k="provider" />
                  </th>
                  <th
                    id="th-category"
                    onClick={() => handleSort('category')}
                    className={sortKey === 'category' ? 'sorted' : ''}
                  >
                    Category <SortIndicator k="category" />
                  </th>
                  <th>Status</th>
                  <th
                    id="th-input"
                    onClick={() => handleSort('inputPrice')}
                    className={sortKey === 'inputPrice' ? 'sorted' : ''}
                  >
                    Input /M <SortIndicator k="inputPrice" />
                  </th>
                  <th>Cached Input /M</th>
                  <th>Cache Write /M</th>
                  <th
                    id="th-output"
                    onClick={() => handleSort('outputPrice')}
                    className={sortKey === 'outputPrice' ? 'sorted' : ''}
                  >
                    Output /M <SortIndicator k="outputPrice" />
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
      <td className="context-cell">{model.contextWindow ?? '—'}</td>

      {/* Notes */}
      <td className="notes-cell">{model.notes ?? ''}</td>
    </tr>
  );
}
