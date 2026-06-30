export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  tag?: string;
  image: string;
  specs: { [key: string]: string };
}

export interface Algorithm {
  id: string;
  name: string;
  category: "F2L" | "OLL" | "PLL" | "Crux";
  notation: string;
  description: string;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
  stats: {
    speed: string;
    efficiency: string;
    moves: number;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: "cyber-dog",
    name: "The Cyber-Dog",
    description: "Escultura cinética y puzzle de alta gama con sensores táctiles.",
    longDescription: "Una obra maestra de ingeniería y arte digital. Este puzzle cinético autómata se desensambla en un intrincado juego de piezas cúbicas imantadas que activan patrones de luz reactivos mediante sensores táctiles integrados de alta sensibilidad. El diseño poligonal emula la biomecánica canina con una estética retro-futurista impecable.",
    price: 149.00,
    tag: "EDICIÓN LIMITADA",
    image: "/src/assets/images/cyber_dog_puzzle_1782733170159.jpg",
    specs: {
      "Material": "Polímero aeroespacial y duraluminio",
      "Conectividad": "Bluetooth 5.2 / USB-C",
      "Iluminación": "LED RGB direccionable inteligente",
      "Batería": "Li-Po 1200 mAh (hasta 8 horas de brillo reactivo)",
      "Sensores": "8 zonas capacitivas de precisión",
      "Dificultad": "Extrema (9.5/10)"
    }
  },
  {
    id: "neon-3x3",
    name: "Neon 3x3",
    description: "Rotación magnética ultra-suave con retroiluminación interna.",
    longDescription: "El cubo insignia de competición de Crubik. Cuenta con un núcleo electromagnético ajustable que ofrece 64 niveles de fuerza de atracción magnética. Los paneles internos semitransparentes emiten una sutil luz de fondo neon configurable desde nuestra app, permitiendo resolver a ciegas o en entornos de baja visibilidad sin perder de vista los contrastes cromáticos.",
    price: 39.00,
    tag: "POPULAR",
    image: "/src/assets/images/neon_cube_3x3_1782733191356.jpg",
    specs: {
      "Material": "ABS de baja fricción esmerilado",
      "Magnetismo": "Núcleo ajustable MagLev (64 configuraciones)",
      "Retroiluminación": "Neon Glow de espectro completo",
      "Peso": "68 gramos",
      "Dimensiones": "56mm x 56mm x 56mm",
      "Dificultad": "Estándar (6/10)"
    }
  },
  {
    id: "void-4x4",
    name: "Void 4x4",
    description: "Diseño esqueletizado para una ligereza extrema y agarre industrial.",
    longDescription: "Rompiendo los límites de la física de los cubos. El Void 4x4 elimina por completo el núcleo central sólido clásico, sustituyéndolo por un sistema de rieles de deslizamiento concéntrico con tolerancia de micras. Su estructura esqueletizada reduce el peso al mínimo histórico, mejorando el enfriamiento de las manos y proporcionando un agarre táctil de textura mecánica incomparable.",
    price: 55.00,
    image: "/src/assets/images/void_cube_4x4_1782733206440.jpg",
    specs: {
      "Material": "Nylon reforzado con fibra de carbono",
      "Tecnología": "Deslizamiento concéntrico Void-Rail",
      "Peso": "74 gramos",
      "Dimensiones": "60mm x 60mm x 60mm",
      "Estructura": "Esqueletizada tipo bento",
      "Dificultad": "Avanzada (8/10)"
    }
  }
];

export const ALGORITHMS: Algorithm[] = [
  {
    id: "f2l-01",
    name: "F2L 01: Esquina Arriba (Blanco lateral)",
    category: "F2L",
    notation: "R U R' U' R U R' U' R U R'",
    description: "Inserta el par esquina-arista cuando la esquina tiene el blanco mirando a la derecha y la arista está desalineada.",
    difficulty: "Principiante",
    stats: {
      speed: "0.45s",
      efficiency: "Óptima",
      moves: 11
    }
  },
  {
    id: "f2l-24",
    name: "F2L 24: Par Oculto Directo",
    category: "F2L",
    notation: "F R' F' R U R U' R'",
    description: "Caso avanzado de inserción rápida de par en la ranura posterior derecha sin rotación de cubo entera.",
    difficulty: "Intermedio",
    stats: {
      speed: "0.38s",
      efficiency: "Alta",
      moves: 8
    }
  },
  {
    id: "oll-20",
    name: "OLL 20: Cruz Completa (Cruz Simétrica)",
    category: "OLL",
    notation: "r U R' U' r' R U R U' R'",
    description: "Orienta toda la capa superior cuando solo tienes la cruz central orientada sin esquinas amarillas arriba.",
    difficulty: "Intermedio",
    stats: {
      speed: "0.52s",
      efficiency: "Excelente",
      moves: 10
    }
  },
  {
    id: "oll-57",
    name: "OLL 57: Orientación Ninja",
    category: "OLL",
    notation: "R U R' U' M' U R U' r'",
    description: "Algoritmo de alta velocidad para orientar el último par de esquinas restantes cuando la cruz ya está hecha.",
    difficulty: "Avanzado",
    stats: {
      speed: "0.29s",
      efficiency: "Extrema",
      moves: 9
    }
  },
  {
    id: "pll-u-perm",
    name: "Permutación U (Horaria)",
    category: "PLL",
    notation: "R2 U R U R' U' R' U' R' U R'",
    description: "Permuta tres aristas de la última capa en el sentido de las agujas del reloj, manteniendo las esquinas intactas.",
    difficulty: "Principiante",
    stats: {
      speed: "0.32s",
      efficiency: "Óptima",
      moves: 11
    }
  },
  {
    id: "pll-t-perm",
    name: "Permutación T (Clásica)",
    category: "PLL",
    notation: "R U R' U' R' F R2 U' R' U' R U R' F'",
    description: "Intercambia dos esquinas adyacentes y dos aristas opuestas. El algoritmo de PLL más utilizado y fluido.",
    difficulty: "Intermedio",
    stats: {
      speed: "0.41s",
      efficiency: "Alta",
      moves: 14
    }
  },
  {
    id: "crux-speed",
    name: "Crubik Crux-Speed G",
    category: "Crux",
    notation: "R' U2 R2 U R' U' R' U2 L R U' R' L'",
    description: "Técnica experimental de Crubik para permutar esquinas y aristas simultáneamente reduciendo un paso CFOP.",
    difficulty: "Avanzado",
    stats: {
      speed: "0.58s",
      efficiency: "Extrema",
      moves: 14
    }
  }
];
