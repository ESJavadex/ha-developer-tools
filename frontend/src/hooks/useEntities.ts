import { useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '../api/client';
import type { EntityState, EntityFilter, EntityDomain } from '../types/entity';
import { getDomainFromEntityId, DOMAIN_ICONS } from '../types/entity';

export function useEntities() {
  const [entities, setEntities] = useState<EntityState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<EntityFilter>({
    search: '',
    domain: '',
    state: '',
    area: '',
  });

  const fetchEntities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getStates();
      setEntities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch entities');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntities();
  }, [fetchEntities]);

  // Get unique domains with counts
  const domains = useMemo((): EntityDomain[] => {
    const domainCounts = new Map<string, number>();

    entities.forEach((entity) => {
      const domain = getDomainFromEntityId(entity.entity_id);
      domainCounts.set(domain, (domainCounts.get(domain) || 0) + 1);
    });

    return Array.from(domainCounts.entries())
      .map(([domain, count]) => ({
        domain,
        count,
        icon: DOMAIN_ICONS[domain] || DOMAIN_ICONS.default,
      }))
      .sort((a, b) => b.count - a.count);
  }, [entities]);

  // Filter entities
  const filteredEntities = useMemo(() => {
    return entities.filter((entity) => {
      // Search filter
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        const matchesId = entity.entity_id.toLowerCase().includes(searchLower);
        const matchesName = (entity.attributes.friendly_name as string || '')
          .toLowerCase()
          .includes(searchLower);
        if (!matchesId && !matchesName) {
          return false;
        }
      }

      // Domain filter
      if (filter.domain) {
        const domain = getDomainFromEntityId(entity.entity_id);
        if (domain !== filter.domain) {
          return false;
        }
      }

      // State filter
      if (filter.state) {
        const stateLower = entity.state.toLowerCase();
        if (filter.state === 'on' && !['on', 'home', 'open', 'playing'].includes(stateLower)) {
          return false;
        }
        if (filter.state === 'off' && !['off', 'away', 'closed', 'idle'].includes(stateLower)) {
          return false;
        }
        if (filter.state === 'unavailable' && stateLower !== 'unavailable') {
          return false;
        }
        if (filter.state === 'unknown' && stateLower !== 'unknown') {
          return false;
        }
      }

      return true;
    });
  }, [entities, filter]);

  // Get unique states for filter
  const uniqueStates = useMemo(() => {
    const states = new Set<string>();
    entities.forEach((entity) => {
      states.add(entity.state.toLowerCase());
    });
    return Array.from(states).sort();
  }, [entities]);

  return {
    entities: filteredEntities,
    allEntities: entities,
    domains,
    uniqueStates,
    loading,
    error,
    filter,
    setFilter,
    refresh: fetchEntities,
    totalCount: entities.length,
    filteredCount: filteredEntities.length,
  };
}
