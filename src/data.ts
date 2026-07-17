import imgClassic from "./assets/images/regenerated_image_1782892638726.png";
import imgCyberDog from "./assets/images/regenerated_image_1782892643847.png";
import imgNeonGlow from "./assets/images/regenerated_image_1782892648336.png";
import imgCarbon from "./assets/images/regenerated_image_1782892652659.png";
import imgHusky from "./assets/images/regenerated_image_1783676215043.png";

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  tag?: string;
  image: string;
  specs: { [key: string]: string };
  availability?: "Disponible" | "Agotado" | "Próximamente";
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
    id: "pitbull",
    name: "Pitbull",
    description: "Diseño escultórico clásico de Pitbull con tacto premium acabado mate.",
    longDescription: "Un puzzle único con la forma de un imponente Pitbull. Su diseño rompe la forma clásica del cubo para ordenar el caos de su estructura escultórica. Con un acabado mate de tacto premium y alta resistencia, es ideal para coleccionistas y amantes del diseño de precisión y el speedcubing.",
    price: 29.99,
    tag: "DISEÑO EXCLUSIVO",
    image: imgClassic,
    availability: "Disponible",
    specs: {
      "Modelo": "Pitbull Classic 3x3",
      "Tipo": "Puzzle Escultórico 3x3",
      "Tacto": "Premium Acabado Mate",
      "Estructura": "Resistente y duradera",
      "Dificultad": "Alta (8/10)",
      "Envío": "Gratuito"
    }
  },
  {
    id: "chihuahua",
    name: "Chihuahua",
    description: "Edición especial de Chihuahua con proporciones artísticas y giros de alta velocidad.",
    longDescription: "El Chihuahua de Crubik destaca por su silueta compacta y refinada de líneas minimalistas. Este puzzle escultórico combina la complejidad de su mecanismo interno con un diseño externo espectacular, ideal para los amantes de las razas pequeñas y los desafíos geométricos.",
    price: 29.99,
    tag: "NUEVO",
    image: imgHusky,
    availability: "Disponible",
    specs: {
      "Modelo": "Chihuahua Pocket Edition",
      "Tipo": "Puzzle Escultórico 3x3",
      "Tacto": "Suave al tacto y pulido",
      "Estructura": "Posicionamiento magnético",
      "Dificultad": "Intermedia (6/10)",
      "Envío": "Gratuito"
    }
  },
  {
    id: "border-collie",
    name: "Border Collie",
    description: "Compuesto de fibra de carbono mate ultra ligera y detalles metálicos pulidos.",
    longDescription: "Para los coleccionistas más exigentes. El Border Collie Carbon Edition sustituye los plásticos tradicionales por un compuesto de fibra de carbono mate de alta resistencia. Cuenta con un pulido mecánico de precisión que permite que cada pieza se desplace con el mínimo rozamiento táctil.",
    price: 29.99,
    tag: "EDICIÓN DE LUJO",
    image: imgCarbon,
    availability: "Agotado",
    specs: {
      "Modelo": "Border Collie Carbon Matte",
      "Tipo": "Puzzle Escultórico 3x3",
      "Material": "Compuesto de Fibra de Carbono",
      "Tacto": "Mate texturado ultra-premium",
      "Dificultad": "Avanzada (8/10)",
      "Envío": "Gratuito"
    }
  },
  {
    id: "doberman",
    name: "Doberman",
    description: "Diseño retro-iluminado con colores vibrantes rosa y cian de alta intensidad.",
    longDescription: "El Doberman de Crubik está diseñado para deslumbrar. Las juntas de los bloques emiten una vibrante y constante luz electroluminiscente rosa y cian que facilita la resolución en condiciones de baja luz, a la vez que resalta las líneas esbeltas y elegantes del imponente canino.",
    price: 29.99,
    tag: "POPULAR",
    image: imgNeonGlow,
    availability: "Disponible",
    specs: {
      "Modelo": "Doberman Neon Lumines",
      "Tipo": "Puzzle Escultórico 3x3",
      "Luz": "Electroluminiscente Rosa & Cian",
      "Tacto": "Texturizado Antideslizante",
      "Dificultad": "Estándar (7/10)",
      "Envío": "Gratuito"
    }
  },
  {
    id: "bulldog-frances",
    name: "Bulldog Francés",
    description: "Edición limitada cyber-tech de Bulldog Francés con iluminación reactiva.",
    longDescription: "Una obra maestra de ingeniería cibernética. El Bulldog Francés cuenta con sutiles detalles cromados y líneas de corte retro-futuristas que se iluminan al interactuar con las piezas mecánicas del puzzle. Tacto premium con aleación de nylon reforzado para giros ultra veloces y estables.",
    price: 29.99,
    tag: "EDICIÓN LIMITADA",
    image: imgCyberDog,
    availability: "Próximamente",
    specs: {
      "Modelo": "Bulldog Francés Cyber V1",
      "Tipo": "Puzzle Escultórico 3x3",
      "Material": "Nylon reforzado y polímero",
      "Tacto": "Suave y de alta fricción",
      "Dificultad": "Extrema (9/10)",
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
