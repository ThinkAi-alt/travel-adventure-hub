import { useMemo } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { ItineraryItem } from "./types";

const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

const createArcPoints = (start: THREE.Vector3, end: THREE.Vector3, segments = 64): [number, number, number][] => {
  const points: [number, number, number][] = [];
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const dist = start.distanceTo(end);
  mid.normalize().multiplyScalar(2.05 + dist * 0.3);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p1 = new THREE.Vector3().lerpVectors(start, mid, t);
    const p2 = new THREE.Vector3().lerpVectors(mid, end, t);
    const point = new THREE.Vector3().lerpVectors(p1, p2, t);
    points.push([point.x, point.y, point.z]);
  }
  return points;
};

const arcColors = ["#f97316", "#0ea5e9", "#8b5cf6", "#22c55e", "#f59e0b", "#ec4899"];

interface FlightPathsProps {
  items: ItineraryItem[];
}

export const FlightPaths = ({ items }: FlightPathsProps) => {
  const arcs = useMemo(() => {
    if (items.length < 2) return [];
    return items.slice(0, -1).map((item, i) => {
      const start = latLngToVector3(item.lat, item.lng, 2.05);
      const end = latLngToVector3(items[i + 1].lat, items[i + 1].lng, 2.05);
      return {
        key: `${item.id}-${items[i + 1].id}`,
        points: createArcPoints(start, end),
        color: arcColors[i % arcColors.length],
      };
    });
  }, [items]);

  if (arcs.length === 0) return null;

  return (
    <group>
      {arcs.map((arc) => (
        <Line
          key={arc.key}
          points={arc.points}
          color={arc.color}
          lineWidth={2}
          transparent
          opacity={0.8}
          dashed
          dashSize={0.1}
          gapSize={0.05}
        />
      ))}
    </group>
  );
};
