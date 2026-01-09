import type { EntityState } from '../../types/entity';
import { getDomainIcon, getStateBadgeClass } from '../../types/entity';

interface EntityListProps {
  entities: EntityState[];
  selectedEntity: EntityState | null;
  onSelectEntity: (entity: EntityState) => void;
  loading: boolean;
}

export function EntityList({
  entities,
  selectedEntity,
  onSelectEntity,
  loading,
}: EntityListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">
          <span className="animate-spin inline-block mr-2">⏳</span>
          Loading entities...
        </div>
      </div>
    );
  }

  if (entities.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        No entities found matching your filters
      </div>
    );
  }

  return (
    <div className="overflow-auto max-h-[calc(100vh-300px)]">
      <table className="w-full">
        <thead className="sticky top-0 bg-[#252525]">
          <tr className="text-left text-gray-400 text-sm">
            <th className="px-4 py-3 font-medium">Entity ID</th>
            <th className="px-4 py-3 font-medium">State</th>
            <th className="px-4 py-3 font-medium">Last Changed</th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity) => (
            <EntityRow
              key={entity.entity_id}
              entity={entity}
              isSelected={selectedEntity?.entity_id === entity.entity_id}
              onClick={() => onSelectEntity(entity)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface EntityRowProps {
  entity: EntityState;
  isSelected: boolean;
  onClick: () => void;
}

function EntityRow({ entity, isSelected, onClick }: EntityRowProps) {
  const friendlyName = entity.attributes.friendly_name as string | undefined;
  const icon = getDomainIcon(entity.entity_id);
  const badgeClass = getStateBadgeClass(entity.state);
  const lastChanged = formatRelativeTime(entity.last_changed);

  return (
    <tr
      onClick={onClick}
      className={`
        cursor-pointer border-b border-gray-700 transition-colors
        ${isSelected ? 'bg-[#03a9f4]/20' : 'hover:bg-[#303030]'}
      `}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <div>
            <div className="text-white font-medium">
              {friendlyName || entity.entity_id}
            </div>
            {friendlyName && (
              <div className="text-xs text-gray-500">{entity.entity_id}</div>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={`ha-badge ${badgeClass}`}>
          {entity.state}
        </span>
      </td>
      <td className="px-4 py-3 text-gray-400 text-sm">
        {lastChanged}
      </td>
    </tr>
  );
}

function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;

  return date.toLocaleDateString();
}
