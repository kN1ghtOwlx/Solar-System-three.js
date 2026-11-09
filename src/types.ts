
import type { Material } from 'three';
import * as THREE from 'three';

export interface Moon {
  name: string;
  radius: number;
  distance: number;
  orbitalPeriodDays: number;
  material: Material;
}

export interface PlanetaryRing {
  innerRadius: number;
  outerRadius: number;
  color: number;
  opacity: number;
}

export interface Planet {
  name: string;
  radius: number;
  distance: number;

  // Orbital and rotational periods in Earth days
  orbitalPeriodDays: number;
  rotationPeriodDays: number;

  // Orientation and orbital shape
  axialTiltDeg: number;
  eccentricity: number;
  orbitalInclinationDeg?: number;
  initialMeanAnomalyDeg?: number;

  material: Material;
  moons: Moon[];

  // Optional planetary rings
  rings?: PlanetaryRing[];
}

export interface PlanetMaterials {
  mercuryMaterial: Material;
  venusMaterial: Material;
  earthMaterial: Material;
  moonMaterial: Material;
  marsMaterial: Material;

  jupiterMaterial: Material;
  saturnMaterial: Material;
  uranusMaterial: Material;
  neptuneMaterial: Material;
  plutoMaterial: Material;
}

export interface Asteroid {
  orbitRadius: number;
  orbitalPeriodDays: number;
  angle: number;

  size: number;
  inclination: number;

  rotation: THREE.Euler;
  rotationSpeed: THREE.Vector3;
}