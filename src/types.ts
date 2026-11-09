
import type { Material } from 'three';

export interface Moon {
  name: string;
  radius: number;
  distance: number;
  orbitalPeriodDays: number;
  material: Material;
}

export interface Planet {
  name: string;
  radius: number;
  distance: number;

  // Orbital and rotation periods in Earth days
  orbitalPeriodDays: number;
  rotationPeriodDays: number;

  // Planetary axis and orbital shape
  axialTiltDeg: number;
  eccentricity: number;

  material: Material;
  moons: Moon[];
}
