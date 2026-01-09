import { useState } from 'react';
import { useEntities } from '../../hooks/useEntities';
import type { EntityState } from '../../types/entity';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { EntityList } from './EntityList';
import { EntityDetails } from './EntityDetails';

export function EntityExplorer() {
  const {
    entities,
    domains,
    loading,
    error,
    filter,
    setFilter,
    refresh,
    totalCount,
    filteredCount,
  } = useEntities();

  const [selectedEntity, setSelectedEntity] = useState<EntityState | null>(null);

  if (error) {
    return (
      <div className="ha-card">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">❌</div>
          <div className="text-red-400 text-lg mb-2">Error Loading Entities</div>
          <div className="text-gray-400 mb-4">{error}</div>
          <button onClick={refresh} className="ha-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
          <span>📊</span> Entity Explorer
        </h2>
        <button
          onClick={refresh}
          disabled={loading}
          className="ha-button flex items-center gap-2"
        >
          <span className={loading ? 'animate-spin' : ''}>🔄</span>
          Refresh
        </button>
      </div>

      {/* Search */}
      <SearchBar
        value={filter.search}
        onChange={(search) => setFilter({ ...filter, search })}
        placeholder="Search by entity ID or friendly name..."
      />

      {/* Filters */}
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        domains={domains}
        totalCount={totalCount}
        filteredCount={filteredCount}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Entity List */}
        <div className="lg:col-span-2 ha-card">
          <EntityList
            entities={entities}
            selectedEntity={selectedEntity}
            onSelectEntity={setSelectedEntity}
            loading={loading}
          />
        </div>

        {/* Entity Details */}
        <div className="lg:col-span-1">
          <EntityDetails
            entity={selectedEntity}
            onClose={() => setSelectedEntity(null)}
          />
        </div>
      </div>

      {/* Domain Stats */}
      <div className="ha-card">
        <h3 className="text-lg font-medium text-white mb-3">Domains Overview</h3>
        <div className="flex flex-wrap gap-2">
          {domains.slice(0, 15).map((domain) => (
            <button
              key={domain.domain}
              onClick={() => setFilter({ ...filter, domain: domain.domain })}
              className={`
                px-3 py-1 rounded text-sm transition-colors
                ${filter.domain === domain.domain
                  ? 'bg-[#03a9f4] text-white'
                  : 'bg-[#252525] text-gray-300 hover:bg-[#303030]'
                }
              `}
            >
              {domain.icon} {domain.domain} ({domain.count})
            </button>
          ))}
          {domains.length > 15 && (
            <span className="px-3 py-1 text-sm text-gray-400">
              +{domains.length - 15} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
