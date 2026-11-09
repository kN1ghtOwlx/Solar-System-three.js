import type * as THREE from 'three';

export interface Moon {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  material: THREE.Material;
}

export interface Planet {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  rotationSpeed: number;
  material: THREE.Material;
  moons: Moon[];
}