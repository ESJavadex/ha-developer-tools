import type { EntityState } from '../../types/entity';
import { getDomainIcon, getStateBadgeClass } from '../../types/entity';

interface EntityDetailsProps {
  entity: EntityState | null;
  onClose: () => void;
}

export function EntityDetails({ entity, onClose }: EntityDetailsProps) {
  if (!entity) {
    return (
      <div className="ha-card h-full flex items-center justify-center text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">👈</div>
          <div>Select an entity to view details</div>
        </div>
      </div>
    );
  }

  const friendlyName = entity.attributes.friendly_name as string | undefined;
  const icon = getDomainIcon(entity.entity_id);
  const badgeClass = getStateBadgeClass(entity.state);
  const unitOfMeasurement = entity.attributes.unit_of_measurement as string | undefined;
  const deviceClass = entity.attributes.device_class as string | undefined;
  const entityIcon = entity.attributes.icon as string | undefined;

  // Separate common attributes from others
  const commonAttrs = ['friendly_name', 'icon', 'device_class', 'unit_of_measurement'];
  const otherAttributes = Object.entries(entity.attributes).filter(
    ([key]) => !commonAttrs.includes(key)
  );

  return (
    <div className="ha-card h-full overflow-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{icon}</span>
          <div>
            <h2 className="text-xl font-semibold text-white">
              {friendlyName || entity.entity_id}
            </h2>
            <div className="text-sm text-gray-400">{entity.entity_id}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1"
        >
          ✕
        </button>
      </div>

      {/* State */}
      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-1">Current State</div>
        <span className={`ha-badge ${badgeClass} text-lg px-3 py-1`}>
          {entity.state}
          {unitOfMeasurement && (
            <span className="ml-1 opacity-75">
              {unitOfMeasurement}
            </span>
          )}
        </span>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <InfoItem
          label="Last Changed"
          value={formatDateTime(entity.last_changed)}
        />
        <InfoItem
          label="Last Updated"
          value={formatDateTime(entity.last_updated)}
        />
        {deviceClass && (
          <InfoItem
            label="Device Class"
            value={deviceClass}
          />
        )}
        {entityIcon && (
          <InfoItem
            label="Icon"
            value={entityIcon}
          />
        )}
      </div>

      {/* Attributes */}
      {otherAttributes.length > 0 && (
        <div>
          <div className="text-sm text-gray-400 mb-2">Attributes</div>
          <div className="bg-[#252525] rounded p-3 space-y-2">
            {otherAttributes.map(([key, value]) => (
              <AttributeRow key={key} name={key} value={value} />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => copyToClipboard(entity.entity_id)}
          className="ha-button-secondary text-sm"
        >
          📋 Copy ID
        </button>
        <button
          onClick={() => copyToClipboard(JSON.stringify(entity, null, 2))}
          className="ha-button-secondary text-sm"
        >
          📄 Copy JSON
        </button>
      </div>

      {/* Raw JSON (collapsible) */}
      <details className="mt-4">
        <summary className="text-sm text-gray-400 cursor-pointer hover:text-white">
          View Raw JSON
        </summary>
        <pre className="mt-2 bg-[#252525] rounded p-3 text-xs overflow-auto max-h-64">
          {JSON.stringify(entity, null, 2)}
        </pre>
      </details>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm text-white">{value}</div>
    </div>
  );
}

interface AttributeRowProps {
  name: string;
  value: unknown;
}

function AttributeRow({ name, value }: AttributeRowProps) {
  const displayValue = formatAttributeValue(value);

  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-gray-400 text-sm">{name}</span>
      <span className="text-white text-sm text-right break-all">
        {displayValue}
      </span>
    </div>
  );
}

function formatAttributeValue(value: unknown): string {
  if (value === null || value === undefined) {
    return 'null';
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return `[${value.length} items]`;
    }
    return JSON.stringify(value);
  }
  return String(value);
}

function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString();
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}
