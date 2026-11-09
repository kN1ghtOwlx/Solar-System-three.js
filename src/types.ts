import type { Material } from "three";

export interface Moon {
  name: string;
  radius: number;
  distance: number;
  speed: number;
//   material: Material;
}

export interface Planet {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  material: Material;
  moons: Moon[];
}