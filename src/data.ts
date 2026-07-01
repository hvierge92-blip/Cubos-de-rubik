import imgClassic from "./assets/images/regenerated_image_1782892638726.png";
import imgCyberDog from "./assets/images/regenerated_image_1782892643847.png";
import imgNeonGlow from "./assets/images/regenerated_image_1782892648336.png";
import imgCarbon from "./assets/images/regenerated_image_1782892652659.png";

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
    id: "staffordshire-3x3",
    name: "Staffordshire Classic 3x3",
    description: "Rompecabezas 3x3 de diseño exclusivo y tacto premium acabado mate.",
    longDescription: "Un puzzle 3x3 único con la forma de un American Staffordshire. Su diseño rompe la forma clásica del cubo para ordenar el caos de su estructura escultórica. Con un acabado mate de tacto premium y alta resistencia, es ideal para coleccionistas y amantes del diseño disruptivo. ¿Aceptas el desafío?",
    price: 29.99,
    tag: "DISEÑO EXCLUSIVO",
    image: imgClassic,
    specs: {
      "Modelo": "American Staffordshire Classic",
      "Tipo": "Puzzle 3x3 Escultórico",
      "Tacto": "Premium Acabado Mate",
      "Estructura": "Resistente y duradera",
      "Dificultad": "Alta (8/10)",
      "Envío": "Gratuito"
    }
  },
  {
    id: "cyber-dog",
    name: "Staffordshire Cyber-Dog",
    description: "Edición limitada cyber-tech con iluminación reactiva por inducción.",
    longDescription: "Una obra maestra de ingeniería cibernética. El Staffordshire Cyber-Dog cuenta con sutiles detalles cromados y líneas de corte retro-futuristas que se iluminan al interactuar con las piezas mecánicas del puzzle. Tacto premium con aleación de nylon reforzado para giros ultra veloces y estables.",
    price: 29.99,
    tag: "EDICIÓN LIMITADA",
    image: imgCyberDog,
    specs: {
      "Modelo": "Staffordshire Cybernetic V1",
      "Material": "Nylon reforzado y polímero",
      "Iluminación": "Detalles reactivos cyber-glow",
      "Tacto": "Suave y de alta fricción",
      "Dificultad": "Extrema (9/10)",
      "Envío": "Gratuito"
    }
  },
  {
    id: "neon-3x3",
    name: "Staffordshire Neon Glow",
    description: "Diseño retro-iluminado con colores vibrantes rosa y cian de alta intensidad.",
    longDescription: "El Staffordshire Neon Glow de Crubik está diseñado para deslumbrar. Las juntas de los bloques emiten una vibrante y constante luz electroluminiscente rosa y cian que facilita la resolución en condiciones de baja luz, a la vez que resalta las líneas escultóricas del imponente Staffy.",
    price: 29.99,
    tag: "POPULAR",
    image: imgNeonGlow,
    specs: {
      "Modelo": "Staffordshire Neon Lumines",
      "Material": "ABS de baja fricción pulido",
      "Luz": "Electroluminiscente Rosa & Cian",
      "Tacto": "Texturizado Antideslizante",
      "Dificultad": "Estándar (7/10)",
      "Envío": "Gratuito"
    }
  },
  {
    id: "void-4x4",
    name: "Staffordshire Carbon Edition",
    description: "Fibra de carbono mate ultra ligera y detalles metálicos pulidos.",
    longDescription: "Para los coleccionistas más exigentes. La Staffordshire Carbon Edition sustituye los plásticos tradicionales por un compuesto de fibra de carbono mate de alta resistencia. Cuenta con un pulido mecánico de precisión que permite que cada pieza se desplace con el mínimo rozamiento táctil.",
    price: 29.99,
    tag: "EDICIÓN DE LUJO",
    image: imgCarbon,
    specs: {
      "Modelo": "Staffordshire Carbon Matte",
      "Material": "Compuesto de Fibra de Carbono",
      "Tecnología": "Núcleo de giro magnético",
      "Tacto": "Mate texturado ultra-premium",
      "Dificultad": "Avanzada (8/10)",
      "Envío": "Gratuito"
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
