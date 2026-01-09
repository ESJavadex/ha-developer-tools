import type { EntityDomain, EntityFilter } from '../../types/entity';

interface FilterBarProps {
  filter: EntityFilter;
  onFilterChange: (filter: EntityFilter) => void;
  domains: EntityDomain[];
  totalCount: number;
  filteredCount: number;
}

export function FilterBar({
  filter,
  onFilterChange,
  domains,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  const updateFilter = (key: keyof EntityFilter, value: string) => {
    onFilterChange({ ...filter, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({ search: '', domain: '', state: '', area: '' });
  };

  const hasActiveFilters = filter.domain || filter.state || filter.area;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Domain Filter */}
      <select
        value={filter.domain}
        onChange={(e) => updateFilter('domain', e.target.value)}
        className="ha-select"
      >
        <option value="">All Domains</option>
        {domains.map((d) => (
          <option key={d.domain} value={d.domain}>
            {d.icon} {d.domain} ({d.count})
          </option>
        ))}
      </select>

      {/* State Filter */}
      <select
        value={filter.state}
        onChange={(e) => updateFilter('state', e.target.value)}
        className="ha-select"
      >
        <option value="">All States</option>
        <option value="on">🟢 On / Active</option>
        <option value="off">⚫ Off / Inactive</option>
        <option value="unavailable">🔴 Unavailable</option>
        <option value="unknown">🟡 Unknown</option>
      </select>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="ha-button-secondary text-sm"
        >
          Clear Filters
        </button>
      )}

      {/* Count Display */}
      <div className="ml-auto text-sm text-gray-400">
        Showing {filteredCount} of {totalCount} entities
      </div>
    </div>
  );
}
