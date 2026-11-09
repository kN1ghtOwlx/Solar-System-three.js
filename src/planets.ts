
import type { Planet, PlanetMaterials } from './types';

export const createPlanets = (
  materials: PlanetMaterials
): Planet[] => {

  return [

    // ============================================
    // MERCURY
    // ============================================

    {
      name: 'Mercury',
      radius: 0.5,
      distance: 10,

      orbitalPeriodDays: 87.969,
      rotationPeriodDays: 58.6462,

      axialTiltDeg: 0.034,
      eccentricity: 0.2056,
      orbitalInclinationDeg: 7.00,

      material: materials.mercuryMaterial,
      moons: []
    },


    // ============================================
    // VENUS
    // ============================================

    {
      name: 'Venus',
      radius: 1.21,
      distance: 15,

      orbitalPeriodDays: 224.701,
      rotationPeriodDays: 243.018,

      axialTiltDeg: 177.4,
      eccentricity: 0.0068,
      orbitalInclinationDeg: 3.39,

      material: materials.venusMaterial,
      moons: []
    },


    // ============================================
    // EARTH
    // ============================================

    {
      name: 'Earth',
      radius: 1.32,
      distance: 20,

      orbitalPeriodDays: 365.256,
      rotationPeriodDays: 0.99726968,

      axialTiltDeg: 23.44,
      eccentricity: 0.0167,
      orbitalInclinationDeg: 0,

      material: materials.earthMaterial,

      moons: [
        {
          name: 'Moon',
          radius: 0.36,
          distance: 2,
          orbitalPeriodDays: 27.3217,
          material: materials.moonMaterial
        }
      ]
    },


    // ============================================
    // MARS
    // ============================================

    {
      name: 'Mars',
      radius: 0.7,
      distance: 26,

      orbitalPeriodDays: 686.980,
      rotationPeriodDays: 1.025956,

      axialTiltDeg: 25.19,
      eccentricity: 0.0934,
      orbitalInclinationDeg: 1.85,

      material: materials.marsMaterial,

      moons: [
        {
          name: 'Phobos',
          radius: 0.12,
          distance: 1.2,
          orbitalPeriodDays: 0.31891,
          material: materials.moonMaterial
        },
        {
          name: 'Deimos',
          radius: 0.09,
          distance: 1.8,
          orbitalPeriodDays: 1.26244,
          material: materials.moonMaterial
        }
      ]
    },


    // ============================================
    // JUPITER
    // ============================================

    {
      name: 'Jupiter',
      radius: 4.0,
      distance: 76,

      orbitalPeriodDays: 4332.589,
      rotationPeriodDays: 0.4135417,

      axialTiltDeg: 3.13,
      eccentricity: 0.0487,
      orbitalInclinationDeg: 1.30,

      material: materials.jupiterMaterial,

      moons: [
        {
          name: 'Io',
          radius: 0.12,
          distance: 4.8,
          orbitalPeriodDays: 1.762732,
          material: materials.moonMaterial
        },
        {
          name: 'Europa',
          radius: 0.10,
          distance: 6.0,
          orbitalPeriodDays: 3.525463,
          material: materials.moonMaterial
        },
        {
          name: 'Ganymede',
          radius: 0.16,
          distance: 7.5,
          orbitalPeriodDays: 7.155588,
          material: materials.moonMaterial
        },
        {
          name: 'Callisto',
          radius: 0.15,
          distance: 9.5,
          orbitalPeriodDays: 16.690440,
          material: materials.moonMaterial
        }
      ],

      rings: [
        {
          innerRadius: 1.4,
          outerRadius: 1.72,
          color: 0x9b8d78,
          opacity: 0.12
        },
        {
          innerRadius: 1.72,
          outerRadius: 1.81,
          color: 0xc0ac8e,
          opacity: 0.25
        },
        {
          innerRadius: 1.81,
          outerRadius: 2.54,
          color: 0x938675,
          opacity: 0.09
        },
        {
          innerRadius: 2.54,
          outerRadius: 3.11,
          color: 0x827969,
          opacity: 0.05
        }
      ]
    },


    // ============================================
    // SATURN
    // ============================================

    {
      name: 'Saturn',
      radius: 3.5,
      distance: 100,

      orbitalPeriodDays: 10755.699,
      rotationPeriodDays: 0.444,

      axialTiltDeg: 26.73,
      eccentricity: 0.0520,
      orbitalInclinationDeg: 2.49,

      material: materials.saturnMaterial,

      moons: [
        {
          name: 'Mimas',
          radius: 0.07,
          distance: 3.9,
          orbitalPeriodDays: 0.942422,
          material: materials.moonMaterial
        },
        {
          name: 'Enceladus',
          radius: 0.08,
          distance: 4.5,
          orbitalPeriodDays: 1.370218,
          material: materials.moonMaterial
        },
        {
          name: 'Tethys',
          radius: 0.09,
          distance: 5.2,
          orbitalPeriodDays: 1.887802,
          material: materials.moonMaterial
        },
        {
          name: 'Dione',
          radius: 0.10,
          distance: 6.0,
          orbitalPeriodDays: 2.736916,
          material: materials.moonMaterial
        },
        {
          name: 'Rhea',
          radius: 0.12,
          distance: 7.2,
          orbitalPeriodDays: 4.517503,
          material: materials.moonMaterial
        },
        {
          name: 'Titan',
          radius: 0.25,
          distance: 9.5,
          orbitalPeriodDays: 15.945448,
          material: materials.moonMaterial
        },
        {
          name: 'Iapetus',
          radius: 0.12,
          distance: 13,
          orbitalPeriodDays: 79.331002,
          material: materials.moonMaterial
        }
      ],

      rings: [
        {
          innerRadius: 1.24,
          outerRadius: 1.52,
          color: 0x998b75,
          opacity: 0.5
        },
        {
          innerRadius: 1.52,
          outerRadius: 1.95,
          color: 0xd6c5a4,
          opacity: 0.9
        },
        {
          innerRadius: 2.02,
          outerRadius: 2.27,
          color: 0xbba783,
          opacity: 0.8
        },
        {
          innerRadius: 2.32,
          outerRadius: 2.35,
          color: 0xd1c2a3,
          opacity: 0.65
        }
      ]
    },


    // ============================================
    // URANUS
    // ============================================

    {
      name: 'Uranus',
      radius: 2.0,
      distance: 130,

      orbitalPeriodDays: 30685.400,
      rotationPeriodDays: 0.718333,

      axialTiltDeg: 97.77,
      eccentricity: 0.0469,
      orbitalInclinationDeg: 0.77,

      material: materials.uranusMaterial,

      moons: [
        {
          name: 'Miranda',
          radius: 0.06,
          distance: 2.8,
          orbitalPeriodDays: 1.413479,
          material: materials.moonMaterial
        },
        {
          name: 'Ariel',
          radius: 0.10,
          distance: 3.6,
          orbitalPeriodDays: 2.520379,
          material: materials.moonMaterial
        },
        {
          name: 'Umbriel',
          radius: 0.09,
          distance: 4.4,
          orbitalPeriodDays: 4.144177,
          material: materials.moonMaterial
        },
        {
          name: 'Titania',
          radius: 0.15,
          distance: 5.5,
          orbitalPeriodDays: 8.705869,
          material: materials.moonMaterial
        },
        {
          name: 'Oberon',
          radius: 0.15,
          distance: 6.8,
          orbitalPeriodDays: 13.463237,
          material: materials.moonMaterial
        }
      ],

      rings: [
        {
          innerRadius: 1.56,
          outerRadius: 1.60,
          color: 0x514e46,
          opacity: 0.75
        },
        {
          innerRadius: 1.66,
          outerRadius: 1.72,
          color: 0x777266,
          opacity: 0.65
        },
        {
          innerRadius: 1.79,
          outerRadius: 1.84,
          color: 0x46443e,
          opacity: 0.8
        },
        {
          innerRadius: 1.92,
          outerRadius: 2.0,
          color: 0x777266,
          opacity: 0.55
        }
      ]
    },


    // ============================================
    // NEPTUNE
    // ============================================

    {
      name: 'Neptune',
      radius: 1.9,
      distance: 160,

      orbitalPeriodDays: 60189.018,
      rotationPeriodDays: 0.67125,

      axialTiltDeg: 28.32,
      eccentricity: 0.0097,
      orbitalInclinationDeg: 1.77,

      material: materials.neptuneMaterial,

      moons: [
        {
          name: 'Triton',
          radius: 0.18,
          distance: 4.5,
          orbitalPeriodDays: 5.8792,
          material: materials.moonMaterial
        }
      ],

      rings: [
        {
          innerRadius: 1.7,
          outerRadius: 1.76,
          color: 0x777c89,
          opacity: 0.25
        },
        {
          innerRadius: 1.85,
          outerRadius: 1.91,
          color: 0xaaa5a0,
          opacity: 0.2
        },
        {
          innerRadius: 2.2,
          outerRadius: 2.25,
          color: 0x777c89,
          opacity: 0.25
        },
        {
          innerRadius: 2.35,
          outerRadius: 2.5,
          color: 0xaaa5a0,
          opacity: 0.16
        }
      ]
    },


    // ============================================
    // PLUTO (DWARF PLANET)
    // ============================================

    // {
    //   name: 'Pluto',
    //   radius: 0.4,
    //   distance: 210,

    //   orbitalPeriodDays: 90560,
    //   rotationPeriodDays: 6.3872,

    //   axialTiltDeg: 119.51,
    //   eccentricity: 0.2444,
    //   orbitalInclinationDeg: 17.16,

    //   // Simplified initial phase for visual demonstration
    //   initialMeanAnomalyDeg: 60,

    //   material: materials.plutoMaterial,

    //   moons: [
    //     {
    //       name: 'Charon',
    //       radius: 0.18,
    //       distance: 1.2,
    //       orbitalPeriodDays: 6.387222,
    //       material: materials.moonMaterial
    //     },
    //     {
    //       name: 'Nix',
    //       radius: 0.045,
    //       distance: 2.0,
    //       orbitalPeriodDays: 24.85,
    //       material: materials.moonMaterial
    //     },
    //     {
    //       name: 'Hydra',
    //       radius: 0.05,
    //       distance: 2.6,
    //       orbitalPeriodDays: 38.20,
    //       material: materials.moonMaterial
    //     }
    //   ]
    // }

  ];
};
