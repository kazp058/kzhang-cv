import { useMemo } from 'react';
import * as d3 from 'd3-array';

/**
 * Hook para generar clusters de puntos de experiencias para Globe.gl
 * @param {Array} data - Array de experiencias con lat/lng
 * @param {number} distanceThreshold - distancia mínima para agrupar puntos
 */
export function useClusteredPoints(data, distanceThreshold = 0.5) {
  return useMemo(() => {
    const clusters = [];
    const visited = new Set();

    data.forEach((point, i) => {
      if (visited.has(i)) return;

      const cluster = [point];
      visited.add(i);

      data.forEach((otherPoint, j) => {
        if (i === j || visited.has(j)) return;
        const dist = Math.hypot(point.lat - otherPoint.lat, point.lng - otherPoint.lng);
        if (dist < distanceThreshold) {
          cluster.push(otherPoint);
          visited.add(j);
        }
      });

      clusters.push({
        id: cluster.length === 1 ? cluster[0].id : `cluster-${i}`,
        lat: d3.mean(cluster, d => d.lat),
        lng: d3.mean(cluster, d => d.lng),
        count: cluster.length,
        experiences: cluster,
        type: 'experience',
        city: cluster.length === 1 ? cluster[0].city : null,
        country: cluster.length === 1 ? cluster[0].country : null
      });
    });

    return clusters;
  }, [data, distanceThreshold]);
}
